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
import { KIND, TONE } from "@/lib/account";
import { CATEGORY_ICONS, TYPE_STYLE } from "@/lib/transaction";
import type { Category, Transaction, TxAccount } from "@/lib/types";
import { formatDate, signedAmount } from "@/lib/transaction";

type Props = {
  transaction: Transaction;
  category?: Category;
  account?: TxAccount;
  onDelete: (id: string) => void;
};

export function TransactionRow({
  transaction: t,
  category,
  account,
  onDelete,
}: Props) {
  const RowIcon = category
    ? CATEGORY_ICONS[category.icon]
    : CATEGORY_ICONS.receipt;
  const AccIcon = account ? KIND[account.kind].icon : Wallet;
  const type = TYPE_STYLE[t.type];

  return (
    <TableRow>
      <TableCell className="whitespace-nowrap text-muted-foreground">
        {formatDate(t.date)}
      </TableCell>
      <TableCell>
        <span className="flex items-center gap-2 font-medium">
          <RowIcon className="h-4 w-4 shrink-0 text-primary" />
          {t.description}
        </span>
      </TableCell>
      <TableCell>
        {category && (
          <span
            className={cn(
              TONE[category.tone],
              "tone-badge rounded-full px-2.5 py-0.5 text-xs font-medium",
            )}
          >
            {category.name}
          </span>
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
          t.type === "income" ? "text-success" : "text-destructive",
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
