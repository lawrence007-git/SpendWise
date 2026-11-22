import { z } from "zod";
import {
  BookOpen,
  Briefcase,
  Car,
  Coffee,
  Gift,
  HeartPulse,
  Home,
  Laptop,
  Music,
  PawPrint,
  Plane,
  Receipt,
  ShoppingCart,
  Utensils,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type {
  Category,
  CategoryColor,
  CategoryIcon,
  SortKey,
  Tab,
  TxType,
} from "@/lib/types";

/* ---------- allowed values (the unions live in category.types.ts; the Records below keep them exhaustive) ---------- */
export const COLOR_KEYS = [
  "primary",
  "success",
  "glow",
  "amber",
  "destructive",
  "violet",
  "blue",
  "pink",
] as const satisfies readonly CategoryColor[];
export const ICON_KEYS = [
  "cart",
  "utensils",
  "home",
  "car",
  "zap",
  "briefcase",
  "laptop",
  "gift",
  "heart",
  "plane",
  "book",
  "coffee",
  "wallet",
  "music",
  "paw",
  "receipt",
] as const satisfies readonly CategoryIcon[];

/* ---------- display maps (tone classes live in styles/tones*.css; keep them as full literals) ---------- */
export const CATEGORY_ICONS: Record<CategoryIcon, LucideIcon> = {
  cart: ShoppingCart,
  utensils: Utensils,
  home: Home,
  car: Car,
  zap: Zap,
  briefcase: Briefcase,
  laptop: Laptop,
  gift: Gift,
  heart: HeartPulse,
  plane: Plane,
  book: BookOpen,
  coffee: Coffee,
  wallet: Wallet,
  music: Music,
  paw: PawPrint,
  receipt: Receipt,
};

export const CATEGORY_COLORS: Record<
  CategoryColor,
  { label: string; tone: string }
> = {
  primary: { label: "Teal", tone: "tone-primary" },
  success: { label: "Green", tone: "tone-success" },
  glow: { label: "Cyan", tone: "tone-glow" },
  amber: { label: "Amber", tone: "tone-amber" },
  destructive: { label: "Red", tone: "tone-destructive" },
  violet: { label: "Violet", tone: "tone-violet" },
  blue: { label: "Blue", tone: "tone-blue" },
  pink: { label: "Pink", tone: "tone-pink" },
};

export const TYPE_STYLE: Record<TxType, { label: string; tone: string }> = {
  income: { label: "Income", tone: "tone-success" },
  expense: { label: "Expense", tone: "tone-destructive" },
};

/* ---------- validation (client side; the API stays the source of truth) ---------- */
export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Keep the name under 30 characters"),
  transactionType: z.enum(["income", "expense"]),
  color: z.enum(COLOR_KEYS),
  icon: z.enum(ICON_KEYS),
});

/* ---------- helpers ---------- */
export const isDuplicate = (
  cats: Category[],
  name: string,
  type: TxType,
  ignoreId?: string,
) =>
  cats.some(
    (c) =>
      c.id !== ignoreId &&
      c.transactionType === type &&
      c.name.toLowerCase() === name.trim().toLowerCase(),
  );

export function summarize(cats: Category[]) {
  const active = cats.filter((c) => !c.archiveAt);
  const expense = active.filter((c) => c.transactionType === "expense").length;
  return {
    total: active.length,
    expense,
    income: active.length - expense,
    archived: cats.length - active.length,
  };
}

export function filterCategories(
  cats: Category[],
  o: { tab: Tab; query: string; showArchived: boolean; sort: SortKey },
) {
  const q = o.query.trim().toLowerCase();
  return cats
    .filter((c) => o.showArchived || !c.archiveAt)
    .filter((c) => o.tab === "all" || c.transactionType === o.tab)
    .filter((c) => !q || c.name.toLowerCase().includes(q))
    .sort((a, b) => {
      if (o.sort === "usage")
        return (b.transactionCount ?? 0) - (a.transactionCount ?? 0);
      if (o.sort === "total") return (b.totalMinor ?? 0) - (a.totalMinor ?? 0);
      return a.name.localeCompare(b.name);
    });
}
