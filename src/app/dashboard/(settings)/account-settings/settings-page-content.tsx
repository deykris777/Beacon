"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { client } from "@/lib/client"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"

export const AccountSettings = ({
  discordId: initialDiscordId,
}: {
  discordId: string
}) => {
  const [discordId, setDiscordId] = useState(initialDiscordId)

  const { mutate, isPending } = useMutation({
    mutationFn: async (discordId: string) => {
      const res = await client.project.setDiscordID.$post({ discordId })
      return await res.json()
    },
  })

  return (
    <Card className="max-w-xl w-full bg-card border-foreground/10 rounded-none shadow-[3px_3px_0_0_rgba(0,0,0,0.05)]">
      <div className="space-y-4">
        <div>
          <Label className="text-foreground/75 font-mono text-xs uppercase tracking-wider font-bold">Discord ID</Label>
          <Input
            className="mt-2 rounded-none bg-background border-foreground/15 text-foreground font-mono text-xs focus-visible:ring-primary"
            value={discordId}
            onChange={(e) => setDiscordId(e.target.value)}
            placeholder="Enter your Discord ID"
          />
        </div>

        <p className="text-xs font-mono text-foreground/50 uppercase tracking-wider">
          Don't know how to find your Discord ID?{" "}
          <Link href="#" className="text-primary hover:underline font-bold transition-colors">
            Learn how
          </Link>
          .
        </p>

        <div className="pt-2">
          <button
            onClick={() => mutate(discordId)}
            disabled={isPending}
            className="pixel-btn pixel-btn-primary px-6 py-2.5 text-xs cursor-pointer"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </Card>
  )
}
