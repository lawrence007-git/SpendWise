import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardPreview } from "./DashboardPreview";

const points = [
  "Manual entry, no bank linking",
  "Monthly category budgets",
  "Exact decimal totals",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="bg-grid pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Personal finance & expense tracking
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Know exactly where{" "}
            <span className="gradient-text">your money goes.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            SpendWise helps you record income and expenses, organize them into
            categories, set monthly budgets, and understand your spending
            through clear reports.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="#cta">
                Start tracking free <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="inverse">
              <a href="#features">Explore features</a>
            </Button>
          </div>
          <ul className="mt-8 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-5">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 animate-delay-200">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
