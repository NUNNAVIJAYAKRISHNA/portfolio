import test from 'node:test';
import assert from 'node:assert/strict';
import { createContactHandler } from '../lib/contact.mjs';
const env = { SITE_URL: 'https://portfolio.example', SMTP_HOST: 'smtp.example', SMTP_USER: 'user', SMTP_PASS: 'secret', SMTP_FROM: 'owner@example.com', CONTACT_TO: 'owner@example.com' };
const valid = { name: 'Reviewer', email: 'review@example.com', subject: 'Portfolio inquiry', message: 'Hello from a test.', website: '' };
const request = (body = valid, headers = {}) => new Request('https://portfolio.example/api/contact', { method: 'POST', headers: { origin: env.SITE_URL, 'content-type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
test('valid input uses fixed sender/recipient and TLS, and only reports SMTP acceptance', async () => {
 let options, message;
 const handler = createContactHandler({ env, createTransport: config => { options = config; return { sendMail: async mail => { message = mail; return { accepted: [env.CONTACT_TO] }; } }; } });
 const result = await handler(request({ ...valid, to: 'attacker@example.com' }));
 assert.equal(result.status, 200); assert.equal((await result.json()).success, true);
 assert.equal(message.to, env.CONTACT_TO); assert.equal(message.from, env.SMTP_FROM); assert.equal(message.replyTo.address, valid.email);
 assert.equal(options.requireTLS, true); assert.equal(options.disableFileAccess, true); assert.equal(options.disableUrlAccess, true); assert.equal(message.html, undefined);
});
test('rejects malformed, missing, oversized, injected, bot and cross-origin input before SMTP', async () => {
 const handler = createContactHandler({ env, createTransport: () => { throw new Error('Should not send'); } });
 for (const body of ['{', null, [], {}, { ...valid, name: ' ' }, { ...valid, email: 'bad' }, { ...valid, subject: 'Hello\r\nBcc: attacker@example.com' }, { ...valid, message: 'a'.repeat(5001) }, { ...valid, website: 'bot' }]) assert.equal((await handler(request(body))).status, 400);
 assert.equal((await handler(request('x'.repeat(17000)))).status, 413);
 assert.equal((await handler(request(valid, { origin: 'https://attacker.example' }))).status, 403);
 assert.equal((await handler(request(valid, { 'content-type': 'text/plain' }))).status, 415);
});
test('missing configuration and SMTP rejection/failure never claim success or leak secrets', async () => {
 assert.equal((await createContactHandler({ env: {} })(new Request('http://localhost/api/contact', { method:'POST', headers:{origin:'http://localhost','content-type':'application/json'},body:JSON.stringify(valid) }))).status,503);
 for (const sendMail of [async () => ({ accepted: [] }), async () => { throw new Error('secret'); }]) {
  const response = await createContactHandler({ env, createTransport: () => ({ sendMail }) })(request());
  assert.equal(response.status, 502); assert.equal((await response.text()).includes('secret'), false);
 }
});
test('limits repeats and expires the window', async () => {
 let time = 1000000;
 const handler = createContactHandler({ env, now: () => time, createTransport: () => ({ sendMail: async () => ({ accepted: [env.CONTACT_TO] }) }) });
 for (let i=0;i<3;i++) assert.equal((await handler(request())).status,200);
 assert.equal((await handler(request())).status,429);
 time += 600001; assert.equal((await handler(request())).status,200);
 for(let i=0;i<19;i++) assert.equal((await handler(request({...valid,email:`person${i}@example.com`}))).status,200);
 assert.equal((await handler(request({...valid,email:'another@example.com'}))).status,429);
});
import net from 'node:net';
import nodemailer from 'nodemailer';

test('real Nodemailer sends the expected MIME message to a loopback SMTP sink', async () => {
 const messages = [];
 const server = net.createServer(socket => {
  socket.setEncoding('utf8'); socket.write('220 localhost test SMTP\r\n');
  let buffer = '', collecting = false, message = '';
  socket.on('data', chunk => {
   buffer += chunk;
   while (buffer.includes('\r\n')) {
    const end = buffer.indexOf('\r\n'); const line = buffer.slice(0,end); buffer = buffer.slice(end+2);
    if (collecting) {
     if (line === '.') { messages.push(message); message=''; collecting=false; socket.write('250 Message accepted\r\n'); }
     else message += line+'\r\n';
    } else if (/^EHLO/.test(line)) socket.write('250 localhost\r\n');
    else if (/^DATA/.test(line)) { collecting=true; socket.write('354 End with dot\r\n'); }
    else if (/^QUIT/.test(line)) socket.end('221 Bye\r\n');
    else socket.write('250 OK\r\n');
   }
  });
 });
 await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
 try {
  const handler = createContactHandler({ env, createTransport: options => nodemailer.createTransport({ ...options, host:'127.0.0.1',port:server.address().port,secure:false,requireTLS:false,auth:undefined }) });
  assert.equal((await handler(request())).status,200);
  assert.equal(messages.length,1);
  assert.match(messages[0], /To: owner@example.com/);
  assert.match(messages[0], /Reply-To: Reviewer <review@example.com>/);
  assert.match(messages[0], /Hello from a test/);
 } finally { await new Promise(resolve => server.close(resolve)); }
});


