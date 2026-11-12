import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/Logo";
import { ThemeToggle } from "@/components/custom/ThemeToggle";
import type { ReactNode } from "react";
import { AuthVisual } from "./AuthVisual";
import { cacheLife } from "next/cache";

export async function AuthLayout({ children }: { children: ReactNode }) {
  "use cache";
  cacheLife("days");

  const year = new Date().getFullYear();

  return (
    <div className="auth-page-layout grid h-dvh overflow-hidden bg-background lg:grid-cols-2">
      <AuthVisual />

      <div className="flex min-h-0 flex-col">
        <header className="flex h-12 shrink-0 items-center justify-between px-5 sm:px-8 lg:h-14">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>

        <main className="auth-form-region flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-5 py-3 sm:px-8">
          <div className="mb-3 mt-auto w-full max-w-[420px] shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 text-muted-foreground"
              asChild
            >
              <Link href="/">
                <ArrowLeft />
                Back to home
              </Link>
            </Button>
          </div>
          <div className="mb-auto w-full max-w-[420px] shrink-0">
            {children}
          </div>
        </main>

        <footer className="shrink-0 border-t border-border px-5 py-2 text-center text-xs text-muted-foreground">
          © {year} SpendWise
        </footer>
      </div>
    </div>
  );
}
