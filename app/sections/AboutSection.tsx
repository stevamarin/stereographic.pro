"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { LoadingWrapper } from "@/components/loading-wrapper"
import { socialLinks } from "@/lib/config/social-links"
import { useDragMarquee } from "@/hooks/use-drag-marquee"

// Archived 2026-06-02: Nikola Mijailović (design) hidden to keep the site focused
// on audio production. Set to true to bring his About section back.
const SHOW_NIKOLA = false

const clientLogos = [
  "allermi_logo.png",
  "ASICS.png",
  "Vogue_Adria_logo.png",
  "yoveo.png",
  "carblip-2.png",
  "dme-video.png",
  "Hitco_Logo.png",
  "JuliaElihuPink.png",
  "krizia-vega.png",
  "le-film.png",
  "logo_banini.png",
  "onehouse.png",
  "popsocial.png",
  "rauch.png",
  "roundbox-white.png",
  "SnapMixDigital.png",
  "StepMobile.png",
  "subaru.png",
  "swisscom.png",
  "the-sukkah-store.png",
]

// Per-logo display height in the carousel (default applies when not listed).
// Full literal class strings so Tailwind compiles them.
const logoHeights: Record<string, string> = {
  "ASICS.png": "h-24 sm:h-28",
  "logo_banini.png": "h-28 sm:h-36",
  "Hitco_Logo.png": "h-24 sm:h-32",
  "subaru.png": "h-24 sm:h-28",
  "Vogue_Adria_logo.png": "h-24 sm:h-28",
  "SnapMixDigital.png": "h-20 sm:h-24",
  "StepMobile.png": "h-20 sm:h-24",
  "roundbox-white.png": "h-12 sm:h-16",
}
const DEFAULT_LOGO_HEIGHT = "h-16 sm:h-20"

// Bright/glossy logos that would blow out under the global 200% boost.
const logoBrightness: Record<string, string> = {
  "subaru.png": "brightness-125",
  "the-sukkah-store.png": "brightness-125",
}
const DEFAULT_LOGO_BRIGHTNESS = "brightness-200"

