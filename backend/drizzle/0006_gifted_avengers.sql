ALTER TABLE "categories" RENAME COLUMN "type" TO "transaction_type";--> statement-breakpoint
DROP INDEX "categories_owner_type_name_uq";--> statement-breakpoint
CREATE UNIQUE INDEX "categories_owner_type_name_uq" ON "categories" USING btree ("owner_id","transaction_type","name");