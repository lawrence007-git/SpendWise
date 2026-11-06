import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    title: "Create your accounts",
    description:
      "Add the wallets you actually use — cash, bank, e-wallet — with opening balances.",
  },
  {
    title: "Record as you go",
    description:
      "Log each income or expense and assign it a category. It takes less than ten seconds.",
  },
  {
    title: "Budget and review",
    description:
      "Set monthly limits, watch progress bars fill, and review trends at month's end.",
  },
];
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-y border-border bg-secondary/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="From first entry to full clarity in three steps"
        />

        <ol className="relative mt-14 grid gap-6 md:grid-cols-3">
          <div
            className="absolute left-0 right-0 top-7 hidden h-px bg-border md:block"
            aria-hidden
          />
          {steps.map((step, i) => (
            <li key={step.title} className="relative text-center md:px-4">
              <span className="relative mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-brand font-display text-xl font-extrabold text-primary-foreground shadow-elevated">
                {i + 1}
              </span>
              <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
