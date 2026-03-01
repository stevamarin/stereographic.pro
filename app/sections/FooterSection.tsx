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
        <div className="flex flex-col items-center text-center px-6 gap-1 -mt-[65px]">
          <LoadingWrapper delay={100}>
            {/* Logo */}
            <a href="#home" className="flex justify-center w-full">
              <Image
                src="/logos/main/Stereographic_PNG-06.png"
                alt="Stereographic Production"
                width={400}
                height={120}
                className="w-[65vw] sm:w-[60vw] md:w-[40vw] lg:w-[25vw] h-auto hover:scale-105 transition-transform duration-300"
              />
            </a>

            {/* Spacer - pushes text group down */}
            <div style={{ height: '90px' }} />

            {/* Title */}
            <a href="mailto:stevan@stereographic.pro" className="mt-4 sm:mt-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white hover:text-purple-400 transition-colors duration-300 font-inter-tight">
                Let's Talk
              </h2>
            </a>

            {/* Contact Info */}
            <div className="flex flex-col items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
              <a
                href="mailto:stevan@stereographic.pro"
                className="text-lg sm:text-xl text-gray-300 hover:text-purple-400 transition-colors font-sora"
              >
                stevan@stereographic.pro
              </a>
              <a
                href="tel:+381621576924"
                className="text-lg sm:text-xl text-gray-300 hover:text-purple-400 transition-colors font-sora"
              >
                +381 62 1576924
              </a>
              {/* Stevan's Social Links */}
              <div className="flex items-center justify-center gap-4">
                <Link
                  href={socialLinks.stevan.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link
                  href={socialLinks.stevan.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </div>
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
