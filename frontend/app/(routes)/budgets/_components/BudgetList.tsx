import { Copy, PieChart, Plus, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  parsePeriod,
  periodKey,
  periodLabel,
  periodOptions,
  samePeriod,
} from "@/lib/budget";
import type { Budget, BudgetLine, Period } from "@/lib/types";
import { BudgetRow } from "./BudgetRow";

type Props = {
  lines: BudgetLine[];
  period: Period;
  currentPeriod: Period;
  onPeriodChange: (p: Period) => void;
  onAdd: () => void;
  onEdit: (b: Budget) => void;
  onDelete: (id: string) => void;
  canCopyPrevious: boolean;
  onCopyPrevious: () => void;
};

export function BudgetList(p: Props) {
  const options = periodOptions(p.currentPeriod);
  if (!options.some((o) => samePeriod(o, p.period))) options.push(p.period);

  return (
    <section className="relative animate-fade-up rounded-2xl border bg-card shadow-soft animate-delay-300">
      <div className="flex flex-wrap items-center gap-3 border-b p-4">
        <h2 className="mr-auto flex items-center gap-2 text-lg font-bold">
          <PieChart className="h-5 w-5" /> Your Budget Categories
        </h2>

        <Select
          value={periodKey(p.period)}
          onValueChange={(v) => p.onPeriodChange(parsePeriod(v))}
        >
          <SelectTrigger
            className="w-44 rounded-full"
            aria-label="Budget month"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((o) => (
              <SelectItem key={periodKey(o)} value={periodKey(o)}>
                {samePeriod(o, p.currentPeriod) ? "This Month" : periodLabel(o)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={p.onAdd}
          className="rounded-lg border-0 bg-gradient-brand px-4 text-primary-foreground shadow-soft hover:opacity-90"
        >
          <Plus className="mr-1 h-4 w-4" /> Set budget
        </Button>
      </div>

      {p.lines.length > 0 ? (
        <ul className="divide-y">
          {p.lines.map((l) => (
            <BudgetRow
              key={l.budget.id}
              line={l}
              onEdit={p.onEdit}
              onDelete={p.onDelete}
            />
          ))}
        </ul>
      ) : (
        <div className="p-10 text-center text-muted-foreground">
          <Target className="mx-auto mb-3 h-8 w-8" />
          <p>No budgets set for {periodLabel(p.period)}.</p>
          {p.canCopyPrevious && (
            <Button
              variant="outline"
              onClick={p.onCopyPrevious}
              className="mt-4 rounded-lg"
            >
              <Copy className="mr-2 h-4 w-4" /> Copy last month’s budgets
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
