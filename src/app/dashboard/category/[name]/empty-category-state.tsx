import { Card } from "@/components/ui/card"
import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

export const EmptyCategoryState = ({
  categoryName,
}: {
  categoryName: string
}) => {
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ["category", categoryName, "hasEvents"],
    queryFn: async () => {
      const res = await client.category.pollCategory.$get({
        name: categoryName,
      })

      return await res.json()
    },
    refetchInterval(query) {
      return query.state.data?.hasEvents ? false : 1000
    },
  })

  const hasEvents = data?.hasEvents

  useEffect(() => {
    if (hasEvents) router.refresh()
  }, [hasEvents, router])

  const codeSnippet = `await fetch('https://procmon.sh/api/v1/events', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    category: '${categoryName}',
    fields: {
      field1: 'value1', // e.g. user_id
      field2: 'value2' // e.g. email
    }
  })
})`

  return (
    <Card
      contentClassName="max-w-2xl w-full flex flex-col items-center p-6 bg-card"
      className="flex-1 flex items-center justify-center rounded-none border border-foreground/10 shadow-[3px_3px_0_0_rgba(0,0,0,0.05)]"
    >
      <h2 className="text-xl font-mono uppercase tracking-wider font-bold text-center text-foreground">
        Create your first {categoryName} event
      </h2>
      <p className="text-xs font-mono text-foreground/60 mb-8 max-w-md text-center mt-2">
        Get started by sending a request to our tracking API:
      </p>

      <div className="w-full max-w-3xl rounded-none overflow-hidden border border-foreground/10 shadow-[2px_2px_0_0_rgba(0,0,0,0.05)]">
        <div className="bg-foreground/[0.02] border-b border-foreground/10 px-4 py-2.5 flex justify-between items-center">
          <div className="flex space-x-1.5">
            <div className="size-2 bg-primary" />
            <div className="size-2 bg-foreground/20" />
            <div className="size-2 bg-foreground/10" />
          </div>

          <span className="text-foreground/50 font-mono text-xs">your-first-event.js</span>
        </div>

        <SyntaxHighlighter
          language="javascript"
          style={oneDark}
          customStyle={{
            borderRadius: "0px",
            margin: 0,
            padding: "1rem",
            fontSize: "0.8rem",
            lineHeight: "1.5",
            background: "transparent",
          }}
        >
          {codeSnippet}
        </SyntaxHighlighter>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div className="flex gap-2 items-center">
          <div className="size-2 bg-emerald-500 animate-pulse rounded-none" />
          <span className="text-xs font-mono uppercase tracking-wider text-foreground/70">
            Listening to incoming events...
          </span>
        </div>

        <p className="text-xs font-mono uppercase tracking-wider text-foreground/50 mt-4 text-center">
          Need help? Check out our{" "}
          <a href="#" className="text-primary hover:underline font-bold">
            docs
          </a>{" "}
          or{" "}
          <a href="#" className="text-primary hover:underline font-bold">
            support
          </a>
          .
        </p>
      </div>
    </Card>
  )
}
