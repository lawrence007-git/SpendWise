"use client";

import { useMemo, useState } from "react";
import type { Category, Transaction, TxAccount, TxType } from "@/lib/types";
import { filterTransactions, summarize } from "@/lib/transaction";
import { HeroIllustration } from "./TransactionHero";
import { RecurringCard } from "./RecurringCard";
import { SpendingInsights } from "./Insight";
import { SummaryCards, type Trends } from "./SummaryCard";
import { TransactionsHeader } from "./TransactionHeader";
import { TransactionsTable } from "./TransactionTable";

type Props = {
  initialTransactions: Transaction[];
  categories: Category[];
  accounts: TxAccount[];
  trends?: Trends;
  budgetMinor?: number;
  spentMinor?: number;
  viewAllHref?: string;
  rowLimit?: number;
  onCreateRule?: () => void;
};

export function TransactionsView({
  initialTransactions,
  categories,
  accounts,
  trends,
  budgetMinor,
  spentMinor,
  viewAllHref,
  rowLimit = 6,
  onCreateRule,
}: Props) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TxType | "all">("all");

  const totals = useMemo(() => summarize(transactions), [transactions]);
  const rows = useMemo(
    () =>
      filterTransactions(transactions, categories, query, typeFilter).slice(
        0,
        rowLimit,
      ),
    [transactions, categories, query, typeFilter, rowLimit],
  );

  return (
    <div className="relative -mx-6 -my-8 min-h-[calc(100%+4rem)] overflow-hidden bg-gradient-hero p-6 sm:-mx-9 sm:-my-10 sm:min-h-[calc(100%+5rem)] sm:p-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-grid opacity-60" />

      <HeroIllustration />

      <TransactionsHeader />
      <SummaryCards {...totals} trends={trends} />

      <div className="relative mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <TransactionsTable
          transactions={rows}
          categories={categories}
          accounts={accounts}
          query={query}
          onQueryChange={setQuery}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          onAdd={(t) => setTransactions((xs) => [t, ...xs])}
          onDelete={(id) =>
            setTransactions((xs) => xs.filter((t) => t.id !== id))
          }
          viewAllHref={viewAllHref}
        />
        <aside className="space-y-5">
          <SpendingInsights budgetMinor={budgetMinor} spentMinor={spentMinor} />
          <RecurringCard onCreateRule={onCreateRule} />
        </aside>
      </div>
    </div>
  );
}
