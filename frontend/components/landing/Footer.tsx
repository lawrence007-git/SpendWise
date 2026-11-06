import Link from "next/link";
import { cacheLife } from "next/cache";
import { Logo } from "./Logo";

export async function Footer() {
  "use cache";
  cacheLife("days");

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-display text-sm font-bold tracking-tight">
                Spend<span className="text-primary">Wise</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Personal finance, made clear. Record income and expenses, set
              monthly category budgets, and see exactly where your money goes.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Product
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#features" className="hover:text-primary">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-primary">
                  How it works
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-primary">
                  Privacy
                </a>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary">
                  Get started
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="mailto:hello@spendwise.app"
                  className="hover:text-primary"
                >
                  hello@spendwise.app
                </a>
              </li>
              <li className="text-muted-foreground">
                Manual tracking · No bank logins
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div className="space-y-1">
            <p>© {year} SpendWise. All rights reserved.</p>
            <p>
              A budgeting tool, not a bank or financial adviser. Demo data is
              fictional.
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/security" className="hover:text-foreground">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
