"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CalendarDays, FileText, Gauge, LineChart as LineChartIcon, ListChecks, Star, TrendingUp, Users } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import type { DateRange } from "react-day-picker"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Role = "Staff" | "Super Admin"

export default function DashboardPage() {
  // Placeholder role and data. Replace with Supabase Auth + queries.
  const role: Role = "Super Admin"
  const name = "Alex"
  const today = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })

  const stats = useMemo(
    () => ({
      pendingRequests: 12,
      upcomingAppointments: 7,
      releasedDocuments: 23,
      feedbackAvg: 4.5,
    }),
    []
  )

  const tableRows = [
    { metric: "Total Requests", value: 340, change: "+8%", range: "This month" },
    { metric: "Approved vs. Cancelled Appointments", value: "128 / 12", change: "+5%", range: "This month" },
    { metric: "Documents Released", value: 210, change: "+3%", range: "This week" },
    { metric: "Average Processing Time (days)", value: 3.2, change: "-10%", range: "This month" },
    { metric: "Client Satisfaction %", value: "92%", change: "+2%", range: "This month" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Today</span>
            <Separator orientation="vertical" className="mx-1 h-4" />
            <span>{today}</span>
          </div>
          <h1 className="mt-1 text-xl font-semibold">
            Welcome, {name}
            <Badge variant="secondary" className="ml-2 align-middle">
              {role}
            </Badge>
          </h1>
        </div>
        <div className="flex gap-2">
          <NewRequestButton />
          <Button size="sm" variant="secondary">Export CSV</Button>
          <Button size="sm">Export PDF</Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold">{stats.pendingRequests}</div>
            <FileText className="text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold">{stats.upcomingAppointments}</div>
            <CalendarDays className="text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Released Documents</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold">{stats.releasedDocuments}</div>
            <ListChecks className="text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Feedback Rating (Avg.)</CardTitle>
          </CardHeader>
          <CardContent className="flex items-end justify-between">
            <div className="text-3xl font-bold flex items-center gap-1">
              {stats.feedbackAvg}
              <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
            </div>
            <Gauge className="text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      {/* Metrics / Reports Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle>Metrics & Reports</CardTitle>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="secondary">Date Range</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Today</DropdownMenuItem>
                <DropdownMenuItem>This Week</DropdownMenuItem>
                <DropdownMenuItem>This Month</DropdownMenuItem>
                <DropdownMenuItem>Custom...</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="secondary">Export CSV</Button>
            <Button size="sm">Export PDF</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="whitespace-nowrap">% Change vs. Last Period</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead className="w-0"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableRows.map((r) => (
                <TableRow key={r.metric}>
                  <TableCell className="font-medium">{r.metric}</TableCell>
                  <TableCell>{r.value}</TableCell>
                  <TableCell className="text-green-600">{r.change}</TableCell>
                  <TableCell>{r.range}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <TrendingUp className="h-4 w-4" /> View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Charts & Visual Insights */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RequestsTrend />
        <Card>
          <CardHeader>
            <CardTitle>Breakdown by Document Type</CardTitle>
          </CardHeader>
          <CardContent className="flex h-48 items-center justify-center text-muted-foreground">
            <Gauge className="h-8 w-8" /> Donut/Pie placeholder
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Appointment Statuses</CardTitle>
          </CardHeader>
          <CardContent className="flex h-48 items-center justify-center text-muted-foreground">
            <BarPlaceholder />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Client Satisfaction vs. Target</CardTitle>
          </CardHeader>
          <CardContent className="flex h-48 items-center justify-center text-muted-foreground">
            <Gauge className="h-8 w-8" /> Gauge placeholder
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity / Notifications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Button size="sm" variant="secondary">View All Notifications</Button>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>3 new requests submitted today.</li>
            <li>Student Juan Dela Cruz appointment confirmed for Oct 5.</li>
            <li>Feedback received: Satisfied.</li>
            <li>2 documents released.</li>
            <li>System maintenance completed.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <NewRequestButton />
        <Button size="sm" variant="secondary">+ New Appointment</Button>
        <Button size="sm">Export Report</Button>
        {role === "Super Admin" && <Button size="sm" variant="outline">Manage Users</Button>}
      </div>

      {/* Citizen Charter Feedback Snapshot */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Citizen Charter Feedback</CardTitle>
          <Button size="sm" variant="secondary">View All Feedback</Button>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
            <div className="mt-1 flex items-center gap-1 text-3xl font-bold">
              4.6 <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Counts</div>
            <div className="mt-1 text-sm">Satisfied: 120 • Neutral: 18 • Dissatisfied: 9</div>
          </div>
          <div className="flex items-center justify-center text-muted-foreground">
            <LineChartIcon className="h-8 w-8" /> 7-day trend placeholder
          </div>
        </CardContent>
      </Card>

      {/* System Management (Super Admin only) */}
      {role === "Super Admin" && (
        <Card>
          <CardHeader>
            <CardTitle>System Management</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatBlock label="User Count" value="42" icon={<Users className="text-muted-foreground" />} />
            <StatBlock label="System Uptime" value="99.98%" icon={<Gauge className="text-muted-foreground" />} />
            <div className="flex items-end justify-between rounded-md border p-3">
              <div>
                <div className="text-sm text-muted-foreground">User Management</div>
                <div className="text-lg font-semibold">Go to Users</div>
              </div>
              <Button size="sm" variant="secondary">Open</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function RequestsTrend() {
  type Preset = "previous_month" | "last_3_months" | "last_6_months" | "last_year" | "custom"
  const [preset, setPreset] = useState<Preset>("last_3_months")
  const [customRange, setCustomRange] = useState<DateRange | undefined>(undefined)

  const { chartData, title } = useMemo(() => {
    const now = new Date()
    let from: Date
    let to: Date = now
    if (preset === "previous_month") {
      const firstOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      to = new Date(firstOfThisMonth.getTime() - 24 * 60 * 60 * 1000)
      from = new Date(to.getFullYear(), to.getMonth(), 1)
    } else if (preset === "last_3_months") {
      from = new Date(now.getFullYear(), now.getMonth() - 2, 1)
      to = now
    } else if (preset === "last_6_months") {
      from = new Date(now.getFullYear(), now.getMonth() - 5, 1)
      to = now
    } else if (preset === "last_year") {
      from = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
      to = now
    } else {
      from = customRange?.from ?? new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29)
      to = customRange?.to ?? now
    }

    const days = Math.max(1, Math.ceil((to.getTime() - from.getTime()) / (24 * 60 * 60 * 1000)))
    const data = Array.from({ length: days + 1 }).map((_, i) => {
      const day = new Date(from)
      day.setDate(from.getDate() + i)
      const label = day.toLocaleDateString(undefined, { month: "short", day: "2-digit" })
      const requests = Math.max(10, Math.round(50 + 25 * Math.sin(i / 4) + (Math.random() * 10 - 5)))
      return { day: label, requests }
    })

    const title = `${from.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" })} - ${to.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" })}`
    return { chartData: data, title }
  }, [preset, customRange])

  const chartConfig = {
    requests: {
      label: "Requests",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div>
          <CardTitle>Requests Trend</CardTitle>
          <div className="text-sm text-muted-foreground">{title}</div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="secondary">Period</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Presets</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setPreset("previous_month")}>Previous month</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPreset("last_3_months")}>Last 3 months</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPreset("last_6_months")}>Last 6 months</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPreset("last_year")}>Last year</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPreset("custom")}>Custom…</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline">Custom range</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="end">
              <div className="grid gap-2">
                <Calendar
                  mode="range"
                  selected={customRange}
                  onSelect={(range) => {
                    setCustomRange(range ?? undefined)
                    setPreset("custom")
                  }}
                  numberOfMonths={2}
                />
                <Button size="sm" onClick={() => setPreset("custom")}>Apply</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey="requests" type="natural" stroke="var(--color-requests)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function StatBlock({ label, value, icon }: { label: string; value: string | number; icon?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between rounded-md border p-3">
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
      {icon}
    </div>
  )
}

function BarPlaceholder() {
  return (
    <div className="flex h-32 w-full items-end gap-2">
      {[20, 55, 35, 70, 45, 60, 30].map((h, i) => (
        <div key={i} className="w-6 rounded bg-foreground/10" style={{ height: `${h}%` }} />
      ))}
    </div>
  )
}

function NewRequestButton() {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [title, setTitle] = useState("")
  const [type, setType] = useState("")
  const [details, setDetails] = useState("")

  const onSubmit = async () => {
    setSubmitting(true)
    // Simulate async submit
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setOpen(false)
    // Reset
    setTitle("")
    setType("")
    setDetails("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">+ New Request</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>New Request</DialogTitle>
          <DialogDescription>Fill in the request details and submit.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="req-title">Title</Label>
            <Input id="req-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., SF10 Certification" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="req-type">Type</Label>
            <Input id="req-type" value={type} onChange={(e) => setType(e.target.value)} placeholder="e.g., Document, Service" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="req-details">Details</Label>
            <Textarea id="req-details" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Provide additional information..." rows={4} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={submitting || !title.trim()}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


