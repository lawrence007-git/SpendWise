"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toMinor } from "@/lib/account";
import { TYPE_STYLE } from "@/lib/transaction";
import { addTransactionSchema } from "@/lib/transaction";
import type { Category, Transaction, TxAccount, TxType } from "@/lib/types";
import { todayISO } from "@/lib/transaction";

type Props = {
  categories: Category[];
  accounts: TxAccount[];
  onAdd: (t: Transaction) => void;
};

const empty = () => ({
  type: "expense" as TxType,
  description: "",
  amount: "",
  categoryId: "",
  accountId: "",
  date: "",
});

export function AddTransactionDialog({ categories, accounts, onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState(empty);
  const [error, setError] = useState<string | null>(null);

  const cats = categories.filter((c) => !c.type || c.type === f.type);
  const blocked = accounts.length === 0 || categories.length === 0;

  useEffect(() => {
    if (open) {
      setF((prev) => ({ ...prev, date: todayISO() }));
    }
  }, [open]);

  const submit = () => {
    const p = addTransactionSchema.safeParse(f);
    if (!p.success) return setError(p.error.issues[0].message);
    onAdd({
      id: crypto.randomUUID(),
      date: p.data.date,
      description: p.data.description,
      categoryId: p.data.categoryId,
      accountId: p.data.accountId,
      type: p.data.type,
      amountMinor: toMinor(p.data.amount),
    });
    setOpen(false);
    setF(empty());
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={blocked}
          className="rounded-lg border-0 bg-gradient-brand px-5 text-primary-foreground shadow-soft hover:opacity-90"
        >
          <Plus className="mr-1 h-4 w-4" /> Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add transaction</DialogTitle>
          <DialogDescription>
            Record money coming in or going out.
          </DialogDescription>
        </DialogHeader>

        <div
          className="grid grid-cols-2 gap-2"
          role="group"
          aria-label="Transaction type"
        >
          {(Object.keys(TYPE_STYLE) as TxType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setF({ ...f, type: t, categoryId: "" })}
              className={cn(
                "rounded-lg border py-2 text-sm font-medium transition",
                f.type === t
                  ? cn(TYPE_STYLE[t].tone, "tone-badge tone-border")
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              {TYPE_STYLE[t].label}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Input
            id="desc"
            value={f.description}
            onChange={(e) => setF({ ...f, description: e.target.value })}
            placeholder="e.g. Grocery run"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (PHP)</Label>
            <Input
              id="amount"
              inputMode="decimal"
              value={f.amount}
              onChange={(e) => setF({ ...f, amount: e.target.value })}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={f.date}
              onChange={(e) => setF({ ...f, date: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={f.categoryId}
              onValueChange={(v) => setF({ ...f, categoryId: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {cats.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Account</Label>
            <Select
              value={f.accountId}
              onValueChange={(v) => setF({ ...f, accountId: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <DialogFooter>
          <Button
            onClick={submit}
            className="bg-gradient-brand text-primary-foreground hover:opacity-90"
          >
            Save transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
