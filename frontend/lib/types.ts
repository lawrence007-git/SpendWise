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
  amount: string; // "250.00", a string like openingBalance
  currency: string;
  transactionDate: string; // "2026-11-19"
  description: string;
  notes: string | null;
  createdAt: string;
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
  archivedAt: string | null;
  /** Aggregates, e.g. from GET /reports/categories. Optional. */
  transactionCount?: number;
  totalMinor?: number; // integer centavos
};

/** What the create/edit form submits. */
export type CategoryInput = Pick<
  Category,
  "name" | "transactionType" | "color" | "icon"
>;

/* ---------- UI state ---------- */
export type Tab = "all" | TxType;
export type SortKey = "name" | "usage" | "total";
export type ViewMode = "grid" | "list";
