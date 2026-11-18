import { Lightbulb } from "lucide-react";
import { peso } from "@/lib/account";

type Props = { budgetMinor?: number; spentMinor?: number };

export function SpendingInsights({ budgetMinor, spentMinor = 0 }: Props) {
  const hasBudget = !!budgetMinor && budgetMinor > 0;
  const pct = hasBudget
    ? Math.min(100, Math.round((spentMinor / budgetMinor!) * 100))
    : 0;
  const R = 52;
  const C = 2 * Math.PI * R;

  return (
    <section className="auth-visual-surface relative animate-fade-up overflow-hidden rounded-2xl p-5 shadow-elevated animate-delay-300">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <Lightbulb className="h-5 w-5 text-chart-3" /> Spending Insights
      </h2>

      {hasBudget ? (
        <>
          <p className="mt-1 text-sm text-white/80">
            {pct <= 100 && spentMinor <= budgetMinor!
              ? "You're on track this month!"
              : "You've gone over budget."}
          </p>
          <div className="mt-4 flex items-center gap-6">
            <div className="relative h-32 w-32 shrink-0">
              <svg
                viewBox="0 0 120 120"
                className="-rotate-90"
                role="img"
                aria-label={`${pct}% of budget spent`}
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
                  strokeDashoffset={C * (1 - pct / 100)}
                  className="text-primary-glow transition-all duration-700"
                />
              </svg>
              <span className="absolute inset-0 grid place-items-center text-2xl font-extrabold">
                {pct}%
              </span>
            </div>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-white/70">Monthly Budget</dt>
                <dd className="text-xl font-bold tabular-nums">
                  {peso(budgetMinor!)}
                </dd>
              </div>
              <div>
                <dt className="text-white/70">Spent</dt>
                <dd className="text-xl font-bold tabular-nums">
                  {peso(spentMinor)}
                </dd>
              </div>
            </dl>
          </div>
        </>
      ) : (
        <p className="mt-3 text-sm text-white/80">
          Set a monthly budget to see how your spending is tracking.
        </p>
      )}
    </section>
  );
}
