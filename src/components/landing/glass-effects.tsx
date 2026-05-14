"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface LiquidBlobProps {
  className?: string
  color?: string
  size?: number
  blur?: number
}

export const LiquidBlob = ({ 
  className = "", 
  color = "rgba(14, 165, 233, 0.3)", 
  size = 400,
  blur = 60 
}: LiquidBlobProps) => {
  const blobRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!blobRef.current) return

    const paths = blobRef.current.querySelectorAll("path")
    
    paths.forEach((path) => {
      gsap.to(path, {
        duration: gsap.utils.random(4, 8),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        attr: {
          d: generateBlobPath(),
        },
      })
    })
  }, [])

  return (
    <svg
      ref={blobRef}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ 
        width: size, 
        height: size, 
        filter: `blur(${blur}px)`,
        position: "absolute",
      }}
    >
      <path
        fill={color}
        d={generateBlobPath()}
      />
    </svg>
  )
}

function generateBlobPath(): string {
  const points = 6
  const angleStep = (Math.PI * 2) / points
  const radius = 80
  const variance = 20

  let path = ""
  const controlPoints: { x: number; y: number }[] = []

  for (let i = 0; i < points; i++) {
    const angle = i * angleStep
    const r = radius + gsap.utils.random(-variance, variance)
    const x = 100 + r * Math.cos(angle)
    const y = 100 + r * Math.sin(angle)
    controlPoints.push({ x, y })
  }

  path = `M ${controlPoints[0].x} ${controlPoints[0].y}`

  for (let i = 0; i < points; i++) {
    const current = controlPoints[i]
    const next = controlPoints[(i + 1) % points]
    const midX = (current.x + next.x) / 2
    const midY = (current.y + next.y) / 2
    path += ` Q ${current.x} ${current.y} ${midX} ${midY}`
  }

  path += " Z"
  return path
}

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: "light" | "dark" | "neo"
  hover?: boolean
}

export const GlassCard = ({ 
  children, 
  className = "", 
  variant = "light",
  hover = true 
}: GlassCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current || !hover) return

    const card = cardRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(card, {
        "--mouse-x": `${x}px`,
        "--mouse-y": `${y}px`,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    card.addEventListener("mousemove", handleMouseMove)
    return () => card.removeEventListener("mousemove", handleMouseMove)
  }, [hover])

  const variants = {
    light: "bg-white/30 backdrop-blur-xl border border-white/40 shadow-lg",
    dark: "bg-gray-900/40 backdrop-blur-xl border border-white/10 shadow-2xl",
    neo: "bg-white dark:bg-gray-900 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] lg:dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]",
  }

  return (
    <div
      ref={cardRef}
      className={`
        relative overflow-hidden rounded-2xl transition-all duration-300
        ${variants[variant]}
        ${hover ? "hover:shadow-2xl hover:-translate-y-1" : ""}
        ${className}
      `}
      style={{
        ["--mouse-x" as string]: "50%",
        ["--mouse-y" as string]: "50%",
      }}
    >
      {variant !== "neo" && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.2), transparent 40%)",
          }}
        />
      )}
      {children}
    </div>
  )
}

interface NeoButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  href?: string
}

export const NeoButton = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  onClick,
  href,
}: NeoButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    const button = buttonRef.current

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      })
    }

    const handleMouseDown = () => {
      gsap.to(button, {
        scale: 0.98,
        boxShadow: "2px 2px 0px 0px currentColor",
        duration: 0.1,
      })
    }

    const handleMouseUp = () => {
      gsap.to(button, {
        scale: 1.02,
        boxShadow: variant === "primary" ? "6px 6px 0px 0px rgba(0,0,0,1)" : "6px 6px 0px 0px currentColor",
        duration: 0.1,
      })
    }

    button.addEventListener("mouseenter", handleMouseEnter)
    button.addEventListener("mouseleave", handleMouseLeave)
    button.addEventListener("mousedown", handleMouseDown)
    button.addEventListener("mouseup", handleMouseUp)

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter)
      button.removeEventListener("mouseleave", handleMouseLeave)
      button.removeEventListener("mousedown", handleMouseDown)
      button.removeEventListener("mouseup", handleMouseUp)
    }
  }, [variant])

  const sizes = {
    sm: "px-3 py-1.5 sm:px-4 sm:py-2 text-sm",
    md: "px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base",
    lg: "px-5 py-2.5 sm:px-6 sm:py-3 text-base sm:text-lg",
  }

  const variants = {
    primary: "bg-brand-600 text-white border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:bg-brand-700",
    secondary: "bg-yellow-400 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-500",
    outline: "bg-transparent text-black dark:text-white border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:bg-black/5 dark:hover:bg-white/5",
  }

  const baseStyles = `
    relative inline-flex items-center justify-center gap-2 font-bold rounded-xl
    transition-colors duration-200 cursor-pointer
    ${sizes[size]}
    ${variants[variant]}
    ${className}
  `

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseStyles}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseStyles}
    >
      {children}
    </button>
  )
}
