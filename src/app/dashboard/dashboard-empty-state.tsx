import { CreateEventCategoryModal } from "@/components/create-event-category-modal"
import { Card } from "@/components/ui/card"
import { client } from "@/lib/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const DashboardEmptyState = () => {
  const queryClient = useQueryClient()

  const { mutate: insertQuickstartCategories, isPending } = useMutation({
    mutationFn: async () => {
      await client.category.insertQuickstartCategories.$post()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
    },
  })

  return (
    <Card className="flex flex-col items-center justify-center flex-1 text-center p-8 bg-card border-foreground/10 rounded-none shadow-[3px_3px_0_0_rgba(0,0,0,0.05)]">
      <div className="flex justify-center w-full mb-6">
        <img
          src="/brand-asset-wave.png"
          alt="No categories"
          className="size-36 object-contain"
        />
      </div>

      <h1 className="text-xl font-mono uppercase tracking-wider font-bold text-foreground">
        No Event Categories Yet
      </h1>

      <p className="text-xs font-mono text-foreground/60 max-w-prose mt-2 mb-8">
        Start tracking events by creating your first category.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
        <button
          className="pixel-btn px-6 py-2.5 text-xs w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
          onClick={() => insertQuickstartCategories()}
          disabled={isPending}
        >
          <span>🚀</span>
          <span>{isPending ? "Creating..." : "Quickstart"}</span>
        </button>

        <CreateEventCategoryModal containerClassName="w-full sm:w-auto">
          <button className="pixel-btn pixel-btn-primary px-6 py-2.5 text-xs w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer">
            <span>Add Category</span>
          </button>
        </CreateEventCategoryModal>
      </div>
    </Card>
  )
}
