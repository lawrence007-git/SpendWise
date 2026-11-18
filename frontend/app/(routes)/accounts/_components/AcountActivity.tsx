import { Clock, Wallet } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { KIND } from "@/lib/account";
import { signed } from "@/lib/account";
import type { Account, Activity } from "@/lib/types";

type Props = {
  accounts: Account[];
  activity: Activity[];
  filter: string;
  onFilterChange: (v: string) => void;
};

export function RecentActivity({
  accounts,
  activity,
  filter,
  onFilterChange,
}: Props) {
  const rows = activity.filter(
    (t) => filter === "all" || t.accountId === filter,
  );

  return (
    <section className="relative mt-5 animate-fade-up rounded-2xl border bg-card p-5 shadow-soft animate-delay-300">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Clock className="h-5 w-5" /> Recent account activity
        </h2>
        <Select value={filter} onValueChange={onFilterChange}>
          <SelectTrigger className="w-40 rounded-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All accounts</SelectItem>
            {accounts.map((a) => (
              <SelectItem key={a.id} value={a.id}>
                {a.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Account</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => {
            const acc = accounts.find((a) => a.id === r.accountId);
            const AccIcon = acc ? KIND[acc.accountType].icon : Wallet;
            const RowIcon = r.icon;
            return (
              <TableRow key={r.id}>
                <TableCell className="text-muted-foreground">
                  {r.date}
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <RowIcon className="h-4 w-4 text-muted-foreground" />
                    {r.description}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <AccIcon className="h-4 w-4 text-primary" />
                    {acc?.name}
                  </span>
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right font-semibold tabular-nums",
                    r.amountMinor < 0 ? "text-destructive" : "text-success",
                  )}
                >
                  {signed(r.amountMinor)}
                </TableCell>
              </TableRow>
            );
          })}
          {rows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="py-8 text-center text-muted-foreground"
              >
                No activity yet for this account.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
