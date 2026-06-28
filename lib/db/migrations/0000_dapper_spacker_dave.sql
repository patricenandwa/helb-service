CREATE TYPE "public"."document_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."document_type" AS ENUM('passport_photo', 'identity_document', 'sponsorship_letter', 'chronic_disease_document', 'ncpwd_certificate', 'death_certificate', 'single_parent_certificate');--> statement-breakpoint
CREATE TABLE "user_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"document_type" "document_type" NOT NULL,
	"storage_key" text NOT NULL,
	"public_url" text NOT NULL,
	"file_name" text NOT NULL,
	"mime_type" text NOT NULL,
	"file_size" integer NOT NULL,
	"status" "document_status" DEFAULT 'pending' NOT NULL,
	"rejection_reason" text,
	"uploaded_at" timestamp DEFAULT now() NOT NULL,
	"verified_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_documents_user_id_document_type_unique" UNIQUE("user_id","document_type")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"whatsapp_number" text NOT NULL,
	"alternative_number" text,
	"parent_guardian_phone_number" text NOT NULL,
	"kcse_index_number" text NOT NULL,
	"kcpe_index_number" text NOT NULL,
	"level" "level",
	"course" text,
	"institution_type" "institution_type",
	"institution_name" text,
	"admission_number" text,
	"has_disabilities" boolean DEFAULT false NOT NULL,
	"was_sponsored" boolean DEFAULT false NOT NULL,
	"family_status" "family_status",
	"is_draft" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "user_documents" ADD CONSTRAINT "user_documents_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;