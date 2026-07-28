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
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [tappedButton, setTappedButton] = useState<string | null>(null)
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollYRef = useRef(0)
  const { isDialogOpen, menuOpenRequestCount } = useDialog()

  // Intersection Observer for section detection
  useEffect(() => {
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

    // All sections except the hero are lazy-loaded and mount after the navbar,
    // so keep observing as they appear instead of only querying once on mount.
    const observed = new Set<Element>()
    const observeSections = () => {
      document.querySelectorAll("section[id]").forEach((section) => {
        if (!observed.has(section)) {
          observed.add(section)
          observer.observe(section)
        }
      })
    }
    observeSections()

    const mainElement = document.querySelector("main")
    const mutationObserver = new MutationObserver(observeSections)
    if (mainElement) mutationObserver.observe(mainElement, { childList: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
    }
  }, [isNavigating])

  // Show/hide nav on scroll
  useEffect(() => {
    const mainElement = document.querySelector("main")
    if (!mainElement) return

    const handleScroll = () => {
      const currentScrollY = mainElement.scrollTop
      const scrollHeight = mainElement.scrollHeight
      const clientHeight = mainElement.clientHeight

      // Check if at bottom
      const isAtBottom = currentScrollY + clientHeight >= scrollHeight - 5

      // Only update visibility during manual scrolling (not during navbar navigation)
      if (!isNavigating) {
        // Show navbar if scrolling up, at top, or at bottom
        setIsVisible(currentScrollY < lastScrollYRef.current || currentScrollY < 100 || isAtBottom)
      }
      lastScrollYRef.current = currentScrollY

      // Hide mobile hamburger as soon as scrolling starts
      setIsScrolling(true)

      // Clear existing timeout and set a new one
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => {
        setIsVisible(true)
        setIsScrolling(false)
      }, 150)
    }

    mainElement.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      mainElement.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [isNavigating])

  const scrollToSection = (id: string, keepMenuOpen = false) => {
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
      if (!keepMenuOpen) setIsOpen(false)

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

  // Open menu when hamburger tapped while a dialog is open
  useEffect(() => {
    if (menuOpenRequestCount > 0) {
      setIsOpen(true)
    }
  }, [menuOpenRequestCount])

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
        <div className="max-w-xl mx-auto px-2 py-4">
          <div className="flex items-center justify-center gap-1 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full py-1.5 shadow-2xl">
            <Button
              onClick={() => scrollToSection("home")}
              className={`px-5 py-4 rounded-full text-lg font-medium font-sora transition-all duration-300 ${
                activeSection === "home"
                  ? "text-white border border-purple-400/70 bg-purple-900/70 hover:bg-purple-500/80"
                  : "text-white bg-transparent hover:bg-white/20"
              }`}
            >
              Home
            </Button>
            <Button
              onClick={() => scrollToSection("work")}
              className={`px-5 py-4 rounded-full text-lg font-medium font-sora transition-all duration-300 ${
                activeSection === "work"
                  ? "text-white border border-purple-400/70 bg-purple-900/70 hover:bg-purple-500/80"
                  : "text-white bg-transparent hover:bg-white/20"
              }`}
            >
              Work
            </Button>
            <Button
              onClick={() => scrollToSection("services")}
              className={`px-5 py-4 rounded-full text-lg font-medium font-sora transition-all duration-300 ${
                activeSection === "services"
                  ? "text-white border border-purple-400/70 bg-purple-900/70 hover:bg-purple-500/80"
                  : "text-white bg-transparent hover:bg-white/20"
              }`}
            >
              Services
            </Button>
            <Button
              onClick={() => scrollToSection("about")}
              className={`px-5 py-4 rounded-full text-lg font-medium font-sora transition-all duration-300 ${
                activeSection === "about"
                  ? "text-white border border-purple-400/70 bg-purple-900/70 hover:bg-purple-500/80"
                  : "text-white bg-transparent hover:bg-white/20"
              }`}
            >
              About
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              className={`px-5 py-4 rounded-full text-lg font-medium font-sora transition-all duration-300 ${
                activeSection === "contact"
                  ? "text-white border border-purple-400/70 bg-purple-900/70 hover:bg-purple-500/80"
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
        className={`md:hidden fixed top-4 right-4 z-[110] text-white hover:bg-gray-800/80 hover:text-purple-300 transition-all duration-300 !w-12 !h-12 ${
          isScrolling && !isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onClick={toggleMenu}
      >
        <div className="w-8 h-8 flex flex-col justify-center items-center gap-[9px]">
          <span
            className={`block w-8 h-[3px] rounded-full bg-current transition-all duration-300 ease-out ${
              isOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`block w-8 h-[3px] rounded-full bg-current transition-all duration-300 ease-out ${
              isOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </div>
      </Button>

      {/* Full Screen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[105] md:hidden transition-all duration-700 ease-out ${
          isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={closeMenu}
      >
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-black/85 transition-all duration-700 ease-out"
          onClick={closeMenu}
        />

        {/* Menu Content */}
        <div
          className={`relative z-[55] h-full flex flex-col justify-center items-center transition-opacity duration-500 ease-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Logo */}
          <button className="mb-16" onClick={() => scrollToSection("home")}>
            <Image src="/logo.svg" alt="Stereographic Production" width={250} height={75} className="h-16 w-auto" />
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center space-y-8">
            {[
              { name: "Home", id: "home" },
              { name: "Work", id: "work" },
              { name: "Services", id: "services" },
              { name: "About", id: "about" },
              { name: "Let's Talk", id: "contact" },
            ].map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                onClick={() => {
                  setTappedButton(item.id)
                  scrollToSection(item.id, true)
                  setTimeout(() => {
                    setTappedButton(null)
                    setIsOpen(false)
                  }, 320)
                }}
                className={`text-white hover:text-purple-300 text-2xl font-medium py-4 px-8 rounded-xl transition-all duration-300 relative overflow-hidden group ${tappedButton === item.id ? "scale-[1.6] text-purple-300 drop-shadow-[0_0_24px_rgba(192,132,252,1)]" : "scale-100 hover:bg-purple-900/20"}`}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="text-center mt-12">
            <p className="text-gray-400 text-sm mb-2 font-sora">Get in touch</p>
            <a
              href="mailto:stevan@stereographic.pro"
              className="text-purple-300 hover:text-white transition-colors duration-300 font-sora"
            >
              stevan@stereographic.pro
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
