CREATE TYPE "public"."category_color" AS ENUM('primary', 'success', 'glow', 'amber', 'destructive', 'violet', 'blue', 'pink');--> statement-breakpoint
CREATE TYPE "public"."category_icon" AS ENUM('cart', 'utensils', 'home', 'car', 'zap', 'briefcase', 'laptop', 'gift', 'heart', 'plane', 'book', 'coffee', 'wallet', 'music', 'paw', 'receipt');--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"type" "transaction_type" NOT NULL,
	"color" "category_color" DEFAULT 'primary' NOT NULL,
	"icon" "category_icon" DEFAULT 'receipt' NOT NULL,
	"archived_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "categories_owner_idx" ON "categories" USING btree ("owner_id");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_owner_type_name_uq" ON "categories" USING btree ("owner_id","type","name");