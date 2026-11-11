import test from 'node:test';
import assert from 'node:assert/strict';
import contactHandler, { createNetlifyContactHandler } from '../netlify/functions/contact.mjs';

const envValues = {
  SITE_URL: 'https://portfolio.example',
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: '465',
  SMTP_USER: 'owner@example.com',
  SMTP_PASS: 'app-password',
  SMTP_FROM: 'owner@example.com',
  CONTACT_TO: 'owner@example.com',
};

const validPayload = {
  name: 'Reviewer',
  email: 'review@example.com',
  subject: 'Netlify enquiry',
  message: 'Hello from Netlify Functions.',
  website: '',
};

const makeRequest = (method = 'POST', body = validPayload, headers = {}) =>
  new Request('https://portfolio.example/.netlify/functions/contact', {
    method,
    headers: {
      origin: envValues.SITE_URL,
      ...(method === 'POST' ? { 'content-type': 'application/json' } : {}),
      ...headers,
    },
    ...(method === 'POST' ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {}),
  });

test('rejects non-POST requests with 405 JSON and Allow header', async () => {
  const handler = createNetlifyContactHandler({
    env: envValues,
    createTransport: () => {
      throw new Error('Should not initialize SMTP transport for GET');
    },
  });

  const response = await handler(makeRequest('GET'));
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'POST');
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), {
    success: false,
    message: 'Method not allowed.',
  });
});

test('reads Netlify.env and sends enquiry email via Nodemailer transport', async () => {
  const previousNetlify = globalThis.Netlify;
  const mailEnv = new Map(Object.entries(envValues));
  globalThis.Netlify = {
    env: {
      get: (key) => mailEnv.get(key),
    },
  };

  let sentMail;
  let transportOptions;
  try {
    const handler = createNetlifyContactHandler({
      createTransport: (options) => {
        transportOptions = options;
        return {
          sendMail: async (mail) => {
            sentMail = mail;
            return { accepted: [envValues.CONTACT_TO] };
          },
        };
      },
    });

    const response = await handler(makeRequest('POST'));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.deepEqual(await response.json(), {
      success: true,
      message: 'Message sent.',
    });
    assert.equal(transportOptions.host, 'smtp.gmail.com');
    assert.equal(transportOptions.port, 465);
    assert.equal(transportOptions.secure, true);
    assert.equal(sentMail.to, envValues.CONTACT_TO);
    assert.equal(sentMail.from, envValues.SMTP_FROM);
    assert.equal(sentMail.replyTo.address, validPayload.email);
    assert.match(sentMail.text, /Hello from Netlify Functions\./);
  } finally {
    if (previousNetlify === undefined) {
      delete globalThis.Netlify;
    } else {
      globalThis.Netlify = previousNetlify;
    }
  }
});

test('default Netlify Function export returns 503 JSON when SMTP env vars are missing', async () => {
  const previousNetlify = globalThis.Netlify;
  const previousSiteUrl = process.env.SITE_URL;
  const previousSmtpHost = process.env.SMTP_HOST;
  delete globalThis.Netlify;
  delete process.env.SITE_URL;
  delete process.env.SMTP_HOST;

  try {
    const response = await contactHandler(
      new Request('https://portfolio.example/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          origin: 'https://portfolio.example',
          'content-type': 'application/json',
        },
        body: JSON.stringify(validPayload),
      })
    );

    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      success: false,
      message: 'Email is not configured. Please use Direct Mail.',
    });
  } finally {
    if (previousNetlify !== undefined) globalThis.Netlify = previousNetlify;
    if (previousSiteUrl !== undefined) process.env.SITE_URL = previousSiteUrl;
    if (previousSmtpHost !== undefined) process.env.SMTP_HOST = previousSmtpHost;
  }
});

