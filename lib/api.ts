import type { DocumentFile, FormData } from "@/lib/validation";

const API_BASE = "/api/v1";

async function parseResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.success === false) {
    throw new Error(payload?.message || payload?.error || fallbackMessage);
  }

  return payload as T;
}

export async function savePersonalInfo(data: FormData, userId?: string | null): Promise<string> {
  const response = await fetch(`${API_BASE}/personal`, {
    method: userId ? "PATCH" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      fullName: data.fullName,
      email: data.email,
      whatsappNumber: data.whatsappNumber,
      alternativeNumber: data.alternativeNumber || undefined,
      parentGuardianPhoneNumber: data.parentGuardianPhoneNumber,
      kcseIndexNumber: data.kcseIndexNumber,
      kcpeIndexNumber: data.kcpeIndexNumber,
    }),
  });

  const payload = await parseResponse<{ success: true; userId: string }>(
    response,
    "Failed to save personal information"
  );

  return payload.userId;
}

export async function saveEducationInfo(userId: string, data: FormData) {
  const response = await fetch(`${API_BASE}/education`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      level: data.level,
      course: data.course,
      institutionType: data.institutionType,
      institutionName: data.institutionName,
      admissionNumber: data.admissionNumber,
    }),
  });

  return parseResponse<{ success: true; userId: string }>(
    response,
    "Failed to save education information"
  );
}

export async function saveBackgroundInfo(userId: string, data: FormData) {
  const response = await fetch(`${API_BASE}/background`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      hasDisabilities: data.hasDisabilities,
      wasSponsored: data.wasSponsored,
      familyStatus: data.familyStatus,
    }),
  });

  return parseResponse<{ success: true; userId: string }>(
    response,
    "Failed to save background information"
  );
}

export async function createDocumentUploadUrl(
  userId: string,
  documentType: string,
  file: File
) {
  const response = await fetch(`${API_BASE}/documents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      documentType,
      contentType: file.type,
      fileName: file.name,
    }),
  });

  return parseResponse<{
    success: true;
    signedUrl: string;
    storageKey: string;
    publicUrl: string;
  }>(response, "Failed to prepare document upload");
}

export function uploadToSignedUrl(
  uploadUrl: string,
  file: File,
  onProgress?: (progress: number) => void
) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        onProgress?.(Math.round((event.loaded / event.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
        return;
      }

      reject(new Error(`Upload failed with status ${xhr.status}`));
    });

    xhr.addEventListener("error", () => {
      reject(
        new Error(
          "Upload failed. If this appears as a CORS error in the network tab, allow PUT uploads from this app origin in your Cloudflare R2 bucket CORS settings."
        )
      );
    });

    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.send(file);
  });
}

export async function saveDocumentMetadata(
  userId: string,
  document: Required<Pick<DocumentFile, "type" | "storageKey" | "publicUrl" | "fileName" | "mimeType" | "fileSize">>
) {
  const response = await fetch(`${API_BASE}/documents`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      documentType: document.type,
      storageKey: document.storageKey,
      publicUrl: document.publicUrl,
      fileName: document.fileName,
      mimeType: document.mimeType,
      fileSize: document.fileSize,
    }),
  });

  return parseResponse<{ success: true }>(
    response,
    "Failed to save document details"
  );
}

export async function submitApplication(userId: string) {
  const response = await fetch(`${API_BASE}/personal`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, isDraft: false }),
  });

  return parseResponse<{ success: true; userId: string }>(
    response,
    "Failed to submit application"
  );
}
