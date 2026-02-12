"use client"

import Image from "next/image"
import Link from "next/link"
import { LoadingWrapper } from "@/components/loading-wrapper"
import { socialLinks } from "@/lib/config/social-links"

export function FooterSection() {
  return (
    <section id="contact" className="min-h-screen snap-start scroll-mt-[45px] bg-black flex items-center justify-center py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <LoadingWrapper delay={100}>
          {/* Logo */}
          <Image
            src="/logo.svg"
            alt="Stereographic Production"
            width={300}
            height={90}
            className="mx-auto mb-12 h-20 sm:h-24 w-auto hover:scale-105 transition-transform duration-300"
          />

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-8 text-white font-inter-tight">
            Let's Talk
          </h2>

          {/* Contact Info */}
          <div className="space-y-4 mb-12">
            <a
              href="mailto:stev.marinkovic@gmail.com"
              className="block text-lg sm:text-xl text-gray-300 hover:text-purple-400 transition-colors font-sora"
            >
              stev.marinkovic@gmail.com
            </a>
            <a
              href="tel:+381621576924"
              className="block text-lg sm:text-xl text-gray-300 hover:text-purple-400 transition-colors font-sora"
            >
              +381 62 1576924
            </a>
          </div>

          {/* Team Social Links */}
          <div className="grid sm:grid-cols-2 gap-8 mb-12 max-w-2xl mx-auto">
            {/* Stevan's Links */}
            <div>
              <p className="text-gray-500 text-sm mb-4 font-sora">Stevan Marinković</p>
              <div className="flex justify-center gap-6">
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
              </div>
            </div>

            {/* Nikola's Links */}
            <div>
              <p className="text-gray-500 text-sm mb-4 font-sora">Nikola Mijailović</p>
              <div className="flex justify-center gap-6">
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
            </div>
          </div>

          {/* Copyright */}
          <p className="text-gray-600 text-sm font-sora">
            © 2026 Stereographic Production. All rights reserved.
          </p>
        </LoadingWrapper>
      </div>
    </section>
  )
}
