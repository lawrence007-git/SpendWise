"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { ChevronDown, Home, LogOut, Settings2, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarToggle } from "./SideBarToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/custom/ThemeToggle";
import { moduleGroups, settingsModule } from "./SideBar";

export const workspaceModules = [
  ...moduleGroups.flatMap((group) => [...group.items]),
  settingsModule,
];

export function Topbar() {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const currentModule = workspaceModules.find((item) => item.to === pathname);
  return (
    <header className="flex h-20 shrink-0 items-center justify-between gap-3 border-b border-border bg-background px-4 sm:px-7">
      <div className="flex min-w-0 items-center gap-3">
        <SidebarToggle
          title="Toggle sidebar"
          className="size-9 shrink-0 text-muted-foreground"
        />
        <span className="h-5 w-px shrink-0 bg-border" />
        <div className="hidden md:block">
          <span className="text-xs text-muted-foreground">Workspace</span>
          <p className="mt-0.5 text-sm font-semibold">{currentModule?.title}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-10 gap-2 px-1.5"
              aria-label="Open profile menu"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <UserRound className="size-4" />
              </span>
              <ChevronDown className="hidden text-muted-foreground sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings2 />
                Profile settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/">
                <Home />
                Back to home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => signOut({ redirectUrl: "/signin" })}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
