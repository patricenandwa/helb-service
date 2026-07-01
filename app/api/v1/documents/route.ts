import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import { getSignedUrlForUpload } from "@/lib/r2/r2";
import { db } from "@/lib/db";
import { userDocuments, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const documentTypeSchema = z.enum([
    "passport_photo",
    "identity_document",
    "sponsorship_letter",
    "chronic_disease_document",
    "ncpwd_certificate",
    "death_certificate",
    "single_parent_certificate",
]);

const uploadUrlSchema = z.object({
    documentType: documentTypeSchema,
    userId: z.string().uuid(),
    contentType: z.string(),
    fileName: z.string().min(1),
})

const documentMetadataSchema = z.object({
    userId: z.string().uuid(),
    documentType: documentTypeSchema,
    storageKey: z.string().min(1),
    publicUrl: z.string().min(1),
    fileName: z.string().min(1),
    mimeType: z.string().min(1),
    fileSize: z.number().int().positive(),
});

function getSafeFileName(fileName: string) {
    return fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
}

function getPublicUrl(storageKey: string) {
    const publicBaseUrl = process.env.R2_PUBLIC_URL;

    if (!publicBaseUrl) {
        return storageKey;
    }

    return `${publicBaseUrl.replace(/\/$/, "")}/${storageKey}`;
}

async function userExists(userId: string) {
    const [user] = await db
        .select({ userId: users.userId })
        .from(users)
        .where(eq(users.userId, userId))
        .limit(1);

    return Boolean(user);
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const parsed = uploadUrlSchema.safeParse(data);

        if (!parsed.success) {
            return NextResponse.json(
                { success: false, error: "Invalid data" },
                { status: 400 }
            );
        }

        const { documentType, userId, contentType, fileName } = parsed.data;
        if (!(await userExists(userId))) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        const storageKey = `applications/${userId}/${documentType}-${Date.now()}-${getSafeFileName(fileName)}`;

        // Generate signed URL for upload
        const signedUrl = await getSignedUrlForUpload(storageKey, contentType);

        return NextResponse.json({
            success: true,
            signedUrl,
            storageKey,
            publicUrl: getPublicUrl(storageKey),
        });
    } catch (error) {
        console.error("Error generating signed URL:", error);
        return NextResponse.json(
            { success: false, error: "Failed to generate signed URL" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();
        const parsed = documentMetadataSchema.safeParse(data);

        if (!parsed.success) {
            return NextResponse.json(
                { success: false, error: "Invalid data" },
                { status: 400 }
            );
        }

        if (!(await userExists(parsed.data.userId))) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        await db
            .insert(userDocuments)
            .values({
                userId: parsed.data.userId,
                documentType: parsed.data.documentType,
                storageKey: parsed.data.storageKey,
                publicUrl: parsed.data.publicUrl,
                fileName: parsed.data.fileName,
                mimeType: parsed.data.mimeType,
                fileSize: parsed.data.fileSize,
                status: "pending",
            })
            .onConflictDoUpdate({
                target: [userDocuments.userId, userDocuments.documentType],
                set: {
                    storageKey: parsed.data.storageKey,
                    publicUrl: parsed.data.publicUrl,
                    fileName: parsed.data.fileName,
                    mimeType: parsed.data.mimeType,
                    fileSize: parsed.data.fileSize,
                    status: "pending",
                    rejectionReason: null,
                    uploadedAt: new Date(),
                    updatedAt: new Date(),
                },
            });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error saving document metadata:", error);
        return NextResponse.json(
            { success: false, error: "Failed to save document metadata" },
            { status: 500 }
        );
    }
}
