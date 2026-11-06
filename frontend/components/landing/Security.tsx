import { Calculator, Cookie, Lock, ShieldCheck } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const items = [
  {
    icon: Lock,
    title: "Your data, only yours",
    text: "Every financial query is scoped to the signed-in user on the server.",
  },
  {
    icon: Cookie,
    title: "Secure sessions",
    text: "Sessions live in httpOnly cookies — never in browser localStorage.",
  },
  {
    icon: Calculator,
    title: "Exact money math",
    text: "Amounts are stored as NUMERIC/DECIMAL to avoid floating-point errors.",
  },
  {
    icon: ShieldCheck,
    title: "Server-side validation",
    text: "All input is validated on the server; frontend checks are never trusted alone.",
  },
];

export function Security() {
  return (
    <section id="security" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:gap-16 lg:px-8">
        <div className="lg:col-span-2">
          <SectionHeading
            align="left"
            eyebrow="Security & accuracy"
            title="Built to be trusted with your money"
            description="Finance apps have no room for rounding errors or leaky data. SpendWise is engineered for both precision and privacy."
            className="mx-auto text-center lg:mx-0 lg:text-left"
          />
          <div className="mx-auto mt-8 flex max-w-sm items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft lg:mx-0">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-success/15 text-success">
              <ShieldCheck className="size-6" />
            </span>
            <div>
              <p className="font-display font-bold">Owner-scoped data</p>
              <p className="text-sm text-muted-foreground">
                Every query checks who you are.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
          {items.map((point) => (
            <div
              key={point.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <Lock className="size-5 text-primary" />
              <h3 className="mt-4 text-lg font-bold">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
