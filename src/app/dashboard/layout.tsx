"use client"

import { buttonVariants } from "@/components/ui/button"
import { Modal } from "@/components/ui/model"
import { cn } from "@/utils"
import { UserButton } from "@clerk/nextjs"
import { Gem, Home, Key, type LucideIcon, Menu, Settings, Sparkles } from 'lucide-react'
import Link from "next/link"
import { PropsWithChildren, useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"

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
    <Link href="/" className="flex z-40 items-center gap-2 font-black text-xl">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg">
        <Sparkles className="size-4 text-white" />
      </div>
      <span className="hidden sm:block bg-gradient-to-r from-brand-600 to-brand-700 dark:from-brand-400 dark:to-brand-500 bg-clip-text text-transparent">
        Procmon
      </span>
    </Link>
  )
}

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  return (
    <div className="space-y-4 md:space-y-6 relative z-20 flex flex-col h-full">
      {/* logo */}
      <div className="flex items-center justify-between">
        <Logos />
        <ModeToggle />
      </div>
      {/* navigation items */}
      <div className="flex-grow">
        <ul>
          {SIDEBAR_ITEMS.map(({ category, items }) => (
            <li key={category} className="mb-4 md:mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                {category}
              </p>
              <div className="-mx-2 flex flex-1 flex-col gap-1">
                {items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      "w-full justify-start group flex items-center gap-x-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-white/60 dark:hover:bg-white/10 hover:shadow-sm transition-all duration-200 dark:text-gray-300"
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="size-5 text-gray-500 group-hover:text-brand-600 dark:text-gray-400 dark:group-hover:text-brand-400 transition-colors" />
                    {item.text}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col">
        <hr className="my-4 md:my-6 w-full h-px bg-gray-200/50 dark:bg-gray-700/50" />
        <UserButton
          showName
          appearance={{
            elements: {
              userButtonBox: "flex-row-reverse dark:text-gray-300",
              userButtonOuterIdentifier: "dark:text-gray-300 font-medium",
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
    <div className="relative h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl dark:bg-brand-500/5" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl dark:bg-purple-500/5" />
      
      <div className="hidden md:block w-64 lg:w-80 p-4 h-full relative z-10">
        <div className="h-full rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6">
          <Sidebar />
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden p-0 md:p-4 md:pl-0">
        <div className="md:hidden flex items-center justify-between p-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-white/10">
          <Logos />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-white/50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-white/10 transition-all"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto md:rounded-2xl md:border md:border-white/20 md:dark:border-white/10 bg-white/80 dark:bg-gray-900/80 md:backdrop-blur-xl md:shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative z-10">
          <div className="relative min-h-full flex flex-col">
            <div className="h-full flex flex-col flex-1 space-y-4">
              {children}
            </div>
          </div>
        </div>

        <Modal
          className="p-4 dark:bg-gray-900"
          showModal={isDrawerOpen}
          setShowModal={setIsDrawerOpen}
        >
          {/* <div className="flex justify-between items-center mb-4"> */}
          {/*   <Logos /> */}
          {/*   <Button */}
          {/*     variant="ghost" */}
          {/*     size="icon" */}
          {/*     aria-label="Close menu" */}
          {/*     onClick={() => setIsDrawerOpen(false)} */}
          {/*     className="dark:hover:bg-gray-800 dark:text-zinc-300" */}
          {/*   > */}
          {/* <X className="size-5" /> */}
          {/*   </Button> */}
          {/* </div> */}

          <Sidebar onClose={() => setIsDrawerOpen(false)} />
        </Modal>
      </div >
    </div >
  )
}

export default Layout


