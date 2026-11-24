import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { toMinor } from "@/lib/account";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/lib/category";
import { formatDate, formatMoney } from "@/lib/budget";
import type { BudgetActivityItem } from "@/lib/types";
import type { Category } from "@/lib/types";

type Props = {
  items: BudgetActivityItem[];
  categories: Category[];
  currency: string;
  viewAllHref?: string;
};

const ACTION = {
  spent: {
    label: "Spent",
    tone: "tone-destructive",
    status: "Deducted",
    statusTone: "tone-success",
  },
  refund: {
    label: "Refund",
    tone: "tone-blue",
    status: "Restored",
    statusTone: "tone-success",
  },
} as const;

export function BudgetActivity({
  items,
  categories,
  currency,
  viewAllHref,
}: Props) {
  return (
    <section className="relative animate-fade-up rounded-2xl border bg-card p-5 shadow-soft animate-delay-300">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <CalendarDays className="h-5 w-5" /> Recent Budget Activity
        </h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((a) => {
            const c = categories.find((x) => x.id === a.categoryId);
            const Icon = c ? CATEGORY_ICONS[c.icon] : CalendarDays;
            const act = ACTION[a.action];
            return (
              <TableRow key={a.id}>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {formatDate(a.date)}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      c && CATEGORY_COLORS[c.color].tone,
                      "flex items-center gap-2 font-medium",
                    )}
                  >
                    <Icon className="tone-text h-4 w-4" />{" "}
                    {c?.name ?? "Unknown"}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      act.tone,
                      "tone-badge rounded-full px-2.5 py-0.5 text-xs font-medium",
                    )}
                  >
                    {act.label}
                  </span>
                </TableCell>
                <TableCell className="font-medium tabular-nums">
                  {formatMoney(toMinor(a.amount), currency)}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      act.statusTone,
                      "tone-badge rounded-full px-2.5 py-0.5 text-xs font-medium",
                    )}
                  >
                    {act.status}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
          {items.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-8 text-center text-muted-foreground"
              >
                No budget activity yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
