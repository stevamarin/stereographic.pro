"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { LoadingWrapper } from "@/components/loading-wrapper"

const testimonials = [
  {
    quote: "Stevan was fantastic to work with! He delivered high-quality sound design with precision, creativity, and super fast turnaround. Communication was easy, revisions were quick, and the whole process felt smooth and professional. Highly recommended for anyone looking for sharp, scroll-stopping sound work!",
    name: "Lukas Tish",
    title: "Sound Design",
  },
  {
    quote: "Excellent sound designer and true professional. Stevan delivered great work on a challenging sound design project involving dialogue cleanup, noise reduction, and full audio design under a tight deadline and evolving edit. If you're looking for someone to handle complex audio needs with creativity and care, Stevan is a great choice.",
    name: "Lukas Tish",
    title: "Sound Design",
  },
  {
    quote: "Stevan produced a very high-quality audio-engineering edit in Pro Tools for multiple projects for us and his results are in active use currently. I needed to provide feedback so that he proceeded more efficiently at first, to which he responded very keenly and produced great work. I recommend him highly.",
    name: "Troy S. Blythe",
    title: "Voiceover Editing",
  },
  {
    quote: "Stevan did an amazing job with our project. He listened to the job requirements and delivered a finished product that exceeded our expectations. We will be working with Stevan for our future audio needs. 5/5 rating. Highly recommended and talented individual.",
    name: "Michael Richardson",
    title: "Sound Design",
  },
  {
    quote: "Amazing experience working with Stevan as always. Our team and label was so incredibly happy with the results of his work. So well done!",
    name: "Krizia Vega",
    title: "Sound Design",
  },
  {
    quote: "Stevan is a superstar who is kind and talented. He was able to help me immediately, delivering above and beyond my expectations. I would gladly hire him again!",
    name: "Jake Goble",
    title: "Audio Mixing",
  },
  {
    quote: "Stevan did a really great job for me. His English was perfect. He seems really smart, organized, and kind. He was responsible, communicated well, and I am happy with the end-product. I really recommend working with him.",
    name: "Noah Elkrief",
    title: "Audio Optimization",
  },
  {
    quote: "I needed a podcast editor who could edit and produce 26 episodes quickly. Steven was very responsive. He took direction well and produced great work quickly. I will be working with him again.",
    name: "Fabiola Fleuranvil",
    title: "Podcast Editing",
  },
  {
    quote: "Steven helped me elevate my Podcast. He created a new intro and outro, made great editing and was really great person to work with. I hope we will be able to collaborate again in the future.",
    name: "Kobi Cohen",
    title: "Podcast Editing",
  },
  {
    quote: "Quick to respond, creative, and fairly priced.",
    name: "Graham Smith",
    title: "Sound Design",
  },
  {
    quote: "It was a great experience working with Stevan.",
    name: "Mayankesh Ranjan",
    title: "Sound Design",
  },
  {
    quote: "Nothing but greatest of feedback for Stevan.",
    name: "Stefan Stojiljkovic",
    title: "Audio Editing",
  },
]

// Duplicate for infinite scroll
const marqueeTestimonials = [...testimonials, ...testimonials]

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<number | null>(null)
  const scrollPosRef = useRef(0)

  const autoScroll = useCallback(() => {
    if (isUserScrolling || !scrollRef.current) return

    const el = scrollRef.current
    scrollPosRef.current += 0.4 // speed: px per frame

    // Loop: when we've scrolled past half (the duplicated set), reset
    const halfWidth = el.scrollWidth / 2
    if (scrollPosRef.current >= halfWidth) {
      scrollPosRef.current -= halfWidth
    }

    el.scrollLeft = scrollPosRef.current
    animationRef.current = requestAnimationFrame(autoScroll)
  }, [isUserScrolling])

  useEffect(() => {
    animationRef.current = requestAnimationFrame(autoScroll)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [autoScroll])

  const handleInteractionStart = () => {
    setIsUserScrolling(true)
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
  }

  const handleInteractionEnd = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      if (scrollRef.current) {
        scrollPosRef.current = scrollRef.current.scrollLeft
      }
      setIsUserScrolling(false)
    }, 3000) // resume auto-scroll 3s after user stops
  }

  // Trackpad / wheel scrolling fires `wheel`, not mousedown/touchstart - pause the
  // auto-scroll on each wheel event and reset the resume timer so the user can
  // scroll left/right smoothly without the animation fighting them.
  const handleWheel = () => {
    handleInteractionStart()
    handleInteractionEnd()
  }

  return (
    <section className="bg-black py-20 md:py-28 overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 mb-12">
        <div className="max-w-[1800px] mx-auto">
          <LoadingWrapper delay={100}>
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white font-inter-tight mb-4">
                What Clients Say
              </h2>
              <p className="text-gray-400 font-sora text-lg sm:text-xl">
                Trusted by creators, studios, and brands worldwide.
              </p>
            </div>
          </LoadingWrapper>
        </div>
      </div>

      {/* Scrollable + auto-scrolling testimonial cards */}
      <LoadingWrapper delay={200}>
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex items-stretch overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
            onWheel={handleWheel}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            onMouseDown={handleInteractionStart}
            onMouseUp={handleInteractionEnd}
            onMouseLeave={handleInteractionEnd}
          >
            {marqueeTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[300px] sm:w-[400px] mx-2 sm:mx-3 p-5 sm:p-8 rounded-2xl border border-white/5 bg-white/[0.02]"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 font-sora text-sm sm:text-base leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-auto">
                  <p className="text-white font-inter-tight font-medium">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 font-sora text-sm">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </LoadingWrapper>

      {/* CTA */}
      <LoadingWrapper delay={300}>
        <div className="flex justify-center mt-12">
          <button
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="px-8 py-3 rounded-full border border-purple-500/30 bg-purple-500/10 text-white font-sora text-sm sm:text-base font-medium hover:bg-purple-500/20 hover:border-purple-400/50 transition-all duration-300"
          >
            Start Your Project
          </button>
        </div>
      </LoadingWrapper>

    </section>
  )
}
