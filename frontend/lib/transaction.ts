import { z } from "zod";
import {
  ArrowDownToLine,
  Car,
  Coffee,
  Gift,
  HeartPulse,
  Home,
  Receipt,
  ShoppingCart,
  Utensils,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { peso, toMinor } from "@/lib/account";
import type { Transaction, TxType } from "./types";

/* ---------- Icons (only used by transactions) ---------- */
export type IconKey =
  | "cart"
  | "utensils"
  | "download"
  | "car"
  | "zap"
  | "coffee"
  | "home"
  | "heart"
  | "gift"
  | "receipt";

export const CATEGORY_ICONS: Record<IconKey, LucideIcon> = {
  cart: ShoppingCart,
  utensils: Utensils,
  download: ArrowDownToLine,
  car: Car,
  zap: Zap,
  coffee: Coffee,
  home: Home,
  heart: HeartPulse,
  gift: Gift,
  receipt: Receipt,
};

/* ---------- Styles and filters ---------- */
// Class names come from styles/tones.css (keep them as full literals).
export const TYPE_STYLE: Record<TxType, { label: string; tone: string }> = {
  income: { label: "Income", tone: "tone-success" },
  expense: { label: "Expense", tone: "tone-destructive" },
};

export const TYPE_FILTERS = [
  { value: "all", label: "All types" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
] as const;

/* ---------- Form validation (the form's shape, not the API's) ---------- */
export const addTransactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  description: z.string().trim().min(2, "Add a short description").max(80),
  amount: z
    .string()
    .regex(/^\d{1,10}(\.\d{1,2})?$/, "Enter a valid amount, e.g. 650.00")
    .refine((v) => toMinor(v) > 0, "Amount must be greater than 0"),
  accountId: z.string().min(1, "Pick an account"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date"),
});

export const amountMinor = (t: Pick<Transaction, "amount">) =>
  toMinor(t.amount);

export function summarize(txs: Transaction[]) {
  let income = 0;
  let expense = 0;
  for (const t of txs) {
    if (t.transactionType === "income") income += amountMinor(t);
    else expense += amountMinor(t);
  }
  return { income, expense, net: income - expense, count: txs.length };
}

export const signedAmount = (
  t: Pick<Transaction, "transactionType" | "amount">,
) => (t.transactionType === "income" ? "+" : "-") + peso(amountMinor(t));

/* ---------- Dates ---------- */
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/* ---------- Search and filter ---------- */
export function filterTransactions(
  txs: Transaction[],
  query: string,
  type: TxType | "all",
) {
  const q = query.trim().toLowerCase();
  return txs
    .filter((t) => type === "all" || t.transactionType === type)
    .filter((t) => !q || t.description.toLowerCase().includes(q))
    .sort((a, b) => b.transactionDate.localeCompare(a.transactionDate));
}
