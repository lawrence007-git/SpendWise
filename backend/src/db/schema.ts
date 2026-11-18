import {
  pgTable,
  uuid,
  varchar,
  numeric,
  text,
  timestamp,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "income",
  "expense",
]);
export const accountTypeEnum = pgEnum("account_type", [
  "bank",
  "cash",
  "ewallet",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  email: text("email"),
  displayName: text("display_name"),
  defaultCurrency: text("default_currency").notNull().default("PHP"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 100 }).notNull(),
    accountType: accountTypeEnum("type").notNull(),
    currency: varchar("currency", { length: 3 }).default("PHP").notNull(),
    openingBalance: numeric("opening_balance", { precision: 12, scale: 2 })
      .default("0.00")
      .notNull(),
    archiveAt: timestamp("archived_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [index("accounts_owner_id_idx").on(t.ownerId)],
);
