import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Define schema matching lib/validation.ts
const applicationSchema = z.object({
    fullName: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    whatsappNumber: z.string().min(1, "WhatsApp number is required"),
    alternativeNumber: z.string().optional(),
    parentGuardianPhoneNumber: z.string().min(1, "Parent/guardian number is required"),
    kcseIndexNumber: z.string().min(1, "KCSE index number is required"),
    kcpeIndexNumber: z.string().min(1, "KCPE index number is required"),
});

function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : "Unknown error";
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate input
        const parsed = applicationSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid input data", details: parsed.error.message },
                { status: 400 }
            );
        }

        // insert into db
        const [data] = await db
            .insert(users)
            .values(parsed.data)
            .returning();

        return NextResponse.json({
            success: true,
            userId: data.userId,
        });

    } catch (error: unknown) {
        console.error("[CREATE APPLICATION ERROR]:", error);

        return NextResponse.json(
            { error: "Failed to create application", message: getErrorMessage(error) },
            { status: 500 }
        );
    }
}

const patchSchema = applicationSchema.partial().extend({
    userId: z.string().uuid(),
    isDraft: z.boolean().optional(),
}).refine((data) => {
    return Object.entries(data).some(
        ([key, value]) => key !== "userId" && value !== undefined
    );
});

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = patchSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { success: false, error: "Invalid input data" },
                { status: 400 }
            );
        }

        const { userId, ...updates } = parsed.data;

        const shouldSubmit = updates.isDraft === false;

        const [user] = await db
            .update(users)
            .set({
                ...updates,
                ...(shouldSubmit
                    ? {
                        applicationStatus: "submitted" as const,
                        submittedAt: new Date(),
                    }
                    : {}),
                updatedAt: new Date(),
            })
            .where(eq(users.userId, userId))
            .returning();

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            userId: user.userId,
        });
    } catch (error: unknown) {
        console.error("[SUBMIT APPLICATION ERROR]:", error);

        return NextResponse.json(
            { success: false, error: "Failed to submit application", message: getErrorMessage(error) },
            { status: 500 }
        );
    }
}
