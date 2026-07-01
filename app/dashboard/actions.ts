"use server";

import { revalidatePath } from "next/cache";

export async function assignApplication(formData: FormData) {
    const applicationId = String(formData.get("applicationId") ?? "");
    const agentId = String(formData.get("agentId") ?? "");

    if (!applicationId || !agentId) {
        return;
    }

    // Backend integration point:
    // Persist assignment, create timeline event, then revalidate dashboard routes.
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/applications");
    revalidatePath("/dashboard/assignments");
}

export async function updateApplicationStatus(formData: FormData) {
    const applicationId = String(formData.get("applicationId") ?? "");
    const status = String(formData.get("status") ?? "");

    if (!applicationId || !status) {
        return;
    }

    // Backend integration point:
    // Persist workflow status and append audit/timeline event.
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/applications");
    revalidatePath(`/dashboard/applications/${applicationId}`);
}

export async function saveApplicationNote(formData: FormData) {
    const applicationId = String(formData.get("applicationId") ?? "");
    const note = String(formData.get("note") ?? "").trim();

    if (!applicationId || !note) {
        return;
    }

    // Backend integration point:
    // Persist internal note against the application and current staff user.
    revalidatePath(`/dashboard/applications/${applicationId}`);
}

export async function saveProfileSettings(formData: FormData) {
    const fullName = String(formData.get("fullName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    if (!fullName || !email) {
        return;
    }

    // Backend integration point:
    // Persist staff profile/settings against the authenticated dashboard user.
    revalidatePath("/dashboard/settings");
}
