"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

interface AnimatedTextProps {
  text: string
  className?: string
  variant?: "split" | "typewriter" | "wave" | "gradient"
  delay?: number
  stagger?: number
}

export const AnimatedText = ({
  text,
  className = "",
  variant = "split",
  delay = 0,
  stagger = 0.03,
}: AnimatedTextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!containerRef.current || !isVisible) return

    const chars = containerRef.current.querySelectorAll(".char")

    if (variant === "split") {
      gsap.from(chars, {
        opacity: 0,
        y: 50,
        rotationX: -90,
        stagger,
        delay,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
    } else if (variant === "typewriter") {
      gsap.from(chars, {
        opacity: 0,
        stagger: stagger * 2,
        delay,
        duration: 0.1,
        ease: "none",
      })
    } else if (variant === "wave") {
      gsap.from(chars, {
        y: -30,
        opacity: 0,
        stagger: {
          each: stagger,
          repeat: 0,
        },
        delay,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      })
    } else if (variant === "gradient") {
      gsap.from(chars, {
        opacity: 0,
        scale: 0,
        stagger: {
          each: stagger,
          from: "center",
        },
        delay,
        duration: 0.5,
        ease: "back.out(2)",
      })
    }
  }, [isVisible, variant, delay, stagger])

  const words = text.split(" ")

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => (
            <span
              key={`${wordIndex}-${charIndex}`}
              className="char inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export const CountUp = ({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpProps) => {
  const countRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!countRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          
          gsap.to(countRef.current, {
            textContent: end,
            duration,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function() {
              if (countRef.current) {
                const value = Math.round(parseFloat(countRef.current.textContent || "0"))
                countRef.current.textContent = `${prefix}${value.toLocaleString()}${suffix}`
              }
            },
          })
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(countRef.current)
    return () => observer.disconnect()
  }, [end, duration, prefix, suffix, hasAnimated])

  return (
    <span ref={countRef} className={className}>
      {prefix}0{suffix}
    </span>
  )
}

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
}

export const Marquee = ({
  children,
  className = "",
  speed = 50,
  direction = "left",
  pauseOnHover = true,
}: MarqueeProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!marqueeRef.current || !innerRef.current) return

    const inner = innerRef.current
    const clone = inner.cloneNode(true) as HTMLElement
    marqueeRef.current.appendChild(clone)

    const totalWidth = inner.offsetWidth
    const duration = totalWidth / speed

    const tl = gsap.timeline({ repeat: -1 })
    
    const targets = marqueeRef.current.children
    
    tl.to(targets, {
      x: direction === "left" ? -totalWidth : totalWidth,
      duration,
      ease: "none",
    })

    if (pauseOnHover) {
      marqueeRef.current.addEventListener("mouseenter", () => tl.pause())
      marqueeRef.current.addEventListener("mouseleave", () => tl.resume())
    }

    return () => {
      tl.kill()
    }
  }, [speed, direction, pauseOnHover])

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={marqueeRef} className="flex">
        <div ref={innerRef} className="flex shrink-0">
          {children}
        </div>
      </div>
    </div>
  )
}

interface RevealProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
}

export const Reveal = ({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: RevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!containerRef.current || !isVisible) return

    const content = containerRef.current.querySelector(".reveal-content")
    const overlay = containerRef.current.querySelector(".reveal-overlay")

    const directions = {
      up: { y: 100 },
      down: { y: -100 },
      left: { x: 100 },
      right: { x: -100 },
    }

    gsap.set(content, { ...directions[direction], opacity: 0 })

    const tl = gsap.timeline({ delay })

    tl.to(overlay, {
      scaleX: direction === "left" || direction === "right" ? 0 : 1,
      scaleY: direction === "up" || direction === "down" ? 0 : 1,
      duration: 0.6,
      ease: "power3.inOut",
      transformOrigin: direction === "up" ? "bottom" : direction === "down" ? "top" : direction === "left" ? "right" : "left",
    })
    .to(content, {
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.3")
  }, [isVisible, direction, delay])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div className="reveal-content">{children}</div>
      <div className="reveal-overlay absolute inset-0 bg-brand-600 dark:bg-brand-500" />
    </div>
  )
}
