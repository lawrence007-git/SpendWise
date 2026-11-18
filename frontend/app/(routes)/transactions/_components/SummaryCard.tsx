import { ArrowDown, ArrowUp, PieChart, Scale } from "lucide-react";
import { peso } from "@/lib/account";
import { StatCard } from "./Statcard";

export type Trends = Partial<
  Record<"income" | "expenses" | "net" | "count", number>
>;
type Props = {
  income: number;
  expense: number;
  net: number;
  count: number;
  trends?: Trends;
};

export function SummaryCards({ income, expense, net, count, trends }: Props) {
  return (
    <section className="relative mt-6 grid animate-fade-up gap-4 animate-delay-100 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total Income"
        value={peso(income)}
        icon={ArrowUp}
        tone="tone-success"
        trend={trends?.income}
      />
      <StatCard
        label="Total Expenses"
        value={peso(expense)}
        icon={ArrowDown}
        tone="tone-primary"
        trend={trends?.expenses}
      />
      <StatCard
        label="Net Cash Flow"
        value={peso(net)}
        icon={Scale}
        tone="tone-glow"
        trend={trends?.net}
      />
      <StatCard
        label="Transactions"
        value={String(count)}
        icon={PieChart}
        tone="tone-amber"
        trend={trends?.count}
      />
    </section>
  );
}
