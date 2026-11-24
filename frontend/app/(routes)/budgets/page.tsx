import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { BudgetsView } from "./_components/BudgetView";

export const metadata: Metadata = { title: "Budgets · SpendWise" };

async function BudgetsContent() {
  await connection();
  const now = new Date();

  // Load budgets, categories, and per-month aggregates from your Fastify API here.
  return (
    <BudgetsView
      initialBudgets={[]}
      categories={[]}
      spent={[]}
      weekly={[]}
      activity={[]}
      initialPeriod={{ month: now.getMonth() + 1, year: now.getFullYear() }}
      currency="PHP"
    />
  );
}

export default function BudgetsPage() {
  return (
    <Suspense fallback={<div>Loading budgets...</div>}>
      <BudgetsContent />
    </Suspense>
  );
}
