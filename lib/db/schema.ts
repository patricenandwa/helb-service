import { pgTable, uuid, text, boolean, jsonb, timestamp, pgEnum, integer, unique } from "drizzle-orm/pg-core";

export const LevelEnum = pgEnum("level", ["Degree", "Tvet", "Kmtc"]);
export const InstitutionTypeEnum = pgEnum("institution_type", ["Public", "Private", "Kmtc"]);
export const FamilyStatusEnum = pgEnum("family_status", ["Both parents alive", "Single parent", "Adopted", "Parent/parents deceased"]);
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
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

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
    unique().on(table.userId, table.documentType)
]);