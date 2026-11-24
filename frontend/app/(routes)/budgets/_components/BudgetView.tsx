"use client";

import { useMemo, useState } from "react";
import { toMinor } from "@/lib/account";
import {
  buildLines,
  changeVsPrevious,
  fromMinor,
  inPeriod,
  shiftPeriod,
  summarize,
} from "@/lib/budget";
import type {
  Budget,
  BudgetActivityItem,
  BudgetSpend,
  BudgetWeek,
  Period,
} from "@/lib/types";
import type { Category } from "@/lib/types";
import { BudgetActivity } from "./BudgetActivity";
import { BudgetDialog } from "./BudgetDialog";
import { BudgetsHeader } from "./BudgetHeader";
import { BudgetInsights } from "./BudgetInsight";
import { BudgetList } from "./BudgetList";
import { BudgetPromo } from "./BudgetPromo";
import { BudgetStats } from "./BudgetStats";
import { BudgetUsage } from "./BudgetUsage";

type Props = {
  initialBudgets: Budget[];
  categories: Category[];
  /** Per-category spending (SUM of expense transactions). Include every month you want the picker to show. */
  spent: BudgetSpend[];
  /** The next three are for the SELECTED period: refetch them in onPeriodChange. */
  weekly: BudgetWeek[];
  activity: BudgetActivityItem[];
  initialPeriod: Period; // "this month", computed on the server
  currency: string; // totals only add budgets in this currency
  onPeriodChange?: (p: Period) => void;
  reportHref?: string;
  activityHref?: string;
};

/** Client container: owns the state and composes the presentational pieces. */
export function BudgetsView({
  initialBudgets,
  categories,
  spent,
  weekly,
  activity,
  initialPeriod,
  currency,
  onPeriodChange,
  reportHref,
  activityHref,
}: Props) {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [period, setPeriod] = useState(initialPeriod);
  const [dialog, setDialog] = useState<{
    open: boolean;
    editing: Budget | null;
  }>({ open: false, editing: null });

  const lines = useMemo(
    () => buildLines(budgets, categories, spent, period),
    [budgets, categories, spent, period],
  );
  const totals = useMemo(() => summarize(lines, currency), [lines, currency]);
  const change = useMemo(
    () => changeVsPrevious(budgets, period, currency),
    [budgets, period, currency],
  );
  const canCopyPrevious = budgets.some((b) =>
    inPeriod(b, shiftPeriod(period, -1)),
  );

  const changePeriod = (p: Period) => {
    setPeriod(p);
    onPeriodChange?.(p);
  };
  const openCreate = () => setDialog({ open: true, editing: null });
  const openEdit = (b: Budget) => setDialog({ open: true, editing: b });

  // The amount is stored as a normalized decimal string ("5000.00"), like NUMERIC(12,2) returns it
  const save = (categoryId: string, rawAmount: string, id?: string) => {
    const now = new Date().toISOString();
    const amount = fromMinor(toMinor(rawAmount));
    setBudgets((xs) =>
      id
        ? xs.map((b) => (b.id === id ? { ...b, amount, updatedAt: now } : b))
        : [
            ...xs,
            {
              id: crypto.randomUUID(),
              categoryId,
              periodMonth: period.month,
              periodYear: period.year,
              amount,
              currency,
              createdAt: now,
              updatedAt: now,
            },
          ],
    );
  };

  const remove = (id: string) =>
    setBudgets((xs) => xs.filter((b) => b.id !== id));

  const copyPrevious = () => {
    const now = new Date().toISOString();
    const prev = shiftPeriod(period, -1);
    setBudgets((xs) => {
      const have = new Set(
        xs.filter((b) => inPeriod(b, period)).map((b) => b.categoryId),
      );
      const copies = xs
        .filter((b) => inPeriod(b, prev) && !have.has(b.categoryId))
        .map((b) => ({
          ...b,
          id: crypto.randomUUID(),
          periodMonth: period.month,
          periodYear: period.year,
          createdAt: now,
          updatedAt: now,
        }));
      return [...xs, ...copies];
    });
  };

  return (
    <div className="relative -mx-6 -my-8 min-h-[calc(100%+4rem)] overflow-hidden bg-gradient-hero p-6 sm:-mx-9 sm:-my-10 sm:min-h-[calc(100%+5rem)] sm:p-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-grid opacity-60" />

      <BudgetsHeader />

      <div className="relative mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
        <div className="md:col-span-3 xl:col-span-1">
          <BudgetUsage
            pct={totals.pct}
            spentMinor={totals.spentMinor}
            limitMinor={totals.limitMinor}
            status={totals.status}
            currency={currency}
            hasBudgets={totals.count > 0}
          />
        </div>
        <BudgetStats
          limitMinor={totals.limitMinor}
          spentMinor={totals.spentMinor}
          remainingMinor={totals.remainingMinor}
          pct={totals.pct}
          currency={currency}
          change={change}
        />
      </div>

      <div className="relative mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <BudgetList
          lines={lines}
          period={period}
          currentPeriod={initialPeriod}
          onPeriodChange={changePeriod}
          onAdd={openCreate}
          onEdit={openEdit}
          onDelete={remove}
          canCopyPrevious={canCopyPrevious}
          onCopyPrevious={copyPrevious}
        />
        <BudgetInsights
          status={totals.status}
          pct={totals.pct}
          limitMinor={totals.limitMinor}
          spentMinor={totals.spentMinor}
          currency={currency}
          weekly={weekly}
          hasBudgets={totals.count > 0}
          reportHref={reportHref}
        />
      </div>

      <div className="relative mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <BudgetActivity
          items={activity}
          categories={categories}
          currency={currency}
          viewAllHref={activityHref}
        />
        <BudgetPromo onCreate={openCreate} />
      </div>

      <BudgetDialog
        open={dialog.open}
        onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}
        editing={dialog.editing}
        period={period}
        currency={currency}
        categories={categories}
        budgets={budgets}
        onSave={save}
      />
    </div>
  );
}
