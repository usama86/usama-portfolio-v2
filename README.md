# Muhammad Usama — Portfolio

Personal portfolio site showcasing experience, projects, and certifications. Built for speed, clarity, and a clean, modern presentation of work.

## Features

- Experience timeline with company logos, links, and experience letters
- Project highlights with rich media and details
- Responsive layout with motion and polish
- Built-in SEO metadata and Open Graph tags

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Radix UI + Lucide Icons

## Getting Started

Prerequisites:
- Node.js 20.9+
- pnpm (recommended)

Install dependencies:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm dev
```

Open `http://localhost:3000` in your browser.

## Scripts

```bash
pnpm dev     # Start dev server
pnpm build   # Production build
pnpm start   # Run production server
pnpm lint    # Lint code
```

## Project Structure

- `src/app` — Routes, layout, and global styles
- `src/components` — UI + section components
- `src/data` — Portfolio content (experience, projects, etc.)
- `public/images` — Logos and media assets
- `public/experienceletter_*.pdf` — Experience letters

## Customization

- Update experience content in `src/data/experience.ts`
- Update projects in `src/data/projects.ts`
- Swap logos in `public/images`

## Deployment

Build and deploy on any Node.js host:

```bash
pnpm build
pnpm start
```

Vercel is a great default choice for Next.js projects.

## Contact form configuration

The contact form posts to `/api/contact`. Configure the variables listed in `.env.example` in the deployment environment. Keep the secret values in the host's environment settings, never in the repository. `NEXT_PUBLIC_CONTACT_TURNSTILE_SITE_KEY` is public and must be set before building; the server-only values are read by the route at runtime. Rebuild after changing the public site key.

- Create a portfolio-specific Cloudflare Turnstile widget for `usama-portfolio-v2.vercel.app`. Add any exact preview hostnames only if you intend to enable the form there. Set the public site key, server secret, and matching `CONTACT_TURNSTILE_HOSTNAMES`. The endpoint validates each token with Siteverify, including its action and hostname.
- Verify a sender domain or sender identity in Resend before setting `CONTACT_FROM_EMAIL`. Do not assume an ArchWalk sender is verified for this portfolio. Create a **separate** Resend API key with **Sending access** restricted to that verified domain. Set it as `CONTACT_RESEND_API_KEY`; do not reuse ArchWalk's key.
- Messages are addressed to the portfolio owner's existing Gmail address. The validated visitor address is used only as `Reply-To`; the verified sender remains the `From` address. A successful API response confirms Resend accepted the request, not inbox delivery.
- Without the public widget key, the form visibly disables Send and keeps the direct-email link. Missing server configuration fails closed with a direct-email instruction. A 2xx response from Resend with an email ID is required before the form reports success.
- The endpoint caps JSON payloads at 8 KiB, validates fields, rejects a honeypot, verifies same-origin requests, uses Turnstile, and applies a best-effort per-instance rate limit of five attempts per ten minutes. Turnstile and Resend idempotency are the cross-instance protections; use host-level rate limiting if traffic warrants stronger abuse control.

Before release, set real keys in the intended environment, send an authorized test message, confirm its appearance in the owner inbox, and verify Reply-To. Do not use Cloudflare's dummy keys or a shared ArchWalk key in production.

## License

© 2025 Muhammad Usama. All rights reserved.
