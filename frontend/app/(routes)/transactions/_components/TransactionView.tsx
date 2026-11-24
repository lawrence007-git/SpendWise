"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useApi } from "@/lib/api";
import type { Transaction, Category, TxAccount, TxType } from "@/lib/types";
import { filterTransactions, summarize } from "@/lib/transaction";
import { RecurringCard } from "./RecurringCard";
import { SpendingInsights } from "./Insight";
import { SummaryCards, type Trends } from "./SummaryCard";
import { TransactionsHeader } from "./TransactionHeader";
import { AddTransactionDialog } from "./TransactionDialog";
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [accounts, setAccounts] = useState<TxAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TxType | "all">("all");
  const [dialog, setDialog] = useState<{
    open: boolean;
    transaction: Transaction | null;
  }>({ open: false, transaction: null });

  const saveTransaction = (saved: Transaction) =>
    setTransactions((xs) =>
      xs.some((t) => t.id === saved.id)
        ? xs.map((t) => (t.id === saved.id ? { ...t, ...saved } : t))
        : [saved, ...xs],
    );

  const openCreate = () => setDialog({ open: true, transaction: null });
  const openEdit = (t: Transaction) =>
    setDialog({ open: true, transaction: t });

  const load = useCallback(async () => {
    try {
      const [tx, accs, cats] = await Promise.all([
        api<Transaction[]>("/transactions?limit=100"),
        api<TxAccount[]>("/accounts"),
        api<Category[]>("/categories?includeArchived=true"),
      ]);
      setTransactions(tx);
      setAccounts(accs);
      setCategories(cats);
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
          categories={categories}
          query={query}
          onQueryChange={setQuery}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          onAdd={openCreate}
          onEdit={openEdit}
          onDelete={deleteTransaction}
          viewAllHref={viewAllHref}
        />

        <AddTransactionDialog
          open={dialog.open}
          onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}
          transaction={dialog.transaction}
          accounts={accounts}
          categories={categories}
          onSaved={saveTransaction}
        />

        <aside className="space-y-5">
          <SpendingInsights budgetMinor={budgetMinor} spentMinor={spentMinor} />
          <RecurringCard onCreateRule={onCreateRule} />
        </aside>
      </div>
    </div>
  );
}
