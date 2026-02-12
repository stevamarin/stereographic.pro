"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useDialog } from "@/contexts/dialog-context"

interface NavbarProps {
  onNavigationStart?: () => void
}

export function Navbar({ onNavigationStart }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home")
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { isDialogOpen } = useDialog()

  // Intersection Observer for section detection
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    const observerOptions = {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: "-20% 0px -35% 0px"
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Don't update during programmatic navigation
        if (isNavigating) return

        // Find the entry with the highest intersection ratio
        const intersectingEntries = entries.filter(entry => entry.isIntersecting)
        if (intersectingEntries.length > 0) {
          const mostVisible = intersectingEntries.reduce((max, entry) =>
            entry.intersectionRatio > max.intersectionRatio ? entry : max
          )
          setActiveSection(mostVisible.target.id)
        }
      },
      observerOptions
    )

    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [isNavigating])

  // Show/hide nav on scroll
  useEffect(() => {
    const mainElement = document.querySelector("main")
    if (!mainElement) return

    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      const currentScrollY = mainElement.scrollTop
      const scrollHeight = mainElement.scrollHeight
      const clientHeight = mainElement.clientHeight

      // Check if at bottom
      const isAtBottom = currentScrollY + clientHeight >= scrollHeight - 5

      // Only update visibility during manual scrolling (not during navbar navigation)
      if (!isNavigating) {
        // Show navbar if scrolling up, at top, or at bottom
        setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100 || isAtBottom)
      }
      setLastScrollY(currentScrollY)

      // Clear existing timeout
      clearTimeout(scrollTimeout)

      // Show navbar when scrolling stops (snap complete)
      scrollTimeout = setTimeout(() => {
        setIsVisible(true)
      }, 150)
    }

    mainElement.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      mainElement.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [lastScrollY, isNavigating])

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      // Clear any existing navigation timeout
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current)
      }

      // Immediately update active section when clicked
      setActiveSection(id)

      // Set navigating state
      setIsNavigating(true)

      onNavigationStart?.() // Signal that navigation is starting to parent
      section.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)

      // Reset navigating state and show navbar after scroll completes
      navigationTimeoutRef.current = setTimeout(() => {
        setIsNavigating(false)
        setIsVisible(true)
        navigationTimeoutRef.current = null
      }, 1500)
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      document.documentElement.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
      document.documentElement.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      {/* Desktop Navigation - Sticky Top */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] hidden md:block transition-transform duration-300 ${
          (isVisible && !isDialogOpen) ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-md mx-auto px-2 py-4">
          <div className="flex items-center justify-center gap-1 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full py-1.5 shadow-2xl">
            <Button
              onClick={() => scrollToSection("home")}
              className={`px-5 py-4 rounded-full text-lg font-medium font-sora transition-all duration-300 ${
                activeSection === "home"
                  ? "text-black bg-white hover:bg-white"
                  : "text-white bg-transparent hover:bg-white/20"
              }`}
            >
              Home
            </Button>
            <Button
              onClick={() => scrollToSection("work")}
              className={`px-5 py-4 rounded-full text-lg font-medium font-sora transition-all duration-300 ${
                activeSection === "work"
                  ? "text-black bg-white hover:bg-white"
                  : "text-white bg-transparent hover:bg-white/20"
              }`}
            >
              Work
            </Button>
            <Button
              onClick={() => scrollToSection("about")}
              className={`px-5 py-4 rounded-full text-lg font-medium font-sora transition-all duration-300 ${
                activeSection === "about"
                  ? "text-black bg-white hover:bg-white"
                  : "text-white bg-transparent hover:bg-white/20"
              }`}
            >
              About
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              className={`px-5 py-4 rounded-full text-lg font-medium font-sora transition-all duration-300 ${
                activeSection === "contact"
                  ? "text-black bg-white hover:bg-white"
                  : "text-white bg-transparent hover:bg-white/20"
              }`}
            >
              {"Let's Talk"}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 right-4 z-[110] text-white hover:bg-gray-800/80 hover:text-purple-300 transition-all duration-300"
        onClick={toggleMenu}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center gap-2">
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-out ${
              isOpen ? "rotate-45 translate-y-1.25" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-out ${
              isOpen ? "-rotate-45 -translate-y-1.25" : ""
            }`}
          />
        </div>
      </Button>

      {/* Full Screen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[105] md:hidden transition-all duration-700 ease-out ${
          isOpen ? "opacity-300 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-black/85 transition-all duration-700 ease-out"
          onClick={closeMenu}
        />

        {/* Menu Content */}
        <div
          className={`relative z-[55] h-full flex flex-col justify-center items-center transition-all duration-700 ease-out ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Logo */}
          <div className="mb-16">
            <Image src="/logo.svg" alt="Stereographic Production" width={250} height={75} className="h-16 w-auto" />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center space-y-8">
            {[
              { name: "Home", id: "home", delay: "delay-100" },
              { name: "Work", id: "work", delay: "delay-200" },
              { name: "About", id: "about", delay: "delay-300" },
              { name: "Let's Talk", id: "contact", delay: "delay-400" },
            ].map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className={`text-white hover:text-purple-300 text-2xl font-medium py-4 px-8 rounded-xl hover:bg-purple-900/20 transition-all duration-300 relative overflow-hidden group ${
                  isOpen ? `animate-in slide-in-from-bottom-4 ${item.delay}` : ""
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            ))}
          </nav>

          {/* Contact Info */}
          <div
            className={`text-center mt-12 transition-all duration-500 ${
              isOpen ? "animate-in slide-in-from-bottom-4 delay-600" : ""
            }`}
          >
            <p className="text-gray-400 text-sm mb-2 font-sora">Get in touch</p>
            <a
              href="mailto:stev.marinkovic@gmail.com"
              className="text-purple-300 hover:text-white transition-colors duration-300 font-sora"
            >
              stev.marinkovic@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
