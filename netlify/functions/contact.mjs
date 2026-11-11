import { createContactHandler } from '../../lib/contact.mjs';

const ENV_KEYS = [
  'SITE_URL',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM',
  'CONTACT_TO',
];

function createNetlifyEnv() {
  const env = {};
  for (const key of ENV_KEYS) {
    Object.defineProperty(env, key, {
      enumerable: true,
      get() {
        return globalThis.Netlify?.env?.get(key) ?? process.env[key];
      },
    });
  }
  return env;
}

/**
 * Creates the Netlify Function handler for POST contact submissions.
 * Reuses the shared Nodemailer validation, origin-check, and rate-limit logic.
 */
export function createNetlifyContactHandler({
  env = createNetlifyEnv(),
  createTransport,
  now,
} = {}) {
  const handlePost = createContactHandler({ env, createTransport, now });

  return async function contact(request) {
    if (request.method !== 'POST') {
      return Response.json(
        { success: false, message: 'Method not allowed.' },
        {
          status: 405,
          headers: {
            Allow: 'POST',
            'Cache-Control': 'no-store',
          },
        }
      );
    }

    return handlePost(request);
  };
}

const defaultHandler = createNetlifyContactHandler();

export default async function contact(request) {
  return defaultHandler(request);
}

