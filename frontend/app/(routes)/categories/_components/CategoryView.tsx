"use client";

import { useMemo, useState } from "react";
import { Plus, SearchX, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { filterCategories, summarize } from "@/lib/category";
import type {
  Category,
  CategoryInput,
  SortKey,
  Tab,
  ViewMode,
} from "@/lib/types";
import { CategoryCard } from "./CategoryCard";
import { CategoryDialog } from "./CategoryDialog";
import { CategoriesHeader } from "./CategoryHeader";
import { CategoryStats } from "./CategoryStats";
import { CategoryTable } from "./CategoryTable";
import { CategoryToolbar } from "./CategoryToolbar";

type Props = { initialCategories: Category[] };

/** Client container: owns the state and composes the presentational pieces. */
export function CategoriesView({ initialCategories }: Props) {
  const [categories, setCategories] = useState(initialCategories);
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("name");
  const [showArchived, setShowArchived] = useState(false);
  const [view, setView] = useState<ViewMode>("grid");
  const [dialog, setDialog] = useState<{
    open: boolean;
    category: Category | null;
  }>({ open: false, category: null });

  const stats = useMemo(() => summarize(categories), [categories]);
  const visible = useMemo(
    () => filterCategories(categories, { tab, query, showArchived, sort }),
    [categories, tab, query, showArchived, sort],
  );

  const openCreate = () => setDialog({ open: true, category: null });
  const openEdit = (c: Category) => setDialog({ open: true, category: c });

  const save = (data: CategoryInput, id?: string) =>
    setCategories((xs) =>
      id
        ? xs.map((c) => (c.id === id ? { ...c, ...data } : c))
        : [
            ...xs,
            {
              ...data,
              id: crypto.randomUUID(),
              archivedAt: null,
              transactionCount: 0,
              totalMinor: 0,
            },
          ],
    );

  const toggleArchive = (id: string) =>
    setCategories((xs) =>
      xs.map((c) =>
        c.id === id
          ? { ...c, archivedAt: c.archivedAt ? null : new Date().toISOString() }
          : c,
      ),
    );

  return (
    <div className="relative -mx-6 -my-8 min-h-[calc(100%+4rem)] overflow-hidden bg-gradient-hero p-6 sm:-mx-9 sm:-my-10 sm:min-h-[calc(100%+5rem)] sm:p-8">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-grid opacity-60" />

      <CategoriesHeader />
      <CategoryStats {...stats} />

      <CategoryToolbar
        tab={tab}
        onTab={setTab}
        query={query}
        onQuery={setQuery}
        sort={sort}
        onSort={setSort}
        showArchived={showArchived}
        onShowArchived={setShowArchived}
        view={view}
        onView={setView}
        onAdd={openCreate}
      />

      <section className="relative mt-5 animate-fade-up animate-delay-300">
        {visible.length > 0 && view === "grid" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((c) => (
              <CategoryCard
                key={c.id}
                category={c}
                onEdit={openEdit}
                onToggleArchive={toggleArchive}
              />
            ))}
            <button
              type="button"
              onClick={openCreate}
              className="tone-primary tone-surface flex min-h-[5.5rem] items-center justify-center gap-2 rounded-2xl border border-dashed text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              <Plus className="tone-text h-5 w-5" /> Create Custom Category
            </button>
          </div>
        )}

        {visible.length > 0 && view === "list" && (
          <CategoryTable
            categories={visible}
            onEdit={openEdit}
            onToggleArchive={toggleArchive}
          />
        )}

        {visible.length === 0 && (
          <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
            {categories.length === 0 ? (
              <Tags className="mx-auto mb-3 h-8 w-8" />
            ) : (
              <SearchX className="mx-auto mb-3 h-8 w-8" />
            )}
            <p>
              {categories.length === 0
                ? "No categories yet. Create your first one to start organizing."
                : "No categories match your filters."}
            </p>
            {categories.length === 0 && (
              <Button
                onClick={openCreate}
                className="mt-4 bg-gradient-brand text-primary-foreground hover:opacity-90"
              >
                <Plus className="mr-1 h-4 w-4" /> Add Category
              </Button>
            )}
          </div>
        )}
      </section>

      <CategoryDialog
        open={dialog.open}
        onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}
        category={dialog.category}
        categories={categories}
        onSave={save}
      />
    </div>
  );
}
