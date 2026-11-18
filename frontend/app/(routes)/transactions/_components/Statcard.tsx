import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Wave } from "./TransactionWave";

type Props = {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: string;
  trend?: number;
};

export function StatCard({ label, value, icon: Icon, tone, trend }: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated",
        tone,
      )}
    >
      <Wave className="tone-wave h-1/2 w-full" />
      <div className="relative flex items-center gap-4">
        <div className="tone-icon grid h-14 w-14 shrink-0 place-items-center rounded-full">
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium">{label}</p>
          <p className="truncate text-2xl font-extrabold tabular-nums">
            {value}
          </p>
          {trend !== undefined && (
            <p className="tone-text flex items-center gap-1 text-xs font-semibold">
              {trend >= 0 ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              {trend > 0 ? "+" : ""}
              {trend}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
