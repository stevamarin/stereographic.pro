# CLAUDE.md

Guidance for Claude Code (and humans) working in this repository.

## Project

**StereoGraphic** - a single-page portfolio/marketing site for an audio + design studio:
- **Stevan Marinković** - Audio Engineer (sound design, foley/SFX, scoring, dialogue editing, mixing & mastering, game audio)
- **Nikola Mijailović** - Graphic Designer (web/graphic design, branding, video production & editing)

Based in Belgrade, working worldwide. Live focus: client acquisition (portfolio + contact funnel).

## Tech stack

- **Next.js 16** (App Router) + **React 18** + **TypeScript 5**
- **Tailwind CSS v4** (`@tailwindcss/postcss`), `tailwindcss-animate` / `tw-animate-css`
- **shadcn/ui** primitives (Radix) under `components/ui/`
- **next-themes**, **lucide-react**, **@vercel/analytics**
- **@marsidev/react-turnstile** (Cloudflare Turnstile bot protection)
- Fonts: **Inter Tight** (headings) + **Sora** (body), via `next/font/google`
- Deployed on **Vercel**

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build
npm run start    # serve production build
npm run lint     # next lint
```

> Note: `next.config.mjs` sets `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` to `true` - builds will NOT fail on lint/type errors. Run `npm run lint` and `tsc` manually to catch issues.

## Architecture

Single-page, snap-scroll site. Everything renders from [app/page.tsx](app/page.tsx):

- `<main>` is a full-height scroll container with `snap-y` scroll snapping and a subtle bounce when you hit the bottom.
- Sections render in order; all are **lazy-loaded with `next/dynamic` (`ssr: false`)** except the hero:
  1. [HomeSection](app/sections/HomeSection.tsx) - hero with looping WebM background video + `background-poster.webp` fallback
  2. [WorkSection](app/sections/WorkSection.tsx) - portfolio grid; opens work in a Radix `Dialog`
  3. [ServicesSection](app/sections/ServicesSection.tsx) - services cards (data array at top of file)
  4. [TestimonialsSection](app/sections/TestimonialsSection.tsx) - client testimonials + CTA button
  5. [AboutSection](app/sections/AboutSection.tsx) - two bios, skill lists, software icons, animated client-logo carousel, and a doodle-mustache SVG that draws over Stevan's photo on mobile when scrolled into view
  6. [FooterSection](app/sections/FooterSection.tsx) - **contact form lives here**

### Shared building blocks

- [components/navbar.tsx](components/navbar.tsx) - top nav; anchors scroll to section IDs (`#home`, `#work`, etc.)
- [components/back-to-top.tsx](components/back-to-top.tsx)
- [components/loading-wrapper.tsx](components/loading-wrapper.tsx) - `LoadingWrapper` wraps sections with a staggered `delay` for entrance animation; used throughout
- [components/video-player.tsx](components/video-player.tsx)
- [contexts/dialog-context.tsx](contexts/dialog-context.tsx) - `DialogProvider` / `useDialog`; coordinates open dialog + mobile menu state
- [lib/config/social-links.ts](lib/config/social-links.ts) - single source of truth for social URLs, email, phone
- [lib/utils.ts](lib/utils.ts) - `cn()` class-merge helper
- [hooks/use-mobile.ts](hooks/use-mobile.ts)

### Contact form

- UI in [app/sections/FooterSection.tsx](app/sections/FooterSection.tsx)
- POSTs to [app/api/contact/route.ts](app/api/contact/route.ts), which:
  1. Silently rejects if the honeypot field is filled
  2. Verifies the Cloudflare Turnstile token (if `CLOUDFLARE_TURNSTILE_SECRET_KEY` set)
  3. Forwards to **Formspree** (`https://formspree.io/f/maqdrlwe`)

### SEO / metadata

- [app/layout.tsx](app/layout.tsx) - metadata, OpenGraph, fonts, Google Analytics script
- [app/opengraph-image.tsx](app/opengraph-image.tsx), [app/sitemap.ts](app/sitemap.ts), [app/robots.ts](app/robots.ts), [app/icon.svg](app/icon.svg)

### Other routes

- [app/links/page.tsx](app/links/page.tsx) - link-in-bio page

## Embedded client sites (removed)

This repo previously contained standalone client deliverables (PeakActivity, Matija) and exposed them as hidden, password-protected routes (`/matt`, `/test-test`). Those hidden routes were removed in commit `6c7fe0a` (2026-04-25), and the source folders were removed from the repo on 2026-06-02 (backed up externally). The repo is now solely the StereoGraphic site.

## Archived: design / Nikola (2026-06-02)

The site is currently **focused on audio production only**. Nikola Mijailović's design content is archived - hidden via feature flags, not deleted, so it can be restored by flipping one constant:

- `SHOW_NIKOLA` in [app/sections/AboutSection.tsx](app/sections/AboutSection.tsx) - gates the Nikola bio block (default `false`)
- `SHOW_DESIGN` in [app/sections/WorkSection.tsx](app/sections/WorkSection.tsx) - gates the "Design Projects" tab/toggle (default `false`). With it off, Work shows only Audio Projects and the audio/design toggle is hidden. The `designProjects` array is left intact.

To bring design back, set both to `true`.

## Conventions

- Section components are named exports (`export function XSection()`), `"use client"` at top.
- Tailwind utility classes inline; brand purple accent is `#b98fc9`. Dark theme (black backgrounds, white/gray text).
- Images via `next/image`; assets under `public/` (`logos/clients/`, `icons/`, `work-thumbnails/`, `design-thumbnails/`).
- Keep social/contact details in `lib/config/social-links.ts`, not hard-coded.

## Environment variables

- `CLOUDFLARE_TURNSTILE_SECRET_KEY` - server-side Turnstile verification (contact form). Public site key is referenced in the form. `.env.local` is gitignored.

## Workflow notes

- `main` is the working/deploy branch. Pushing to the Git host triggers the Vercel deploy.
- **Commit/push only when asked.** When you do, keep messages descriptive (recent history uses imperative one-liners like "Compress hero background video…").
- Update [FEATURE_BACKLOG.md](FEATURE_BACKLOG.md) when shipping a notable change or version.
- Several large media files have been compressed over time - be mindful of asset size when adding video/images.
