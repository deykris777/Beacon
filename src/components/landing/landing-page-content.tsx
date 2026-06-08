"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Check, Star, ArrowRight, Zap, Bell, Code2, BarChart3, Shield, Users } from "lucide-react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneLight, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useTheme } from "next-themes"

import {
  GSAPProvider,
  GlassCard,
  NeoButton,
  FloatingElement,
  MagneticElement,
  ScrollProgress,
  CyberBackground,
} from "@/components/landing"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { MockDiscordUI } from "@/components/mock-discord-ui"
import { AnimatedList } from "@/components/ui/animated-list"
import { DiscordMessage } from "@/components/discord-message"
import { Icons } from "@/components/icons"

gsap.registerPlugin(ScrollTrigger)

const codeSnippet = `await fetch("https://procmon.sh/api/v1/events", {
  method: "POST",
  body: JSON.stringify({
    category: "sale",
    fields: {
      plan: "PRO",
      email: "zoe.martinez2001@email.com",
      amount: 49.00
    }
  }),
  headers: {
    Authorization: "Bearer <YOUR_API_KEY>"
  }
})`

const features = [
  { icon: Bell, title: "Real-time Alerts", description: "Instant Discord notifications the moment events happen" },
  { icon: Code2, title: "Easy Integration", description: "Simple API that works with any language or framework" },
  { icon: BarChart3, title: "Analytics", description: "Track and visualize your SaaS metrics in real-time" },
  { icon: Shield, title: "Secure", description: "Enterprise-grade security for your event data" },
  { icon: Zap, title: "Lightning Fast", description: "Sub-second delivery to your Discord channels" },
  { icon: Users, title: "Team Ready", description: "Collaborate with your entire team seamlessly" },
]

