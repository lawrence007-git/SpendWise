import { Target } from "lucide-react";
import { formatMoney, STATUS_STYLE } from "@/lib/budget";
import type { BudgetStatus } from "@/lib/types";

type Props = {
  pct: number;
  spentMinor: number;
  limitMinor: number;
  status: BudgetStatus;
  currency: string;
  hasBudgets: boolean;
};

const R = 52;
const C = 2 * Math.PI * R;
const STATUS_DOT = {
  on_track: "bg-emerald-400",
  near_limit: "bg-amber-400",
  over: "bg-red-400",
} as const;

export function BudgetUsage({
  pct,
  spentMinor,
  limitMinor,
  status,
  currency,
  hasBudgets,
}: Props) {
  const shown = Math.min(100, pct);

  return (
    <section className="auth-visual-surface relative animate-fade-up overflow-hidden rounded-2xl p-6 shadow-elevated animate-delay-100">
      <div className="flex flex-wrap items-center gap-6">
        <div className="relative h-32 w-32 shrink-0">
          <svg
            viewBox="0 0 120 120"
            className="-rotate-90"
            role="img"
            aria-label={`${pct}% of the monthly budget used`}
          >
            <circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke="currentColor"
              strokeOpacity=".2"
              strokeWidth="12"
            />
            <circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - shown / 100)}
              className="text-primary-glow transition-all duration-700"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-extrabold tabular-nums">
            {pct}
            <span className="text-lg">%</span>
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-bold">Monthly Budget Usage</p>
          {hasBudgets ? (
            <>
              <p className="mt-1 text-3xl font-extrabold tabular-nums">
                {formatMoney(spentMinor, currency)}{" "}
                <span className="text-lg font-semibold text-white/70">
                  / {formatMoney(limitMinor, currency)}
                </span>
              </p>
              <div
                className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/20"
                role="presentation"
              >
                <div
                  className="h-full rounded-full bg-primary-glow transition-all duration-700"
                  style={{ width: `${shown}%` }}
                />
              </div>
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold">
                <span
                  className={`h-2 w-2 rounded-full ${STATUS_DOT[status]}`}
                  aria-hidden="true"
                />{" "}
                {STATUS_STYLE[status].headline}
              </p>
            </>
          ) : (
            <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
              <Target className="h-4 w-4" /> Set a budget for this month to see
              your usage here.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
