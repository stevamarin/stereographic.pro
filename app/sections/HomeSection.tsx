"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { LoadingWrapper } from "@/components/loading-wrapper"

export function HomeSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoPlaying, setVideoPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Normal case: autoplay works. iOS Low Power Mode blocks automatic
    // playback, so this rejects — we then start on the first user gesture
    // (user-initiated playback IS allowed, even in Low Power Mode).
    video.play().catch(() => {})

    const events = ["pointerdown", "touchstart", "keydown", "wheel", "scroll"]
    const startOnGesture = () => {
      video.play().then(cleanup).catch(() => {})
    }
    const cleanup = () =>
      events.forEach((e) => window.removeEventListener(e, startOnGesture))

    events.forEach((e) =>
      window.addEventListener(e, startOnGesture, { passive: true }),
    )
    return cleanup
  }, [])

  return (
    <section id="home" className="h-screen flex items-center justify-center bg-black relative isolate">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onPlaying={() => setVideoPlaying(true)}
        className="absolute top-0 left-0 w-full h-full object-cover origin-top scale-[1.45] -translate-y-[215px] opacity-80 md:opacity-100 md:translate-y-0 md:origin-center md:scale-[1.02] md:object-contain z-0"
      >
        <source src="/background.webm" type="video/webm" />
      </video>

      {/* Poster overlay — covers the video (and iOS Safari's forced "play"
          button in Low Power Mode) until the video actually starts playing,
          then fades out. Matches the video's transforms so there's no jump. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/background-poster.webp"
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 left-0 w-full h-full object-cover origin-top scale-[1.45] -translate-y-[215px] opacity-80 md:opacity-100 md:translate-y-0 md:origin-center md:scale-[1.02] md:object-contain z-0 transition-opacity duration-700 ${videoPlaying ? "!opacity-0" : ""}`}
      />

      {/* Warm the video/poster's pure-black areas up to the site's warm
          near-black so the hero matches the rest of the page. "lighten"
          raises any pixel darker than #0d0d0b to #0d0d0b and leaves the
          brighter video content untouched. Sits above the video (z-0) but
          below the logo (z-10), and the section's `isolate` keeps the blend
          contained to the hero. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[#0d0d0b] mix-blend-lighten"
      />

      {/* Logo display */}
      <div className="absolute top-0 left-0 right-0 h-screen flex items-center justify-center">
        <LoadingWrapper delay={100}>
          <div className="relative z-10">
            <Image
              src="/logos/main/Stereographic_PNG-05.png"
              alt="Stereographic Production"
              width={8000}
              height={4000}
              className="w-[90vmin]"
              style={{
                opacity: 0.4,
                filter: "blur(0.4px) drop-shadow(2px 5px 10px rgba(0,20,70,0.65))",
              }}
              priority
            />
          </div>
        </LoadingWrapper>
      </div>
    </section>
  )
}
