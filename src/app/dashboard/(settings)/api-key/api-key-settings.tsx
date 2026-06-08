"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckIcon, ClipboardIcon } from "lucide-react"
import { useState } from "react"

export const ApiKeySettings = ({ apiKey }: { apiKey: string }) => {
  const [copySuccess, setCopySuccess] = useState(false)

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  return (
    <Card className="max-w-xl w-full bg-card border-foreground/10 rounded-none shadow-[3px_3px_0_0_rgba(0,0,0,0.05)]">
      <div>
        <Label className="text-foreground/75 font-mono text-xs uppercase tracking-wider font-bold">Your API Key</Label>
        <div className="mt-2 relative">
          <Input
            className="pr-12 rounded-none bg-background border-foreground/15 text-foreground font-mono text-xs focus-visible:ring-primary"
            type="password"
            value={apiKey}
            readOnly
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-1">
            <button
              onClick={copyApiKey}
              className="h-8 w-8 flex items-center justify-center border border-foreground/10 bg-card hover:border-primary hover:text-primary transition-colors cursor-pointer"
            >
              {copySuccess ? (
                <CheckIcon className="size-4 text-emerald-500" />
              ) : (
                <ClipboardIcon className="size-4 text-foreground/45" />
              )}
            </button>
          </div>
        </div>

        <p className="mt-3 text-xs font-mono text-foreground/50 uppercase tracking-wider">
          Keep your key secret and do not share it with others.
        </p>
      </div>
    </Card>
  )
}
