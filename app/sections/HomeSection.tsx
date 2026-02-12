"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { LoadingWrapper } from "@/components/loading-wrapper"

export function HomeSection() {
  const [scrollOpacity, setScrollOpacity] = useState(0)

  useEffect(() => {
    const mainElement = document.querySelector("main")
    if (!mainElement) return

    const handleScroll = () => {
      const scrollY = mainElement.scrollTop
      // Fade in the black overlay as user scrolls (0-300px range)
      const opacity = Math.min(scrollY / 300, 1)
      setScrollOpacity(opacity)
    }

    mainElement.addEventListener("scroll", handleScroll, { passive: true })
    return () => mainElement.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="home" className="h-screen snap-start flex items-center justify-center bg-black relative">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Fade overlay - transitions video to black when scrolling */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black z-[5] transition-opacity duration-300"
        style={{ opacity: scrollOpacity }}
      />

      {/* Logo display - positioned at top of section */}
      <div className="absolute top-0 left-0 right-0 h-screen flex items-center justify-center">
        <LoadingWrapper delay={100}>
          <div className="relative z-10">
            <Image
              src="/logos/main/Stereographic_PNG-05.png"
              alt="Stereographic Production"
              width={8000}
              height={4000}
              className="w-250"
              style={{ mixBlendMode: "screen" }}
              priority
            />
          </div>
        </LoadingWrapper>
      </div>
    </section>
  )
}
