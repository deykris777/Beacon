"use client"

import { Modal } from "@/components/ui/modal"
import { cn } from "@/utils"
import { UserButton } from "@clerk/nextjs"
import { Gem, Home, Key, type LucideIcon, Menu, Settings } from 'lucide-react'
import Link from "next/link"
import { PropsWithChildren, useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { usePathname } from "next/navigation"

interface SidebarItem {
  href: string
  icon: LucideIcon
  text: string
}

interface SidebarCategory {
  category: string
  items: SidebarItem[]
}

const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    category: "Overview",
    items: [{ href: "/dashboard", icon: Home, text: "Dashboard" }],
  },
  {
    category: "Account",
    items: [{ href: "/dashboard/upgrade", icon: Gem, text: "Upgrade" }],
  },
  {
    category: "Settings",
    items: [
      { href: "/dashboard/api-key", icon: Key, text: "API Key" },
      {
        href: "/dashboard/account-settings",
        icon: Settings,
        text: "Account Settings",
      },
    ],
  },
]

const Logos = () => {
  return (
    <Link href="/" className="flex z-40 items-center gap-2">
      <div className="flex items-center justify-center w-7 h-7 bg-[#DC143C] text-background text-xs font-black font-mono">
        P
      </div>
      <span className="hidden sm:block text-foreground font-pixel text-2xl tracking-wider uppercase">
        Procmon
      </span>
    </Link>
  )
}

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname()

  return (
    <div className="space-y-4 md:space-y-6 relative z-20 flex flex-col h-full">
      {/* logo */}
      <div className="flex items-center justify-between">
        <Logos />
        <ModeToggle />
      </div>
      {/* navigation items */}
      <div className="grow">
        <ul>
          {SIDEBAR_ITEMS.map(({ category, items }) => (
            <li key={category} className="mb-4 md:mb-6">
              <p className="text-[10px] font-mono uppercase tracking-wider text-foreground/40 mb-2">
                {category}
              </p>
              <div className="flex flex-col gap-1">
                {items.map((item, i) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={i}
                      href={item.href}
                      className={cn(
                        "w-full justify-start group flex items-center gap-x-3 px-3 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-150",
                        isActive
                          ? "border-l-2 border-[#DC143C] pl-2.5 text-primary bg-primary/5 font-bold"
                          : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                      )}
                      onClick={onClose}
                    >
                      <item.icon className={cn(
                        "size-4 transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-foreground/40 group-hover:text-foreground"
                      )} />
                      <span>{item.text}</span>
                      {isActive && <span className="ml-auto text-primary text-[8px]">■</span>}
                    </Link>
                  )
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col">
        <hr className="my-4 w-full h-px bg-foreground/10" />
        <UserButton
          showName
          appearance={{
            elements: {
              userButtonBox: "flex-row-reverse text-foreground font-mono text-xs uppercase tracking-wider",
              userButtonOuterIdentifier: "text-foreground font-bold",
            },
          }}
        />
      </div>
    </div>
  )
}

const Layout = ({ children }: PropsWithChildren) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="relative h-screen flex flex-col md:flex-row bg-background overflow-hidden">
      {/* Subtle background pixel grid */}
      <div className="absolute inset-0 pixel-bg-grid opacity-30 pointer-events-none" />

      <div className="hidden md:block w-64 lg:w-72 p-4 h-full relative z-10">
        <div className="h-full border border-foreground/10 bg-card p-6 shadow-[3px_3px_0_0_rgba(0,0,0,0.05)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,0.02)]">
          <Sidebar />
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden p-0 md:p-4 md:pl-0">
        <div className="md:hidden flex items-center justify-between p-4 bg-card border-b border-foreground/10">
          <Logos />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 text-foreground/75 hover:text-foreground"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto md:border md:border-foreground/10 bg-card md:shadow-[3px_3px_0_0_rgba(0,0,0,0.05)] dark:md:shadow-[3px_3px_0_0_rgba(255,255,255,0.02)] relative z-10">
          <div className="relative min-h-full flex flex-col p-4 sm:p-6 lg:p-8">
            <div className="h-full flex flex-col flex-1">
              {children}
            </div>
          </div>
        </div>

        <Modal
          className="p-4 bg-card border border-foreground/10 max-w-[280px]"
          showModal={isDrawerOpen}
          setShowModal={setIsDrawerOpen}
        >
          <Sidebar onClose={() => setIsDrawerOpen(false)} />
        </Modal>
      </div>
    </div>
  )
}

export default Layout
