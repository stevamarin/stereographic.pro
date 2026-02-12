"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface LoadingWrapperProps {
  children: React.ReactNode
  delay?: number
  className?: string
  animation?: "fadeInUp" | "fadeInScale" | "slideInLeft" | "slideInRight"
}

export function LoadingWrapper({ 
  children, 
  delay = 0, 
  className = "",
  animation = "fadeInUp"
}: LoadingWrapperProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const animationClasses = {
    fadeInUp: "opacity-0 translate-y-8",
    fadeInScale: "opacity-0 scale-95",
    slideInLeft: "opacity-0 -translate-x-8",
    slideInRight: "opacity-0 translate-x-8"
  }

  const activeClasses = {
    fadeInUp: "opacity-100 translate-y-0",
    fadeInScale: "opacity-100 scale-100",
    slideInLeft: "opacity-100 translate-x-0",
    slideInRight: "opacity-100 translate-x-0"
  }

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible ? activeClasses[animation] : animationClasses[animation]
      } ${className}`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </div>
  )
}
