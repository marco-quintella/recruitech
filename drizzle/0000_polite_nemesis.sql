DO $$ BEGIN
 CREATE TYPE "contract_type" AS ENUM('full_time', 'part_time', 'contractor', 'internship');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "experience_level" AS ENUM('entry', 'intermediate', 'senior');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "process_type" AS ENUM('platform', 'email', 'link');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('system', 'company_admin', 'recruiter', 'candidate');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "discards" (
	"process_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "discards_process_id_user_id_pk" PRIMARY KEY("process_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorites" (
	"process_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "favorites_process_id_user_id_pk" PRIMARY KEY("process_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_titles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"country" text,
	"state" text,
	"city" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "processes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"process_type" "process_type" NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"contract_type" "contract_type" NOT NULL,
	"experience_level" "experience_level",
	"salary_0" numeric,
	"salary_1" numeric,
	"email" text,
	"link" text,
	"finished_at" timestamp,
	"cancelled_at" timestamp,
	"chosen_user_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "processes_to_job_titles" (
	"process_id" uuid NOT NULL,
	"job_title_id" uuid NOT NULL,
	CONSTRAINT "processes_to_job_titles_process_id_job_title_id_pk" PRIMARY KEY("process_id","job_title_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "processes_to_skills" (
	"process_id" uuid NOT NULL,
	"skill_id" uuid NOT NULL,
	CONSTRAINT "processes_to_skills_process_id_skill_id_pk" PRIMARY KEY("process_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "processes_to_locations" (
	"process_id" uuid NOT NULL,
	"location_id" uuid NOT NULL,
	CONSTRAINT "processes_to_locations_process_id_location_id_pk" PRIMARY KEY("process_id","location_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "processes_to_tags" (
	"process_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	CONSTRAINT "processes_to_tags_process_id_tag_id_pk" PRIMARY KEY("process_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile_skills" (
	"profile_id" uuid NOT NULL,
	"skill_id" uuid NOT NULL,
	"time" integer NOT NULL,
	CONSTRAINT "profile_skills_profile_id_skill_id_pk" PRIMARY KEY("profile_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"presentation" text,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles_to_job_titles" (
	"profile_id" uuid NOT NULL,
	"job_title_id" uuid NOT NULL,
	CONSTRAINT "profiles_to_job_titles_profile_id_job_title_id_pk" PRIMARY KEY("profile_id","job_title_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles_to_skills" (
	"profile_id" uuid NOT NULL,
	"skill_id" uuid NOT NULL,
	CONSTRAINT "profiles_to_skills_profile_id_skill_id_pk" PRIMARY KEY("profile_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles_to_tags" (
	"profile_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	CONSTRAINT "profiles_to_tags_profile_id_tag_id_pk" PRIMARY KEY("profile_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "role" NOT NULL,
	"company_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "discards" ADD CONSTRAINT "discards_process_id_processes_id_fk" FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "discards" ADD CONSTRAINT "discards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorites" ADD CONSTRAINT "favorites_process_id_processes_id_fk" FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "processes" ADD CONSTRAINT "processes_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "processes" ADD CONSTRAINT "processes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "processes" ADD CONSTRAINT "processes_chosen_user_id_users_id_fk" FOREIGN KEY ("chosen_user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "processes_to_job_titles" ADD CONSTRAINT "processes_to_job_titles_process_id_processes_id_fk" FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "processes_to_job_titles" ADD CONSTRAINT "processes_to_job_titles_job_title_id_job_titles_id_fk" FOREIGN KEY ("job_title_id") REFERENCES "job_titles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "processes_to_skills" ADD CONSTRAINT "processes_to_skills_process_id_processes_id_fk" FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "processes_to_skills" ADD CONSTRAINT "processes_to_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "processes_to_locations" ADD CONSTRAINT "processes_to_locations_process_id_processes_id_fk" FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "processes_to_locations" ADD CONSTRAINT "processes_to_locations_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "processes_to_tags" ADD CONSTRAINT "processes_to_tags_process_id_processes_id_fk" FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "processes_to_tags" ADD CONSTRAINT "processes_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile_skills" ADD CONSTRAINT "profile_skills_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile_skills" ADD CONSTRAINT "profile_skills_skill_id_profiles_id_fk" FOREIGN KEY ("skill_id") REFERENCES "profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles_to_job_titles" ADD CONSTRAINT "profiles_to_job_titles_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles_to_job_titles" ADD CONSTRAINT "profiles_to_job_titles_job_title_id_job_titles_id_fk" FOREIGN KEY ("job_title_id") REFERENCES "job_titles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles_to_skills" ADD CONSTRAINT "profiles_to_skills_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles_to_skills" ADD CONSTRAINT "profiles_to_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles_to_tags" ADD CONSTRAINT "profiles_to_tags_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles_to_tags" ADD CONSTRAINT "profiles_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
