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
      <div className="px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24">
        <div className="max-w-[1800px] mx-auto">
          {/* Stevan Section */}
          <LoadingWrapper delay={100}>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24 lg:mb-32">
              {/* Stevan Photo */}
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-2xl bg-gray-200">
                  <Image
                    src="/stevan.jpg"
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
                    <span className="font-sora text-white text-2xl">Audio Production</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white text-2xl">Sound Design</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white text-2xl">Production Sound Mixer</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white text-2xl">Dialogue Editor</span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-2 h-2 rounded-full bg-white transition-all duration-300 group-hover:bg-purple-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(185,143,201,0.6)]"></div>
                    <span className="font-sora text-white text-2xl">Music Production</span>
                  </div>
                </div>

                <div className="flex items-center gap-5 pt-12">
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/stevan-icon1.svg"
                      alt="Logic Pro"
                      width={64}
                      height={64}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Logic Pro</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/stevan-icon2.svg"
                      alt="Pro Tools"
                      width={64}
                      height={64}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Pro Tools</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/stevan-icon3.svg"
                      alt="iZotope RX"
                      width={64}
                      height={64}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">iZotope RX</span>
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

                <div className="flex items-center gap-5 pt-12">
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/ps.svg"
                      alt="Photoshop"
                      width={64}
                      height={64}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Photoshop</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/ai.svg"
                      alt="Illustrator"
                      width={64}
                      height={64}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Illustrator</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/xd.svg"
                      alt="Adobe XD"
                      width={64}
                      height={64}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Adobe XD</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/pr.svg"
                      alt="Premiere"
                      width={64}
                      height={64}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-purple-400 text-xs font-sora mt-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">Premiere</span>
                  </div>
                  <div className="group flex flex-col items-center">
                    <Image
                      src="/icons/figma.svg"
                      alt="Figma"
                      width={64}
                      height={64}
                      className="group-hover:scale-110 transition-transform duration-300"
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
    </section>
  )
}
