"use client"

import { useEffect, useState, useRef } from "react"
import { HomeSection } from "./sections/HomeSection"
import { WorkSection } from "./sections/WorkSection"
import { AboutSection } from "./sections/AboutSection"
import { FooterSection } from "./sections/FooterSection"
import { Navbar } from "@/components/navbar"
import { BackToTop } from "@/components/back-to-top"
import { DialogProvider } from "@/contexts/dialog-context"

export default function HomePage() {
  const [shouldBounce, setShouldBounce] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const startNavigation = () => {
    // Clear any existing timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current)
    }

    setIsNavigating(true)

    // Set new timeout
    navigationTimeoutRef.current = setTimeout(() => {
      setIsNavigating(false)
      navigationTimeoutRef.current = null
    }, 1500)
  }

  useEffect(() => {
    const mainElement = document.querySelector("main")
    if (!mainElement) return

    let lastScrollTop = 0

    const handleScroll = () => {
      const scrollTop = mainElement.scrollTop
      const scrollHeight = mainElement.scrollHeight
      const clientHeight = mainElement.clientHeight

      // Check if scrolled to bottom (within 5px tolerance)
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5

      // Only trigger bounce when scrolling down and hitting bottom (not during navbar navigation)
      if (isAtBottom && scrollTop > lastScrollTop && !isNavigating) {
        setShouldBounce(true)
        // Remove bounce class after animation completes
        setTimeout(() => setShouldBounce(false), 400)
      }

      lastScrollTop = scrollTop
    }

    mainElement.addEventListener("scroll", handleScroll, { passive: true })
    return () => mainElement.removeEventListener("scroll", handleScroll)
  }, [isNavigating])

  return (
    <DialogProvider>
      <Navbar onNavigationStart={startNavigation} />
      <main className={`h-screen overflow-y-scroll snap-y snap-proximity scroll-smooth ${shouldBounce ? 'animate-subtle-bounce' : ''}`}>
        <HomeSection />
        <WorkSection />
        <AboutSection />
        <FooterSection />
      </main>
      <BackToTop />
    </DialogProvider>
  )
}
