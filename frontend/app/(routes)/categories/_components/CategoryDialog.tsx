"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/lib/api";
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
import { cn } from "@/lib/utils";
import {
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  COLOR_KEYS,
  ICON_KEYS,
  TYPE_STYLE,
  categorySchema,
  isDuplicate,
} from "@/lib/category";
import type {
  Category,
  CategoryColor,
  CategoryIcon,
  TxType,
} from "@/lib/types";

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  category: Category | null; // null = create
  categories: Category[]; // for the duplicate-name check
  onAdd: (c: Category) => void;
};

const empty = () => ({
  name: "",
  transactionType: "expense" as TxType,
  color: "primary" as CategoryColor,
  icon: "cart" as CategoryIcon,
});

export function CategoryDialog({
  open,
  onOpenChange,
  category,
  categories,
  onAdd,
}: Props) {
  const api = useApi();
  const [f, setF] = useState(empty);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const editing = !!category;
  const Preview = CATEGORY_ICONS[f.icon];

  // Load the category into the form (or reset it) each time the dialog opens
  useEffect(() => {
    if (!open) return;
    setF(
      category
        ? {
            name: category.name,
            transactionType: category.transactionType,
            color: category.color,
            icon: category.icon,
          }
        : empty(),
    );
    setError(null);
  }, [open, category]);

  const submit = async () => {
    const p = categorySchema.safeParse(f);
    if (!p.success) return setError(p.error.issues[0].message);
    if (
      isDuplicate(categories, p.data.name, p.data.transactionType, category?.id)
    ) {
      return setError(
        `You already have a ${p.data.transactionType} category named “${p.data.name}”.`,
      );
    }

    setSaving(true);
    setError(null);
    try {
      // The API ignores transactionType on PATCH, so the same body works for both
      const saved = await api<Category>(
        editing ? `/categories/${category.id}` : "/categories",
        {
          method: editing ? "PATCH" : "POST",
          body: JSON.stringify(p.data),
        },
      );
      onAdd(saved);
      onOpenChange(false);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editing ? "Edit category" : "New category"}
          </DialogTitle>
          <DialogDescription>
            Pick a name, type, color and icon.
          </DialogDescription>
        </DialogHeader>

        {/* live preview */}
        <div
          className={cn(
            CATEGORY_COLORS[f.color].tone,
            "tone-surface flex items-center gap-3 rounded-xl border p-3",
          )}
        >
          <div className="tone-icon grid h-11 w-11 place-items-center rounded-xl">
            <Preview className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold">
              {f.name.trim() || "Category name"}
            </p>
            <p className="text-xs text-muted-foreground">
              {TYPE_STYLE[f.transactionType].label}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cat-name">Name</Label>
          <Input
            id="cat-name"
            value={f.name}
            maxLength={30}
            onChange={(e) => setF({ ...f, name: e.target.value })}
            placeholder="e.g. Groceries"
          />
        </div>

        <div className="space-y-2">
          <Label>Type</Label>
          <div
            className="grid grid-cols-2 gap-2"
            role="group"
            aria-label="Category type"
          >
            {(Object.keys(TYPE_STYLE) as TxType[]).map((t) => (
              <button
                key={t}
                type="button"
                disabled={editing}
                onClick={() => setF({ ...f, transactionType: t })}
                className={cn(
                  "rounded-lg border py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
                  f.transactionType === t
                    ? cn(TYPE_STYLE[t].tone, "tone-badge tone-border")
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                {TYPE_STYLE[t].label}
              </button>
            ))}
          </div>
          {editing && (
            <p className="text-xs text-muted-foreground">
              The type can’t be changed after a category is created.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Color</Label>
          <div className="flex flex-wrap gap-2">
            {COLOR_KEYS.map((k) => (
              <button
                key={k}
                type="button"
                aria-label={CATEGORY_COLORS[k].label}
                onClick={() => setF({ ...f, color: k })}
                className={cn(
                  CATEGORY_COLORS[k].tone,
                  "tone-dot h-7 w-7 rounded-full transition hover:scale-110",
                  f.color === k &&
                    "ring-2 ring-foreground ring-offset-2 ring-offset-background",
                )}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Icon</Label>
          <div className="grid grid-cols-8 gap-2">
            {ICON_KEYS.map((k) => {
              const Icon = CATEGORY_ICONS[k];
              return (
                <button
                  key={k}
                  type="button"
                  aria-label={k}
                  onClick={() => setF({ ...f, icon: k })}
                  className={cn(
                    CATEGORY_COLORS[f.color].tone,
                    "grid h-9 w-9 place-items-center rounded-lg border transition",
                    f.icon === k
                      ? "tone-icon tone-border"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
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
            disabled={saving}
            className="bg-gradient-brand text-primary-foreground hover:opacity-90"
          >
            {saving
              ? "Saving..."
              : editing
                ? "Save changes"
                : "Create category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
