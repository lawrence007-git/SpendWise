"use client";

import { useState } from "react";
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
import { KIND, addAccountSchema, fromApi } from "@/lib/account";
import type { Account, Kind } from "@/lib/types";
import { useApi } from "@/lib/api";

const EMPTY = { name: "", kind: "bank" as Kind, last4: "", opening: "" };

export function AddAccountDialog({ onAdd }: { onAdd: (a: Account) => void }) {
  const api = useApi();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    const p = addAccountSchema.safeParse({ ...f, opening: f.opening || "0" });
    if (!p.success) return setError(p.error.issues[0].message);

    setSaving(true);
    setError(null);

    try {
      const created = await api<Account>("/accounts", {
        method: "POST",
        body: JSON.stringify({
          name: p.data.name,
          accountType: p.data.kind,
          currency: "PHP",
          openingBalance: p.data.opening, // string, as the API expects
        }),
      });
      onAdd(fromApi(created));
      setOpen(false);
      setF(EMPTY);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-lg border-0 bg-gradient-brand px-5 text-primary-foreground shadow-soft hover:opacity-90">
          <Plus className="mr-1 h-4 w-4" /> Add account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add account</DialogTitle>
          <DialogDescription>
            Tracked manually. No bank login needed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="name">Account name</Label>
          <Input
            id="name"
            value={f.name}
            onChange={(e) => setF({ ...f, name: e.target.value })}
            placeholder="e.g. BPI Payroll"
          />
        </div>

        <div className="space-y-2">
          <Label>Type</Label>
          <Select
            value={f.kind}
            onValueChange={(v) => setF({ ...f, kind: v as Kind })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(KIND) as Kind[]).map((k) => (
                <SelectItem key={k} value={k}>
                  {KIND[k].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="opening">Opening balance (PHP)</Label>
            <Input
              id="opening"
              inputMode="decimal"
              value={f.opening}
              onChange={(e) => setF({ ...f, opening: e.target.value })}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last4">Last 4 digits (optional)</Label>
            <Input
              id="last4"
              maxLength={4}
              inputMode="numeric"
              value={f.last4}
              onChange={(e) => setF({ ...f, last4: e.target.value })}
              placeholder="2841"
            />
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
            {saving ? "Creating..." : "Create account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
