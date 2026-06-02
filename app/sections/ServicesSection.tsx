"use client"

import { LoadingWrapper } from "@/components/loading-wrapper"

const services = [
  {
    title: "Mixing & Mastering",
    description: "EQ, compression, level balancing, and loudness mastering to spec, delivering mixes that translate cleanly across all platforms.",
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
  },
  {
    title: "Sound Design",
    description: "Custom effects, ambiences, textures, and sound design built to picture, delivering soundscapes that are detailed, believable, and made for each scene.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" />
      </svg>
    ),
    tags: ["Film", "Commercials", "Games"],
    accent: "sky",
  },
  {
    title: "Dialogue Editing",
    description: "Noise reduction, de-noising, de-essing, and level balancing across every line, delivering dialogue that's clean, consistent, and easy to understand.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="11" rx="3" />
        <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="8" y1="22" x2="16" y2="22" />
      </svg>
    ),
    tags: ["Film", "Podcasts", "YouTube"],
    accent: "amber",
  },
  {
    title: "Original Score",
    description: "Composition, arrangement, orchestration, and production scored to your cut, delivering original music that fits the mood, pacing, and tone of every scene.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <path d="M9 9l12-2" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    tags: ["Film", "Ads", "Games"],
    accent: "rose",
  },
  {
    title: "Foley & SFX",
    description: "Footsteps, cloth, props, and impacts performed and recorded to picture, delivering foley that gives every scene depth, weight, and realism.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
      </svg>
    ),
    tags: ["Film", "Animation", "Commercials"],
    accent: "emerald",
  },
  {
    title: "Game Audio",
    description: "Wwise and Unity implementation, adaptive music, spatial audio, and dynamic SFX, delivering interactive sound that responds to every player action.",
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
    accent: "pink",
  },
]

// Full class strings per accent (Tailwind needs literal names to compile them).
const accents: Record<string, { icon: string; border: string; tag: string; glow: string }> = {
  purple: {
    icon: "text-purple-400",
    border: "hover:border-purple-500/30",
    tag: "bg-purple-500/10 text-purple-300 border-purple-500/10",
    glow: "from-purple-500/10",
  },
  sky: {
    icon: "text-sky-400",
    border: "hover:border-sky-500/30",
    tag: "bg-sky-500/10 text-sky-300 border-sky-500/10",
    glow: "from-sky-500/10",
  },
  emerald: {
    icon: "text-emerald-400",
    border: "hover:border-emerald-500/30",
    tag: "bg-emerald-500/10 text-emerald-300 border-emerald-500/10",
    glow: "from-emerald-500/10",
  },
  amber: {
    icon: "text-amber-400",
    border: "hover:border-amber-500/30",
    tag: "bg-amber-500/10 text-amber-300 border-amber-500/10",
    glow: "from-amber-500/10",
  },
  rose: {
    icon: "text-rose-400",
    border: "hover:border-rose-500/30",
    tag: "bg-rose-500/10 text-rose-300 border-rose-500/10",
    glow: "from-rose-500/10",
  },
  pink: {
    icon: "text-pink-400",
    border: "hover:border-pink-500/30",
    tag: "bg-pink-500/10 text-pink-300 border-pink-500/10",
    glow: "from-pink-500/10",
  },
}

export function ServicesSection() {
  return (
    <section id="services" className="min-h-screen scroll-mt-[45px] bg-black py-20 md:py-28">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24">
        <div className="max-w-[1800px] mx-auto">
          <LoadingWrapper delay={100}>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white font-inter-tight mb-4">
                What We Do
              </h2>
              <p className="text-gray-400 font-sora text-lg sm:text-xl max-w-2xl mx-auto">
                Full-service audio post-production for content creators, filmmakers, and game studios.
              </p>
            </div>
          </LoadingWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const accent = accents[service.accent] ?? accents.purple
              return (
              <LoadingWrapper key={service.title} delay={150 + index * 100} className="h-full">
                <div className={`group relative h-full overflow-hidden p-6 sm:p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] ${accent.border} transition-all duration-500`}>
                  {/* Huge sign behind the card - static, no hover transform */}
                  <div className={`pointer-events-none absolute -bottom-12 -right-10 ${accent.icon} opacity-40 [&_svg]:w-56 [&_svg]:h-56`}>
                    {service.icon}
                  </div>

                  {/* Tinted frosted glass over the sign */}
                  <div className={`pointer-events-none absolute inset-0 backdrop-blur-xl bg-gradient-to-br ${accent.glow} to-transparent`} />

                  {/* Content */}
                  <div className="relative z-10 flex h-full flex-col">
                    {/* Icon (foreground) */}
                    <div className={`${accent.icon} mb-5 w-fit origin-left group-hover:scale-150 transition-transform duration-300`}>
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-semibold text-white font-inter-tight mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 font-sora text-sm sm:text-base leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs font-sora px-3 py-1 rounded-full border ${accent.tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
