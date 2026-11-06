import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section id="get-started" className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-brand px-6 py-16 text-center shadow-elevated sm:px-12">
        <div
          className="pointer-events-none absolute inset-0 bg-grid opacity-30"
          aria-hidden
        />
        <div className="relative">
          <h2 className="text-3xl font-extrabold text-primary-foreground sm:text-4xl">
            Take control of your money today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/85 sm:text-lg">
            Set up your first account in under a minute. No bank login, no
            credit card.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="inverse" size="xl" asChild>
              <Link href="/signup">
                Create free account <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
