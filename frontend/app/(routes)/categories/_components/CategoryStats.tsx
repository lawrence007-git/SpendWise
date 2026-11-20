import { ArrowUp, LayoutGrid, PieChart, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  total: number;
  expense: number;
  income: number;
  archived: number;
};

const pct = (n: number, t: number) => (t ? Math.round((n / t) * 100) : 0);

export function CategoryStats({ total, expense, income, archived }: Props) {
  return (
    <section className="relative mt-6 grid animate-fade-up gap-4 animate-delay-100 sm:grid-cols-3">
      <Stat
        tone="tone-primary"
        icon={LayoutGrid}
        label="Total categories"
        value={total}
        note={archived > 0 ? `${archived} archived` : "All active"}
      />
      <Stat
        tone="tone-blue"
        icon={PieChart}
        label="Expense categories"
        value={expense}
        note={`${pct(expense, total)}% of total`}
        bar={pct(expense, total)}
      />
      <Stat
        tone="tone-success"
        icon={ArrowUp}
        label="Income categories"
        value={income}
        note={`${pct(income, total)}% of total`}
        bar={pct(income, total)}
      />
    </section>
  );
}

type StatProps = {
  tone: string;
  icon: LucideIcon;
  label: string;
  value: number;
  note: string;
  bar?: number;
};

function Stat({ tone, icon: Icon, label, value, note, bar }: StatProps) {
  return (
    <div
      className={cn(
        tone,
        "tone-surface rounded-2xl border p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated",
      )}
    >
      <div className="flex items-center gap-4">
        <div className="tone-icon grid h-14 w-14 shrink-0 place-items-center rounded-full">
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-3xl font-extrabold tabular-nums leading-tight">
            {value}
          </p>
          <p className="tone-text text-xs font-semibold">{note}</p>
        </div>
      </div>
      {bar !== undefined && (
        <div
          className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted"
          role="presentation"
        >
          <div
            className="tone-dot h-full rounded-full transition-all duration-700"
            style={{ width: `${bar}%` }}
          />
        </div>
      )}
    </div>
  );
}
