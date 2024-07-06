CREATE TABLE IF NOT EXISTS "files_to_tags" (
	"file_id" uuid NOT NULL,
	"profile_id" uuid NOT NULL,
	CONSTRAINT "files_to_tags_file_id_profile_id_pk" PRIMARY KEY("file_id","profile_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files_to_tags" ADD CONSTRAINT "files_to_tags_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files_to_tags" ADD CONSTRAINT "files_to_tags_profile_id_files_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."files"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "files" DROP COLUMN IF EXISTS "url";