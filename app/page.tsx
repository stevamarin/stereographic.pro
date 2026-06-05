"use client"

import { useEffect, useState, useRef } from "react"
import dynamic from "next/dynamic"
import { HomeSection } from "./sections/HomeSection"
import { Navbar } from "@/components/navbar"
import { BackToTop } from "@/components/back-to-top"
import { DialogProvider } from "@/contexts/dialog-context"

const WorkSection = dynamic(() => import("./sections/WorkSection").then(mod => ({ default: mod.WorkSection })), { ssr: false })
const ServicesSection = dynamic(() => import("./sections/ServicesSection").then(mod => ({ default: mod.ServicesSection })), { ssr: false })
const TestimonialsSection = dynamic(() => import("./sections/TestimonialsSection").then(mod => ({ default: mod.TestimonialsSection })), { ssr: false })
const AboutSection = dynamic(() => import("./sections/AboutSection").then(mod => ({ default: mod.AboutSection })), { ssr: false })
const FooterSection = dynamic(() => import("./sections/FooterSection").then(mod => ({ default: mod.FooterSection })), { ssr: false })

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
        // Remove bounce class after animation completes (must match the 0.5s animation)
        setTimeout(() => setShouldBounce(false), 500)
      }

      lastScrollTop = scrollTop
    }

    mainElement.addEventListener("scroll", handleScroll, { passive: true })
    return () => mainElement.removeEventListener("scroll", handleScroll)
  }, [isNavigating])

  return (
    <DialogProvider>
      <Navbar onNavigationStart={startNavigation} />
      <main
        className={`h-screen overflow-y-scroll overflow-x-hidden ${shouldBounce ? 'animate-subtle-bounce' : ''}`}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <HomeSection />
        <WorkSection />
        <ServicesSection />
        <TestimonialsSection />
        <AboutSection />
        <FooterSection />
      </main>
      <BackToTop />
    </DialogProvider>
  )
}
