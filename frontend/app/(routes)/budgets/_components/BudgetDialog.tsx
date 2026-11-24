"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/lib/category";
import { budgetSchema, inPeriod, periodLabel } from "@/lib/budget";
import type { Budget, Period } from "@/lib/types";
import type { Category } from "@/lib/types";

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  editing: Budget | null; // null = create
  period: Period;
  currency: string;
  categories: Category[];
  budgets: Budget[];
  onSave: (categoryId: string, amount: string, id?: string) => void;
};

export function BudgetDialog({
  open,
  onOpenChange,
  editing,
  period,
  currency,
  categories,
  budgets,
  onSave,
}: Props) {
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setCategoryId(editing?.categoryId ?? "");
    setAmount(editing?.amount ?? "");
    setError(null);
  }, [open, editing]);

  // One budget per category per month: only offer expense categories that don't have one yet
  const available = editing
    ? categories.filter((c) => c.id === editing.categoryId)
    : categories.filter(
        (c) =>
          c.transactionType === "expense" &&
          !c.archiveAt &&
          !budgets.some((b) => inPeriod(b, period) && b.categoryId === c.id),
      );

  const submit = () => {
    const p = budgetSchema.safeParse({ categoryId, amount });
    if (!p.success) return setError(p.error.issues[0].message);
    onSave(p.data.categoryId, p.data.amount, editing?.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit budget" : "Set a budget"}</DialogTitle>
          <DialogDescription>
            For {periodLabel(period)} · {currency}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={categoryId}
            onValueChange={setCategoryId}
            disabled={!!editing}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {available.map((c) => {
                const Icon = CATEGORY_ICONS[c.icon];
                return (
                  <SelectItem key={c.id} value={c.id}>
                    <span
                      className={cn(
                        CATEGORY_COLORS[c.color].tone,
                        "flex items-center gap-2",
                      )}
                    >
                      <Icon className="tone-text h-4 w-4" /> {c.name}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {!editing && available.length === 0 && (
            <p className="text-xs text-muted-foreground">
              Every expense category already has a budget for this month.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget-amount">Monthly limit ({currency})</Label>
          <Input
            id="budget-amount"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <DialogFooter>
          <Button
            onClick={submit}
            disabled={!editing && available.length === 0}
            className="bg-gradient-brand text-primary-foreground hover:opacity-90"
          >
            {editing ? "Save changes" : "Set budget"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
