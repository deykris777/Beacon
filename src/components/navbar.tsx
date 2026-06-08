"use client"

import { useState } from "react"
import Link from "next/link"
import { MaxWidthWrapper } from "./max-width-wrapper"
import { SignOutButton, useUser } from "@clerk/nextjs"
import { NeoButton } from "./landing"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

export const Navbar = () => {
  const { user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed z-50 inset-x-0 top-0 w-full border-b border-foreground/10 bg-background/80 backdrop-blur-md py-3 transition-all">
      <MaxWidthWrapper>
        <div className="flex items-center justify-between px-4">
          <Link href="/" className="flex z-40 items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 bg-[#DC143C] text-background text-xs font-black font-mono">
              P
            </div>
            <span className="text-foreground font-pixel text-2xl tracking-wider uppercase">
              Procmon
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <SignOutButton>
                  <button className="font-mono text-xs uppercase tracking-wider text-foreground/70 hover:text-foreground cursor-pointer transition-colors">
                    Sign out
                  </button>
                </SignOutButton>

                <NeoButton
                  href="/dashboard"
                  size="sm"
                  variant="primary"
                >
                  Dashboard
                </NeoButton>
                
                <ModeToggle />
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className="font-mono text-xs uppercase tracking-wider text-foreground/70 hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/sign-in"
                  className="font-mono text-xs uppercase tracking-wider text-foreground/70 hover:text-foreground transition-colors"
                >
                  Sign in
                </Link>

                <div className="h-4 w-px bg-foreground/10 mx-1" />

                <NeoButton
                  href="/sign-up"
                  size="sm"
                  variant="primary"
                >
                  Sign up
                </NeoButton>
                
                <ModeToggle />
              </>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <ModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-foreground"
            >
              {mobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 border-t border-foreground/10 bg-background/95 backdrop-blur-xl flex flex-col gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-2 text-center"
                >
                  <NeoButton variant="primary" className="w-full justify-center">
                    Dashboard
                  </NeoButton>
                </Link>
                <SignOutButton>
                  <button className="w-full font-mono text-xs uppercase tracking-wider text-foreground/70 hover:text-foreground py-2 text-center cursor-pointer">
                    Sign out
                  </button>
                </SignOutButton>
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-xs uppercase tracking-wider text-foreground/70 hover:text-foreground py-2 text-center transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-xs uppercase tracking-wider text-foreground/70 hover:text-foreground py-2 text-center transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center"
                >
                  <NeoButton variant="primary" className="w-full justify-center">
                    Sign up
                  </NeoButton>
                </Link>
              </>
            )}
          </div>
        )}
      </MaxWidthWrapper>
    </nav>
  )
}
