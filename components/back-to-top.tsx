"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // The page scrolls inside <main>, not the window
    const mainElement = document.querySelector("main")
    if (!mainElement) return

    const toggleVisibility = () => {
      setIsVisible(mainElement.scrollTop > 300)
    }

    mainElement.addEventListener("scroll", toggleVisibility, { passive: true })
    return () => mainElement.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    document.querySelector("main")?.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Button
      onClick={scrollToTop}
      className={`hidden md:inline-flex fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-black/20 backdrop-blur-2xl border border-white/10 hover:border-white/30 transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:bg-purple-900/20 ${
        isVisible ? "visible opacity-100 translate-y-0 scale-100" : "invisible opacity-0 translate-y-8 scale-75 pointer-events-none"
      }`}
      size="icon"
    >
      <svg
        className="w-6 h-6 text-white transition-all duration-300 ease-out hover:text-purple-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </Button>
  )
}
