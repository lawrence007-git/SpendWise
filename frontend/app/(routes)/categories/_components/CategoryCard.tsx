import { ArchiveRestore, Archive, MoreVertical, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CATEGORY_COLORS, CATEGORY_ICONS, TYPE_STYLE } from "@/lib/category";
import type { Category } from "@/lib/types";

type Props = {
  category: Category;
  onEdit: (c: Category) => void;
  onToggleArchive: (id: string) => void;
};

export function CategoryCard({ category: c, onEdit, onToggleArchive }: Props) {
  const Icon = CATEGORY_ICONS[c.icon];
  const archived = !!c.archivedAt;
  const n = c.transactionCount ?? 0;

  return (
    <article
      className={cn(
        CATEGORY_COLORS[c.color].tone,
        "tone-surface group relative flex min-w-0 items-center gap-3 rounded-2xl border p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated",
        archived && "opacity-60",
      )}
    >
      <div className="tone-icon grid h-12 w-12 shrink-0 place-items-center rounded-xl transition group-hover:scale-105">
        <Icon className="h-6 w-6" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold">{c.name}</h3>
        <p className="truncate text-xs text-muted-foreground">
          {TYPE_STYLE[c.transactionType].label} • {n} transaction
          {n === 1 ? "" : "s"}
        </p>
        {archived && (
          <span className="mt-1 inline-block rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            Archived
          </span>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            aria-label={`Actions for ${c.name}`}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(c)}>
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onToggleArchive(c.id)}>
            {archived ? (
              <ArchiveRestore className="mr-2 h-4 w-4" />
            ) : (
              <Archive className="mr-2 h-4 w-4" />
            )}
            {archived ? "Restore" : "Archive"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </article>
  );
}
