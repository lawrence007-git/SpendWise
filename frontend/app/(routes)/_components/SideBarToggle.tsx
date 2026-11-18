import type { ComponentProps } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SidebarToggle(props: ComponentProps<typeof SidebarTrigger>) {
  return <SidebarTrigger title="Toggle sidebar" {...props} />;
}
