import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

const schema = z.object({
    userId: z.string(),
    level: z.enum(["Degree", "Tvet", "Kmtc"]),
    course: z.string(),
    institutionType: z.enum(["Public", "Private", "Kmtc"]),
    institutionName: z.string(),
    admissionNumber: z.string(),
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

        // update the data
        const [user] = await db.update(users)
            .set({
                level: parsed.data.level,
                course: parsed.data.course,
                institutionType: parsed.data.institutionType,
                institutionName: parsed.data.institutionName,
                admissionNumber: parsed.data.admissionNumber,
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
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
