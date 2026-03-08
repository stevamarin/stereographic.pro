"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"
import { LoadingWrapper } from "@/components/loading-wrapper"
import { socialLinks } from "@/lib/config/social-links"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ?? ""

export function FooterSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<TurnstileInstance>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError("Please wait for the security check to complete.")
      return
    }

    setIsSubmitting(true)
    setError("")

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          project_type: formData.get("project_type"),
          budget: formData.get("budget"),
          message: formData.get("message"),
          honeypot: formData.get("_hp"),
          token: turnstileToken,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSubmitted(true)
        form.reset()
        setTurnstileToken(null)
      } else {
        setError(data.error ?? "Something went wrong. Please try again or email us directly.")
        turnstileRef.current?.reset()
      }
    } catch {
      setError("Could not connect. Please try again or email us directly.")
      turnstileRef.current?.reset()
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

              {/* Honeypot — hidden from real users, bots fill it in */}
              <input
                name="_hp"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
              />

              {TURNSTILE_SITE_KEY && (
                <div className="flex justify-center">
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={TURNSTILE_SITE_KEY}
                    onSuccess={setTurnstileToken}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => setTurnstileToken(null)}
                    options={{ theme: "dark", size: "normal" }}
                  />
                </div>
              )}

              {error && (
                <p className="text-red-400 text-sm font-sora text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || (TURNSTILE_SITE_KEY !== "" && !turnstileToken)}
                className="w-full h-11 bg-purple-600 hover:bg-purple-500 text-white font-sora font-medium rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}

          {/* Contact info below form */}
          <div className="flex flex-col items-center gap-3 mt-8">
            <a
              href="mailto:stevan@stereographic.pro"
              className="text-gray-400 hover:text-purple-400 transition-colors font-sora text-sm"
            >
              stevan@stereographic.pro
            </a>
            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 mt-1">
              <Link
                href="https://wa.me/381621576924"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-gray-400 hover:text-green-400 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </Link>
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
                className="group text-gray-400 hover:text-blue-400 transition-colors duration-300"
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
