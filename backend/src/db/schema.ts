import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  email: text("email"),
  displayName: text("display_name"),
  defaultCurrency: text("default_currency").notNull().default("PHP"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
