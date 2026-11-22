import {
  pgTable,
  uuid,
  varchar,
  numeric,
  text,
  timestamp,
  pgEnum,
  index,
  date,
  uniqueIndex,
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

export const categoryColorEnum = pgEnum("category_color", [
  "primary",
  "success",
  "glow",
  "amber",
  "destructive",
  "violet",
  "blue",
  "pink",
]);

export const categoryIconEnum = pgEnum("category_icon", [
  "cart",
  "utensils",
  "home",
  "car",
  "zap",
  "briefcase",
  "laptop",
  "gift",
  "heart",
  "plane",
  "book",
  "coffee",
  "wallet",
  "music",
  "paw",
  "receipt",
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

export const transactions = pgTable(
  "transactions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accountId: uuid("account_id")
      .notNull()
      .references(() => accounts.id, { onDelete: "cascade" }),
    transactionType: transactionTypeEnum("type").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull(),
    transactionDate: date("transaction_date", { mode: "string" }).notNull(),
    description: varchar("description", { length: 200 }).notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("transactions_owner_date_idx").on(t.ownerId, t.transactionDate),
    index("transactions_account_idx").on(t.accountId),
  ],
);

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 100 }).notNull(),
    transactionType: transactionTypeEnum("transaction_type").notNull(),
    color: categoryColorEnum("color").notNull().default("primary"),
    icon: categoryIconEnum("icon").notNull().default("receipt"),
    archiveAt: timestamp("archived_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("categories_owner_idx").on(t.ownerId),
    uniqueIndex("categories_owner_type_name_uq").on(
      t.ownerId,
      t.transactionType,
      t.name,
    ),
  ],
);
