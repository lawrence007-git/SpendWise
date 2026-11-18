import { Home } from "lucide-react";
import { HeroIllustration } from "./TransactionHero";

export function TransactionsHeader() {
  return (
    <>
      <nav
        className="relative flex items-center gap-2 text-sm text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Home className="h-4 w-4" />{" "}
        <span className="font-medium text-foreground">Transactions</span>
      </nav>

      <header className="relative mt-4 min-h-[8rem] animate-fade-up">
        <HeroIllustration />
        <h1 className="relative text-5xl font-extrabold tracking-tight">
          Transactions
        </h1>
        <p className="relative mt-2 text-muted-foreground">
          View, manage, and track your financial activity.
        </p>
      </header>
    </>
  );
}
