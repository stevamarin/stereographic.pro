"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { LoadingWrapper } from "@/components/loading-wrapper"
import { socialLinks } from "@/lib/config/social-links"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function FooterSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("https://formspree.io/f/maqdrlwe", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })

      if (response.ok) {
        setIsSubmitted(true)
        form.reset()
      }
    } catch {
      // Silently handle - user can retry
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen snap-start scroll-mt-[45px] bg-black relative overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-16 md:py-24">
        <LoadingWrapper delay={100}>
          {/* Logo */}
          <a href="#home" className="flex justify-center w-full mb-8">
            <Image
              src="/logos/main/Stereographic_PNG-06.png"
              alt="Stereographic Production"
              width={400}
              height={120}
              className="w-[55vw] sm:w-[45vw] md:w-[30vw] lg:w-[20vw] h-auto hover:scale-105 transition-transform duration-300"
            />
          </a>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white text-center mb-2 font-inter-tight">
            Let&apos;s Talk
          </h2>
          <p className="text-gray-400 text-center font-sora mb-8 text-base sm:text-lg">
            Tell us about your project and we&apos;ll get back to you within 24 hours.
          </p>

          {/* Form or Thank You */}
          {isSubmitted ? (
            <div className="text-center py-12 max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white font-inter-tight mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-400 font-sora">
                Thanks for reaching out. We&apos;ll be in touch soon.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-6 text-purple-400 hover:text-purple-300 font-sora text-sm transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-lg mx-auto space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  name="name"
                  placeholder="Your Name"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:border-purple-500 focus-visible:ring-purple-500/20 h-11 font-sora"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:border-purple-500 focus-visible:ring-purple-500/20 h-11 font-sora"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  name="project_type"
                  required
                  defaultValue=""
                  className="flex h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-base text-white font-sora shadow-xs outline-none focus-visible:border-purple-500 focus-visible:ring-[3px] focus-visible:ring-purple-500/20 md:text-sm appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                  }}
                >
                  <option value="" disabled className="bg-black text-gray-500">Project Type</option>
                  <option value="Music Video" className="bg-black text-white">Music Video</option>
                  <option value="Commercial" className="bg-black text-white">Commercial</option>
                  <option value="Film" className="bg-black text-white">Film</option>
                  <option value="Game Audio" className="bg-black text-white">Game Audio</option>
                  <option value="Podcast / Content" className="bg-black text-white">Podcast / Content</option>
                  <option value="Other" className="bg-black text-white">Other</option>
                </select>

                <select
                  name="budget"
                  defaultValue=""
                  className="flex h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-base text-white font-sora shadow-xs outline-none focus-visible:border-purple-500 focus-visible:ring-[3px] focus-visible:ring-purple-500/20 md:text-sm appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                  }}
                >
                  <option value="" disabled className="bg-black text-gray-500">Budget Range (optional)</option>
                  <option value="Under $500" className="bg-black text-white">Under $500</option>
                  <option value="$500 - $1,500" className="bg-black text-white">$500 - $1,500</option>
                  <option value="$1,500 - $5,000" className="bg-black text-white">$1,500 - $5,000</option>
                  <option value="$5,000+" className="bg-black text-white">$5,000+</option>
                </select>
              </div>

              <Textarea
                name="message"
                placeholder="Tell us about your project..."
                required
                rows={4}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:border-purple-500 focus-visible:ring-purple-500/20 font-sora resize-none min-h-[100px]"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-purple-600 hover:bg-purple-500 text-white font-sora font-medium rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}

          {/* Contact info below form */}
          <div className="flex flex-col items-center gap-3 mt-8">
            <div className="flex items-center gap-6 text-sm">
              <a
                href="mailto:stevan@stereographic.pro"
                className="text-gray-400 hover:text-purple-400 transition-colors font-sora"
              >
                stevan@stereographic.pro
              </a>
              <a
                href="tel:+381621576924"
                className="text-gray-400 hover:text-purple-400 transition-colors font-sora"
              >
                +381 62 1576924
              </a>
            </div>
            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 mt-1">
              <Link
                href={socialLinks.stevan.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-gray-400 hover:text-purple-400 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link
                href={socialLinks.stevan.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-gray-400 hover:text-purple-400 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>

        </LoadingWrapper>
      </div>

      {/* Copyright - pinned to bottom */}
      <p className="absolute bottom-6 left-0 right-0 text-gray-600 text-[10px] sm:text-sm font-sora text-center">
        © 2026 Stereographic Production. All rights reserved.
      </p>
    </section>
  )
}
