import { Coins, Eye, EyeOff, TrendingUp, Wallet } from "lucide-react";
import { peso } from "@/lib/account";

type Props = {
  total: number;
  count: number;
  hidden: boolean;
  onToggleHidden: () => void;
  changePct?: number;
};

export function BalanceBanner({
  total,
  count,
  hidden,
  onToggleHidden,
  changePct,
}: Props) {
  return (
    <section className="relative mt-6 animate-fade-up overflow-hidden rounded-2xl bg-gradient-brand p-6 text-primary-foreground shadow-elevated animate-delay-100">
      <svg
        viewBox="0 0 600 160"
        preserveAspectRatio="none"
        aria-hidden
        className="absolute inset-0 h-full w-full text-primary-foreground/10"
      >
        <path
          fill="currentColor"
          d="M200 160 C300 40 380 150 470 70 S580 20 600 50 V160Z"
        />
        <path
          fill="currentColor"
          fillOpacity=".6"
          d="M100 160 C250 90 330 170 460 110 S570 90 600 110 V160Z"
        />
      </svg>

      <div className="relative flex flex-wrap items-center gap-5">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary-foreground/15 ring-1 ring-primary-foreground/25">
          <Coins className="h-8 w-8" />
        </div>

        <div>
          <p className="flex items-center gap-2 text-sm text-primary-foreground/80">
            Total balance
            <button
              onClick={onToggleHidden}
              aria-label={hidden ? "Show balance" : "Hide balance"}
            >
              {hidden ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </p>
          <p className="text-4xl font-extrabold tabular-nums sm:text-5xl">
            {hidden ? "₱ ••••••" : peso(total)}
          </p>
          <p className="text-sm text-primary-foreground/70">
            Across {count} accounts
          </p>
        </div>

        {changePct !== undefined && (
          <span className="ml-2 hidden items-center gap-1 rounded-full bg-success px-3 py-1.5 text-sm font-semibold text-success-foreground sm:flex">
            <TrendingUp className="h-4 w-4" /> {changePct > 0 ? "+" : ""}
            {changePct}% this month
          </span>
        )}

        <Wallet
          className="ml-auto hidden h-28 w-28 animate-float text-primary-foreground/60 drop-shadow-2xl md:block"
          strokeWidth={1.2}
        />
      </div>
    </section>
  );
}
