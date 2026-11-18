import { peso } from "@/lib/account";
import type { IconKey, TxType, Category, Transaction } from "./types";
import { toMinor } from "@/lib/account";

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
import { z } from "zod";

export const addTransactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  description: z.string().trim().min(2, "Add a short description").max(80),
  amount: z
    .string()
    .regex(/^\d{1,12}(\.\d{1,2})?$/, "Enter a valid amount, e.g. 650.00")
    .refine((v) => toMinor(v) > 0, "Amount must be greater than 0"),
  categoryId: z.string().min(1, "Pick a category"),
  accountId: z.string().min(1, "Pick an account"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date"),
});

export function summarize(txs: Transaction[]) {
  let income = 0;
  let expense = 0;
  for (const t of txs)
    t.type === "income"
      ? (income += t.amountMinor)
      : (expense += t.amountMinor);
  return { income, expense, net: income - expense, count: txs.length };
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const signedAmount = (t: Pick<Transaction, "type" | "amountMinor">) =>
  (t.type === "income" ? "+" : "-") + peso(t.amountMinor);

export const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function filterTransactions(
  txs: Transaction[],
  categories: Category[],
  query: string,
  type: TxType | "all",
) {
  const q = query.trim().toLowerCase();
  return txs
    .filter((t) => type === "all" || t.type === type)
    .filter((t) => {
      if (!q) return true;
      const cat = categories.find((c) => c.id === t.categoryId)?.name ?? "";
      return (
        t.description.toLowerCase().includes(q) || cat.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
