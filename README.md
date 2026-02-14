# Unprompted 2035 Marketing Site

A polished, responsive, magazine-style marketing website for the book **Unprompted 2035** by **S.W. Gale**.

It is built to look and feel like a modern tech/culture magazine front page while driving conversion to the primary CTA: **Buy on Amazon**.

## Stack

- Next.js (App Router)
- Tailwind CSS
- Local components only (no external UI libraries)

## Features

- Editorial, grid-based landing layout with strong typography and category accents
- Top “Now available” banner with CTA
- Sticky desktop CTA and sticky mobile bottom CTA
- Featured story cards with category tags and excerpt anchors
- 3 long-form excerpts with inline Amazon mini-CTAs
- Reviews / endorsements grid + press kit placeholder link
- Newsletter signup with client-side validation and success state
- About + author area with tasteful local placeholder design
- FAQ section with semantic `<details>` patterns
- Analytics-ready CTA handler (`console.log`) for Amazon clicks
- Basic SEO and OpenGraph metadata placeholders

## Primary CTA URL

All Buy links point to:

- https://a.co/d/0fP5dFzw

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm run start
```

## Deploy (Vercel)

Vercel is the easiest option for Next.js.

1. Push this project to a GitHub repository.
2. Go to [https://vercel.com](https://vercel.com) and create a new project.
3. Import the repository.
4. Keep default build settings (Vercel auto-detects Next.js).
5. Click Deploy.

Optional after deploy:

- Update `app/layout.tsx` metadata `openGraph.url` to your real production URL.

## Project structure

- `app/layout.tsx`: global layout + SEO metadata
- `app/page.tsx`: complete single-page magazine-style landing experience
- `app/globals.css`: Tailwind layers + custom editorial utility styles
- `components/AmazonLink.tsx`: reusable CTA with analytics-ready click log
- `components/NewsletterForm.tsx`: client-side newsletter form state/validation
- `public/og-placeholder.svg`: local OpenGraph placeholder image
