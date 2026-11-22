"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useApi } from "@/lib/api";
import { Plus, SearchX, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { filterCategories, summarize } from "@/lib/category";
import type { Category, SortKey, Tab, ViewMode } from "@/lib/types";
import { CategoryCard } from "./CategoryCard";
import { CategoryDialog } from "./CategoryDialog";
import { CategoriesHeader } from "./CategoryHeader";
import { CategoryStats } from "./CategoryStats";
import { CategoryTable } from "./CategoryTable";
import { CategoryToolbar } from "./CategoryToolbar";

export function CategoriesView() {
  const { isLoaded, isSignedIn } = useAuth();
  const api = useApi();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("name");
  const [showArchived, setShowArchived] = useState(false);
  const [view, setView] = useState<ViewMode>("grid");
  const [dialog, setDialog] = useState<{
    open: boolean;
    category: Category | null; // null = create
  }>({ open: false, category: null });

  const load = useCallback(async () => {
    try {
      // include archived so the "Show archived" toggle works client-side
      setCategories(await api<Category[]>("/categories?includeArchived=true"));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    if (isLoaded && isSignedIn) load();
  }, [isLoaded, isSignedIn, load]);

  // Add a new category, or merge an edited/archived one. The merge keeps
  // transactionCount and totalMinor, which the API doesn't return on these calls.
  const saveCategory = (saved: Category) =>
    setCategories((xs) =>
      xs.some((c) => c.id === saved.id)
        ? xs.map((c) => (c.id === saved.id ? { ...c, ...saved } : c))
        : [...xs, saved],
    );

  const toggleArchive = async (id: string) => {
    const archived = categories.find((c) => c.id === id)?.archiveAt;
    try {
      const updated = await api<Category>(
        `/categories/${id}/${archived ? "restore" : "archive"}`,
        { method: "PATCH" },
      );
      saveCategory(updated);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const openCreate = () => setDialog({ open: true, category: null });
  const openEdit = (c: Category) => setDialog({ open: true, category: c });

  const stats = useMemo(() => summarize(categories), [categories]);
  const visible = useMemo(
    () => filterCategories(categories, { tab, query, showArchived, sort }),
    [categories, tab, query, showArchived, sort],
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

      {error && (
        <p role="alert" className="relative mt-4 text-sm text-destructive">
          {error}
        </p>
      )}
      {loading && (
        <p className="relative mt-4 text-sm text-muted-foreground">
          Loading categories...
        </p>
      )}

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
          </div>
        )}

        {visible.length > 0 && view === "list" && (
          <CategoryTable
            categories={visible}
            onEdit={openEdit}
            onToggleArchive={toggleArchive}
          />
        )}

        {!loading && visible.length === 0 && (
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
        onAdd={saveCategory}
      />
    </div>
  );
}
