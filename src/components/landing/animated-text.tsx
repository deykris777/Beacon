"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"

export const AnimatedText = ({
  text,
  className,
  variant = "wave",
}: {
  text: string
  className?: string
  variant?: "wave" | "split"
}) => {
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!el.current) return
    const chars = el.current.querySelectorAll("span")
    
    if (variant === "wave") {
      gsap.from(chars, {
        opacity: 0,
        y: 30,
        rotation: 10,
        stagger: 0.03,
        duration: 0.6,
        ease: "back.out(1.7)",
      })
    } else if (variant === "split") {
      gsap.from(chars, {
        opacity: 0,
        scale: 0.5,
        stagger: 0.05,
        duration: 0.4,
        ease: "power3.out",
      })
    }
  }, [variant])

  return (
    <div ref={el} className={`${className} inline-block`}>
      {text.split("").map((char, i) => (
        <span key={i} style={{ display: "inline-block" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  )
}

export const CountUp = ({
  end,
  duration = 2,
  className,
  suffix = "",
}: {
  end: number
  duration?: number
  className?: string
  suffix?: string
}) => {
  const el = useRef<HTMLSpanElement>(null)
  const obj = useRef({ val: 0 }).current

  useEffect(() => {
    gsap.to(obj, {
      val: end,
      duration,
      onUpdate: () => {
        if (el.current) {
          el.current.innerText = Math.round(obj.val).toString() + suffix
        }
      },
    })
  }, [end, duration, suffix, obj])

  return <span ref={el} className={className} />
}
