import { cn } from "@/lib/utils";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5", className)}
      aria-label="SpendWise home"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-brand shadow-soft">
        <svg
          viewBox="0 0 24 24"
          className="size-5 text-primary-foreground"
          fill="none"
          aria-hidden
        >
          <path
            d="M4 16.5 9 11l3.5 3.5L20 7"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 7h5v5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight">
        SpendWise
      </span>
    </Link>
  );
}
