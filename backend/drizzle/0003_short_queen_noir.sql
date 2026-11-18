CREATE TYPE "public"."account_type" AS ENUM('bank', 'cash', 'ewallet');--> statement-breakpoint
ALTER TABLE "accounts" RENAME COLUMN "ownerId" TO "owner_id";--> statement-breakpoint
ALTER TABLE "accounts" RENAME COLUMN "archiveAt" TO "archived_at";--> statement-breakpoint
ALTER TABLE "accounts" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_ownerId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "type" SET DATA TYPE "public"."account_type" USING "type"::"public"."account_type";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "accounts_owner_id_idx" ON "accounts" USING btree ("owner_id");