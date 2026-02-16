"use client"

import Image from "next/image"
import Link from "next/link"
import { LoadingWrapper } from "@/components/loading-wrapper"
import { socialLinks } from "@/lib/config/social-links"


const clientLogos = [
  "black-street-entertainment.png",
  "carblip.png",
  "dme-video.png",
  "le-film.png",
  "onehouse.png",
  "popsocial.png",
  "rauch.webp",
  "subaru.png",
  "roundbox-black.png",
]

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen snap-start scroll-mt-[45px] bg-black overflow-y-auto pt-[calc(4rem+15px)] pb-16">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Stevan Section */}
          <LoadingWrapper delay={100}>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24 lg:mb-32">
              {/* Stevan Photo */}
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200">
                  <Image
                    src="/stevan.png"
                    alt="Stevan Marinković"
                    width={600}
                    height={750}
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Stevan Info */}
              <div className="space-y-8 lg:pt-8">
                <div>
                  <h1 className="text-3xl text-white sm:text-4xl lg:text-5xl font-semibold mb-2 font-inter-tight">
                    Stevan Marinković
                  </h1>
                  <p className="text-gray-400 text-lg font-sora">Audio Engineer</p>
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

                <p className="text-gray-300 leading-relaxed font-sora">
                  Unlock the power of sound and elevate your projects to new heights. I specialize in audio
                  post-production.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white">Audio Production</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white">Sound Design</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white">Production Sound Mixer</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white">Dialogue Editor</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white">Music Production</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Image
                    src="/icons/stevan-icon1.svg"
                    alt="Tool 1"
                    width={32}
                    height={32}
                    className="hover:scale-110 transition-transform duration-300"
                  />
                  <Image
                    src="/icons/stevan-icon2.svg"
                    alt="Tool 2"
                    width={32}
                    height={32}
                    className="hover:scale-110 transition-transform duration-300"
                  />
                  <Image
                    src="/icons/stevan-icon3.svg"
                    alt="Tool 3"
                    width={32}
                    height={32}
                    className="hover:scale-110 transition-transform duration-300"
                  />
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
                  <h2 className="text-3xl text-white sm:text-4xl lg:text-5xl font-semibold mb-2 font-inter-tight">
                    Nikola Mijailović
                  </h2>
                  <p className="text-gray-400 text-lg font-sora">Graphic Designer</p>
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

                <p className="text-gray-300 leading-relaxed font-sora">
                  Transform your ideas into intuitive digital experiences. I specialize in graphic design and UI/UX solutions.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white">Web Design</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white">Graphic Design</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white">Branding</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white">Video Production</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white">Video Editing</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <Image
                    src="/icons/ps.svg"
                    alt="Photoshop"
                    width={32}
                    height={32}
                    className="hover:scale-110 transition-transform duration-300"
                  />
                  <Image
                    src="/icons/ai.svg"
                    alt="Illustrator"
                    width={32}
                    height={32}
                    className="hover:scale-110 transition-transform duration-300"
                  />
                  <Image
                    src="/icons/xd.svg"
                    alt="Adobe XD"
                    width={32}
                    height={32}
                    className="hover:scale-110 transition-transform duration-300"
                  />
                  <Image
                    src="/icons/pr.svg"
                    alt="Premiere"
                    width={32}
                    height={32}
                    className="hover:scale-110 transition-transform duration-300"
                  />
                  <Image
                    src="/icons/figma.svg"
                    alt="Figma"
                    width={32}
                    height={32}
                    className="hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Nikola Photo - Right on desktop */}
              <div className="relative order-1 lg:order-2">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200">
                  <Image
                    src="/nikola.png"
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
            <div className="w-full mt-20 overflow-hidden">

                    {/* Infinite scroll carousel */}
                    <div className="relative">
                      <div className="flex gap-12 sm:gap-16 animate-marquee-faster">
                        {clientLogos.concat(clientLogos).concat(clientLogos).concat(clientLogos).map((logo, index) => (
                          <div key={index} className="flex-shrink-0">
                            <Image
                              src={`/logos/clients/${logo}`}
                              alt="Client logo"
                              width={200}
                              height={100}
                              loading="lazy"
                              sizes="200px"
                              className="h-16 sm:h-20 w-auto opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 filter brightness-200"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
          </LoadingWrapper>
        </div>
      </div>
    </section>
  )
}
