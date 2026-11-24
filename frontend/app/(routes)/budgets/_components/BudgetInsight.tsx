import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Lightbulb,
  Target,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatMoney, STATUS_STYLE } from "@/lib/budget";
import type { BudgetStatus, BudgetWeek } from "@/lib/types";
import { BudgetChart } from "./BudgetChart";

type Props = {
  status: BudgetStatus;
  pct: number;
  limitMinor: number;
  spentMinor: number;
  currency: string;
  weekly: BudgetWeek[];
  hasBudgets: boolean;
  reportHref?: string;
};

const ICON = { on_track: Check, near_limit: AlertTriangle, over: X } as const;
const TITLE = {
  on_track: "You're on track!",
  near_limit: "Almost at your limit",
  over: "You're over budget",
} as const;

export function BudgetInsights(p: Props) {
  const Icon = p.hasBudgets ? ICON[p.status] : Target;
  const tone = p.hasBudgets ? STATUS_STYLE[p.status].tone : "tone-primary";
  const text = !p.hasBudgets
    ? "Set a budget to start tracking your spending."
    : p.status === "over"
      ? `You've exceeded your monthly budget by ${formatMoney(p.spentMinor - p.limitMinor, p.currency)}.`
      : p.status === "near_limit"
        ? `You've used ${p.pct}% of your monthly budget.`
        : "You're currently within your monthly budget.";

  return (
    <section className="relative animate-fade-up rounded-2xl border bg-card p-5 shadow-soft animate-delay-300">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Lightbulb className="h-5 w-5 text-chart-3" /> Budget Insights
        </h2>
        {p.reportHref && (
          <Link
            href={p.reportHref}
            className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm font-semibold text-primary transition hover:bg-muted"
          >
            View Report <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div
        className={cn(
          tone,
          "tone-surface mb-4 flex items-center gap-4 rounded-xl border p-4",
        )}
      >
        <div className="tone-dot grid h-14 w-14 shrink-0 place-items-center rounded-full text-white">
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <p className="font-display text-lg font-bold">
            {p.hasBudgets ? TITLE[p.status] : "No budget yet"}
          </p>
          <p className="text-sm text-muted-foreground">{text}</p>
        </div>
      </div>

      <BudgetChart
        weekly={p.weekly}
        limitMinor={p.limitMinor}
        currency={p.currency}
      />
    </section>
  );
}
