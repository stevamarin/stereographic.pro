"use client"

import { useEffect, useRef } from "react"

/**
 * Smooth, GPU-composited auto-scrolling marquee that is also draggable/swipeable.
 *
 * Drives an inner track with `transform: translate3d` (sub-pixel smooth, unlike
 * scrollLeft which stutters on iOS). The element must contain TWO identical
 * copies of its content so a one-copy shift loops seamlessly.
 *
 * - Auto-scrolls at `pxPerSecond`.
 * - Drag/swipe horizontally to scrub; vertical gestures still scroll the page
 *   (the track sets `touch-action: pan-y`, and we only hijack horizontal drags).
 * - Pauses on hover (desktop) and while dragging; resumes shortly after release.
 */
export function useDragMarquee(pxPerSecond = 24) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let pos = 0
    let half = el.scrollWidth / 2
    let lastT = performance.now()
    let raf = 0

    let hoverPaused = false
    let resumeAt = 0 // auto-scroll paused until this timestamp (after a drag)
    let active = false // confirmed horizontal drag in progress
    let pending = false // pointer down, drag direction not yet decided
    let startX = 0
    let startY = 0
    let lastX = 0
    let pointerId = -1

    const wrap = () => {
      if (half > 0) pos = ((pos % half) + half) % half
    }
    const apply = () => {
      el.style.transform = `translate3d(${-pos}px, 0, 0)`
    }

    const tick = (t: number) => {
      const dt = Math.min((t - lastT) / 1000, 0.05)
      lastT = t
      if (!active && !hoverPaused && t >= resumeAt) {
        pos += pxPerSecond * dt
        wrap()
        apply()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const ro = new ResizeObserver(() => {
      half = el.scrollWidth / 2
    })
    ro.observe(el)

    const onDown = (e: PointerEvent) => {
      pending = true
      active = false
      startX = lastX = e.clientX
      startY = e.clientY
      pointerId = e.pointerId
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return
      if (pending) {
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return // wait for clear intent
        if (Math.abs(dx) > Math.abs(dy)) {
          active = true
          pending = false
          try {
            el.setPointerCapture(e.pointerId)
          } catch {}
        } else {
          pending = false // vertical gesture — let the page scroll
          return
        }
      }
      if (!active) return
      const d = e.clientX - lastX
      lastX = e.clientX
      pos -= d
      wrap()
      apply()
    }
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return
      pending = false
      if (active) {
        active = false
        resumeAt = performance.now() + 1500 // resume auto-scroll 1.5s after release
      }
      pointerId = -1
    }

    const onEnter = () => {
      hoverPaused = true
    }
    const onLeave = () => {
      hoverPaused = false
    }

    el.addEventListener("pointerdown", onDown)
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerup", onUp)
    el.addEventListener("pointercancel", onUp)
    el.addEventListener("mouseenter", onEnter)
    el.addEventListener("mouseleave", onLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      el.removeEventListener("pointerdown", onDown)
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerup", onUp)
      el.removeEventListener("pointercancel", onUp)
      el.removeEventListener("mouseenter", onEnter)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [pxPerSecond])

  return ref
}
