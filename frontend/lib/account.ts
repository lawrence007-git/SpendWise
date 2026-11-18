import { Banknote, Landmark, Smartphone } from "lucide-react";
import { z } from "zod";
import type { Kind, Tone } from "./types";
import type { Account } from "./types";

export const KIND = {
  bank: { label: "Bank", icon: Landmark },
  cash: { label: "Cash", icon: Banknote },
  ewallet: { label: "E-wallet", icon: Smartphone },
} as const;

export const isKind = (v: unknown): v is Kind =>
  typeof v === "string" && Object.hasOwn(KIND, v);

// Class names come from styles/tones.css. Keep them as full literals so Tailwind can find them.
export const TONE: Record<Tone, string> = {
  primary: "tone-primary",
  success: "tone-success",
  glow: "tone-glow",
  amber: "tone-amber",
};

export const DEFAULT_TONE: Record<Kind, Tone> = {
  bank: "primary",
  cash: "success",
  ewallet: "glow",
};

export const peso = (minor: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(
    minor / 100,
  );

// 0 used to render as "-₱0.00"
export const signed = (minor: number) =>
  (minor >= 0 ? "+" : "-") + peso(Math.abs(minor));

// "1,234.56" -> integer centavos, no float math
export const toMinor = (v: string) => {
  const [w, f = ""] = v.replace(/,/g, "").split(".");
  return Number(w || 0) * 100 + Number((f + "00").slice(0, 2));
};

export const addAccountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Give the account a name (2+ characters)")
    .max(40),
  kind: z.enum(["bank", "cash", "ewallet"]),
  last4: z.string().regex(/^(\d{4})?$/, "Last 4 digits only"),
  opening: z
    .string()
    .regex(/^\d{1,10}(\.\d{1,2})?$/, "Enter a valid amount, e.g. 1500.00"),
});

export type ApiAccount = Omit<Account, "tone">;

export const fromApi = (a: ApiAccount): Account => ({
  ...a,
  tone: DEFAULT_TONE[a.accountType],
});

export const openingMinor = (a: Pick<Account, "openingBalance">) =>
  toMinor(a.openingBalance);
