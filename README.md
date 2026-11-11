# Nunna Vijaya Krishna — portfolio

The approved `index-light.html` design is now the Next.js home page at `/`. The old `/index-light.html` URL redirects to `/`. The page keeps Roboto Slab, the warm paper/olive palette, three projects, filters, navigation, credentials, and contact dialog. There is no 3D experiment.

## Run

Use Node.js 20.9 or newer (Node 24 LTS recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production: `npm run build`, then `npm start`. Deploy to a Node-capable host; a static-only host cannot run the email API.

## Email configuration

Copy `.env.example` to `.env.local`, fill in your SMTP provider credentials and verified sender, and restart the server. Set `SITE_URL` to the exact public origin in production. Use port 465 for implicit TLS or 587 for STARTTLS. SMTP credentials must never use a `NEXT_PUBLIC_` prefix. Configure the same environment variables in your hosting provider.

The server uses a fixed `CONTACT_TO` recipient and verified `SMTP_FROM`; visitors only supply Reply-To. It sends plain text, validates/limits input, rejects foreign origins, enforces TLS, disables file/URL attachment access, and returns no provider secrets. The form preserves input and offers Direct Mail on failure. Success means the SMTP server accepted the recipient, not a guarantee of inbox delivery.

The rate limit is process-local (three attempts per sender and twenty total per ten minutes). Add host/edge rate limiting for a public multi-instance deployment; the in-memory limiter does not coordinate across servers or survive restarts. No external delivery was attempted during migration. Real delivery requires your SMTP configuration.

## Checks

```sh
npm test
npm run build
npm audit
```

Tests cover validation, origin checks, request size, mail configuration, fixed recipients, SMTP errors, rate limiting, and real Nodemailer serialization/delivery to a local SMTP sink. The sink disables TLS only for its own loopback test; production always requires TLS.

## Source

- `app/page.jsx`: server-rendered portfolio content migrated from the light page.
- `app/globals.css`: consolidated light design tokens and responsive styles.
- `app/portfolio-interactions.jsx`: navigation, filters, and accessible contact dialog behavior, with lifecycle cleanup.
- `app/api/contact/route.js` and `lib/contact.mjs`: Next.js Node/Nodemailer contact endpoint (`/api/contact`).
- `netlify/functions/contact.mjs` and `netlify.toml`: standalone Netlify Function contact endpoint (`/.netlify/functions/contact`) reusing `lib/contact.mjs`.
- `public/images/profile.jpg`: original portrait.

Google Fonts supplies Roboto Slab at runtime with a Georgia fallback when unavailable. No new decorative/UI dependencies were added.
