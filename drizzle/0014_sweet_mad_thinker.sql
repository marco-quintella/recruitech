DO $$ BEGIN
 CREATE TYPE "public"."company_size" AS ENUM('1to5', '6to10', '11to30', '31to50', '51to100', 'moreThan100');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "company_size" "company_size";--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "facebook" text;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "instagram" text;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "linkedin" text;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "twitter" text;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "website" text;