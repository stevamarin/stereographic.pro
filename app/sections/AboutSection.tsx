"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { LoadingWrapper } from "@/components/loading-wrapper"
import { socialLinks } from "@/lib/config/social-links"


const clientLogos = [
  "allermi.png",
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
  "the-sukkah-store.png",
]

export function AboutSection() {
  const photoRef = useRef<HTMLDivElement>(null)
  const [mustacheVisible, setMustacheVisible] = useState(false)

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
    <section id="about" className="min-h-screen snap-start scroll-mt-[45px] bg-black overflow-y-auto pt-[31px] md:pt-[calc(4rem+15px)] pb-16">
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
                    <Image
                      src="/icons/instagram.svg"
                      alt="Instagram"
                      width={20}
                      height={20}
                      className="w-5 h-5 transition-all duration-300 brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                    <span className="text-sm font-medium font-sora">Instagram</span>
                  </Link>
                  <Link
                    href={socialLinks.stevan.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-blue-500 transition-all duration-300 group hover:scale-110"
                  >
                    <Image
                      src="/icons/linkedin.svg"
                      alt="LinkedIn"
                      width={20}
                      height={20}
                      className="w-5 h-5 transition-all duration-300 brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                    <span className="text-sm font-medium font-sora">LinkedIn</span>
                  </Link>
                </div>

                <p className="text-gray-300 leading-relaxed font-sora text-xl">
                  Unlock the power of sound and elevate your projects to new heights. I specialize in audio
                  post-production.
                </p>

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
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Pro Tools</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/stevan-icon1.svg"
                      alt="Logic Pro"
                      width={64}
                      height={64}
                      className="w-10 h-10 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Logic Pro</span>
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
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-auto [filter:brightness(0)_saturate(100%)_invert(68%)_sepia(30%)_saturate(500%)_hue-rotate(244deg)_brightness(0.75)]"
                      />
                    </div>
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Ableton</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/stevan-icon3.svg"
                      alt="iZotope RX"
                      width={64}
                      height={64}
                      className="w-10 h-10 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">iZotope RX</span>
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
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[68%] h-auto [filter:brightness(0)_saturate(100%)_invert(68%)_sepia(30%)_saturate(500%)_hue-rotate(244deg)_brightness(0.75)]"
                      />
                    </div>
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Wwise</span>
                  </div>
                </div>
              </div>
            </div>
          </LoadingWrapper>

          {/* Nikola Section */}
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
                    <Image
                      src="/icons/instagram.svg"
                      alt="Instagram"
                      width={20}
                      height={20}
                      className="w-5 h-5 transition-all duration-300 ease-in-out brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                      style={{ filter: 'brightness(0) invert(1)', transition: 'filter 300ms ease-in-out' }}
                    />
                    <span className="text-sm font-medium font-sora">Instagram</span>
                  </Link>
                  <Link
                    href={socialLinks.nikola.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-blue-500 transition-all duration-300 group hover:scale-110"
                  >
                    <Image
                      src="/icons/linkedin.svg"
                      alt="LinkedIn"
                      width={20}
                      height={20}
                      className="w-5 h-5 transition-all duration-300 ease-in-out brightness-0 invert group-hover:brightness-100 group-hover:invert-0 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                      style={{ filter: 'brightness(0) invert(1)', transition: 'filter 300ms ease-in-out' }}
                    />
                    <span className="text-sm font-medium font-sora">LinkedIn</span>
                  </Link>
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
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Photoshop</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/ai.svg"
                      alt="Illustrator"
                      width={64}
                      height={64}
                      className="w-10 h-10 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Illustrator</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/xd.svg"
                      alt="Adobe XD"
                      width={64}
                      height={64}
                      className="w-10 h-10 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Adobe XD</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/pr.svg"
                      alt="Premiere"
                      width={64}
                      height={64}
                      className="w-10 h-10 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Premiere</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/figma.svg"
                      alt="Figma"
                      width={64}
                      height={64}
                      className="w-10 h-10 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Figma</span>
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
        </div>
      </div>

      {/* Client logos carousel - full width edge to edge */}
      <div className="w-full mt-20 overflow-hidden">
        <div className="relative">
          <div className="flex items-center animate-marquee-faster">
            {clientLogos.concat(clientLogos).map((logo, index) => (
              <div key={index} className="flex-shrink-0 mr-12 sm:mr-16">
                <Image
                  src={`/logos/clients/${logo}`}
                  alt="Client logo"
                  width={200}
                  height={100}
                  loading="lazy"
                  sizes="200px"
                  className={`w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 filter brightness-200 ${logo === "Hitco_Logo.png" || logo === "logo_banini.png" ? "h-24 sm:h-32" : "h-16 sm:h-20"}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
