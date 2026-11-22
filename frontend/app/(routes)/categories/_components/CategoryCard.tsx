import { ArchiveRestore, Archive, MoreVertical, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { peso } from "@/lib/account";
import { CATEGORY_COLORS, CATEGORY_ICONS, TYPE_STYLE } from "@/lib/category";
import type { Category } from "@/lib/types";

type Props = {
  category: Category;
  onEdit: (c: Category) => void;
  onToggleArchive: (id: string) => void;
};

export function CategoryCard({ category: c, onEdit, onToggleArchive }: Props) {
  const Icon = CATEGORY_ICONS[c.icon];
  const type = TYPE_STYLE[c.transactionType];
  const archived = !!c.archiveAt;
  const income = c.transactionType === "income";

  return (
    <article
      className={cn(
        CATEGORY_COLORS[c.color].tone,
        "tone-surface group flex min-w-0 flex-col gap-4 rounded-2xl border p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated",
        archived && "opacity-60",
      )}
    >
      {/* header: icon, name, type, actions */}
      <div className="flex items-start gap-4">
        <div className="tone-icon grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition group-hover:scale-105">
          <Icon className="h-7 w-7" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold leading-tight">
            {c.name}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                type.tone,
                "tone-badge rounded-full px-2.5 py-0.5 text-xs font-medium",
              )}
            >
              {type.label}
            </span>
            {archived && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Archived
              </span>
            )}
          </div>
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
      </div>

      {/* overview: labeled numbers */}
      <dl className="grid grid-cols-2 gap-4 border-t pt-4">
        <div className="min-w-0">
          <dt className="text-xs text-muted-foreground">Transactions</dt>
          <dd className="mt-0.5 text-xl font-bold tabular-nums">
            {c.transactionCount ?? 0}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-xs text-muted-foreground">Total amount</dt>
          <dd
            className={cn(
              "mt-0.5 truncate text-xl font-bold tabular-nums",
              income && "text-success",
            )}
          >
            {income ? "+" : ""}
            {peso(c.totalMinor ?? 0)}
          </dd>
        </div>
      </dl>
    </article>
  );
}
