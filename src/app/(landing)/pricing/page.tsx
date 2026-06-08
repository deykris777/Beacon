"use client"

import { Heading } from "@/components/heading"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { GlassCard, NeoButton, CyberBackground } from "@/components/landing"
import { client } from "@/lib/client"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "@tanstack/react-query"
import { CheckIcon } from "lucide-react"
import { useRouter } from "next/navigation"

const Page = () => {
  const { user } = useUser()
  const router = useRouter()

  const INCLUDED_FEATURES = [
    "10,000 real-time events per month",
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
    <div className="relative min-h-screen py-24 sm:py-32 lg:py-40 overflow-hidden">
      <CyberBackground />
      
      <MaxWidthWrapper className="relative z-10">
        <div className="mx-auto max-w-2xl text-center px-2">
          <Heading className="text-center text-foreground text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight font-extrabold">
            Simple <span className="text-primary">no-tricks</span> pricing
          </Heading>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-foreground/80 max-w-prose mx-auto text-pretty font-semibold">
            We hate subscriptions. And chances are, you do too. That's why we
            offer lifetime access to Procmon for a one-time payment.
          </p>
        </div>

        <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-4xl lg:mx-0 lg:flex gap-6 items-stretch px-2">
          <GlassCard variant="neo" className="p-6 sm:p-8 lg:p-10 flex-1 bg-card border-foreground/10">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground uppercase">
              Lifetime access
            </h3>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-foreground/75 font-medium">
              Invest once in Procmon and transform how you monitor your SaaS
              forever. Get instant alerts, track critical metrics and never miss
              a beat in your business growth.
            </p>
            
            <div className="mt-6 sm:mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-xs sm:text-sm font-bold uppercase tracking-wider text-primary font-mono">
                What's included
              </h4>
              <div className="h-px flex-auto bg-foreground/10" />
            </div>

            <ul className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4 text-xs sm:text-sm text-foreground/80 sm:grid-cols-2 sm:gap-6 font-semibold">
              {INCLUDED_FEATURES.map((feature) => (
                <li key={feature} className="flex gap-2 sm:gap-3 items-center">
                  <CheckIcon className="h-5 w-4 sm:h-6 sm:w-5 flex-none text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </GlassCard>

          <div className="mt-6 lg:mt-0 lg:w-full lg:max-w-sm flex">
            <GlassCard variant="neo" className="flex flex-col justify-center items-center p-8 sm:p-10 text-center w-full relative overflow-hidden bg-card border-foreground/10">
              <p className="text-xs sm:text-sm font-bold text-primary uppercase tracking-widest font-mono">
                Pay once, own forever
              </p>
              
              <p className="mt-4 sm:mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-primary">
                  $49
                </span>
                <span className="text-xs sm:text-sm font-bold tracking-wider text-foreground/60 uppercase font-mono">
                  USD
                </span>
              </p>

              <div className="mt-8 w-full">
                <NeoButton 
                  onClick={handleGetAccess} 
                  variant="primary"
                  className="w-full justify-center text-base py-3"
                >
                  Get Procmon
                </NeoButton>
              </div>
              
              <p className="mt-4 sm:mt-6 text-xs leading-5 text-foreground/50 font-medium font-mono">
                Secure payment. Start monitoring in minutes.
              </p>
            </GlassCard>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Page
