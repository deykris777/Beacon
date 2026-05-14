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
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {plan === "PRO" ? "Plan: Pro" : "Plan: Free"}
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-prose">
          {plan === "PRO"
            ? "Thank you for supporting Procmon. Find your increased usage limits below."
            : "Get access to more events, categories and premium support."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2 border-brand-500/50">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Events</p>
            <BarChart className="size-4 text-brand-500" />
          </div>

          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {usageData?.eventsUsed || 0} of{" "}
              {usageData?.eventsLimit?.toLocaleString() || 100}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Events this period
            </p>
          </div>
        </Card>
        <Card>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Event Categories</p>
            <BarChart className="size-4 text-brand-500" />
          </div>

          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {usageData?.categoriesUsed || 0} of{" "}
              {usageData?.categoriesLimit?.toLocaleString() || 10}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Active categories</p>
          </div>
        </Card>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Usage will reset{" "}
        {usageData?.resetDate ? (
          format(usageData.resetDate, "MMM d, yyyy")
        ) : (
          <span className="animate-pulse w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded"></span>
        )}
        {plan !== "PRO" ? (
          <span
            onClick={() => createCheckoutSession()}
            className="inline cursor-pointer underline text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
          >
            {" "}
            or upgrade now to increase your limit &rarr;
          </span>
        ) : null}
      </p>
    </div>
  )
}
