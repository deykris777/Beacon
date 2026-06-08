"use client"

import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import { client } from "@/lib/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { format, formatDistanceToNow } from "date-fns"
import { ArrowRight, BarChart2, Clock, Database, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { DashboardEmptyState } from "./dashboard-empty-state"
import { Modal } from "@/components/ui/modal"
import { Card } from "@/components/ui/card"

export const DashboardPageContent = () => {
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const { data: categories, isPending: isEventCategoriesLoading } = useQuery({
    queryKey: ["user-event-categories"],
    queryFn: async () => {
      const res = await client.category.getEventCategories.$get()
      const { categories } = await res.json()
      return categories
    },
  })

  const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation(
    {
      mutationFn: async (name: string) => {
        await client.category.deleteCategory.$post({ name })
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
        setDeletingCategory(null)
      },
    }
  )

  if (isEventCategoriesLoading) {
    return (
      <div className="flex items-center justify-center flex-1 h-full w-full">
        <LoadingSpinner />
      </div>
    )
  }

  if (!categories || categories.length === 0) {
    return <DashboardEmptyState />
  }

  return (
    <>
      <ul className="grid max-w-6xl grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((category) => (
          <li
            key={category.id}
            className="relative group z-10 transition-all duration-200"
          >
            <Card className="h-full bg-card border-foreground/10 p-6 shadow-[3px_3px_0_0_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="size-12 rounded-none border border-foreground/10 shadow-[2px_2px_0_0_rgba(0,0,0,0.05)] flex items-center justify-center text-xl"
                  style={{
                    backgroundColor: category.color
                      ? `#${category.color.toString(16).padStart(6, "0")}`
                      : "#f3f4f6",
                  }}
                >
                  {category.emoji || "📂"}
                </div>

                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-foreground">
                    {category.name}
                  </h3>
                  <p className="text-xs font-mono text-foreground/40">
                    {format(category.createdAt, "MMM d, yyyy")}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6 font-mono text-xs text-foreground/70">
                <div className="flex items-center">
                  <Clock className="size-3.5 mr-2 text-primary" />
                  <span className="font-bold">Last ping:</span>
                  <span className="ml-1 uppercase">
                    {category.lastPing
                      ? formatDistanceToNow(category.lastPing) + " ago"
                      : "Never"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Database className="size-3.5 mr-2 text-primary" />
                  <span className="font-bold">Unique fields:</span>
                  <span className="ml-1">{category.uniqueFieldCount || 0}</span>
                </div>
                <div className="flex items-center">
                  <BarChart2 className="size-3.5 mr-2 text-primary" />
                  <span className="font-bold">Events this month:</span>
                  <span className="ml-1">{category.eventsCount || 0}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-foreground/10">
                <Link
                  href={`/dashboard/category/${category.name}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-foreground bg-background border border-foreground/10 shadow-[2px_2px_0_0_rgba(0,0,0,0.05)] hover:shadow-[3px_3px_0_0_#DC143C] hover:border-primary transition-all duration-150 cursor-pointer"
                >
                  View all <ArrowRight className="size-3.5" />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground/40 hover:text-primary hover:bg-primary/5 rounded-none transition-colors duration-150 cursor-pointer"
                  aria-label={`Delete ${category.name} category`}
                  onClick={() => setDeletingCategory(category.name)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      <Modal
        showModal={!!deletingCategory}
        setShowModal={() => setDeletingCategory(null)}
        className="max-w-md p-8 border border-foreground/10 bg-card rounded-none"
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-mono uppercase tracking-wider font-bold text-foreground">
              Delete Category
            </h2>
            <p className="text-xs font-mono text-foreground/60 mt-2">
              Are you sure you want to delete the category "{deletingCategory}"?
              This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-foreground/10">
            <button
              onClick={() => setDeletingCategory(null)}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider border border-foreground/10 bg-background text-foreground hover:bg-foreground/5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                deletingCategory && deleteCategory(deletingCategory)
              }
              disabled={isDeletingCategory}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-primary text-background hover:bg-primary/95 cursor-pointer"
            >
              {isDeletingCategory ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
