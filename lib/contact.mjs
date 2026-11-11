import nodemailer from 'nodemailer';

const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const reply = (status, message, success = false) => Response.json({ success, message }, { status, headers: { 'Cache-Control': 'no-store' } });

export function createContactHandler({ env = process.env, createTransport = nodemailer.createTransport, now = Date.now } = {}) {
  // Bounded, process-local protection. Multi-instance deployments should also rate-limit at the edge.
  const submissions = new Map();
  let total = [];
  return async function POST(request) {
    const origin = request.headers.get('origin');
    let allowed = false;
    try {
      const incoming = new URL(origin);
      allowed = env.SITE_URL
        ? incoming.origin === new URL(env.SITE_URL).origin
        : ['http:', 'https:'].includes(incoming.protocol) && incoming.host === (request.headers.get('host') || new URL(request.url).host);
    } catch { /* Missing or malformed origins are rejected. */ }
    if (!allowed) return reply(403, 'Origin not allowed.');
    if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return reply(415, 'Expected JSON.');
    let data;
    try {
      if (Number(request.headers.get('content-length')) > 16384) return reply(413, 'Message is too large.');
      const reader = request.body?.getReader();
      if (!reader) return reply(400, 'Message is required.');
      const chunks = []; let size = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > 16384) { await reader.cancel(); return reply(413, 'Message is too large.'); }
        chunks.push(value);
      }
      data = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch { return reply(400, 'Invalid JSON.'); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return reply(400, 'Invalid message.');
    if (data.website) return reply(400, 'Invalid submission.');
    const limits = { name: 100, email: 254, subject: 200, message: 5000 };
    for (const [key, max] of Object.entries(limits)) {
      if (typeof data[key] !== 'string' || data[key].length > max) return reply(400, 'Check your message fields.');
      data[key] = data[key].trim();
    }
    if (!data.name || !data.message || !emailPattern.test(data.email) || /[\r\n\0]/.test(data.name + data.email + data.subject) || data.message.includes('\0')) return reply(400, 'Enter a name, valid email, and message.');
    const port = Number(env.SMTP_PORT || 587);
    if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS || !emailPattern.test(env.SMTP_FROM || '') || !emailPattern.test(env.CONTACT_TO || '') || !Number.isInteger(port) || port < 1 || port > 65535) return reply(503, 'Email is not configured. Please use Direct Mail.');
    const time = now(), cutoff = time - 600000;
    for (const [key, timestamps] of submissions) {
      const recent = timestamps.filter(t => t > cutoff);
      if (recent.length) submissions.set(key, recent); else submissions.delete(key);
    }
    total = total.filter(t => t > cutoff);
    const key = data.email.toLowerCase();
    const recent = submissions.get(key) || [];
    if (total.length >= 20 || recent.length >= 3) return reply(429, 'Please wait before sending another message.');
    total.push(time); submissions.set(key, [...recent, time]);
    try {
      const transport = createTransport({
        host: env.SMTP_HOST, port, secure: port === 465, requireTLS: port !== 465,
        auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
        connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
        disableFileAccess: true, disableUrlAccess: true,
      });
      const result = await transport.sendMail({
        from: env.SMTP_FROM, to: env.CONTACT_TO,
        replyTo: { name: data.name, address: data.email },
        subject: data.subject || `Portfolio contact from ${data.name}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
        disableFileAccess: true, disableUrlAccess: true,
      });
      if (!result.accepted?.some(address => address.toLowerCase() === env.CONTACT_TO.toLowerCase())) throw new Error('Recipient not accepted');
      return reply(200, 'Message sent.', true);
    } catch {
      // Never return SMTP credentials, provider errors, or message contents to the browser/logs.
      return reply(502, 'Email could not be sent. Please try Direct Mail.');
    }
  };
}
