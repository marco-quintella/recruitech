DROP INDEX IF EXISTS "name_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "companies_name_index" ON "companies" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "tags_name_index" ON "tags" ("name");