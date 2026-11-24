import type { LucideIcon } from "lucide-react";

export type Kind = "bank" | "cash" | "ewallet";
export type Tone = "primary" | "success" | "glow" | "amber";

export type Account = {
  id: string;
  name: string;
  accountType: Kind;
  currency: string;
  tone: Tone;
  last4?: string;
  openingBalance: string;
  archiveAt: string | null;
  createdAt: string;
  primary?: boolean;
};

export type Activity = {
  id: string;
  date: string;
  description: string;
  icon: LucideIcon;
  accountId: string;
  amountMinor: number;
};

export type TxType = "income" | "expense";

export type TxAccount = Pick<Account, "id" | "name" | "accountType">;

export type Transaction = {
  id: string;
  accountId: string;
  transactionType: TxType;
  categoryId: string;
  amount: string; // "250.00", a string like openingBalance
  currency: string;
  transactionDate: string; // "2026-11-19"
  description: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CategoryColor =
  | "primary"
  | "success"
  | "glow"
  | "amber"
  | "destructive"
  | "violet"
  | "blue"
  | "pink";

export type CategoryIcon =
  | "cart"
  | "utensils"
  | "home"
  | "car"
  | "zap"
  | "briefcase"
  | "laptop"
  | "gift"
  | "heart"
  | "plane"
  | "book"
  | "coffee"
  | "wallet"
  | "music"
  | "paw"
  | "receipt";

export type Category = {
  id: string;
  name: string;
  transactionType: TxType;
  color: CategoryColor;
  icon: CategoryIcon;
  archiveAt: string | null;
  transactionCount?: number;
  totalMinor?: number; // integer centavos
};

/**
 * Budget types. They mirror the `budgets` table:
 * id, owner_id, category_id, period_month, period_year, amount NUMERIC, currency, created_at, updated_at.
 * Types only: no runtime code.
 *
 * - `owner_id` is not here on purpose: the server sets it from the session and never needs it in the UI.
 * - `amount` is NUMERIC(12,2), which drivers return as a decimal STRING ("10000.00"). Keep it a string
 *   at the API boundary and convert with toMinor() (lib/account) only when doing math.

 */
export type Budget = {
  id: string;
  categoryId: string;
  periodMonth: number; // 1–12
  periodYear: number;
  amount: string; // decimal string, e.g. "10000.00"
  currency: string; // ISO 4217, e.g. "PHP"
  createdAt: string;
  updatedAt: string;
};

export type Period = { month: number; year: number };

/* ---------- aggregates the backend computes from transactions (not stored in `budgets`) ---------- */

/** Total expense per category for a month. `spent` is a decimal string (SUM of NUMERIC). */
export type BudgetSpend = {
  categoryId: string;
  periodMonth: number;
  periodYear: number;
  spent: string;
};

/** Cumulative spending at the end of each week of the selected month. */
export type BudgetWeek = { label: string; spent: string };

export type BudgetActivityItem = {
  id: string;
  date: string; // YYYY-MM-DD
  categoryId: string;
  amount: string; // decimal string, positive
  action: "spent" | "refund";
};

/* ---------- derived UI shapes ---------- */
export type BudgetStatus = "on_track" | "near_limit" | "over";

export type BudgetLine = {
  budget: Budget;
  category: Category;
  limitMinor: number;
  spentMinor: number;
  pct: number;
  status: BudgetStatus;
};

/* ---------- UI state ---------- */
export type Tab = "all" | TxType;
export type SortKey = "name" | "usage" | "total";
export type ViewMode = "grid" | "list";
