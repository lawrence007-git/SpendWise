import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/lib/category";
import { formatMoney, STATUS_STYLE } from "@/lib/budget";
import type { Budget, BudgetLine } from "@/lib/types";

type Props = {
  line: BudgetLine;
  onEdit: (b: Budget) => void;
  onDelete: (id: string) => void;
};

// bars stay brand teal while healthy; tone classes must remain full literals
const BAR_TONE = {
  on_track: "tone-primary",
  near_limit: "tone-amber",
  over: "tone-destructive",
} as const;

export function BudgetRow({ line: l, onEdit, onDelete }: Props) {
  const Icon = CATEGORY_ICONS[l.category.icon];
  const s = STATUS_STYLE[l.status];
  const cur = l.budget.currency;

  return (
    <li
      className={cn(
        CATEGORY_COLORS[l.category.color].tone,
        "flex items-center gap-3 px-4 py-3 transition hover:bg-muted/40",
      )}
    >
      <div className="tone-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl">
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 basis-40">
        <p className="truncate font-semibold">{l.category.name}</p>
        <p className="text-xs tabular-nums text-muted-foreground">
          {formatMoney(l.spentMinor, cur)} / {formatMoney(l.limitMinor, cur)}
        </p>
      </div>

      <div
        className="hidden h-2 flex-1 overflow-hidden rounded-full bg-muted sm:block"
        role="progressbar"
        aria-label={`${l.category.name} budget used`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.min(100, l.pct)}
      >
        <div
          className={cn(
            BAR_TONE[l.status],
            "tone-dot h-full rounded-full transition-all duration-700",
          )}
          style={{ width: `${Math.min(100, l.pct)}%` }}
        />
      </div>

      <span className="ml-auto w-12 text-right text-sm font-semibold tabular-nums sm:ml-0">
        {l.pct}%
      </span>
      <span
        className={cn(
          s.tone,
          "tone-badge hidden w-24 rounded-full px-2.5 py-1 text-center text-xs font-semibold md:inline-block",
        )}
      >
        {s.label}
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            aria-label={`Actions for ${l.category.name} budget`}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(l.budget)}>
            <Pencil className="mr-2 h-4 w-4" /> Edit amount
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(l.budget.id)}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
}