const stats = [
  { value: "10,000+", label: "Events Tracked" },
  { value: "500+", label: "Happy Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "50ms", label: "Avg Latency" },
]

export function LandingPageContent() {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (heroRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".hero-title", {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
        })

        gsap.from(".hero-subtitle", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
        })

        gsap.from(".hero-features", {
          opacity: 0,
          y: 15,
          duration: 0.6,
          delay: 0.4,
          ease: "power2.out",
        })

        gsap.from(".hero-cta", {
          opacity: 0,
          y: 15,
          duration: 0.6,
          delay: 0.5,
          ease: "power2.out",
        })

        gsap.from(".hero-visual", {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: 0.6,
          ease: "power3.out",
        })
      }, heroRef)

      return () => ctx.revert()
    }
  }, [])

  useEffect(() => {
    if (featuresRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".feature-card", {
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 30,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        })
      }, featuresRef)

      return () => ctx.revert()
    }
  }, [])

  return (
    <GSAPProvider>
      <ScrollProgress />
      <CyberBackground />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24"
      >
        <MaxWidthWrapper className="relative">
          <div className="flex flex-col items-center text-center">
            
            <div className="hero-title mb-4 sm:mb-6 inline-flex items-center gap-1.5 border border-primary/20 bg-primary/5 text-primary px-3 py-1 font-pixel text-base sm:text-lg uppercase tracking-wider">
              <Zap className="size-3.5 text-primary" />
              <span>System Status: Online</span>
            </div>

            <h1 className="hero-title max-w-4xl text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight px-1 leading-[1.1] uppercase text-foreground">
              Real-Time SaaS Insights,
              <br />
              <span className="text-primary">
                Delivered to Your Discord
              </span>
            </h1>

            <p className="hero-subtitle mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base lg:text-lg text-foreground/80 px-1 font-medium">
              Procmon is the easiest way to monitor your SaaS. Get instant notifications for{" "}
              <span className="border-b-2 border-primary pb-0.5">sales, new users, or any other event</span>{" "}
              sent directly to your Discord.
            </p>

            <ul className="hero-features mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-wider px-1">
              {["Real-time alerts", "One-time payment", "Track any event"].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-1.5 border border-foreground/10 bg-card px-3.5 py-1.5 shadow-[2px_2px_0_0_rgba(0,0,0,0.05)]"
                >
                  <Check className="size-3.5 text-primary" />
                  <span className="text-foreground/90 font-bold">{item}</span>
                </li>
              ))}
            </ul>

            <div className="hero-cta mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-2 sm:px-0">
              <MagneticElement strength={0.15}>
                <NeoButton href="/sign-up" variant="primary" size="md" className="w-full sm:w-auto">
                  Start for Free <ArrowRight className="size-4" />
                </NeoButton>
              </MagneticElement>
              <MagneticElement strength={0.15}>
                <NeoButton href="#features" variant="outline" size="md" className="w-full sm:w-auto">
                  See Features
                </NeoButton>
              </MagneticElement>
            </div>

            <div className="hero-visual mt-12 w-full max-w-4xl px-1 sm:px-0">
              <GlassCard variant="neo" className="p-1 sm:p-2 bg-card border-foreground/10">
                <MockDiscordUI>
                  <AnimatedList>
                    <DiscordMessage
                      avatarSrc="/brand-asset-profile-picture.png"
                      avatarAlt="Procmon Avatar"
                      username="Procmon"
                      timestamp="Today at 12:35PM"
                      badgeText="SignUp"
                      badgeColor="#DC143C"
                      title="👤 New user signed up"
                      content={{
                        name: "Mateo Ortiz",
                        email: "m.ortiz19@gmail.com",
                      }}
                    />
                    <DiscordMessage
                      avatarSrc="/brand-asset-profile-picture.png"
                      avatarAlt="Procmon Avatar"
                      username="Procmon"
                      timestamp="Today at 12:35PM"
                      badgeText="Revenue"
                      badgeColor="#DC143C"
                      title="💰 Payment received"
                      content={{
                        amount: "$49.00",
                        email: "zoe.martinez2001@email.com",
                        plan: "PRO",
                      }}
                    />
                    <DiscordMessage
                      avatarSrc="/brand-asset-profile-picture.png"
                      avatarAlt="Procmon Avatar"
                      username="Procmon"
                      timestamp="Today at 5:11AM"
                      badgeText="Milestone"
                      badgeColor="#DC143C"
                      title="🚀 Revenue Milestone Achieved"
                      content={{
                        recurringRevenue: "$5,000 USD",
                        growth: "+8.2%",
                      }}
                    />
                  </AnimatedList>
                </MockDiscordUI>
              </GlassCard>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <div className="pixel-divider max-w-6xl mx-auto my-6" />

      {/* Stats Section */}
      <section className="relative py-8">
        <MaxWidthWrapper>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center"
              >
                <GlassCard variant="neo" className="p-4 sm:p-6 bg-card border-foreground/10">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-pixel text-primary">
                    {stat.value}
                  </div>
                  <p className="mt-1 text-[10px] sm:text-xs text-foreground/60 font-mono uppercase tracking-wider">{stat.label}</p>
                </GlassCard>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      <div className="pixel-divider max-w-6xl mx-auto my-6" />

      {/* Features Section */}
      <section
        id="features"
        ref={featuresRef}
        className="relative py-12 sm:py-16 lg:py-24"
      >
        <MaxWidthWrapper>
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 border border-primary/20 bg-primary/5 text-primary text-base font-pixel uppercase tracking-wider mb-3">
              Overview
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-foreground mb-3 px-2 uppercase tracking-tight">
              Stay ahead with real-time insights
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-foreground/70 max-w-2xl mx-auto px-2 font-medium">
              Everything you need to monitor your SaaS business in one clean, reliable dashboard.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <GlassCard variant="neo" hover className="p-5 sm:p-6 h-full bg-card border-foreground/10">
                  <div className="w-10 h-10 bg-primary text-background flex items-center justify-center mb-4 border border-foreground shadow-[2px_2px_0_0_currentColor]">
                    <feature.icon className="size-5" />
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground mb-2 uppercase tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground/70 font-medium">
                    {feature.description}
                  </p>
                </GlassCard>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>

      <div className="pixel-divider max-w-6xl mx-auto my-6" />

      {/* Bento Grid Features */}
      <section className="relative py-12 sm:py-16 lg:py-24">
        <MaxWidthWrapper>
          <div className="grid gap-4 sm:gap-6">
            
            {/* First Row */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              <div>
                <GlassCard variant="neo" className="h-full overflow-hidden bg-card border-foreground/10">
                  <div className="p-5 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-foreground uppercase tracking-wider">
                      Real-time notifications
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-foreground/70 font-medium">
                      Get notified about critical events the moment they happen, no matter where you are.
                    </p>
                  </div>
                  <div className="relative h-[160px] sm:h-[220px] w-full">
                    <div className="absolute inset-x-4 bottom-0 top-0 overflow-hidden border border-b-0 border-foreground/10 bg-background">
                      <Image
                        className="size-full object-cover object-top"
                        src="/phone-screen.png"
                        alt="Phone screen"
                        fill
                      />
                    </div>
                  </div>
                </GlassCard>
              </div>

              <div>
                <GlassCard variant="neo" className="h-full overflow-hidden bg-card border-foreground/10">
                  <div className="p-5 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-foreground uppercase tracking-wider">
                      Easy Integration
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-foreground/70 font-medium">
                      Connect Procmon with your workflows in minutes with our simple API client.
                    </p>
                  </div>
                  <div className="relative mx-4 mb-4 border border-foreground/10 bg-card overflow-hidden shadow-[2px_2px_0_0_rgba(0,0,0,0.05)]">
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-background border-b border-foreground/10">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div className="w-2 h-2 rounded-full bg-foreground/35" />
                        <div className="w-2 h-2 rounded-full bg-foreground/20" />
                      </div>
                      <span className="text-[10px] text-foreground/60 ml-1 font-mono">procmon.js</span>
                    </div>
                    <div className="max-h-[140px] sm:max-h-48 overflow-hidden text-[9px] sm:text-xs font-mono">
                      <SyntaxHighlighter
                        language="typescript"
                        style={theme === "dark" ? oneDark : oneLight}
                        customStyle={{
                          background: "transparent",
                          margin: 0,
                          padding: "1rem",
                        }}
                      >
                        {codeSnippet}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              <div>
                <GlassCard variant="neo" className="h-full p-5 sm:p-6 bg-card border-foreground/10">
                  <h3 className="text-base sm:text-lg font-bold text-foreground uppercase tracking-wider">
                    Track Any Event
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-foreground/70 font-medium">
                    From new signups to payments, track all your critical SaaS events.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <Image
                      src="/bento-any-event.png"
                      alt="Event tracking"
                      width={300}
                      height={200}
                      className="border border-foreground/10 shadow-[4px_4px_0_0_rgba(0,0,0,0.05)] w-full max-w-[280px]"
                    />
                  </div>
                </GlassCard>
              </div>

              <div>
                <GlassCard variant="neo" className="h-full p-5 sm:p-6 bg-card border-foreground/10">
                  <h3 className="text-base sm:text-lg font-bold text-foreground uppercase tracking-wider">
                    Custom Properties
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-foreground/70 font-medium">
                    Add any custom data to your events, from user emails to purchase amounts.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <Image
                      src="/bento-custom-data.png"
                      alt="Custom data"
                      width={300}
                      height={200}
                      className="border border-foreground/10 shadow-[4px_4px_0_0_rgba(0,0,0,0.05)] w-full max-w-[280px]"
                    />
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <div className="pixel-divider max-w-6xl mx-auto my-6" />

      {/* Testimonials */}
      <section className="relative py-12 sm:py-16 lg:py-24">
        <MaxWidthWrapper>
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 border border-primary/20 bg-primary/5 text-primary text-base font-pixel uppercase tracking-wider mb-3">
              Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-foreground px-2 uppercase tracking-tight">
              What founders say
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div>
              <GlassCard variant="neo" className="p-5 h-full bg-card border-foreground/10">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3.5 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 mb-4 font-medium italic">
                  &ldquo;Procmon has been a game-changer for me. Seeing sales pop up in real-time in our Discord is incredibly motivating.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src="/user-2.png"
                    alt="Freya Larsson"
                    width={40}
                    height={40}
                    className="border border-foreground/10 w-9 h-9 shadow-sm"
                  />
                  <div>
                    <p className="font-bold text-foreground flex items-center gap-1 text-xs sm:text-sm">
                      Freya Larsson
                      <Icons.verificationBadge className="size-3 text-primary" />
                    </p>
                    <p className="text-[10px] text-foreground/60 font-mono">@itsfreya</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div>
              <GlassCard variant="neo" className="p-5 h-full bg-card border-foreground/10">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3.5 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 mb-4 font-medium italic">
                  &ldquo;Procmon just works. Incredibly fast integration and the alerts are instant. Easily makes it our favorite new tool.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src="/user-1.png"
                    alt="Kai Durant"
                    width={40}
                    height={40}
                    className="border border-foreground/10 w-9 h-9 shadow-sm"
                  />
                  <div>
                    <p className="font-bold text-foreground flex items-center gap-1 text-xs sm:text-sm">
                      Kai Durant
                      <Icons.verificationBadge className="size-3 text-primary" />
                    </p>
                    <p className="text-[10px] text-foreground/60 font-mono">@kdurant_</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <div className="pixel-divider max-w-6xl mx-auto my-6" />

      {/* CTA Section */}
      <section className="relative py-12 sm:py-16 lg:py-24">
        <MaxWidthWrapper>
          <div>
            <GlassCard variant="neo" className="p-6 sm:p-10 lg:p-14 text-center bg-card border-foreground/10">
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-foreground mb-3 uppercase tracking-tight">
                Ready to get started?
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-foreground/75 mb-6 max-w-xl mx-auto font-medium">
                Join hundreds of SaaS founders who are already monitoring their business with Procmon.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <MagneticElement strength={0.15}>
                  <NeoButton href="/sign-up" variant="primary" size="md">
                    Start for Free <ArrowRight className="size-4" />
                  </NeoButton>
                </MagneticElement>
                <MagneticElement strength={0.15}>
                  <NeoButton href="/pricing" variant="secondary" size="md">
                    View Pricing
                  </NeoButton>
                </MagneticElement>
              </div>

              <div className="mt-8 pt-6 border-t border-dashed border-foreground/10">
                <p className="text-[10px] sm:text-xs text-foreground/50 mb-3 uppercase tracking-wider font-mono">Trusted by developers worldwide</p>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 opacity-45">
                  <div className="text-sm font-mono font-bold text-foreground uppercase tracking-widest">Company</div>
                  <div className="text-sm font-mono font-bold text-foreground uppercase tracking-widest">Startup</div>
                  <div className="text-sm font-mono font-bold text-foreground uppercase tracking-widest hidden sm:block">Business</div>
                  <div className="text-sm font-mono font-bold text-foreground uppercase tracking-widest hidden sm:block">Agency</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-foreground/10 bg-card py-10 transition-colors">
        <MaxWidthWrapper>
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="lg:w-1/3">
              <Link href="/" className="inline-block">
                <span className="text-2xl font-pixel text-foreground uppercase tracking-wider">Procmon</span>
              </Link>
              <p className="mt-2 text-xs sm:text-sm text-foreground/70 font-medium">
                Real-Time SaaS Insights, Delivered to Your Discord
              </p>
            </div>

            <div className="flex flex-wrap gap-8 lg:gap-16">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-3">Product</h3>
                <ul className="space-y-1.5 font-semibold">
                  <li>
                    <Link href="#features" className="text-xs text-foreground/70 hover:text-primary transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="text-xs text-foreground/70 hover:text-primary transition-colors">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-3">Legal</h3>
                <ul className="space-y-1.5 font-semibold">
                  <li>
                    <Link href="/" className="text-xs text-foreground/70 hover:text-primary transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="text-xs text-foreground/70 hover:text-primary transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-foreground/10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-foreground/50 font-mono">
                &copy; {new Date().getFullYear()} Procmon. All rights reserved.
              </p>
              <div className="flex gap-2.5">
                <Link
                  href="https://x.com/xenoz4L"
                  className="w-8 h-8 flex items-center justify-center text-foreground/60 border border-foreground/10 hover:border-primary hover:text-primary transition-colors bg-background"
                >
                  <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/rishavkumar18/"
                  className="w-8 h-8 flex items-center justify-center text-foreground/60 border border-foreground/10 hover:border-primary hover:text-primary transition-colors bg-background"
                >
                  <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
                <Link
                  href="https://github.com/Rishav07-05"
                  className="w-8 h-8 flex items-center justify-center text-foreground/60 border border-foreground/10 hover:border-primary hover:text-primary transition-colors bg-background"
                >
                  <svg className="size-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </footer>
    </GSAPProvider>
  )
}
