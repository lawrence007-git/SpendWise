import { ArrowDownRight, ArrowUpRight, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Income",
    value: "₱48,250.00",
    icon: ArrowUpRight,
    tone: "text-success",
  },
  {
    label: "Expenses",
    value: "₱31,980.50",
    icon: ArrowDownRight,
    tone: "text-destructive",
  },
  {
    label: "Net cash flow",
    value: "₱16,269.50",
    icon: TrendingUp,
    tone: "text-primary",
  },
];

const budgets = [
  { name: "Groceries", used: 62, tone: "bg-success" },
  { name: "Dining out", used: 86, tone: "bg-warning" },
  { name: "Transport", used: 104, tone: "bg-destructive" },
];

const bars = [40, 55, 48, 70, 62, 80, 58, 74, 66, 88, 72, 60];

export function DashboardPreview() {
  return (
    <div className="glow rounded-2xl border bg-card p-4 text-card-foreground sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">November 2026</p>
          <p className="font-display text-lg font-bold">Monthly overview</p>
        </div>
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          All accounts
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border bg-background p-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              {s.label}
              <s.icon className={`h-4 w-4 ${s.tone}`} />
            </div>
            <p className="mt-1 font-display text-base font-bold tabular-nums">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-5">
        <div className="rounded-xl border bg-background p-3 sm:col-span-3">
          <p className="text-xs font-medium text-muted-foreground">
            Monthly spending trend
          </p>
          <div className="mt-3 flex h-28 items-end gap-1.5">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-primary/80 transition-all hover:bg-primary"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="space-y-3 rounded-xl border bg-background p-3 sm:col-span-2">
          <p className="text-xs font-medium text-muted-foreground">
            Budget usage
          </p>
          {budgets.map((b) => (
            <div key={b.name}>
              <div className="flex justify-between text-xs">
                <span>{b.name}</span>
                <span className="tabular-nums text-muted-foreground">
                  {b.used}%
                </span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full ${b.tone}`}
                  style={{ width: `${Math.min(b.used, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
