# StereoGraphic - Feature Backlog & Changelog

Living record of versions, features, and changes for the StereoGraphic site.
Add a new entry whenever something notable ships. Keep newest at the top.

**Legend**
- **Git push** = date pushed to the Git host (GitHub).
- **Host push** = date the change went live (Vercel deploy). Often same day; fill in if it differs.
- **Status:** ✅ Shipped · 🚧 In progress · 💡 Planned · ⏸ On hold

---

## Backlog (planned / ideas)

> Add upcoming work here. Move items down into "Released versions" once shipped.

| Status | Item | Notes |
|--------|------|-------|
| 💡 | _e.g. Refactor `AboutSection.tsx` (split carousel / mustache / bios)_ | Large file; mixes concerns |
| 💡 | _e.g. Add real Turnstile site key to production_ | Confirm env vars on Vercel |
| 💡 | _(add your ideas here)_ | |

---

## Released versions

### v1.x - Maintenance & polish (Mar-Sep 2026)

| Status | Date (Git push) | Date (Host push) | Change | Commit |
|--------|-----------------|------------------|--------|--------|
| ✅ | 2026-09-21 | _TBD_ | Privacy compliance: Google Analytics was loading in `<head>` on every page load, setting `_ga` cookies before any consent. Moved into `components/cookie-consent.tsx`, where the `<Script>` tags render only after opt-in, so gtag.js is never requested until then (prior blocking, not a banner over a running tracker). Declining clears the `_ga` cookies, and a footer "Cookie settings" control reopens the banner so consent can be withdrawn as easily as given. Verified: fresh visit 0 requests / 0 cookies, decline 0 across reload, accept loads gtag.js and sets `_ga` | `9d16fab` |
| ✅ | 2026-09-21 | _TBD_ | Added `/privacy`, describing what the site actually does and naming Google Analytics, Formspree, Cloudflare Turnstile and Vercel as processors, with retention, rights and a contact route. Linked from the footer and the contact form, and added to the sitemap. Contact form gained a short notice by the submit button | `9d16fab` |
| ✅ | 2026-09-21 | _TBD_ | Removed `@vercel/analytics`: a dependency that was never imported or rendered, so it collected nothing. Lockfile synced so `npm ci` still matches | `9d16fab` |
| ✅ | 2026-09-20 | _TBD_ | SEO: server-render the five sections below the hero. They were loaded with `next/dynamic` and `ssr: false`, so the served HTML held 144 characters of visible text (nav links and an email) and crawlers saw an empty page. Dropping `ssr: false` keeps the code-splitting and adds server rendering; visible text 144 to 6401 chars, HTML 201.9KB to 203.9KB, and LCP went 1104ms to 992ms on a production build at 4x CPU throttle, so there was no performance cost | `ecdaf23` |
| ✅ | 2026-09-20 | _TBD_ | About photo replaced with a cleaner frame of the same shot (`public/stevan-2.jpg`, new filename so returning visitors do not hold the old cached copy). Cropped 40px off the right, where the studio backdrop left a narrow light wedge above the rounded corner that read as a white line. Grayscale and a slight per-breakpoint blur applied in CSS (0.4px mobile / 0.7px desktop, plus `scale-[1.02]` so the blurred edge stays outside the rounded clip) to cover the 519px source being upscaled into a 624px frame | `46fdf0f` |
| ✅ | 2026-09-20 | _TBD_ | Archived the doodle mustache behind `SHOW_MUSTACHE`. It was hand-positioned as a percentage of the old portrait crop, and the replacement photo is square, so it no longer lands on the face. SVG paths, keyframes and the scroll trigger are all left intact; re-tune the top/left percentages before switching it back on | `46fdf0f` |
| ✅ | 2026-09-20 | _TBD_ | Contact section trimmed to the heading and the form (standfirst removed). Photo frames switched from `bg-gray-200` to `bg-black` so the lazy-load placeholder is not a pale flash on a dark page | `46fdf0f` |
| ✅ | 2026-09-20 | _TBD_ | Services redesign: cards carry the title alone, big (36px mobile / 48px desktop), bold and centred, all six locked to one size (158px / 188px). Section standfirst cut to "Complete Audio Post Production". One purple accent across every card instead of six hues, and the per-card colour wash layer dropped. Icons, tag pills and descriptions stay in the data but are switched off behind `SHOW_SERVICE_ICONS` / `SHOW_SERVICE_TAGS` / `SHOW_SERVICE_DESCRIPTIONS` | `c68b7fe` |
| ✅ | 2026-09-20 | _TBD_ | Hero: no background video on phones at all. Gating the mount (rather than hiding it with CSS, which still downloads) keeps the 285KB webm and its decode off mobile entirely; the lighten and bottom-fade overlays mount with it. Adds a bottom fade so the video stops ending in a hard horizontal line against Work | `c68b7fe` |
| ✅ | 2026-09-20 | _TBD_ | Favicon: transparent white PNG at 512px, cropped to the artwork and centred exactly, replacing the SVG and its black rounded plate. `app/icon.svg` removed so browsers cannot prefer it over the PNG | `c68b7fe` |
| ✅ | 2026-09-20 | _TBD_ | Copy: browser tab title shortened to "StereoGraphic Production" (OpenGraph and Twitter keep the descriptive version for share cards); site now speaks in the first person singular rather than "we"; Services descriptions rewritten off the repeated "X, Y, Z, delivering ..." template | `c68b7fe` |
| ✅ | 2026-09-20 | _TBD_ | Mobile menu overlay darkened from 85% to 95% so the page recedes behind it | `c68b7fe` |
| ✅ | 2026-09-20 | _TBD_ | Removed every em dash from source, comments and docs, per house style | `c68b7fe` |
| ✅ | 2026-08-03 | _TBD_ | Hero fallback + logo quality: when autoplay is refused (iOS Low Power Mode, in-app browsers) or the video fails to load, the `<video>` unmounts entirely and the hero rests on its clean static state (logo over near-black), with no play button, and it no longer starts on first tap/scroll. Poster image dropped (the white-on-transparent logo at 40% opacity already *is* that look). Logo: real 2924² intrinsic size, orientation-aware `sizes`, `quality=90` (+ `images.qualities`, which Next 16 requires), and the 0.4px blur is desktop-only, since it read as out-of-focus at mobile size | `3edbd60` |
| ✅ | 2026-08-03 | _TBD_ | Services cards: merge the two stacked `backdrop-blur-3xl` layers into one masked layer at 24px (12 live-blur surfaces → 6). Same frosted look; scrolling the section at 6× CPU throttle goes 8.0 → 24.8 fps, p95 frame time 200 → 67ms | `b7ee5b6` |
| ✅ | 2026-07-28 | _TBD_ | Performance round: pause hero video + marquee rAF loops off-screen; CSS-driven hero logo entrance (mobile LCP 4.9s→1.1s); defer Turnstile (~340KB) until footer nears view; GA → lazyOnload; responsive `sizes` on hero logo; 30-day cache headers for static media; drop unsupported `eslint` key from next.config | `56ae465` |
| ✅ | 2026-07-28 | _TBD_ | Fixes: clip hero video bleed (black bar between hero and Work); navbar active-section tracking now works with lazy-mounted sections; back-to-top button fixed (listened to window, not `<main>`) and desktop-only; springier bottom-bounce curve with `animationend`-driven cleanup (no end-of-bounce snap) | `c771929` `fa48642` |
| ✅ | 2026-06-03 | _TBD_ | Services cards: looping video backgrounds (compressed webm + mp4 fallback + webp posters, lazy-loaded via IntersectionObserver so they only play on screen) behind an edge-morphing frosted-glass mask with per-accent color tint + dark overlay; seamless loops (ping-pong for most cards, forward-only crossfade for card 4). Also standardize service tags (Ads→Commercials, Dialogue YouTube→Ai), remove the large background sign icons, and trim the generic line from Stevan's bio | `cd15c14` |
| ✅ | 2026-06-02 | _TBD_ | Redesign Services cards (new copy, per-accent colors, large background icons, frosted glass); remove `snap-start` for free scrolling + soften bottom bounce (0.5s); pause testimonial + client-logo carousels on trackpad/wheel scroll | `7a714a3` |
| ✅ | 2026-06-02 | _TBD_ | Archive Nikola Mijailović (design) - hide About bio + Work "Design Projects" tab via `SHOW_NIKOLA`/`SHOW_DESIGN` flags; site now focused on audio production. Code preserved for easy re-enable | `7a714a3` |
| ✅ | 2026-06-02 | _TBD_ | Remove embedded client site folders (PeakActivity, Matija, Matija v2) from repo; backed up externally | `7a714a3` |
| ✅ | 2026-04-25 | _TBD_ | Remove `/matt` and `/test-test` hidden routes | `6c7fe0a` |
| ✅ | 2026-04-25 | _TBD_ | Switch landing background from MP4 → WebM with poster fallback | `1bd03ba` |
| ✅ | 2026-03-24 | _TBD_ | Update Noah Elkrief testimonial wording | `d6a22b3` |
| ✅ | 2026-03-24 | _TBD_ | Update PeakActivity embedded site to latest | `7448b4d` |
| ✅ | 2026-03-20 | _TBD_ | Replace Matija embedded site with v2 | `1c51631` |
| ✅ | 2026-03-16 | _TBD_ | Add Matija hidden page at `/matt` (password protected) | `08a5b44` |
| ✅ | 2026-03-09 | _TBD_ | Update hidden-page password | `f1b77ea` |
| ✅ | 2026-03-09 | _TBD_ | Fix redirect loop on password submit (serve HTML directly) | `a15231d` |
| ✅ | 2026-03-09 | _TBD_ | Add PeakActivity hidden page at `/test-test` (password + mobile view) | `0781fe4` |

