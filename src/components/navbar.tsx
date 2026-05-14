"use client"

import { useState } from "react"
import Link from "next/link"
import { MaxWidthWrapper } from "./max-width-wrapper"
import { SignOutButton, useUser } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { ArrowRight, Sparkles, Menu, X } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

export const Navbar = () => {
  const { user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed z-50 inset-x-0 top-2 sm:top-4 w-full px-2 sm:px-4">
      <MaxWidthWrapper>
        <div className="relative flex h-12 sm:h-14 items-center justify-between px-3 sm:px-6 rounded-xl sm:rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          {/* Liquid glass shine effect */}
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-white/40 via-transparent to-white/40 dark:from-white/5 dark:via-transparent dark:to-white/5 pointer-events-none" />
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-b from-white/60 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none" />
          
          <Link href="/" className="relative flex z-40 items-center gap-1.5 sm:gap-2 font-black text-lg sm:text-xl">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg">
              <Sparkles className="size-3.5 sm:size-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-brand-600 to-brand-700 dark:from-brand-400 dark:to-brand-500 bg-clip-text text-transparent">
              Procmon
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="relative h-full hidden md:flex items-center gap-2">
            {user ? (
              <>
                <SignOutButton>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10 rounded-xl transition-all"
                  >
                    Sign out
                  </Button>
                </SignOutButton>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1.5 px-4 py-2 font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-105 transition-all duration-200"
                >
                  Dashboard <ArrowRight className="size-4" />
                </Link>
                <div className="ml-1">
                  <ModeToggle />
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className="px-3 py-2 font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/sign-in"
                  className="px-3 py-2 font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Sign in
                </Link>

                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1" />

                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-1.5 px-4 py-2 font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-105 transition-all duration-200"
                >
                  Sign up <ArrowRight className="size-4" />
                </Link>
                <div className="ml-1">
                  <ModeToggle />
                </div>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative z-50 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="size-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="size-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-xl border border-white/20 dark:border-white/10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg">
            <div className="flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-4 py-3 font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl"
                  >
                    Dashboard <ArrowRight className="size-4" />
                  </Link>
                  <SignOutButton>
                    <Button 
                      variant="ghost"
                      className="w-full font-semibold text-gray-600 dark:text-gray-300 rounded-xl"
                    >
                      Sign out
                    </Button>
                  </SignOutButton>
                </>
              ) : (
                <>
                  <Link
                    href="/pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl text-center transition-colors"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl text-center transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-4 py-3 font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl"
                  >
                    Sign up <ArrowRight className="size-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </nav>
  )
}
