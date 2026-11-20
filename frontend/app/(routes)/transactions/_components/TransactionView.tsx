"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useApi } from "@/lib/api";
import type { Transaction, TxAccount, TxType } from "@/lib/types";
import { filterTransactions, summarize } from "@/lib/transaction";
import { RecurringCard } from "./RecurringCard";
import { SpendingInsights } from "./Insight";
import { SummaryCards, type Trends } from "./SummaryCard";
import { TransactionsHeader } from "./TransactionHeader";
import { TransactionsTable } from "./TransactionTable";

type Props = {
  trends?: Trends;
  budgetMinor?: number;
  spentMinor?: number;
  viewAllHref?: string;
  rowLimit?: number;
  onCreateRule?: () => void;
};

export function TransactionsView({
  trends,
  budgetMinor,
  spentMinor,
  viewAllHref,
  rowLimit = 6,
  onCreateRule,
}: Props) {
  const { isLoaded, isSignedIn } = useAuth();
  const api = useApi();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<TxAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TxType | "all">("all");

  const load = useCallback(async () => {
    try {
      const [tx, accs] = await Promise.all([
        api<Transaction[]>("/transactions?limit=100"),
        api<TxAccount[]>("/accounts"),
      ]);
      setTransactions(tx);
      setAccounts(accs);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    if (isLoaded && isSignedIn) load();
  }, [isLoaded, isSignedIn, load]);

  const deleteTransaction = async (id: string) => {
    const previous = transactions;
    setTransactions((xs) => xs.filter((t) => t.id !== id)); // optimistic
    try {
      await api(`/transactions/${id}`, { method: "DELETE" });
    } catch (e) {
      setTransactions(previous); // roll back
      setError((e as Error).message);
    }
  };

  const totals = useMemo(() => summarize(transactions), [transactions]);
  const rows = useMemo(
    () =>
      filterTransactions(transactions, query, typeFilter).slice(0, rowLimit),
    [transactions, query, typeFilter, rowLimit],
  );

  return (
    <div className="relative -mx-6 -my-8 min-h-[calc(100%+4rem)] overflow-hidden bg-gradient-hero p-6 sm:-mx-9 sm:-my-10 sm:min-h-[calc(100%+5rem)] sm:p-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-grid opacity-60" />

      <TransactionsHeader />
      <SummaryCards {...totals} trends={trends} />

      {error && (
        <p role="alert" className="relative mt-4 text-sm text-destructive">
          {error}
        </p>
      )}
      {loading && (
        <p className="relative mt-4 text-sm text-muted-foreground">
          Loading transactions...
        </p>
      )}

      <div className="relative mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_21rem]">
        <TransactionsTable
          transactions={rows}
          accounts={accounts}
          query={query}
          onQueryChange={setQuery}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          onAdd={(t) => setTransactions((xs) => [t, ...xs])}
          onDelete={deleteTransaction}
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
