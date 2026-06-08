"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"

export const FloatingElement = ({
  children,
  className,
  distance = 20,
  duration = 3,
}: {
  children: React.ReactNode
  className?: string
  distance?: number
  duration?: number
}) => {
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.to(el.current, {
      y: `random(${-distance}, ${distance})`,
      x: `random(${-distance}, ${distance})`,
      duration: `random(${duration * 0.8}, ${duration * 1.2})`,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    })
  }, [distance, duration])

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  )
}

export const MagneticElement = ({
  children,
  className,
  strength = 0.1,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
}) => {
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = el.current!.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      gsap.to(el.current, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(el.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      })
    }

    const currentEl = el.current
    currentEl?.addEventListener("mousemove", handleMouseMove)
    currentEl?.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      currentEl?.removeEventListener("mousemove", handleMouseMove)
      currentEl?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength])

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  )
}

export const ScrollProgress = ({ className }: { className?: string }) => {
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const height = document.body.scrollHeight - window.innerHeight
      const progress = scrollY / height
      gsap.to(el.current, {
        scaleX: progress,
        transformOrigin: "left",
        duration: 0.1,
        ease: "none",
      })
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      ref={el}
      className={`fixed top-0 left-0 w-full h-[4px] bg-[#DC143C] z-[9999] ${className}`}
    />
  )
}
