CREATE TYPE "public"."application_status" AS ENUM('draft', 'submitted', 'unassigned', 'assigned', 'contacting', 'waiting_documents', 'waiting_parent', 'ready', 'processing', 'completed', 'on_hold', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."assignment_status" AS ENUM('active', 'reassigned', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."priority" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."staff_role" AS ENUM('super_admin', 'agent');--> statement-breakpoint
CREATE TYPE "public"."staff_status" AS ENUM('invited', 'active', 'disabled');--> statement-breakpoint
CREATE TYPE "public"."timeline_event_type" AS ENUM('application_submitted', 'application_assigned', 'status_changed', 'document_uploaded', 'document_reviewed', 'note_added', 'applicant_contacted');--> statement-breakpoint
CREATE TABLE "application_assignments" (
	"assignment_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"agent_staff_id" uuid NOT NULL,
	"assigned_by_staff_id" uuid,
	"status" "assignment_status" DEFAULT 'active' NOT NULL,
	"assigned_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"cancelled_at" timestamp,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "application_notes" (
	"note_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"staff_id" uuid,
	"note" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "application_timeline_events" (
	"event_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"staff_id" uuid,
	"event_type" timeline_event_type NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "staff_users" (
	"staff_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firebase_uid" text NOT NULL,
	"role" "staff_role" DEFAULT 'agent' NOT NULL,
	"status" "staff_status" DEFAULT 'invited' NOT NULL,
	"max_active_assignments" integer DEFAULT 20 NOT NULL,
	"created_by_firebase_uid" text,
	"last_login_at" timestamp,
	"invited_at" timestamp DEFAULT now() NOT NULL,
	"activated_at" timestamp,
	"disabled_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "staff_users_firebase_uid_unique" UNIQUE("firebase_uid")
);
--> statement-breakpoint
ALTER TABLE "user_documents" ADD COLUMN "reviewed_by_staff_id" uuid;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "application_status" "application_status" DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "priority" "priority" DEFAULT 'medium' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "assigned_to_staff_id" uuid;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "submitted_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "completed_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "rejected_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "rejection_reason" text;--> statement-breakpoint
ALTER TABLE "application_assignments" ADD CONSTRAINT "application_assignments_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application_assignments" ADD CONSTRAINT "application_assignments_agent_staff_id_staff_users_staff_id_fk" FOREIGN KEY ("agent_staff_id") REFERENCES "public"."staff_users"("staff_id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application_assignments" ADD CONSTRAINT "application_assignments_assigned_by_staff_id_staff_users_staff_id_fk" FOREIGN KEY ("assigned_by_staff_id") REFERENCES "public"."staff_users"("staff_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application_notes" ADD CONSTRAINT "application_notes_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application_notes" ADD CONSTRAINT "application_notes_staff_id_staff_users_staff_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."staff_users"("staff_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application_timeline_events" ADD CONSTRAINT "application_timeline_events_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application_timeline_events" ADD CONSTRAINT "application_timeline_events_staff_id_staff_users_staff_id_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."staff_users"("staff_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "application_assignments_user_id_idx" ON "application_assignments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "application_assignments_agent_staff_id_idx" ON "application_assignments" USING btree ("agent_staff_id");--> statement-breakpoint
CREATE INDEX "application_assignments_status_idx" ON "application_assignments" USING btree ("status");--> statement-breakpoint
CREATE INDEX "application_notes_user_id_idx" ON "application_notes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "application_notes_staff_id_idx" ON "application_notes" USING btree ("staff_id");--> statement-breakpoint
CREATE INDEX "application_timeline_events_user_id_idx" ON "application_timeline_events" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "application_timeline_events_staff_id_idx" ON "application_timeline_events" USING btree ("staff_id");--> statement-breakpoint
CREATE INDEX "application_timeline_events_event_type_idx" ON "application_timeline_events" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "staff_users_role_idx" ON "staff_users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "staff_users_status_idx" ON "staff_users" USING btree ("status");--> statement-breakpoint
ALTER TABLE "user_documents" ADD CONSTRAINT "user_documents_reviewed_by_staff_id_staff_users_staff_id_fk" FOREIGN KEY ("reviewed_by_staff_id") REFERENCES "public"."staff_users"("staff_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_assigned_to_staff_id_staff_users_staff_id_fk" FOREIGN KEY ("assigned_to_staff_id") REFERENCES "public"."staff_users"("staff_id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_documents_user_id_idx" ON "user_documents" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_documents_status_idx" ON "user_documents" USING btree ("status");--> statement-breakpoint
CREATE INDEX "user_documents_reviewed_by_staff_id_idx" ON "user_documents" USING btree ("reviewed_by_staff_id");--> statement-breakpoint
CREATE INDEX "users_application_status_idx" ON "users" USING btree ("application_status");--> statement-breakpoint
CREATE INDEX "users_priority_idx" ON "users" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "users_assigned_to_staff_id_idx" ON "users" USING btree ("assigned_to_staff_id");--> statement-breakpoint
CREATE INDEX "users_submitted_at_idx" ON "users" USING btree ("submitted_at");