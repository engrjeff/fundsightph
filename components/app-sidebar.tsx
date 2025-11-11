"use client";

import {
  ArrowLeftRightIcon,
  BoxIcon,
  CoinsIcon,
  HandCoinsIcon,
  SquareTerminal,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import type * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Funds",
      url: "/funds",
      icon: CoinsIcon,
    },
    {
      title: "Income",
      url: "/income",
      icon: TrendingDownIcon,
    },
    {
      title: "Expenses",
      url: "/expenses",
      icon: TrendingUpIcon,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: ArrowLeftRightIcon,
    },
    {
      title: "Savings",
      url: "/savings",
      icon: HandCoinsIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <BoxIcon className="size-6" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">FundSight PH</span>
                <span className="truncate text-muted-foreground text-xs">
                  Money Flow Tracker
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
