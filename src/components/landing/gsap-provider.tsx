"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"

export const GSAPProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    gsap.registerPlugin()
  }, [])

  return <>{children}</>
}
