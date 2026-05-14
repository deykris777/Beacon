"use client"

import { Button } from "@/components/ui/button"
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
    <Card className="max-w-xl w-full">
      <div>
        <Label className="text-gray-700 dark:text-gray-300 font-medium">Your API Key</Label>
        <div className="mt-2 relative">
          <Input 
            className="pr-12 rounded-xl bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 text-gray-900 dark:text-white" 
            type="password" 
            value={apiKey} 
            readOnly 
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={copyApiKey}
              className="h-8 w-8 p-0 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-all"
            >
              {copySuccess ? (
                <CheckIcon className="size-4 text-green-500" />
              ) : (
                <ClipboardIcon className="size-4 text-gray-500 dark:text-gray-400" />
              )}
            </Button>
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Keep your key secret and do not share it with others.
        </p>
      </div>
    </Card>
  )
}
