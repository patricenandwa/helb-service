import { sql } from "drizzle-orm";
import { pgTable, uuid, text, boolean, jsonb, timestamp, pgEnum, integer, unique, index, uniqueIndex } from "drizzle-orm/pg-core";

export const LevelEnum = pgEnum("level", ["Degree", "Tvet", "Kmtc"]);
export const InstitutionTypeEnum = pgEnum("institution_type", ["Public", "Private", "Kmtc"]);
export const FamilyStatusEnum = pgEnum("family_status", ["Both parents alive", "Single parent", "Adopted", "Parent/parents deceased"]);
export const staffRoleEnum = pgEnum("staff_role", ["super_admin", "agent"]);
export const staffStatusEnum = pgEnum("staff_status", ["invited", "active", "disabled"]);
export const applicationStatusEnum = pgEnum("application_status", [
    "draft",
    "submitted",
    "unassigned",
    "assigned",
    "contacting",
    "waiting_documents",
    "waiting_parent",
    "ready",
    "processing",
    "completed",
    "on_hold",
    "rejected",
]);
export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);
export const assignmentStatusEnum = pgEnum("assignment_status", ["active", "reassigned", "completed", "cancelled"]);
export const timelineEventTypeEnum = pgEnum("timeline_event_type", [
    "application_submitted",
    "application_assigned",
    "status_changed",
    "document_uploaded",
    "document_reviewed",
    "note_added",
    "applicant_contacted",
]);
export const documentTypeEnum = pgEnum("document_type", [
    "passport_photo",
    "identity_document",
    "sponsorship_letter",
    "chronic_disease_document",
    "ncpwd_certificate",
    "death_certificate",
    "single_parent_certificate",
]);
export const documentStatusEnum = pgEnum("document_status", [
    "pending",
    "approved",
    "rejected",
]);

export const staffUsers = pgTable("staff_users", {
    staffId: uuid("staff_id").primaryKey().defaultRandom(),
    firebaseUid: text("firebase_uid").notNull().unique(),
    role: staffRoleEnum("role").notNull().default("agent"),
    status: staffStatusEnum("status").notNull().default("invited"),
    maxActiveAssignments: integer("max_active_assignments").notNull().default(20),
    createdByFirebaseUid: text("created_by_firebase_uid"),
    lastLoginAt: timestamp("last_login_at"),
    invitedAt: timestamp("invited_at").defaultNow().notNull(),
    activatedAt: timestamp("activated_at"),
    disabledAt: timestamp("disabled_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()).defaultNow().notNull(),
}, (table) => [
    index("staff_users_role_idx").on(table.role),
    index("staff_users_status_idx").on(table.status),
]);

export const users = pgTable("users", {
    userId: uuid("user_id").primaryKey().defaultRandom(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull().unique(),
    whatsappNumber: text("whatsapp_number").notNull(),
    alternativeNumber: text("alternative_number"),
    parentGuardianPhoneNumber: text("parent_guardian_phone_number").notNull(),
    kcseIndexNumber: text("kcse_index_number").notNull(),
    kcpeIndexNumber: text("kcpe_index_number").notNull(),
    level: LevelEnum("level"),
    course: text("course"),
    institutionType: InstitutionTypeEnum("institution_type"),
    institutionName: text("institution_name"),
    admissionNumber: text("admission_number"),
    hasDisabilities: boolean("has_disabilities").notNull().default(false),
    wasSponsored: boolean("was_sponsored").notNull().default(false),
    familyStatus: FamilyStatusEnum("family_status"),
    isDraft: boolean("is_draft").notNull().default(true),
    applicationStatus: applicationStatusEnum("application_status").notNull().default("draft"),
    priority: priorityEnum("priority").notNull().default("medium"),
    assignedToStaffId: uuid("assigned_to_staff_id").references(() => staffUsers.staffId, {
        onDelete: "set null",
    }),
    submittedAt: timestamp("submitted_at"),
    completedAt: timestamp("completed_at"),
    rejectedAt: timestamp("rejected_at"),
    rejectionReason: text("rejection_reason"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()).defaultNow().notNull(),
}, (table) => [
    index("users_application_status_idx").on(table.applicationStatus),
    index("users_priority_idx").on(table.priority),
    index("users_assigned_to_staff_id_idx").on(table.assignedToStaffId),
    index("users_submitted_at_idx").on(table.submittedAt),
]);

export const userDocuments = pgTable("user_documents", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.userId, {
            onDelete: "cascade",
        }),
    documentType: documentTypeEnum("document_type").notNull(),
    storageKey: text("storage_key").notNull(),
    publicUrl: text("public_url").notNull(),
    fileName: text("file_name").notNull(),
    mimeType: text("mime_type").notNull(),
    fileSize: integer("file_size").notNull(),
    status: documentStatusEnum("status")
        .default("pending")
        .notNull(),
    rejectionReason: text("rejection_reason"),
    reviewedByStaffId: uuid("reviewed_by_staff_id").references(() => staffUsers.staffId, {
        onDelete: "set null",
    }),
    uploadedAt: timestamp("uploaded_at")
        .defaultNow()
        .notNull(),
    verifiedAt: timestamp("verified_at"),
    createdAt: timestamp("created_at")
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => new Date())
        .defaultNow()
        .notNull(),
}, (table) => [
    unique().on(table.userId, table.documentType),
    index("user_documents_user_id_idx").on(table.userId),
    index("user_documents_status_idx").on(table.status),
    index("user_documents_reviewed_by_staff_id_idx").on(table.reviewedByStaffId),
]);

export const applicationAssignments = pgTable("application_assignments", {
    assignmentId: uuid("assignment_id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.userId, {
            onDelete: "cascade",
        }),
    agentStaffId: uuid("agent_staff_id")
        .notNull()
        .references(() => staffUsers.staffId, {
            onDelete: "restrict",
        }),
    assignedByStaffId: uuid("assigned_by_staff_id").references(() => staffUsers.staffId, {
        onDelete: "set null",
    }),
    status: assignmentStatusEnum("status").notNull().default("active"),
    assignedAt: timestamp("assigned_at").defaultNow().notNull(),
    completedAt: timestamp("completed_at"),
    cancelledAt: timestamp("cancelled_at"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()).defaultNow().notNull(),
}, (table) => [
    index("application_assignments_user_id_idx").on(table.userId),
    index("application_assignments_agent_staff_id_idx").on(table.agentStaffId),
    index("application_assignments_status_idx").on(table.status),
    uniqueIndex("application_assignments_one_active_per_user_idx")
        .on(table.userId)
        .where(sql`${table.status} = 'active'`),
]);

export const applicationNotes = pgTable("application_notes", {
    noteId: uuid("note_id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.userId, {
            onDelete: "cascade",
        }),
    staffId: uuid("staff_id").references(() => staffUsers.staffId, {
        onDelete: "set null",
    }),
    note: text("note").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()).defaultNow().notNull(),
}, (table) => [
    index("application_notes_user_id_idx").on(table.userId),
    index("application_notes_staff_id_idx").on(table.staffId),
]);

export const applicationTimelineEvents = pgTable("application_timeline_events", {
    eventId: uuid("event_id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.userId, {
            onDelete: "cascade",
        }),
    staffId: uuid("staff_id").references(() => staffUsers.staffId, {
        onDelete: "set null",
    }),
    eventType: timelineEventTypeEnum("event_type").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
    index("application_timeline_events_user_id_idx").on(table.userId),
    index("application_timeline_events_staff_id_idx").on(table.staffId),
    index("application_timeline_events_event_type_idx").on(table.eventType),
]);
