"use client"

import { Card } from "@/components/ui/card"
import { client } from "@/lib/client"
import { Plan } from "@/generated/client/enums"
import { useMutation, useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { BarChart } from "lucide-react"
import { useRouter } from "next/navigation"

export const UpgradePageContent = ({ plan }: { plan: Plan }) => {
  const router = useRouter()

  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: async () => {
      const res = await client.payment.createCheckoutSession.$post()
      return await res.json()
    },
    onSuccess: ({ url }) => {
      if (url) router.push(url)
    },
  })

  const { data: usageData } = useQuery({
    queryKey: ["usage"],
    queryFn: async () => {
      const res = await client.project.getUsage.$get()
      return await res.json()
    },
  })

  return (
    <div className="max-w-3xl flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-mono uppercase tracking-wider font-bold text-foreground">
          {plan === "PRO" ? "Plan: Pro" : "Plan: Free"}
        </h1>
        <p className="text-xs font-mono text-foreground/50 uppercase tracking-wider mt-2">
          {plan === "PRO"
            ? "Thank you for supporting Procmon. Find your increased usage limits below."
            : "Get access to more events, categories and premium support."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-primary bg-card p-5 shadow-[3px_3px_0_0_rgba(0,0,0,0.05)]">
          <div className="flex flex-row items-center justify-between pb-2">
            <p className="text-xs font-mono uppercase tracking-wider text-foreground/70">Total Events</p>
            <BarChart className="size-4 text-primary" />
          </div>

          <div>
            <p className="text-xl font-mono font-bold text-primary">
              {usageData?.eventsUsed || 0} of{" "}
              {usageData?.eventsLimit?.toLocaleString() || 100}
            </p>
            <p className="text-[10px] font-mono text-foreground/40 uppercase">
              Events this period
            </p>
          </div>
        </Card>
        
        <Card className="bg-card border-foreground/10 p-5 shadow-[3px_3px_0_0_rgba(0,0,0,0.05)]">
          <div className="flex flex-row items-center justify-between pb-2">
            <p className="text-xs font-mono uppercase tracking-wider text-foreground/70">Event Categories</p>
            <BarChart className="size-4 text-primary" />
          </div>

          <div>
            <p className="text-xl font-mono font-bold text-primary">
              {usageData?.categoriesUsed || 0} of{" "}
              {usageData?.categoriesLimit?.toLocaleString() || 10}
            </p>
            <p className="text-[10px] font-mono text-foreground/40 uppercase">Active categories</p>
          </div>
        </Card>
      </div>

      <p className="text-xs font-mono text-foreground/50 uppercase tracking-wider">
        Usage will reset{" "}
        {usageData?.resetDate ? (
          format(usageData.resetDate, "MMM d, yyyy")
        ) : (
          <span className="inline-block w-8 h-3.5 bg-foreground/10 animate-pulse" />
        )}
        {plan !== "PRO" ? (
          <span
            onClick={() => createCheckoutSession()}
            className="inline cursor-pointer underline text-primary hover:text-primary/80 transition-colors font-bold"
          >
            {" "}
            or upgrade now to increase your limit &rarr;
          </span>
        ) : null}
      </p>
    </div>
  )
}
