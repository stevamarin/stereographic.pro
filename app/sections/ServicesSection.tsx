"use client"

import { LoadingWrapper } from "@/components/loading-wrapper"

const services = [
  {
    title: "Mixing & Mastering",
    description: "Radio-ready mixes for music, podcasts, and video content. Polished, punchy, and competitively loud across all platforms.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h4l3-9 6 18 3-9h4" />
      </svg>
    ),
    tags: ["Music", "Podcasts", "Content Creators"],
  },
  {
    title: "Sound Design",
    description: "Crafting immersive sonic worlds from scratch. Custom sound effects, atmospheres, and textures that bring your visuals to life.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    tags: ["Film", "Commercials", "Games"],
  },
  {
    title: "Dialogue Editing",
    description: "Crystal-clear dialogue for film, video, and podcasts. Noise reduction, EQ, and seamless edits that keep your audience locked in.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
    tags: ["Film", "Podcasts", "YouTube"],
  },
  {
    title: "Original Score",
    description: "Bespoke music composition tailored to your project's mood and pacing. From ambient underscores to full orchestral arrangements.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <path d="M9 9l12-2" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    tags: ["Film", "Ads", "Games"],
  },
  {
    title: "Foley & SFX",
    description: "Hand-crafted foley and layered sound effects that add realism and weight to every scene. Built in our studio, not from a library.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    ),
    tags: ["Film", "Animation", "Commercials"],
  },
  {
    title: "Game Audio",
    description: "Interactive audio implementation in Wwise and Unity. Adaptive music systems, 3D spatial audio, and dynamic SFX for immersive gameplay.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 12h4" />
        <path d="M14 12h4" />
        <circle cx="8" cy="12" r="2" />
        <circle cx="16" cy="12" r="2" />
      </svg>
    ),
    tags: ["Game Studios", "Interactive Media"],
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="min-h-screen snap-start scroll-mt-[45px] bg-black py-20 md:py-28">
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
            {services.map((service, index) => (
              <LoadingWrapper key={service.title} delay={150 + index * 100}>
                <div className="group relative p-6 sm:p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-purple-500/20 transition-all duration-500">
                  {/* Icon */}
                  <div className="text-purple-400 mb-5 group-hover:scale-110 transition-transform duration-300">
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
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-sora px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-purple-500/5 to-transparent" />
                </div>
              </LoadingWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
