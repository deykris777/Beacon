"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface CurvySeparatorProps {
  className?: string
  variant?: "wave" | "blob" | "mountain" | "liquid"
  flip?: boolean
  color?: string
}

export const CurvySeparator = ({
  className = "",
  variant = "wave",
  flip = false,
  color,
}: CurvySeparatorProps) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || variant !== "liquid") return

    const path = svgRef.current.querySelector("path")
    if (!path) return

    // Animate the liquid wave
    gsap.to(path, {
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      attr: {
        d: generateLiquidPath(),
      },
    })
  }, [variant])

  const paths = {
    wave: "M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    blob: "M0,160L48,181.3C96,203,192,245,288,240C384,235,480,181,576,176C672,171,768,213,864,213.3C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    mountain: "M0,224L80,213.3C160,203,320,181,480,192C640,203,800,245,960,234.7C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z",
    liquid: "M0,160L60,181.3C120,203,240,245,360,234.7C480,224,600,160,720,138.7C840,117,960,139,1080,170.7C1200,203,1320,245,1380,266.7L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
  }

  return (
    <div className={`w-full overflow-hidden ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        ref={svgRef}
        viewBox="0 0 1440 320"
        className="w-full h-auto block"
        preserveAspectRatio="none"
      >
        <path
          fill={color || "currentColor"}
          fillOpacity="1"
          d={paths[variant]}
        />
      </svg>
    </div>
  )
}

function generateLiquidPath(): string {
  const points = [
    { x: 0, y: 160 + gsap.utils.random(-40, 40) },
    { x: 60, y: 181 + gsap.utils.random(-40, 40) },
    { x: 120, y: 203 + gsap.utils.random(-40, 40) },
    { x: 240, y: 245 + gsap.utils.random(-40, 40) },
    { x: 360, y: 234 + gsap.utils.random(-40, 40) },
    { x: 480, y: 224 + gsap.utils.random(-40, 40) },
    { x: 600, y: 160 + gsap.utils.random(-40, 40) },
    { x: 720, y: 138 + gsap.utils.random(-40, 40) },
    { x: 840, y: 117 + gsap.utils.random(-40, 40) },
    { x: 960, y: 139 + gsap.utils.random(-40, 40) },
    { x: 1080, y: 170 + gsap.utils.random(-40, 40) },
    { x: 1200, y: 203 + gsap.utils.random(-40, 40) },
    { x: 1320, y: 245 + gsap.utils.random(-40, 40) },
    { x: 1380, y: 266 + gsap.utils.random(-40, 40) },
    { x: 1440, y: 288 + gsap.utils.random(-40, 40) },
  ]

  let path = `M${points[0].x},${points[0].y}`
  
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const cpX = (prev.x + curr.x) / 2
    path += `C${cpX},${prev.y},${cpX},${curr.y},${curr.x},${curr.y}`
  }

  path += "L1440,320L0,320Z"
  return path
}

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  duration?: number
  distance?: number
  delay?: number
}

export const FloatingElement = ({
  children,
  className = "",
  duration = 3,
  distance = 20,
  delay = 0,
}: FloatingElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    gsap.to(elementRef.current, {
      y: distance,
      duration,
      delay,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, [duration, distance, delay])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

interface MagneticElementProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export const MagneticElement = ({
  children,
  className = "",
  strength = 0.3,
}: MagneticElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      })
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

interface ScrollProgressProps {
  className?: string
  color?: string
}

export const ScrollProgress = ({ 
  className = "",
  color = "bg-brand-600" 
}: ScrollProgressProps) => {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!progressRef.current) return

    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100

      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.1,
        ease: "none",
      })
    }

    window.addEventListener("scroll", updateProgress)
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return (
    <div className={`fixed top-0 left-0 w-full h-1 z-[100] bg-transparent ${className}`}>
      <div ref={progressRef} className={`h-full ${color}`} style={{ width: 0 }} />
    </div>
  )
}
