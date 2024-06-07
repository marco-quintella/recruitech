ALTER TABLE "companies" ADD COLUMN "hq_location" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companies" ADD CONSTRAINT "companies_hq_location_locations_id_fk" FOREIGN KEY ("hq_location") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
