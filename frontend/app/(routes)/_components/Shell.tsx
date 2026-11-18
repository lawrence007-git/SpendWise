import type { ReactNode } from "react";
import { SidebarContext } from "./SideBarContext";
import { Sidebar } from "./SideBar";
import { Topbar } from "./TopBar";
import { TooltipProvider } from "@/components/ui/tooltip";

export function RoutesShell({ children }: { children: ReactNode }) {
  return (
    <SidebarContext className="h-dvh min-h-0 overflow-hidden">
      <TooltipProvider>
        <Sidebar />
      </TooltipProvider>
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="min-h-0 flex-1 overflow-y-auto bg-background px-6 py-8 sm:px-9 sm:py-10">
          {children}
        </main>
      </div>
    </SidebarContext>
  );
}
