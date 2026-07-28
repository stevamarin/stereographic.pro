"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function HomeSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [videoPlaying, setVideoPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    // Only decode the background video while the hero is actually on screen.
    let heroVisible = true

    // Normal case: autoplay works. iOS Low Power Mode blocks automatic
    // playback, so this rejects — we then start on the first user gesture
    // (user-initiated playback IS allowed, even in Low Power Mode).
    video.play().catch(() => {})

    const events = ["pointerdown", "touchstart", "keydown", "wheel", "scroll"]
    const startOnGesture = () => {
      if (!heroVisible) return
      video.play().then(cleanup).catch(() => {})
    }
    const cleanup = () =>
      events.forEach((e) => window.removeEventListener(e, startOnGesture))

    events.forEach((e) =>
      window.addEventListener(e, startOnGesture, { passive: true }),
    )

    const observer = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting
        if (heroVisible) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.05 },
    )
    observer.observe(section)

    return () => {
      cleanup()
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} id="home" className="h-screen flex items-center justify-center bg-black relative isolate overflow-hidden">
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

      {/* Logo display — pure-CSS entrance (animate-fade-in-up) instead of
          LoadingWrapper: the JS-driven opacity toggle kept the LCP element
          invisible until React hydrated, tanking LCP on slow devices. */}
      <div className="absolute top-0 left-0 right-0 h-screen flex items-center justify-center">
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "100ms", animationFillMode: "both", animationDuration: "700ms" }}
        >
          <div className="relative z-10">
            <Image
              src="/logos/main/Stereographic_PNG-05.png"
              alt="Stereographic Production"
              width={8000}
              height={4000}
              sizes="90vw"
              className="w-[90vmin]"
              style={{
                opacity: 0.4,
                filter: "blur(0.4px) drop-shadow(2px 5px 10px rgba(0,20,70,0.65))",
              }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
