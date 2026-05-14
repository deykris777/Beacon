"use client"

import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { client } from "@/lib/client"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "@tanstack/react-query"
import { CheckIcon } from "lucide-react"
import { useRouter } from "next/navigation"

const Page = () => {
  const { user } = useUser()
  const router = useRouter()

  const INCLUDED_FEATURES = [
    "10.000 real-time events per month",
    "10 event categories",
    "Advanced analytics and insights",
    "Priority support",
  ]

  const { mutate: createCheckoutSession } = useMutation({
    mutationFn: async () => {
      const res = await client.payment.createCheckoutSession.$post()
      return await res.json()
    },
    onSuccess: ({ url }) => {
      if (url) router.push(url)
    },
  })

  const handleGetAccess = () => {
    if (user) {
      createCheckoutSession()
    } else {
      router.push("/sign-in?intent=upgrade")
    }
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-950 py-20 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-brand-500/20 rounded-full blur-3xl dark:bg-brand-500/10 -translate-x-1/2" />
      <div className="absolute bottom-20 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/20 rounded-full blur-3xl dark:bg-purple-500/10 translate-x-1/2" />
      
      <MaxWidthWrapper className="relative z-10">
        <div className="mx-auto max-w-2xl text-center px-2">
          <Heading className="text-center dark:text-white text-3xl sm:text-4xl lg:text-5xl">Simple no-tricks pricing</Heading>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600 max-w-prose mx-auto text-pretty dark:text-gray-400">
            We hate subscriptions. And chances are, you do too. That's why we
            offer lifetime access to Procmon for a one-time payment.
          </p>
        </div>

        <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-2xl lg:mx-0 lg:flex lg:max-w-none gap-4">
          <div className="relative rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden p-6 sm:p-8 lg:p-10 lg:flex-auto">
            {/* Glass shine */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Lifetime access
              </h3>

              <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Invest once in Procmon and transform how you monitor your SaaS
                forever. Get instant alerts, track critical metrics and never miss
                a beat in your business growth.
              </p>
              <div className="mt-6 sm:mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-xs sm:text-sm font-semibold leading-6 text-brand-600 dark:text-brand-400">
                  What's included
                </h4>
                <div className="h-px flex-auto bg-gray-200/50 dark:bg-gray-700/50" />
              </div>

              <ul className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 sm:grid-cols-2 sm:gap-6 dark:text-gray-400">
                {INCLUDED_FEATURES.map((feature) => (
                  <li key={feature} className="flex gap-2 sm:gap-3">
                    <CheckIcon className="h-5 w-4 sm:h-6 sm:w-5 flex-none text-brand-600 dark:text-brand-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="relative rounded-xl sm:rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/30 dark:to-brand-800/30 backdrop-blur-xl border border-brand-200/50 dark:border-brand-700/30 py-8 sm:py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-16 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none" />
              
              <div className="relative z-10 mx-auto max-w-xs px-4 py-4 sm:py-8">
                <p className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">
                  Pay once, own forever
                </p>
                <p className="mt-4 sm:mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                    $49
                  </span>
                  <span className="text-xs sm:text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-gray-400">
                    USD
                  </span>
                </p>

                <Button 
                  onClick={handleGetAccess} 
                  className="mt-6 w-full sm:w-auto sm:px-20 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-105 transition-all duration-200"
                >
                  Get Procmon
                </Button>
                <p className="mt-4 sm:mt-6 text-xs leading-5 text-gray-600 dark:text-gray-400">
                  Secure payment. Start monitoring in minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Page
