"use client"

import Image from "next/image"
import Link from "next/link"
import { LoadingWrapper } from "@/components/loading-wrapper"
import { socialLinks } from "@/lib/config/social-links"

export function FooterSection() {
  return (
    <section id="contact" className="h-[calc(100vh-45px)] snap-start scroll-mt-[45px] bg-black relative overflow-hidden">
      {/* Main content - centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center text-center px-6 gap-1">
          <LoadingWrapper delay={100}>
            {/* Logo */}
            <a href="#home" className="flex justify-center w-full">
              <Image
                src="/Stereographic_PNG-06.png"
                alt="Stereographic Production"
                width={400}
                height={120}
                className="w-[65vw] sm:w-[20vw] h-auto hover:scale-105 transition-transform duration-300"
              />
            </a>

            {/* Title */}
            <a href="mailto:stev.marinkovic@gmail.com" className="mt-4 sm:mt-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white hover:text-purple-400 transition-colors duration-300 font-inter-tight">
                Let's Talk
              </h2>
            </a>

            {/* Contact Info */}
            <div className="flex flex-col items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
              <a
                href="mailto:stev.marinkovic@gmail.com"
                className="text-lg sm:text-xl text-gray-300 hover:text-purple-400 transition-colors font-sora"
              >
                stev.marinkovic@gmail.com
              </a>
              <a
                href="tel:+381621576924"
                className="text-lg sm:text-xl text-gray-300 hover:text-purple-400 transition-colors font-sora"
              >
                +381 62 1576924
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-6 mt-2">
              <Link
                href={socialLinks.stevan.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="w-6 h-6 opacity-70 hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                />
              </Link>
              <Link
                href={socialLinks.stevan.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Image
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="w-6 h-6 opacity-70 hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                />
              </Link>
              <Link
                href={socialLinks.nikola.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="w-6 h-6 opacity-70 hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                />
              </Link>
              <Link
                href={socialLinks.nikola.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Image
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="w-6 h-6 opacity-70 hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                />
              </Link>
            </div>
          </LoadingWrapper>
        </div>
      </div>

      {/* Copyright - pinned to absolute bottom */}
      <p className="absolute bottom-6 left-0 right-0 text-gray-600 text-[10px] sm:text-sm font-sora text-center">
        © 2026 Stereographic Production. All rights reserved.
      </p>
    </section>
  )
}