### v1.0 - Client acquisition launch (Mar 2026)

The push to turn the portfolio into a lead-generating site.

| Status | Date (Git push) | Date (Host push) | Change | Commit |
|--------|-----------------|------------------|--------|--------|
| ✅ | 2026-03-04 | _TBD_ | Compress client logos; resize SnapMix/StepMobile/Subaru in carousel | `184cbd1` |
| ✅ | 2026-03-04 | _TBD_ | Compress Swae Lee thumbnail (648KB → 300KB) | `742d2cf` |
| ✅ | 2026-03-04 | _TBD_ | Compress hero background video (6.4MB → 544KB) | `8686f04` |
| ✅ | 2026-03-04 | _TBD_ | Replace phone number with WhatsApp icon; LinkedIn hover blue | `10a1307` |
| ✅ | 2026-03-04 | _TBD_ | Add CTA button below testimonials section | `5eda221` |
| ✅ | 2026-03-04 | _TBD_ | Add Google Analytics tracking | `5e6e758` |
| ✅ | 2026-03-04 | _TBD_ | Add Open Graph image for social sharing | `44c199c` |
| ✅ | 2026-03-04 | _TBD_ | Fix contact form submission + add error feedback | `faa08dd` |
| ✅ | 2026-03-04 | _TBD_ | Connect contact form to Formspree | `67c2099` |
| ✅ | 2026-03-04 | _TBD_ | Client acquisition upgrades: contact form, services, testimonials, SEO, link-in-bio | `7bea632` |

### v0.x - Initial build (Feb 2026)

Foundation: single-page Next.js site, sections, branding, profile photos. (Early history is a series of `update` commits.)

| Status | Date (Git push) | Host push | Change | Commit |
|--------|-----------------|-----------|--------|--------|
| ✅ | 2026-02-17 | _TBD_ | Switch profile photos from PNG → JPG | `a63b01c` |
| ✅ | 2026-02-12 | _TBD_ | Fresh clean commit without large files | `398da27` |
| ✅ | 2026-02-12-03-02 | _TBD_ | Initial site build, sections, styling (iterative `update` commits) | various |

---

## How to add a new entry

1. Pick or create the right version section (bump version for a meaningful milestone).
2. Add a row with **Status**, **Git push date**, **Host push date**, a one-line **Change**, and the **commit hash** (`git rev-parse --short HEAD`).
3. For larger features, add a short prose note under the table describing the "why."
4. Move any completed backlog items out of the Backlog table.
