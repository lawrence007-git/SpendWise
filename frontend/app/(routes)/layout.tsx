import type { ReactNode } from "react";
import { RoutesShell } from "./_components/Shell"; // adjust to where Shell.tsx lives

export default function RoutesLayout({ children }: { children: ReactNode }) {
  return <RoutesShell>{children}</RoutesShell>;
}
