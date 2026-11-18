"use client";

import { useState, useCallback, useEffect } from "react";
import { Wallet } from "lucide-react";
import type { Account, Activity } from "@/lib/types";
import { useApi } from "@/lib/api";
import { openingMinor, fromApi, type ApiAccount } from "@/lib/account";
import { AccountCard } from "./AccountCard";
import { AddAccountDialog } from "./AccountDialog";
import { AccountsHeader } from "./AccountHeader";
import { BalanceBanner } from "./AccountBanner";
import { RecentActivity } from "./AcountActivity";
import { useAuth } from "@clerk/nextjs";

/** Client container: owns the state and composes the presentational pieces. */
type Props = {
  activity: Activity[];
  changePct?: number;
};

export function AccountsView({ activity, changePct }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const api = useApi();
  const { isLoaded, isSignedIn } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [hidden, setHidden] = useState(false);
  const [filter, setFilter] = useState("all");

  const load = useCallback(async () => {
    try {
      const rows = await api<ApiAccount[]>("/accounts");
      setAccounts(rows.map(fromApi));
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

  const total = accounts.reduce((s, a) => s + openingMinor(a), 0);
  const addAccount = (a: Account) => setAccounts((xs) => [...xs, a]);
  const setPrimary = (id: string) =>
    setAccounts((xs) => xs.map((a) => ({ ...a, primary: a.id === id })));

  const archive = async (id: string) => {
    const previous = accounts;
    setAccounts((xs) => xs.filter((a) => a.id !== id)); // optimistic
    try {
      await api(`/accounts/${id}/archive`, { method: "PATCH" });
    } catch (e) {
      setAccounts(previous); // roll back
      setError((e as Error).message);
    }
  };
  return (
    <div className="relative -mx-6 -my-8 min-h-[calc(100%+4rem)] overflow-hidden bg-gradient-hero p-6 sm:-mx-9 sm:-my-10 sm:min-h-[calc(100%+5rem)] sm:p-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-grid opacity-60" />

      <AccountsHeader />

      <BalanceBanner
        total={total}
        count={accounts.length}
        hidden={hidden}
        onToggleHidden={() => setHidden((h) => !h)}
        changePct={changePct}
      />

      <section className="relative mt-6 animate-fade-up animate-delay-200">
        {/* Toolbar: the Add button lives next to the list it changes */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            All accounts
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
              {accounts.length}
            </span>
          </h2>
          <AddAccountDialog onAdd={addAccount} />
        </div>

        {error && (
          <p role="alert" className="mb-3 text-sm text-destructive">
            {error}
          </p>
        )}
        {loading && (
          <p className="mb-3 text-sm text-muted-foreground">
            Loading accounts...
          </p>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          {accounts.map((a) => (
            <AccountCard
              key={a.id}
              account={a}
              hidden={hidden}
              onSetPrimary={setPrimary}
              onArchive={archive}
            />
          ))}
          {!loading && accounts.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
              <Wallet className="mx-auto mb-3 h-8 w-8" />
              No accounts yet. Add your first one to start tracking.
            </div>
          )}
        </div>
      </section>

      <RecentActivity
        accounts={accounts}
        activity={activity}
        filter={filter}
        onFilterChange={setFilter}
      />
    </div>
  );
}
