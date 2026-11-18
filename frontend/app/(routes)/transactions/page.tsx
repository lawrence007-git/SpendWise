import type { Metadata } from "next";
import { TransactionsView } from "./_components/TransactionView";

export const metadata: Metadata = { title: "Transactions · SpendWise" };

export default function TransactionsPage() {
  return (
    <TransactionsView initialTransactions={[]} categories={[]} accounts={[]} />
  );
}
