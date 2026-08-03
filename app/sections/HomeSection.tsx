"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function HomeSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [videoUnavailable, setVideoUnavailable] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const markUnavailable = () => setVideoUnavailable(true)

    // The <video> is server-rendered, so a failed load can fire `error` before
    // React hydrates and attaches onError — check the element's state directly
    // as well as listening from here on.
    if (video.error || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      markUnavailable()
      return
    }
    video.addEventListener("error", markUnavailable)

    // If the browser refuses to autoplay — iOS Low Power Mode, strict autoplay
    // settings, an in-app browser like Instagram's — we deliberately do NOT try
    // to start it on the first tap/scroll. The hero just stays in its clean
    // static state (logo over the site's near-black), and the <video> unmounts
    // so iOS has nothing to draw a "play" button on. Low Power Mode is the
    // visitor asking to save battery; honouring that beats a background loop.
    video.play().catch(markUnavailable)

    // Only decode the video while the hero is actually on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current
        if (!v) return
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.05 },
    )
    observer.observe(section)

    return () => {
      video.removeEventListener("error", markUnavailable)
      observer.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} id="home" className="h-screen flex items-center justify-center bg-black relative isolate overflow-hidden">
      {/* Background video. Absent entirely until it is actually playing there
          is nothing here but the section's near-black and the logo below —
          which is the intended fallback look, so no poster image is needed.
          It fades in once playback starts, and unmounts if playback is refused
          or the file fails to load. */}
      {!videoUnavailable && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onPlaying={() => setVideoPlaying(true)}
          onError={() => setVideoUnavailable(true)}
          className={`absolute top-0 left-0 w-full h-full object-cover origin-top scale-[1.45] -translate-y-[215px] md:translate-y-0 md:origin-center md:scale-[1.02] md:object-contain z-0 transition-opacity duration-700 ${
            videoPlaying ? "opacity-80 md:opacity-100" : "opacity-0 invisible"
          }`}
        >
          <source src="/background.webm" type="video/webm" />
        </video>
      )}

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
            {/* Intrinsic size is the file's real 2924x2924 (was declared
                8000x4000, a 2:1 lie about a square image). `sizes` mirrors the
                w-[90vmin] box — vmin is vw in portrait, vh in landscape — so
                phones get a correctly-sized rendition and desktop stops
                over-fetching. q90 because the artwork is one big smooth
                gradient, which bands badly at the default q75. The 0.4px blur
                is a fixed CSS length, so on the smaller mobile render it is
                proportionally ~2x stronger and reads as out-of-focus: keep it
                on desktop only. */}
            <Image
              src="/logos/main/Stereographic_PNG-05.png"
              alt="Stereographic Production"
              width={2924}
              height={2924}
              sizes="(orientation: portrait) 90vw, 90vh"
              quality={90}
              className="w-[90vmin] [filter:drop-shadow(2px_5px_10px_rgba(0,20,70,0.65))] md:[filter:blur(0.4px)_drop-shadow(2px_5px_10px_rgba(0,20,70,0.65))]"
              style={{ opacity: 0.4 }}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
