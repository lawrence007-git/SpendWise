import { MoreVertical, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { KIND, TONE } from "@/lib/account";
import { peso } from "@/lib/account";
import type { Account } from "@/lib/types";
import { Wave } from "./TransactionWave";

type Props = {
  account: Account;
  hidden: boolean;
  onSetPrimary: (id: string) => void;
  onArchive: (id: string) => void;
};

export function AccountCard({
  account: a,
  hidden,
  onSetPrimary,
  onArchive,
}: Props) {
  const k = KIND[a.kind];
  const tone = TONE[a.tone];
  const Icon = k.icon;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated",
        tone,
        a.primary && "border-transparent ring-2 ring-primary",
      )}
    >
      <Wave className="tone-wave" />

      <div className="relative flex items-center gap-4">
        <div className="tone-icon grid h-16 w-16 shrink-0 place-items-center rounded-2xl">
          <Icon className="h-8 w-8" />
        </div>

        <div className="min-w-0">
          <span className="tone-badge rounded-full px-2.5 py-0.5 text-xs font-medium">
            {k.label}
          </span>
          <h2 className="mt-1 truncate text-lg font-bold text-foreground">
            {a.name}
          </h2>
          <p className="text-2xl font-extrabold tabular-nums text-foreground">
            {hidden ? "₱ ••••" : peso(a.balanceMinor)}
          </p>
          {a.last4 && (
            <p className="text-xs tracking-widest text-muted-foreground">
              •••• {a.last4}
            </p>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto self-start"
              aria-label={`Actions for ${a.name}`}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onSetPrimary(a.id)}>
              Set as primary
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onArchive(a.id)}
              className="text-destructive"
            >
              Archive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {a.primary && (
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
          <Star className="h-3 w-3 fill-current" /> Primary Account
        </span>
      )}
    </article>
  );
}
