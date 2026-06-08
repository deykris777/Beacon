"use client"

import { Event, EventCategory } from "@/generated/client/client"
import { useQuery } from "@tanstack/react-query"
import { EmptyCategoryState } from "./empty-category-state"
import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { client } from "@/lib/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { ArrowUpDown, BarChart } from "lucide-react"
import { isAfter, isToday, startOfMonth, startOfWeek } from "date-fns"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { cn } from "@/utils"
import { Heading } from "@/components/heading"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface CategoryPageContentProps {
  hasEvents: boolean
  category: EventCategory
}

export const CategoryPageContent = ({
  hasEvents: initialHasEvents,
  category,
}: CategoryPageContentProps) => {
  const searchParams = useSearchParams()

  const [activeTab, setActiveTab] = useState<"today" | "week" | "month">(
    "today"
  )

  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "30", 10)

  const [pagination, setPagination] = useState({
    pageIndex: page - 1,
    pageSize: limit,
  })

  const { data: pollingData } = useQuery({
    queryKey: ["category", category.name, "hasEvents"],
    initialData: { hasEvents: initialHasEvents },
  })

  const { data, isFetching } = useQuery({
    queryKey: [
      "events",
      category.name,
      pagination.pageIndex,
      pagination.pageSize,
      activeTab,
    ],
    queryFn: async () => {
      const res = await client.category.getEventsByCategoryName.$get({
        name: category.name,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        timeRange: activeTab,
      })

      return await res.json()
    },
    refetchOnWindowFocus: false,
    enabled: pollingData.hasEvents,
  })

  const columns: ColumnDef<Event>[] = useMemo(
    () => [
      {
        accessorKey: "category",
        header: "Category",
        cell: () => <span className="font-mono text-xs text-foreground/80">{category.name || "Uncategorized"}</span>,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => {
          return (
            <button
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-foreground/75 hover:text-foreground cursor-pointer"
            >
              Date
              <ArrowUpDown className="size-3.5" />
            </button>
          )
        },
        cell: ({ row }) => {
          return (
            <span className="font-mono text-xs text-foreground/80">
              {new Date(row.getValue("createdAt")).toLocaleString()}
            </span>
          )
        },
      },
      ...(data?.events?.[0]
        ? Object.keys(data.events[0].fields as object).map((field) => ({
          accessorFn: (row: Event) =>
            (row.fields as Record<string, any>)[field],
          header: field,
          cell: ({ row }: { row: Row<Event> }) => (
            <span className="font-mono text-xs text-foreground/80">
              {String((row.original.fields as Record<string, any>)[field] || "-")}
            </span>
          ),
        }))
        : []),
      {
        accessorKey: "deliveryStatus",
        header: "Delivery Status",
        cell: ({ row }) => (
          <span
            className={cn("px-2 py-1 rounded-none text-[10px] font-mono font-bold uppercase tracking-wider", {
              "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400":
                row.getValue("deliveryStatus") === "DELIVERED",
              "bg-rose-100 text-rose-800 dark:bg-rose-950/30 dark:text-rose-400":
                row.getValue("deliveryStatus") === "FAILED",
              "bg-amber-100 text-amber-800 dark:bg-amber-950/30 dark:text-amber-400":
                row.getValue("deliveryStatus") === "PENDING",
            })}
          >
            {row.getValue("deliveryStatus")}
          </span>
        ),
      },
    ],

    [category.name, data?.events]
  )

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: data?.events || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((data?.eventsCount || 0) / pagination.pageSize),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  })

  const router = useRouter()

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set("page", (pagination.pageIndex + 1).toString())
    searchParams.set("limit", pagination.pageSize.toString())
    router.push(`?${searchParams.toString()}`, { scroll: false })
  }, [pagination, router])

  const numericFieldSums = useMemo(() => {
    if (!data?.events || data.events.length === 0) return {}

    const sums: Record<
      string,
      {
        total: number
        thisWeek: number
        thisMonth: number
        today: number
      }
    > = {}

    const now = new Date()
    const weekStart = startOfWeek(now, { weekStartsOn: 0 })
    const monthStart = startOfMonth(now)

    data.events.forEach((event) => {
      const eventDate = event.createdAt

      Object.entries(event.fields as object).forEach(([field, value]) => {
        if (typeof value === "number") {
          if (!sums[field]) {
            sums[field] = { total: 0, thisWeek: 0, thisMonth: 0, today: 0 }
          }

          sums[field].total += value

          if (
            isAfter(eventDate, weekStart) ||
            eventDate.getTime() === weekStart.getTime()
          ) {
            sums[field].thisWeek += value
          }

          if (
            isAfter(eventDate, monthStart) ||
            eventDate.getTime() === monthStart.getTime()
          ) {
            sums[field].thisMonth += value
          }

          if (isToday(eventDate)) {
            sums[field].today += value
          }
        }
      })
    })

    return sums
  }, [data?.events])

  const NumericFieldSumCards = () => {
    if (Object.keys(numericFieldSums).length === 0) return null

    return Object.entries(numericFieldSums).map(([field, sums]) => {
      const relevantSum =
        activeTab === "today"
          ? sums.today
          : activeTab === "week"
            ? sums.thisWeek
            : sums.thisMonth

      return (
        <Card key={field} className="bg-card border-foreground/10 p-5 shadow-[3px_3px_0_0_rgba(0,0,0,0.05)]">
          <div className="flex flex-row items-center justify-between pb-2">
            <p className="text-xs font-mono uppercase tracking-wider text-foreground/70">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </p>
            <BarChart className="size-4 text-primary" />
          </div>

          <div>
            <p className="text-xl font-mono font-bold text-primary">{relevantSum.toFixed(2)}</p>
            <p className="text-[10px] font-mono text-foreground/40 uppercase">
              {activeTab === "today"
                ? "today"
                : activeTab === "week"
                  ? "this week"
                  : "this month"}
            </p>
          </div>
        </Card>
      )
    })
  }

  if (!pollingData.hasEvents) {
    return <EmptyCategoryState categoryName={category.name} />
  }

  return (
    <div className="space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value as "today" | "week" | "month")
        }}
      >
        <TabsList className="mb-2 bg-card border border-foreground/10 rounded-none p-1 flex w-fit">
          <TabsTrigger value="today" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-background data-[state=active]:shadow-none font-mono text-xs uppercase tracking-wider cursor-pointer">Today</TabsTrigger>
          <TabsTrigger value="week" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-background data-[state=active]:shadow-none font-mono text-xs uppercase tracking-wider cursor-pointer">This Week</TabsTrigger>
          <TabsTrigger value="month" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-background data-[state=active]:shadow-none font-mono text-xs uppercase tracking-wider cursor-pointer">This Month</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <Card className="border-primary bg-card p-5 shadow-[3px_3px_0_0_rgba(0,0,0,0.05)]">
              <div className="flex flex-row items-center justify-between pb-2">
                <p className="text-xs font-mono uppercase tracking-wider text-foreground/70">Total Events</p>
                <BarChart className="size-4 text-primary" />
              </div>

              <div>
                <p className="text-xl font-mono font-bold text-primary">{data?.eventsCount || 0}</p>
                <p className="text-[10px] font-mono text-foreground/40 uppercase">
                  Events{" "}
                  {activeTab === "today"
                    ? "today"
                    : activeTab === "week"
                      ? "this week"
                      : "this month"}
                </p>
              </div>
            </Card>

            <NumericFieldSumCards />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="w-full flex flex-col gap-4">
            <Heading className="text-xl font-mono uppercase tracking-wider font-bold text-foreground">Event overview</Heading>
          </div>
        </div>

        <Card contentClassName="p-0 overflow-x-auto rounded-none">
          <Table>
            <TableHeader className="bg-foreground/[0.02] border-b border-foreground/10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-foreground/10 hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-foreground/70 font-mono text-xs uppercase tracking-wider py-3 px-4">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {isFetching ? (
                [...Array(5)].map((_, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className="border-foreground/10">
                    {columns.map((_, cellIndex) => (
                      <TableCell key={cellIndex} className="p-4">
                        <div className="h-4 w-full bg-foreground/5 animate-pulse rounded-none" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-foreground/10 hover:bg-foreground/[0.02]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-foreground/95 p-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-foreground/10">
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center font-mono text-xs text-foreground/50"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      <div className="flex items-center justify-end gap-3 py-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage() || isFetching}
          className="pixel-btn px-4 py-2 text-[10px] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage() || isFetching}
          className="pixel-btn px-4 py-2 text-[10px] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  )
}
