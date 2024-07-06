DO $$ BEGIN
 CREATE TYPE "public"."remote_type" AS ENUM('full_remote', 'hybrid', 'on_site');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "processes" ADD COLUMN "remote" "remote_type" NOT NULL;