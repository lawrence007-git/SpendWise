"use client";

import { useState, useEffect } from "react";
import { useApi } from "@/lib/api";
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
import { addTransactionSchema, todayISO, TYPE_STYLE } from "@/lib/transaction";
import type { Transaction, TxAccount, TxType } from "@/lib/types";

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  transaction: Transaction | null; // null = create
  accounts: TxAccount[];
  onSaved: (t: Transaction) => void;
};

const empty = () => ({
  type: "expense" as TxType,
  description: "",
  amount: "",
  accountId: "",
  date: "",
});

export function AddTransactionDialog({
  open,
  onOpenChange,
  transaction,
  accounts,
  onSaved,
}: Props) {
  const api = useApi();
  const [f, setF] = useState(empty);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const editing = !!transaction;

  useEffect(() => {
    if (!open) return;
    setF(
      transaction
        ? {
            type: transaction.transactionType,
            description: transaction.description,
            amount: String(transaction.amount),
            accountId: transaction.accountId,
            date: transaction.transactionDate.slice(0, 10),
          }
        : { ...empty(), date: todayISO() },
    );
    setError(null);
  }, [open, transaction]);

  const submit = async () => {
    const p = addTransactionSchema.safeParse(f);
    if (!p.success) return setError(p.error.issues[0].message);

    setSaving(true);
    setError(null);
    try {
      const saved = await api<Transaction>(
        editing ? `/transactions/${transaction.id}` : "/transactions",
        {
          method: editing ? "PATCH" : "POST",
          body: JSON.stringify({
            accountId: p.data.accountId,
            transactionType: p.data.type, // form `type` -> API `transactionType`
            amount: p.data.amount, // string, as the API expects
            transactionDate: p.data.date, // form `date` -> API `transactionDate`
            description: p.data.description,
          }),
        },
      );
      onSaved(saved); // the response is already a Transaction
      onOpenChange(false);
      setF(empty());
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>
            {editing ? "Edit transaction" : "Add transaction"}
          </DialogTitle>
          <DialogDescription>
            {editing
              ? "Update the details of this transaction."
              : "Record money coming in or going out."}
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
              onClick={() => setF({ ...f, type: t })}
              className={cn(
                "rounded-lg border py-2 text-sm font-medium outline-none ring-0 transition focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
                f.type === t
                  ? cn(TYPE_STYLE[t].tone, "tone-badge tone-border")
                  : "border-transparent text-muted-foreground hover:bg-muted",
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

        <div className="space-y-2">
          <Label>Account</Label>
          <Select
            value={f.accountId}
            onValueChange={(v) => setF({ ...f, accountId: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Account" />
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

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <DialogFooter>
          <Button
            onClick={submit}
            disabled={saving}
            className="bg-gradient-brand text-primary-foreground hover:opacity-90"
          >
            {saving
              ? "Saving..."
              : editing
                ? "Save Transaction"
                : "Save transaction"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
