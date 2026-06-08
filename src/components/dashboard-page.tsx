"use client"

import { ReactNode } from "react"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardPageProps {
  title: string
  children?: ReactNode
  hideBackButton?: boolean
  cta?: ReactNode
}

export const DashboardPage = ({
  title,
  children,
  cta,
  hideBackButton,
}: DashboardPageProps) => {
  const router = useRouter()

  return (
    <section className="flex-1 h-full w-full flex flex-col">
      <div className="w-full pb-6 mb-6 flex justify-between border-b border-foreground/10 bg-transparent">
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {hideBackButton ? null : (
              <button
                onClick={() => router.push("/dashboard")}
                className="p-2 border border-foreground/10 bg-card hover:border-primary hover:text-primary transition-colors cursor-pointer"
              >
                <ArrowLeft className="size-4" />
              </button>
            )}
            <h1 className="text-2xl sm:text-3xl font-mono uppercase tracking-wider font-bold text-foreground">
              {title}
            </h1>
          </div>
          {cta ? <div className="w-full sm:w-auto">{cta}</div> : null}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto">
        {children}
      </div>
    </section>
  )
}
