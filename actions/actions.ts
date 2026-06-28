"use server";

import { getSignedUrlForUpload } from "@/lib/r2/r2";

const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN;

if (!R2_PUBLIC_DOMAIN) {
    throw new Error("Missing R2_PUBLIC_DOMAIN");
}

export async function createUploadUrl(
    fileKey: string,
    contentType: string
) {
    const signedUrl = await getSignedUrlForUpload(
        fileKey,
        contentType
    );

    return {
        signedUrl,
        publicUrl: `${R2_PUBLIC_DOMAIN}/${fileKey}`,
    };
}