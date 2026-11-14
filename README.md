# Nunna Vijaya Krishna — Portfolio

A lightweight, editorial-style personal portfolio built with **Next.js 16 (App Router)**, **React 19**, and **Nodemailer**. Designed for performance, accessibility, and a calm reading experience — no heavy UI frameworks, no client-side bloat.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Node](https://img.shields.io/badge/Node-%3E%3D20.9.0-339933?logo=node.js)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

---

## ✨ Features

- **Server-first rendering** — All content is server-rendered; only a tiny client component (`PortfolioInteractions`) handles progressive enhancement (navigation, scroll spy, project filters, contact modal).
- **Accessible by default** — Semantic HTML, skip links, focus management, ARIA attributes, reduced-motion support, and a fully keyboard-operable contact dialog.
- **Contact form with Nodemailer** — Serverless API route (`/api/contact`) sends email via SMTP with rate limiting, input validation, and a honeypot field.
- **Responsive editorial layout** — Fluid grid, clamp-based typography, CSS custom properties for theming, and a warm paper/olive color palette.
- **Project filtering** — Filter projects by category (Machine Learning, Full Stack, ServiceNow) without page reloads.
- **Scroll progress indicator** — Thin top bar shows reading progress.
- **Security headers** — `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` via `next.config.mjs`.

---

## 🛠 Tech Stack

| Category | Tools |
|----------|-------|
| **Framework** | Next.js 16 (App Router, React 19) |
| **Language** | JavaScript (ESM) |
| **Styling** | Vanilla CSS (custom properties, no framework) |
| **Email** | Nodemailer (SMTP) |
| **Deployment** | Vercel (recommended) |
| **Node** | ≥ 20.9.0 |

---

## 🚀 Getting Started

### Prerequisites

- Node.js **≥ 20.9.0**
- npm (comes with Node)

### Installation

```bash
# Clone the repository
git clone https://github.com/NUNNAVIJAYAKRISHNA/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Required for the contact form to send emails
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SMTP_FROM="Your Name <noreply@yourdomain.com>"
CONTACT_TO="vijayakrishna.n213@gmail.com"

# Optional: used for origin validation in the API route
SITE_URL=https://your-domain.com
```

> **Note:** The contact API returns a friendly fallback ("Email is not configured. Please use Direct Mail.") if SMTP credentials are missing, so the portfolio works without email configuration.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── api/contact/route.js      # POST handler (delegates to lib/contact.mjs)
│   ├── globals.css               # Design tokens, layout, components, responsive
│   ├── layout.jsx                # Root layout (fonts, metadata)
│   ├── page.jsx                  # Main page — all sections composed here
│   └── portfolio-interactions.jsx# Client component: nav, filters, modal, scroll spy
├── lib/
│   └── contact.mjs               # Contact handler: validation, rate-limit, Nodemailer
├── public/
│   └── images/profile.jpg        # Profile photo
├── next.config.mjs               # Next.js config (headers, redirects)
├── package.json
└── README.md
```

---

## 📧 Contact Form API

**Endpoint:** `POST /api/contact`

**Request Body (JSON):**
```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "subject": "Optional subject",
  "message": "Your message here"
}
```

**Response:**
| Status | Meaning |
|--------|---------|
| 200    | `{ "success": true, "message": "Message sent." }` |
| 400    | Validation error (missing/invalid fields) |
| 403    | Origin not allowed (CSRF protection) |
| 413    | Payload too large (>16 KB) |
| 415    | Wrong Content-Type |
| 429    | Rate limited (max 3/10 min per email, 20/10 min global) |
| 502    | SMTP send failed (provider error) |
| 503    | SMTP not configured |

**Security measures:**
- Origin validation against `SITE_URL` or request `Host`
- Honeypot field (`website`) rejects bot submissions
- Header injection prevention (newlines/null bytes rejected)
- Per-email and global rate limiting (in-memory, 10-minute window)
- Payload size cap (16 KB)
- SMTP credentials never exposed to client or logs

---

## ♿ Accessibility

- **Skip to content** link at top of page
- **Semantic HTML5** — `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`, `<dialog>`
- **Focus management** — Visible `:focus-visible` outlines, modal traps focus, restores focus on close
- **ARIA** — `aria-expanded`, `aria-controls`, `aria-pressed`, `aria-current`, `aria-live` regions
- **Reduced motion** — `@media (prefers-reduced-motion: reduce)` disables scroll-behavior and transitions
- **Color contrast** — Meets WCAG AA on all text/background combinations
- **Keyboard operable** — All interactive elements reachable and usable via keyboard

---

## 🎨 Customization

### Colors & Typography

Edit CSS custom properties in `app/globals.css`:

```css
:root {
  --font-page: 'Roboto Slab', Georgia, serif;
  --bg-page: #eae8e1;        /* warm paper */
  --bg-surface: #dedfd5;     /* slightly darker surface */
  --accent: #52663c;         /* olive accent */
  --accent-ink: #fffef8;     /* text on accent */
  --text-primary: #282b27;
  --text-secondary: #464c42;
  --text-muted: #606559;
  --border: #bcc0b3;
  /* ...spacing, radius, type scale... */
}
```

### Content

All portfolio content lives in `app/page.jsx`. Update:
- Hero copy, profile links, availability
- Projects (add/remove `<article class="project-card">` blocks)
- Experience timeline entries
- Specializations, skills, certifications
- Education
- Contact info in footer and modal

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Project Settings → Environment Variables
4. Deploy

Vercel auto-detects Next.js and configures the build.

### Other Platforms

Any Node.js hosting that supports Next.js (Netlify, AWS Amplify, Railway, Render, VPS with PM2, etc.).

---

## 🧪 Testing

```bash
npm test
```

Runs Node's built-in test runner (`node --test`) on `tests/*.test.mjs`.

---

## 📄 License

ISC License — see [LICENSE](LICENSE) for details.

---

## 👤 Author

**Nunna Vijaya Krishna**  
Software Engineering · Applied Machine Learning · ServiceNow

- 📧 [vijayakrishna.n213@gmail.com](mailto:vijayakrishna.n213@gmail.com)
- 💼 [LinkedIn](https://linkedin.com/in/nunnavijayakrishna)
- 🐙 [GitHub](https://github.com/NUNNAVIJAYAKRISHNA)
- 🏆 [Credentials](https://credly.com/users/n-vijay-krishna)

---

*Built for performance and precision. © 2026 Nunna Vijaya Krishna.*