import type { LucideIcon } from "lucide-react";

export type Kind = "bank" | "cash" | "ewallet";
export type Tone = "primary" | "success" | "glow" | "amber";

export type Account = {
  id: string;
  name: string;
  accountType: Kind;
  currency: string;
  tone: Tone;
  last4?: string;
  openingBalance: string;
  archiveAt: string | null;
  createdAt: string;
  primary?: boolean;
};

export type Activity = {
  id: string;
  date: string;
  description: string;
  icon: LucideIcon;
  accountId: string;
  amountMinor: number;
};

export type TxType = "income" | "expense";
export type IconKey =
  | "cart"
  | "utensils"
  | "download"
  | "car"
  | "zap"
  | "coffee"
  | "home"
  | "heart"
  | "gift"
  | "receipt";

export type Category = {
  id: string;
  name: string;
  tone: Tone;
  icon: IconKey; // string key so it can cross the server -> client boundary
  type?: TxType; // optional: limit the category to income or expense
};

export type TxAccount = Pick<Account, "id" | "name" | "accountType">;

export type Transaction = {
  id: string;
  date: string; // YYYY-MM-DD
  description: string;
  categoryId: string;
  accountId: string;
  type: TxType;
  amountMinor: number; // always positive; `type` decides the sign
};
