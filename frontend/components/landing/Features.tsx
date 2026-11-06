import {
  ArrowLeftRight,
  BarChart3,
  Download,
  Landmark,
  PiggyBank,
  Search,
  Tags,
  LayoutDashboard,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const features = [
  {
    icon: Landmark,
    title: "Financial accounts",
    text: "Track Cash, Bank, and E-wallet balances manually in one place.",
  },
  {
    icon: ArrowLeftRight,
    title: "Income & expenses",
    text: "Record amount, currency, category, date, merchant, and notes for every entry.",
  },
  {
    icon: Tags,
    title: "Custom categories",
    text: "Create, edit, and archive income and expense categories that fit your life.",
  },
  {
    icon: PiggyBank,
    title: "Monthly budgets",
    text: "Set a limit per expense category and see usage at a glance.",
  },
  {
    icon: LayoutDashboard,
    title: "Clear dashboard",
    text: "Total income, total expenses, net cash flow, and budget usage together.",
  },
  {
    icon: BarChart3,
    title: "Visual reports",
    text: "Charts for spending by category and month-over-month trends.",
  },
  {
    icon: Search,
    title: "Search & filter",
    text: "Filter by date range, account, category, and transaction type.",
  },
  {
    icon: Download,
    title: "CSV export",
    text: "Export any selected range of transactions for your own records.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 md:py-28"
    >
      <SectionHeading
        eyebrow="Features"
        title="Everything you need to budget with confidence"
        description="A focused toolkit for recording, organizing, and understanding your personal finances."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="group rounded-xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <f.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
