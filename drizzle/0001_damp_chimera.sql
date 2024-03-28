CREATE TABLE IF NOT EXISTS "recommendations" (
	"process_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "recommendations_process_id_user_id_pk" PRIMARY KEY("process_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "discards" DROP CONSTRAINT "discards_process_id_user_id_pk";--> statement-breakpoint
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_process_id_user_id_pk";--> statement-breakpoint
ALTER TABLE "discards" ALTER COLUMN "process_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "favorites" ALTER COLUMN "process_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "discards" ADD COLUMN "id" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "discards" ADD COLUMN "candidate_id" uuid;--> statement-breakpoint
ALTER TABLE "favorites" ADD COLUMN "id" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "favorites" ADD COLUMN "candidate_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "discards" ADD CONSTRAINT "discards_candidate_id_users_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorites" ADD CONSTRAINT "favorites_candidate_id_users_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_process_id_processes_id_fk" FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
