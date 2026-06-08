"use client"

import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export const CyberBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState("LOC 40.7128° N, 74.0060° W")

  useEffect(() => {
    // Generate coordinate changes occasionally for tech flavor
    const interval = setInterval(() => {
      const lat = (40.7128 + (Math.random() * 0.1 - 0.05)).toFixed(4)
      const lng = (74.0060 + (Math.random() * 0.1 - 0.05)).toFixed(4)
      setCoords(`LOC ${lat}° N, ${lng}° W`)
    }, 8000)

    const particleContainer = particlesRef.current
    if (!particleContainer) return

    const symbols = ["■", "▫", "□", "+"]
    const count = 20
    const elements: HTMLSpanElement[] = []

    for (let i = 0; i < count; i++) {
      const el = document.createElement("span")
      el.innerText = symbols[Math.floor(Math.random() * symbols.length)]
      el.className = "absolute text-[8px] md:text-[10px] font-mono select-none pointer-events-none text-primary/15 dark:text-foreground/10"
      
      gsap.set(el, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: 0.6 + Math.random() * 0.8,
      })

      particleContainer.appendChild(el)
      elements.push(el)

      gsap.to(el, {
        y: `-=${80 + Math.random() * 120}`,
        x: `+=${Math.random() * 40 - 20}`,
        duration: 10 + Math.random() * 15,
        ease: "none",
        repeat: -1,
        yoyo: false,
        onRepeat: () => {
          gsap.set(el, {
            y: window.innerHeight + 20,
            x: Math.random() * window.innerWidth,
          })
        }
      })
    }

    const handleResize = () => {
      elements.forEach((el) => {
        gsap.set(el, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        })
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
      if (particleContainer) {
        particleContainer.innerHTML = ""
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 -z-30 overflow-hidden bg-background pointer-events-none">
      {/* Subtle Pixel Grid Overlay */}
      <div className="absolute inset-0 pixel-bg-grid opacity-60 pointer-events-none" />

      {/* Retro/Minimalist particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Decorative Monospace Corners */}
      <div className="absolute top-4 left-4 text-[9px] font-mono text-primary/30 dark:text-foreground/20 select-none uppercase tracking-widest hidden md:block">
        PROCMON_SYS_v2.0.1
      </div>
      <div className="absolute top-4 right-4 text-[9px] font-mono text-primary/30 dark:text-foreground/20 select-none uppercase tracking-widest hidden md:block">
        {coords}
      </div>
      <div className="absolute bottom-4 left-4 text-[9px] font-mono text-primary/30 dark:text-foreground/20 select-none uppercase tracking-widest hidden md:block">
        STATUS // ACTIVE
      </div>
      <div className="absolute bottom-4 right-4 text-[9px] font-mono text-primary/30 dark:text-foreground/20 select-none uppercase tracking-widest hidden md:block">
        FRAME_RATE // 60FPS
      </div>
    </div>
  )
}
