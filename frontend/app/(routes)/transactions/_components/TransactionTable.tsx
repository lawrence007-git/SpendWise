import Link from "next/link";
import { ArrowRight, BarChart3, Clock, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TYPE_FILTERS } from "@/lib/transaction";
import type { Category, Transaction, TxAccount, TxType } from "@/lib/types";
import { AddTransactionDialog } from "./TransactionDialog";
import { TransactionRow } from "./TransactionRow";

type Props = {
  transactions: Transaction[];
  categories: Category[];
  accounts: TxAccount[];
  query: string;
  onQueryChange: (v: string) => void;
  typeFilter: TxType | "all";
  onTypeFilterChange: (v: TxType | "all") => void;
  onAdd: (t: Transaction) => void;
  onDelete: (id: string) => void;
  viewAllHref?: string;
};

export function TransactionsTable(p: Props) {
  return (
    <section className="relative animate-fade-up rounded-2xl border bg-card p-5 shadow-soft animate-delay-200">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className="mr-auto flex items-center gap-2 text-xl font-bold">
          <Clock className="h-5 w-5" /> Recent Transactions
        </h2>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={p.query}
            onChange={(e) => p.onQueryChange(e.target.value)}
            placeholder="Search transactions..."
            aria-label="Search transactions"
            className="w-56 rounded-full pl-9"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-lg">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={p.typeFilter}
              onValueChange={(v) => p.onTypeFilterChange(v as TxType | "all")}
            >
              {TYPE_FILTERS.map((f) => (
                <DropdownMenuRadioItem key={f.value} value={f.value}>
                  {f.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <AddTransactionDialog
          categories={p.categories}
          accounts={p.accounts}
          onAdd={p.onAdd}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {p.transactions.map((t) => (
            <TransactionRow
              key={t.id}
              transaction={t}
              category={p.categories.find((c) => c.id === t.categoryId)}
              account={p.accounts.find((a) => a.id === t.accountId)}
              onDelete={p.onDelete}
            />
          ))}
          {p.transactions.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-10 text-center text-muted-foreground"
              >
                No transactions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-sm">
        <p className="flex items-center gap-3 text-muted-foreground">
          <BarChart3 className="h-6 w-6 text-primary" /> Keep your finances
          organized, one transaction at a time.
        </p>
        {p.viewAllHref && (
          <Link
            href={p.viewAllHref}
            className="flex items-center gap-1 font-semibold text-primary hover:underline"
          >
            View All Transactions <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </section>
  );
}
