"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
// import { cn } from "@/lib/utils"
import Link from "next/link"
import { Calendar, ChartBar, FileText, LayoutDashboard, Settings, Users } from "lucide-react"
import { NewRequestButton } from "@/components/new-request-button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <Sidebar className="border-r" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="size-6 rounded bg-foreground/10" />
            <span className="text-sm font-semibold">Admin Console</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/dashboard" className="contents">
                    <SidebarMenuButton isActive>
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/requests" className="contents">
                    <SidebarMenuButton>
                      <FileText />
                      <span>Requests</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/appointments" className="contents">
                    <SidebarMenuButton>
                      <Calendar />
                      <span>Appointments</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/reports" className="contents">
                    <SidebarMenuButton>
                      <ChartBar />
                      <span>Reports</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/dashboard/users" className="contents">
                    <SidebarMenuButton>
                      <Users />
                      <span>Users</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/settings" className="contents">
                    <SidebarMenuButton>
                      <Settings />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-2 py-1 text-xs text-muted-foreground">
            v1.0.0
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <div className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background/80 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mx-1 h-6" />
          <span className="text-sm font-medium">Dashboard Overview</span>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="secondary" className="rounded">
              Signed In
            </Badge>
            <NewRequestButton />
          </div>
        </div>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


