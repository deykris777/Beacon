"use client"

import React from "react"
import Link from "next/link"

export const GlassCard = ({
  children,
  className = "",
  variant = "glass",
  hover = false,
}: {
  children: React.ReactNode
  className?: string
  variant?: "glass" | "neo"
  hover?: boolean
}) => {
  const baseClasses = "relative pixel-card"

  const hoverClasses = hover ? "pixel-card-hover" : ""

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {/* Pixel corner decorations for neo variant */}
      {variant === "neo" && (
        <>
          <div className="tech-corner-accent top-0 left-0" />
          <div className="tech-corner-accent top-0 right-0" />
          <div className="tech-corner-accent bottom-0 left-0" />
          <div className="tech-corner-accent bottom-0 right-0" />
        </>
      )}
      {children}
    </div>
  )
}

export const NeoButton = ({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
  size = "md",
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
}) => {
  const baseClasses = "inline-flex items-center gap-2 justify-center transition-all cursor-pointer font-mono active:scale-[0.98]"

  const variantClasses = {
    primary: "pixel-btn pixel-btn-primary",
    secondary: "pixel-btn bg-background text-foreground border-foreground",
    outline: "pixel-btn bg-transparent text-foreground/70 border-foreground/30 hover:border-foreground hover:text-foreground",
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm sm:text-base",
    lg: "px-9 py-3 text-base sm:text-lg",
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export const LiquidBlob = ({
  className,
  color,
  size,
  blur,
}: {
  className?: string
  color?: string
  size?: number
  blur?: number
}) => {
  return null // Hidden in Pixel Minimalism to keep layout clean and editorial
}
