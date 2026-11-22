import { cn } from "@/lib/utils";

export function Wave({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      aria-hidden
      className={cn(
        "pointer-events-none absolute bottom-0 right-0 h-3/4 w-3/4",
        className,
      )}
    >
      <path
        fill="currentColor"
        fillOpacity=".7"
        d="M0 90 C80 20 150 120 230 60 S350 10 400 40 V120 H0Z"
      />
      <path
        fill="currentColor"
        fillOpacity=".5"
        d="M0 110 C90 60 170 130 250 85 S360 50 400 75 V120 H0Z"
      />
    </svg>
  );
}
