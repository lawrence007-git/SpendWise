"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar as SidebarFrame,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useSidebar } from "./SideBarContext";
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  FolderKanban,
  Target,
  BarChart3,
  CalendarClock,
  PiggyBank,
  Users,
  Upload,
  Settings2,
  Link2,
  TrendingUp,
} from "lucide-react";

export const moduleGroups = [
  {
    label: "Workspace",
    items: [
      { title: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
      { title: "Transactions", to: "/transactions", icon: Receipt },
      { title: "Accounts", to: "/accounts", icon: Wallet },
      { title: "Categories", to: "/categories", icon: FolderKanban },
      { title: "Budgets", to: "/budgets", icon: Target },
      { title: "Reports", to: "/reports", icon: BarChart3 },
    ],
  },
  {
    label: "Planning",
    items: [
      {
        title: "Recurring transactions",
        to: "/recurring",
        icon: CalendarClock,
      },
      { title: "Savings goals", to: "/savings", icon: PiggyBank },
      { title: "Shared budgets", to: "/shared-budgets", icon: Users },
    ],
  },
  {
    label: "Tools",
    items: [{ title: "CSV import", to: "/imports", icon: Upload }],
  },
];

export const settingsModule = {
  title: "Profile settings",
  to: "/settings",
  icon: Settings2,
};

export function Sidebar() {
  const pathname = usePathname() ?? "";
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarFrame collapsible="icon">
      <SidebarHeader className="h-16 justify-center border-b border-sidebar-border px-3 group-data-[collapsible=icon]:px-2">
        <Link
          href="/dashboard"
          aria-label="SpendWise dashboard"
          className="flex min-w-0 items-center gap-3"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <TrendingUp className="size-5" />
          </span>
          <div className="group-data-[collapsible=icon]:hidden">
            <span className="font-display text-lg font-bold">SpendWise</span>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Personal workspace
            </p>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="gap-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {moduleGroups.map((group) => (
          <SidebarGroup key={group.label} className="py-1">
            <SidebarGroupLabel className="mb-0.5 h-6 text-[10px] font-semibold uppercase tracking-widest">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.to}
                      tooltip={item.title}
                      className="h-10 text-muted-foreground data-[active=true]:bg-accent data-[active=true]:font-semibold data-[active=true]:text-primary"
                    >
                      <Link
                        href={item.to}
                        onClick={() => setOpenMobile(false)}
                        aria-current={pathname === item.to ? "page" : undefined}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip={settingsModule.title}
              isActive={pathname === settingsModule.to}
              className="h-8.5 text-muted-foreground data-[active=true]:bg-accent data-[active=true]:text-primary"
            >
              <Link
                href={settingsModule.to}
                onClick={() => setOpenMobile(false)}
              >
                <settingsModule.icon />
                <span>{settingsModule.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarFrame>
  );
}
