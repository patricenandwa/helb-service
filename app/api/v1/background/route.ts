import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

const schema = z.object({
    userId: z.string(),
    hasDisabilities: z.boolean(),
    wasSponsored: z.boolean(),
    familyStatus: z.enum(["Both parents alive", "Single parent", "Adopted", "Parent/parents deceased"]),
})

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const parsed = schema.safeParse(data);

        if (!parsed.success) {
            return NextResponse.json(
                { success: false, error: "Invalid data" },
                { status: 400 }
            );
        }

        const [user] = await db.update(users)
            .set({
                hasDisabilities: parsed.data.hasDisabilities,
                wasSponsored: parsed.data.wasSponsored,
                familyStatus: parsed.data.familyStatus
            })
            .where(eq(users.userId, parsed.data.userId))
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
    } catch (error) {
        console.error("Error creating background info:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to create background info"
            },
            { status: 500 }
        )
    }




}