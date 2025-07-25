"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "left" | "right" | "scale"
  delay?: number
}

export function ScrollReveal({ children, className = "", direction = "up", delay = 0 }: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("active")
            }, delay)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getRevealClass = () => {
    switch (direction) {
      case "left":
        return "reveal-left"
      case "right":
        return "reveal-right"
      case "scale":
        return "reveal-scale"
      default:
        return "reveal"
    }
  }

  return (
    <div ref={elementRef} className={`${getRevealClass()} ${className}`}>
      {children}
    </div>
  )
}
