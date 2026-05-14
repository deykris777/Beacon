"use client"

import { useEffect, useRef, ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface GSAPProviderProps {
  children: ReactNode
}

export const GSAPProvider = ({ children }: GSAPProviderProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-animate]").forEach((element) => {
        const animationType = element.dataset.animate
        const delay = parseFloat(element.dataset.animateDelay || "0")
        const duration = parseFloat(element.dataset.animateDuration || "1")

        const animations: Record<string, gsap.TweenVars> = {
          "fade-up": { opacity: 0, y: 60 },
          "fade-down": { opacity: 0, y: -60 },
          "fade-left": { opacity: 0, x: -60 },
          "fade-right": { opacity: 0, x: 60 },
          "scale-up": { opacity: 0, scale: 0.8 },
          "rotate-in": { opacity: 0, rotation: -15 },
          "blur-in": { opacity: 0, filter: "blur(10px)" },
        }

        if (animationType && animations[animationType]) {
          gsap.from(element, {
            ...animations[animationType],
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          })
        }
      })

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        const speed = parseFloat(element.dataset.parallax || "0.5")
        gsap.to(element, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })

      gsap.utils.toArray<HTMLElement>("[data-stagger-parent]").forEach((parent) => {
        const children = parent.querySelectorAll("[data-stagger-child]")
        gsap.from(children, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: parent,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {children}
    </div>
  )
}
