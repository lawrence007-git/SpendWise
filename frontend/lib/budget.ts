import { z } from "zod";
import { toMinor } from "@/lib/account";
import type { Category } from "@/lib/types";
import type {
  Budget,
  BudgetLine,
  BudgetSpend,
  BudgetStatus,
  Period,
} from "@/lib/types";

/* ---------- money: amounts are decimal strings, math happens in integer minor units ---------- */
export const fromMinor = (minor: number) => {
  const a = Math.abs(minor);
  return `${minor < 0 ? "-" : ""}${Math.trunc(a / 100)}.${String(a % 100).padStart(2, "0")}`;
};

export const formatMoney = (minor: number, currency = "PHP") =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency }).format(
    minor / 100,
  );

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

/* ---------- status ---------- */
export const NEAR_LIMIT_PCT = 90;

export const statusOf = (pct: number): BudgetStatus =>
  pct >= 100 ? "over" : pct >= NEAR_LIMIT_PCT ? "near_limit" : "on_track";

// tone classes live in styles/tones*.css (keep them as full literals)
export const STATUS_STYLE: Record<
  BudgetStatus,
  { label: string; headline: string; tone: string }
> = {
  on_track: { label: "On Track", headline: "On track!", tone: "tone-success" },
  near_limit: {
    label: "Near Limit",
    headline: "Close to your limit",
    tone: "tone-amber",
  },
  over: {
    label: "Over Budget",
    headline: "Over budget",
    tone: "tone-destructive",
  },
};

/* ---------- periods ---------- */
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const periodKey = (p: Period) =>
  `${p.year}-${String(p.month).padStart(2, "0")}`;
export const parsePeriod = (key: string): Period => {
  const [year, month] = key.split("-").map(Number);
  return { month, year };
};
export const periodLabel = (p: Period) => `${MONTHS[p.month - 1]} ${p.year}`;
export const samePeriod = (a: Period, b: Period) =>
  a.month === b.month && a.year === b.year;

export const shiftPeriod = (p: Period, delta: number): Period => {
  const i = p.year * 12 + (p.month - 1) + delta;
  return { year: Math.floor(i / 12), month: (i % 12) + 1 };
};

/** Newest first: a couple of months ahead, then back in time. */
export const periodOptions = (
  current: Period,
  back = 6,
  forward = 2,
): Period[] =>
  Array.from({ length: back + forward + 1 }, (_, i) =>
    shiftPeriod(current, forward - i),
  );

/* ---------- validation (client side; the API stays the source of truth) ---------- */
// NUMERIC(12,2) allows up to 10 integer digits
export const budgetSchema = z.object({
  categoryId: z.string().min(1, "Pick a category"),
  amount: z
    .string()
    .regex(/^\d{1,10}(\.\d{1,2})?$/, "Enter a valid amount, e.g. 5000.00")
    .refine((v) => toMinor(v) > 0, "Amount must be greater than 0"),
});

/* ---------- derived data ---------- */
export const inPeriod = (b: Budget, p: Period) =>
  b.periodMonth === p.month && b.periodYear === p.year;

export function buildLines(
  budgets: Budget[],
  categories: Category[],
  spent: BudgetSpend[],
  p: Period,
): BudgetLine[] {
  const cat = new Map(categories.map((c) => [c.id, c]));
  const sp = new Map(
    spent
      .filter((s) => s.periodMonth === p.month && s.periodYear === p.year)
      .map((s) => [s.categoryId, toMinor(s.spent)]),
  );

  return budgets
    .filter((b) => inPeriod(b, p))
    .flatMap((b) => {
      const category = cat.get(b.categoryId);
      if (!category) return [];
      const limitMinor = toMinor(b.amount);
      const spentMinor = sp.get(b.categoryId) ?? 0;
      const pct =
        limitMinor > 0 ? Math.round((spentMinor / limitMinor) * 100) : 0;
      return [
        {
          budget: b,
          category,
          limitMinor,
          spentMinor,
          pct,
          status: statusOf(pct),
        },
      ];
    })
    .sort((a, b) => b.pct - a.pct);
}

/** Totals only add budgets in the page currency; amounts in other currencies can't be summed. */
export function summarize(lines: BudgetLine[], currency: string) {
  const same = lines.filter((l) => l.budget.currency === currency);
  const limitMinor = same.reduce((s, l) => s + l.limitMinor, 0);
  const spentMinor = same.reduce((s, l) => s + l.spentMinor, 0);
  const pct = limitMinor > 0 ? Math.round((spentMinor / limitMinor) * 100) : 0;
  return {
    count: same.length,
    limitMinor,
    spentMinor,
    remainingMinor: limitMinor - spentMinor,
    pct,
    status: statusOf(pct),
  };
}

export function totalBudgeted(budgets: Budget[], p: Period, currency: string) {
  return budgets
    .filter((b) => inPeriod(b, p) && b.currency === currency)
    .reduce((s, b) => s + toMinor(b.amount), 0);
}

/** % change in the total budgeted amount vs the previous month. undefined when there is nothing to compare. */
export function changeVsPrevious(
  budgets: Budget[],
  p: Period,
  currency: string,
) {
  const prev = totalBudgeted(budgets, shiftPeriod(p, -1), currency);
  if (prev === 0) return undefined;
  return Math.round(
    ((totalBudgeted(budgets, p, currency) - prev) / prev) * 100,
  );
}
