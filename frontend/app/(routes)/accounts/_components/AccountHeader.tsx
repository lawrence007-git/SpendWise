import { ChevronRight, Home } from "lucide-react";
import { AccountHero } from "./AccountHero";

export function AccountsHeader() {
  return (
    <>
      <nav
        className="relative flex items-center gap-2 text-sm text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Home className="h-4 w-4" /> Workspace{" "}
        <ChevronRight className="h-3 w-3" />
        <span className="font-medium text-primary">Accounts</span>
      </nav>

      {/* No `relative` or animation on this element: the art anchors to the page wrapper's top-right corner.
          The min-height only applies where the art is visible (xl and up). */}
      <header className="mt-4 xl:min-h-[9.5rem]">
        <AccountHero />

        <div className="relative animate-fade-up">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Your accounts
          </h1>
          <p className="mt-1 text-muted-foreground">
            Every balance, all in one place.
          </p>
        </div>
      </header>
    </>
  );
}