export function AboutSection() {
  const photoRef = useRef<HTMLDivElement>(null)
  const [mustacheVisible, setMustacheVisible] = useState(false)

  // Client logo carousel: smooth transform-based marquee (auto-scroll stays
  // buttery on iOS, unlike scrollLeft) that's also draggable/swipeable.
  const logoMarqueeRef = useDragMarquee(24)

  useEffect(() => {
    const isMobile = window.matchMedia("(hover: none) or (pointer: coarse)").matches
    if (!isMobile || !photoRef.current) return

    let timer: ReturnType<typeof setTimeout> | null = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setMustacheVisible(true), 1000)
        } else {
          if (timer) clearTimeout(timer)
          setMustacheVisible(false)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(photoRef.current)
    return () => {
      observer.disconnect()
      if (timer) clearTimeout(timer)
    }
  }, [])

  return (
    <section id="about" className="min-h-screen scroll-mt-[45px] bg-black overflow-y-auto pt-[31px] md:pt-[calc(4rem+15px)] pb-16">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24">
        <div className="max-w-[1800px] mx-auto">
          {/* Stevan Section */}
          <LoadingWrapper delay={100}>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24 lg:mb-32">
              {/* Stevan Photo */}
              <div ref={photoRef} className={`relative group/photo${mustacheVisible ? ' mustache-active' : ''}`}>
                <div className="aspect-square overflow-hidden rounded-2xl bg-gray-200 relative">
                  <Image
                    src="/stevan.jpg"
                    alt="Stevan Marinković"
                    width={600}
                    height={750}
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-full object-cover relative z-0"
                  />
                  {/* Doodle mustache overlay */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{ overflow: 'visible' }}
                  >
                    <svg
                      viewBox="290 422 140 88"
                      className="absolute"
                      style={{
                        top: '53.3%',
                        left: '51.5%',
                        width: '28%',
                        transform: 'translate(-50%, -50%) rotate(4deg)',
                      }}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Left mustache curl */}
                      <path
                        d="M364.53,441.774c-1.98,1.942-4.321,3.514-6.868,4.612,1.043-1.925,2.613-9.07,2.613-9.07-4.587,4.022-10.52,6.482-16.608,6.886,3.307-2.001,6.332-4.467,8.959-7.301-1.536-.035-2.973.701-4.316,1.446-6.816,3.779-13.314,8.336-20.758,10.647s-16.342,1.928-22.06-3.368c-2.002-1.854-3.56-4.388-3.55-7.116.014-3.637,2.777-6.732,5.891-8.611,3.783-2.282,8.905-3.193,12.49-.611"
                        stroke="#000"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mustache-draw-left"
                      />
                      {/* Right mustache curl */}
                      <path
                        d="M370.2,441.774c1.512,1.942,3.3,3.514,5.244,4.612-.796-1.925-1.995-9.07-1.995-9.07,3.503,4.022,8.033,6.482,12.681,6.886-2.525-2.001-4.835-4.467-6.841-7.301,1.173-.035,2.27.701,3.296,1.446,5.205,3.779,10.167,8.336,15.851,10.647s12.478,1.928,16.845-3.368c1.529-1.854,2.718-4.388,2.711-7.116-.011-3.637-2.121-6.732-4.498-8.611-2.889-2.282-6.8-3.193-9.537-.611"
                        stroke="#000"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mustache-draw-right"
                      />
                      {/* Bottom goatee detail */}
                      <path
                        d="M358.042,489.811c-2.164,2.889-3.75,6.208-4.638,9.707,3.325-3.286,6.649-6.571,9.974-9.857.26,2.307.52,4.614.78,6.921,1.429-1.928,2.858-3.856,4.287-5.784.663,2.173,1.325,4.346,1.988,6.518,2.193-1.54,3.879-3.79,4.74-6.328,1.648,2.505,3.296,5.01,4.945,7.515"
                        stroke="#000"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mustache-draw-detail-left"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Stevan Info */}
              <div className="space-y-8 lg:pt-8">
                <div>
                  <h1 className="text-5xl text-white sm:text-6xl lg:text-7xl font-semibold mb-4 font-inter-tight">
                    Stevan Marinković
                  </h1>
                  <p className="text-gray-400 text-2xl font-sora">Audio Engineer</p>
                </div>

                <div className="flex items-center gap-6">
                  <Link
                    href={socialLinks.stevan.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-pink-500 transition-all duration-300 group hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-all duration-300">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span className="text-sm font-medium font-sora">Instagram</span>
                  </Link>
                  <Link
                    href={socialLinks.stevan.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-blue-500 transition-all duration-300 group hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-all duration-300">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <span className="text-sm font-medium font-sora">LinkedIn</span>
                  </Link>
                  <a
                    href="mailto:stevan@stereographic.pro"
                    className="flex items-center gap-2 text-white hover:text-purple-400 transition-all duration-300 group hover:scale-110"
                  >
                    <svg viewBox="0 0 1024 1024" fill="currentColor" className="w-6 h-6 transition-all duration-300">
                      <path d="M874.666667 375.189333V746.666667a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V375.189333l64 54.250667V746.666667h597.333334V429.44l64-54.250667zM810.666667 213.333333a64.789333 64.789333 0 0 1 22.826666 4.181334 63.616 63.616 0 0 1 26.794667 19.413333 64.32 64.32 0 0 1 9.344 15.466667c2.773333 6.570667 4.48 13.696 4.906667 21.184L874.666667 277.333333v21.333334L553.536 572.586667a64 64 0 0 1-79.893333 2.538666l-3.178667-2.56L149.333333 298.666667v-21.333334a63.786667 63.786667 0 0 1 35.136-57.130666A63.872 63.872 0 0 1 213.333333 213.333333h597.333334z m-9.6 64h-578.133334L512 523.882667 801.066667 277.333333z" />
                    </svg>
                    <span className="text-sm font-medium font-sora">Email</span>
                  </a>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white text-2xl">Sound Design</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white text-2xl">Foley and SFX</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white text-2xl">Original Score Production</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white text-2xl">Dialogue Editing</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white text-2xl">Mixing and Mastering</span>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-5 pt-12">
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/stevan-icon2.svg"
                      alt="Pro Tools"
                      width={64}
                      height={64}
                      className="w-10 h-10 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-[#b98fc9] text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Pro Tools</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/stevan-icon1.svg"
                      alt="Logic Pro"
                      width={64}
                      height={64}
                      className="w-10 h-10 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-[#b98fc9] text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Logic Pro</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <div className="group-hover:scale-110 transition-transform duration-300 relative w-10 h-10 sm:w-16 sm:h-16">
                      <svg viewBox="0 0 49 49" className="absolute inset-0 w-full h-full">
                        <g transform="translate(1.012 1.177)">
                          <path d="M4.962.662a4.3,4.3,0,0,0-4.3,4.3V41.683a4.3,4.3,0,0,0,4.3,4.3H42.014a4.3,4.3,0,0,0,4.3-4.3V4.962a4.3,4.3,0,0,0-4.3-4.3H4.962m0-.662H42.014a4.962,4.962,0,0,1,4.962,4.962V41.683a4.962,4.962,0,0,1-4.962,4.962H4.962A4.962,4.962,0,0,1,0,41.683V4.962A4.962,4.962,0,0,1,4.962,0Z" fill="#b98fc9"/>
                        </g>
                      </svg>
                      <Image
                        src="/icons/ableton.png"
                        alt="Ableton"
                        width={44}
                        height={44}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-auto [filter:brightness(0)_saturate(100%)_invert(68%)_sepia(30%)_saturate(280%)_hue-rotate(244deg)_brightness(0.9)]"
                      />
                    </div>
                    <span className="text-[#b98fc9] text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Ableton</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/stevan-icon3.svg"
                      alt="iZotope RX"
                      width={64}
                      height={64}
                      className="w-10 h-10 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-[#b98fc9] text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">iZotope RX</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <div className="group-hover:scale-110 transition-transform duration-300 relative w-10 h-10 sm:w-16 sm:h-16">
                      <svg viewBox="0 0 49 49" className="absolute inset-0 w-full h-full">
                        <g transform="translate(1.012 1.177)">
                          <path d="M4.962.662a4.3,4.3,0,0,0-4.3,4.3V41.683a4.3,4.3,0,0,0,4.3,4.3H42.014a4.3,4.3,0,0,0,4.3-4.3V4.962a4.3,4.3,0,0,0-4.3-4.3H4.962m0-.662H42.014a4.962,4.962,0,0,1,4.962,4.962V41.683a4.962,4.962,0,0,1-4.962,4.962H4.962A4.962,4.962,0,0,1,0,41.683V4.962A4.962,4.962,0,0,1,4.962,0Z" fill="#b98fc9"/>
                        </g>
                      </svg>
                      <Image
                        src="/icons/wwise.png"
                        alt="Wwise"
                        width={34}
                        height={34}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[68%] h-auto [filter:brightness(0)_saturate(100%)_invert(68%)_sepia(30%)_saturate(280%)_hue-rotate(244deg)_brightness(0.9)]"
                      />
                    </div>
                    <span className="text-[#b98fc9] text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Wwise</span>
                  </div>
                </div>
              </div>
            </div>
          </LoadingWrapper>

          {/* Nikola Section - archived 2026-06-02 (see SHOW_NIKOLA flag at top of file) */}
          {SHOW_NIKOLA && (
          <LoadingWrapper delay={300}>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Nikola Info - Left on desktop */}
              <div className="space-y-8 lg:pt-8 order-2 lg:order-1">
                <div>
                  <h2 className="text-5xl text-white sm:text-6xl lg:text-7xl font-semibold mb-4 font-inter-tight">
                    Nikola Mijailović
                  </h2>
                  <p className="text-gray-400 text-2xl font-sora">Graphic Designer</p>
                </div>

                <div className="flex items-center gap-6">
                  <Link
                    href={socialLinks.nikola.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-pink-500 transition-all duration-300 group hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-all duration-300">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    <span className="text-sm font-medium font-sora">Instagram</span>
                  </Link>
                  <Link
                    href={socialLinks.nikola.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-blue-500 transition-all duration-300 group hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-all duration-300">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <span className="text-sm font-medium font-sora">LinkedIn</span>
                  </Link>
                  <a
                    href="mailto:nikolamijailovic18@gmail.com"
                    className="flex items-center gap-2 text-white hover:text-purple-400 transition-all duration-300 group hover:scale-110"
                  >
                    <svg viewBox="0 0 1024 1024" fill="currentColor" className="w-6 h-6 transition-all duration-300">
                      <path d="M874.666667 375.189333V746.666667a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V375.189333l64 54.250667V746.666667h597.333334V429.44l64-54.250667zM810.666667 213.333333a64.789333 64.789333 0 0 1 22.826666 4.181334 63.616 63.616 0 0 1 26.794667 19.413333 64.32 64.32 0 0 1 9.344 15.466667c2.773333 6.570667 4.48 13.696 4.906667 21.184L874.666667 277.333333v21.333334L553.536 572.586667a64 64 0 0 1-79.893333 2.538666l-3.178667-2.56L149.333333 298.666667v-21.333334a63.786667 63.786667 0 0 1 35.136-57.130666A63.872 63.872 0 0 1 213.333333 213.333333h597.333334z m-9.6 64h-578.133334L512 523.882667 801.066667 277.333333z" />
                    </svg>
                    <span className="text-sm font-medium font-sora">Email</span>
                  </a>
                </div>

                <p className="text-gray-300 leading-relaxed font-sora text-xl">
                  Transform your ideas into intuitive digital experiences. I specialize in graphic design and UI/UX solutions.
                </p>

                <div className="space-y-5">
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white text-2xl">Web Design</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white text-2xl">Graphic Design</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white text-2xl">Branding</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white text-2xl">Video Production</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white text-2xl">Video Editing</span>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-5 pt-12">
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/ps.svg"
                      alt="Photoshop"
                      width={64}
                      height={64}
                      className="w-10 h-10 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-[#b98fc9] text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Photoshop</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/ai.svg"
                      alt="Illustrator"
                      width={64}
                      height={64}
                      className="w-10 h-10 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-[#b98fc9] text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Illustrator</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/xd.svg"
                      alt="Adobe XD"
                      width={64}
                      height={64}
                      className="w-10 h-10 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-[#b98fc9] text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Adobe XD</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/pr.svg"
                      alt="Premiere"
                      width={64}
                      height={64}
                      className="w-10 h-10 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-[#b98fc9] text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Premiere</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/figma.svg"
                      alt="Figma"
                      width={64}
                      height={64}
                      className="w-10 h-10 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-[#b98fc9] text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Figma</span>
                  </div>
                </div>
              </div>

              {/* Nikola Photo - Right on desktop */}
              <div className="relative order-1 lg:order-2">
                <div className="aspect-square overflow-hidden rounded-2xl bg-gray-200">
                  <Image
                    src="/nikola.jpg"
                    alt="Nikola Mijailović"
                    width={600}
                    height={750}
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </LoadingWrapper>
          )}
        </div>
      </div>

      {/* Client logos carousel - full width edge to edge */}
      <div className="w-full mt-20 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        <div
          ref={logoMarqueeRef}
          className="flex items-center w-max touch-pan-y cursor-grab active:cursor-grabbing"
          style={{ willChange: "transform" }}
        >
          {clientLogos.concat(clientLogos).map((logo, index) => (
            <div key={index} className="flex-shrink-0 mr-12 sm:mr-16">
              <Image
                src={`/logos/clients/${logo}`}
                alt="Client logo"
                width={200}
                height={100}
                loading="lazy"
                sizes="200px"
                className={`w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 filter ${logoBrightness[logo] ?? DEFAULT_LOGO_BRIGHTNESS} ${logoHeights[logo] ?? DEFAULT_LOGO_HEIGHT}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
