import { Home } from "lucide-react";
import { BudgetHero } from "./BudgetHero";

export function BudgetsHeader() {
  return (
    <>
      <nav
        className="relative flex items-center gap-2 text-sm text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Home className="h-4 w-4" />{" "}
        <span className="font-medium text-foreground">Budgets</span>
      </nav>

      {/* No `relative` or animation on <header>: the art anchors to the page wrapper's top-right corner.
          The min-height only applies where the art is visible (xl and up). */}
      <header className="mt-4 xl:min-h-[7.5rem]">
        <BudgetHero />
        <div className="relative animate-fade-up">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Budget Planner
          </h1>
          <p className="mt-2 text-muted-foreground">
            Set limits, track progress, and stay in control of your spending.
          </p>
        </div>
      </header>
    </>
  );
}
