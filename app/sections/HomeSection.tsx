"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { LoadingWrapper } from "@/components/loading-wrapper"

export function HomeSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {
        // Autoplay blocked — silently ignore
      })
    }
  }, [])

  return (
    <section id="home" className="h-screen snap-start flex items-center justify-center bg-black relative">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        className="absolute top-0 left-0 w-full h-full object-cover origin-top scale-[1.45] -translate-y-[215px] opacity-80 md:opacity-100 md:translate-y-0 md:origin-center md:scale-[1.02] md:object-contain z-0"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Logo display - positioned at top of section */}
      <div className="absolute top-0 left-0 right-0 h-screen flex items-center justify-center">
        <LoadingWrapper delay={100}>
          <div className="relative z-10">
            <Image
              src="/logos/main/Stereographic_PNG-05.png"
              alt="Stereographic Production"
              width={8000}
              height={4000}
              className="w-[90vmin]"
              style={{ mixBlendMode: "screen" }}
              priority
            />
          </div>
        </LoadingWrapper>
      </div>
    </section>
  )
}
