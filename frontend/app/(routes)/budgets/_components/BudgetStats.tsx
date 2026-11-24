import {
  BadgeCheck,
  PiggyBank,
  Receipt,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/budget";

type Props = {
  limitMinor: number;
  spentMinor: number;
  remainingMinor: number;
  pct: number;
  currency: string;
  change?: number;
};

/** Small rising line in the corner of the Total Budget card. */
function Sparkline() {
  return (
    <svg viewBox="0 0 48 28" className="h-7 w-12" aria-hidden="true">
      <path
        d="M2 24 L14 16 L24 19 L36 8 L46 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 3 L46 4 L45 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Mini donut in the corner of the Total Spent card. */
function Ring({ pct }: { pct: number }) {
  const r = 14;
  const c = 2 * Math.PI * r;
  const shown = Math.min(100, Math.max(0, pct));
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-10 w-10 -rotate-90"
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeOpacity=".2"
        strokeWidth="5"
      />
      <circle
        cx="20"
        cy="20"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - shown / 100)}
      />
    </svg>
  );
}

export function BudgetStats({
  limitMinor,
  spentMinor,
  remainingMinor,
  pct,
  currency,
  change,
}: Props) {
  const over = remainingMinor < 0;
  return (
    <>
      <Stat
        tone="tone-primary"
        icon={Wallet}
        label="Total Budget"
        verified
        value={formatMoney(limitMinor, currency)}
        note={
          change === undefined
            ? "No previous month"
            : `${change >= 0 ? "+" : ""}${change}% vs last month`
        }
        deco={<Sparkline />}
      />
      <Stat
        tone="tone-blue"
        icon={Receipt}
        label="Total Spent"
        verified
        value={formatMoney(spentMinor, currency)}
        note={`${pct}% of budget`}
        deco={<Ring pct={pct} />}
      />
      <Stat
        tone={over ? "tone-destructive" : "tone-success"}
        icon={PiggyBank}
        label="Remaining"
        value={formatMoney(remainingMinor, currency)}
        dot
        note={
          over
            ? "Over budget"
            : limitMinor > 0
              ? `${Math.max(0, 100 - pct)}% left`
              : "No budget set"
        }
      />
    </>
  );
}

type StatProps = {
  tone: string;
  icon: LucideIcon;
  label: string;
  value: string;
  note: string;
  verified?: boolean; // small check next to the label
  dot?: boolean; // status dot before the note
  deco?: ReactNode; // corner decoration
};

function Stat({
  tone,
  icon: Icon,
  label,
  value,
  note,
  verified,
  dot,
  deco,
}: StatProps) {
  return (
    <div
      className={cn(
        tone,
        "tone-surface relative animate-fade-up overflow-hidden rounded-2xl border p-5 shadow-soft transition animate-delay-200 hover:-translate-y-0.5 hover:shadow-elevated",
      )}
    >
      <div className="tone-icon grid h-12 w-12 place-items-center rounded-xl">
        <Icon className="h-6 w-6" />
      </div>
      <p className="mt-3 flex items-center gap-1 text-sm font-medium">
        {label}
        {verified && <BadgeCheck className="tone-text h-3.5 w-3.5" />}
      </p>
      <p className="truncate text-2xl font-extrabold tabular-nums">{value}</p>
      <p className="tone-text flex items-center gap-1.5 text-xs font-semibold">
        {dot && <span className="tone-dot h-1.5 w-1.5 rounded-full" />}
        {note}
      </p>
      {deco && (
        <div className="tone-text pointer-events-none absolute bottom-4 right-4">
          {deco}
        </div>
      )}
    </div>
  );
}
