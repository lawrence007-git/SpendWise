import type { Metadata } from "next";
import { AccountsView } from "./_components/AccountView";

export const metadata: Metadata = { title: "Accounts · SpendWise" };

export default function AccountsPage() {
  return <AccountsView activity={[]} />;
}
