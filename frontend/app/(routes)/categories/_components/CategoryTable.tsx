import { Archive, ArchiveRestore, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { peso } from "@/lib/account";
import { CATEGORY_COLORS, CATEGORY_ICONS, TYPE_STYLE } from "@/lib/category";
import type { Category } from "@/lib/types";

type Props = {
  categories: Category[];
  onEdit: (c: Category) => void;
  onToggleArchive: (id: string) => void;
};

export function CategoryTable({ categories, onEdit, onToggleArchive }: Props) {
  return (
    <div className="rounded-2xl border bg-card p-2 shadow-soft">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Icon</TableHead>
            <TableHead>Transactions</TableHead>
            <TableHead>Total amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((c) => {
            const Icon = CATEGORY_ICONS[c.icon];
            const tone = CATEGORY_COLORS[c.color].tone;
            const type = TYPE_STYLE[c.transactionType];
            const archived = !!c.archivedAt;
            const income = c.transactionType === "income";
            return (
              <TableRow key={c.id} className={cn(archived && "opacity-60")}>
                <TableCell className={cn(tone, "font-medium")}>
                  <span className="flex items-center gap-3">
                    <span className="tone-dot h-2.5 w-2.5 shrink-0 rounded-full" />
                    {c.name}
                    {archived && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                        Archived
                      </span>
                    )}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      type.tone,
                      "tone-badge rounded-full px-2.5 py-0.5 text-xs font-medium",
                    )}
                  >
                    {type.label}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      tone,
                      "tone-icon inline-grid h-8 w-8 place-items-center rounded-lg",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                </TableCell>
                <TableCell className="tabular-nums">
                  {c.transactionCount ?? 0}
                </TableCell>
                <TableCell
                  className={cn(
                    "font-medium tabular-nums",
                    income && "text-success",
                  )}
                >
                  {income ? "+" : ""}
                  {peso(c.totalMinor ?? 0)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEdit(c)}
                    aria-label={`Edit ${c.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onToggleArchive(c.id)}
                    aria-label={`${archived ? "Restore" : "Archive"} ${c.name}`}
                  >
                    {archived ? (
                      <ArchiveRestore className="h-4 w-4" />
                    ) : (
                      <Archive className="h-4 w-4 text-destructive" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
