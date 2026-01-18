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
- Node.js 18+
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

## License

© 2025 Muhammad Usama. All rights reserved.
