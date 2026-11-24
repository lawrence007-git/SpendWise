import { MoreHorizontal, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { KIND } from "@/lib/account";
import { CATEGORY_ICONS, CATEGORY_COLORS } from "@/lib/category";
import type { Category, Transaction, TxAccount } from "@/lib/types";
import { formatDate, signedAmount, TYPE_STYLE } from "@/lib/transaction";

type Props = {
  transaction: Transaction;
  account?: TxAccount;
  category?: Category;
  onEdit: (t: Transaction) => void;
  onDelete: (id: string) => void;
};

export function TransactionRow({
  transaction: t,
  account,
  category,
  onEdit,
  onDelete,
}: Props) {
  const RowIcon = CATEGORY_ICONS[category?.icon ?? "receipt"];
  const AccIcon = account ? KIND[account.accountType].icon : Wallet;
  const type = TYPE_STYLE[t.transactionType];

  return (
    <TableRow>
      <TableCell className="whitespace-nowrap text-muted-foreground">
        {formatDate(t.transactionDate)}
      </TableCell>
      <TableCell>
        <span
          className={cn(
            category && CATEGORY_COLORS[category.color].tone,
            "flex items-center gap-2 font-medium",
          )}
        >
          <RowIcon
            className={cn(
              "h-4 w-4 shrink-0",
              category ? "tone-text" : "text-primary",
            )}
          />
          {t.description}
        </span>
      </TableCell>
      <TableCell>
        {category ? (
          <span
            className={cn(
              CATEGORY_COLORS[category.color].tone,
              "flex items-center gap-2",
            )}
          >
            <span className="tone-dot h-2 w-2 shrink-0 rounded-full" />
            {category.name}
          </span>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>
      <TableCell>
        <span className="flex items-center gap-2">
          <AccIcon className="h-4 w-4 text-primary" />
          {account?.name}
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
      <TableCell
        className={cn(
          "text-right font-semibold tabular-nums",
          t.transactionType === "income" ? "text-success" : "text-destructive",
        )}
      >
        {signedAmount(t)}
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              aria-label={`Actions for ${t.description}`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(t)}>Edit</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(t.id)}
              className="text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
