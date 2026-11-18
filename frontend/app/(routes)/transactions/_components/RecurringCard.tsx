import { ArrowRight, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RecurringCard({ onCreateRule }: { onCreateRule?: () => void }) {
  return (
    <section className="relative animate-fade-up overflow-hidden rounded-2xl border bg-accent p-5 shadow-soft animate-delay-300">
      <div className="flex items-center gap-4">
        <CalendarCheck
          aria-hidden
          className="h-20 w-20 shrink-0 animate-float text-primary"
          strokeWidth={1.2}
        />
        <div>
          <h2 className="text-lg font-bold text-accent-foreground">
            Set up recurring transactions!
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Never miss a bill again.
          </p>
          <Button
            onClick={onCreateRule}
            className="mt-3 rounded-lg bg-foreground text-background hover:bg-foreground/90"
          >
            Create Rule <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
