"use client"

import { useEffect, useRef } from "react"
import { LoadingWrapper } from "@/components/loading-wrapper"

const services = [
  {
    title: "Mixing & Mastering",
    description: "Balanced, EQ'd, and mastered to your delivery spec, so it holds up on a phone speaker and in a treated room.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="2" y1="14" x2="6" y2="14" />
        <line x1="10" y1="8" x2="14" y2="8" />
        <line x1="18" y1="16" x2="22" y2="16" />
      </svg>
    ),
    tags: ["Film", "Digital", "Gaming", "Music"],
    accent: "purple",
    video: "1",
  },
  {
    title: "Sound Design",
    description: "Effects, ambiences, and textures built to picture rather than dropped on top of it.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" />
      </svg>
    ),
    tags: ["Film", "Commercials", "Games"],
    accent: "purple",
    video: "2",
  },
  {
    title: "Dialogue Editing",
    description: "Salvage work, mostly. iZotope RX on the location noise you couldn't avoid, de-essing, then levels matched line to line.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="11" rx="3" />
        <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="8" y1="22" x2="16" y2="22" />
      </svg>
    ),
    tags: ["Film", "Commercials", "Podcasts", "Ai"],
    accent: "purple",
    video: "3",
  },
  {
    title: "Original Score",
    description: "Composed to your cut, not licensed and stretched to fit it. Theme, arrangement, orchestration, final mix.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <path d="M9 9l12-2" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    tags: ["Film", "Commercials", "Games"],
    accent: "purple",
    video: "4",
  },
  {
    title: "Foley & SFX",
    description: "Performed and recorded in sync: footsteps, cloth, props, impacts. The layer nobody notices until it's missing.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
      </svg>
    ),
    tags: ["Film", "Animation", "Commercials"],
    accent: "purple",
    video: "5",
  },
  {
    title: "Game Audio",
    description: "Wwise and Unity implementation, adaptive music, spatial audio. Sound that responds to the player instead of looping at them.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2Z" />
        <path d="M6 15v-2" />
        <path d="M12 15V9" />
        <circle cx="12" cy="6" r="3" />
        <path d="M18 15v-2" />
      </svg>
    ),
    tags: ["Game Studios", "Interactive Media"],
    accent: "purple",
    video: "6",
  },
]

// Hidden 2026-09-20: the per-service icons are kept in the `services` array
// above (and still compile) but are not rendered on the cards. Set to true to
// bring them back.
const SHOW_SERVICE_ICONS = false

// Hidden 2026-09-20: the `tags` arrays stay on each service above, but the
// pills are not rendered: they were generic ("Film", "Digital", "Gaming")
// and told a client nothing the description doesn't. Set to true to restore.
const SHOW_SERVICE_TAGS = false

// Hidden 2026-09-20: the cards now carry their title alone. The copy stays
// on each service above so it can be reused (or switched back on) later.
const SHOW_SERVICE_DESCRIPTIONS = false

// Full class strings per accent (Tailwind needs literal names to compile them).
// 2026-09-20: every card now uses `purple` (the brand accent, #b98fc9). The
// other five entries are kept so a card can be re-tinted by changing its
// `accent` field. A different hue per card read as decoration, not brand.
// `glow` is currently unrendered: the per-card colored wash was the rainbow's
// other half, and dropping it also lets the video underneath actually show.
const accents: Record<string, { icon: string; border: string; tag: string; glow: string }> = {
  purple: {
    icon: "text-purple-300",
    border: "border-purple-500/15 hover:border-purple-400/40",
    tag: "bg-purple-500/15 text-purple-200 border-purple-500/15",
    glow: "from-purple-500/25 via-purple-500/5",
  },
  sky: {
    icon: "text-sky-300",
    border: "border-sky-500/15 hover:border-sky-400/40",
    tag: "bg-sky-500/15 text-sky-200 border-sky-500/15",
    glow: "from-sky-500/25 via-sky-500/5",
  },
  emerald: {
    icon: "text-emerald-300",
    border: "border-emerald-500/15 hover:border-emerald-400/40",
    tag: "bg-emerald-500/15 text-emerald-200 border-emerald-500/15",
    glow: "from-emerald-500/25 via-emerald-500/5",
  },
  amber: {
    icon: "text-amber-300",
    border: "border-amber-500/15 hover:border-amber-400/40",
    tag: "bg-amber-500/15 text-amber-200 border-amber-500/15",
    glow: "from-amber-500/25 via-amber-500/5",
  },
  rose: {
    icon: "text-rose-300",
    border: "border-rose-500/15 hover:border-rose-400/40",
    tag: "bg-rose-500/15 text-rose-200 border-rose-500/15",
    glow: "from-rose-500/25 via-rose-500/5",
  },
  pink: {
    icon: "text-pink-300",
    border: "border-pink-500/15 hover:border-pink-400/40",
    tag: "bg-pink-500/15 text-pink-200 border-pink-500/15",
    glow: "from-pink-500/25 via-pink-500/5",
  },
}

