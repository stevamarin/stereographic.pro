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

### v1.x - Maintenance & polish (Mar-Jun 2026)

| Status | Date (Git push) | Date (Host push) | Change | Commit |
|--------|-----------------|------------------|--------|--------|
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