export function ServicesSection() {
  // Only play the card videos while the section is on screen. Avoids 6 videos
  // decoding (and their backdrop-blur layers compositing) when scrolled away.
  const gridRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const videos = Array.from(grid.querySelectorAll("video"))
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videos.forEach((v) => v.play().catch(() => {}))
        } else {
          videos.forEach((v) => v.pause())
        }
      },
      { threshold: 0.1 },
    )
    io.observe(grid)
    return () => io.disconnect()
  }, [])

  return (
    <section id="services" className="min-h-screen scroll-mt-[45px] bg-black py-20 md:py-28">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24">
        <div className="max-w-[1800px] mx-auto">
          <LoadingWrapper delay={100}>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white font-inter-tight mb-4">
                What I Do
              </h2>
              <p className="text-gray-400 font-sora text-lg sm:text-xl max-w-2xl mx-auto">
                Complete Audio Post Production
              </p>
            </div>
          </LoadingWrapper>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const accent = accents[service.accent] ?? accents.purple
              return (
              <LoadingWrapper key={service.title} delay={150 + index * 50} className="h-full">
                <div className={`group relative h-full min-h-[158px] md:min-h-[188px] overflow-hidden p-6 sm:p-8 rounded-2xl border bg-white/[0.02] ${accent.border} transition-colors duration-200`}>
                  {/* Looping ping-pong video behind the glass (forward+reverse baked in) */}
                  <video
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50 scale-105 blur-sm"
                    loop
                    muted
                    playsInline
                    preload="none"
                    poster={`/services/${service.video}.webp`}
                    aria-hidden="true"
                  >
                    <source src={`/services/${service.video}.webm`} type="video/webm" />
                    <source src={`/services/${service.video}.mp4`} type="video/mp4" />
                  </video>

                  {/* Frosted glass: ONE masked backdrop-blur layer covering all four
                      edges (two mask gradients union by default), clear through the
                      middle band so the video detail shows there. Previously this was
                      two stacked backdrop-blur-3xl layers (12 large live-blur
                      surfaces across the grid), which dominated scroll jank in this
                      section. One layer at 24px reads the same over the dark overlay. */}
                  <div
                    className="pointer-events-none absolute inset-0 backdrop-blur-xl"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to bottom, black 0%, transparent 8%, transparent 62%, black 90%, black 100%), linear-gradient(to right, black 0%, transparent 8%, transparent 92%, black 100%)",
                      maskImage:
                        "linear-gradient(to bottom, black 0%, transparent 8%, transparent 62%, black 90%, black 100%), linear-gradient(to right, black 0%, transparent 8%, transparent 92%, black 100%)",
                    }}
                  />

                  {/* Flat dark overlay: keeps text readable without a visible gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-black/60" />

                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                    {/* Icon (foreground) - hidden while SHOW_SERVICE_ICONS is off */}
                    {SHOW_SERVICE_ICONS && (
                      <div className={`${accent.icon} mb-5 w-fit origin-left group-hover:scale-150 transition-transform duration-300`}>
                        {service.icon}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-4xl sm:text-5xl font-bold leading-[1.05] text-balance text-white font-inter-tight">
                      {service.title}
                    </h3>

                    {/* Description - hidden while SHOW_SERVICE_DESCRIPTIONS is off */}
                    {SHOW_SERVICE_DESCRIPTIONS && (
                      <p className="mt-3 text-gray-400 font-sora text-sm sm:text-base leading-relaxed">
                        {service.description}
                      </p>
                    )}

                    {/* Tags - hidden while SHOW_SERVICE_TAGS is off */}
                    {SHOW_SERVICE_TAGS && (
                      <div className="flex flex-wrap gap-2 mt-auto pt-5">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs font-sora px-3 py-1 rounded-full border ${accent.tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </LoadingWrapper>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
