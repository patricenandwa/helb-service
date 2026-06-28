import { createUploadUrl } from "@/actions/actions";
import {
  Camera,
  IdCard,
  FileText,
  Building,
  Accessibility,
  Scroll,
  ClipboardList,
  LucideIcon
} from "lucide-react";

export async function uploadFileToR2(
  file: File,
  documentType: string,
  onProgress?: (progress: number) => void
): Promise<{ publicUrl: string; storageKey: string }> {
  const ext = file.name.split(".").pop() || "bin";
  const fileKey = `documents/${documentType}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { signedUrl, publicUrl } = await createUploadUrl(
    fileKey,
    file.type
  );

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({ publicUrl, storageKey: fileKey });
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener("error", () => {
      reject(new Error("Upload failed"));
    });

    xhr.open("PUT", signedUrl);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.send(file);
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function isValidFileType(file: File): boolean {
  const allowed = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];
  return allowed.includes(file.type);
}

export function getFileTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    passport_photo: "Passport Photo / Clear Selfie",
    identity_document: "Birth Certificate / ID / Waiting Card",
    sponsorship_letter: "Sponsorship Letter",
    chronic_disease_document: "Chronic Disease Document",
    ncpwd_certificate: "NCPWD Certificate",
    death_certificate: "Death Certificate / Burial Permit",
    single_parent_certificate: "Single Parent Certificate",
  };
  return labels[type] || type;
}

export function getFileTypeIcon(type: string): LucideIcon {
  const icons: Record<string, LucideIcon> = {
    passport_photo: Camera,
    identity_document: IdCard,
    sponsorship_letter: FileText,
    chronic_disease_document: Building, // Using Building for hospital
    ncpwd_certificate: Accessibility,
    death_certificate: Scroll,
    single_parent_certificate: ClipboardList,
  };
  return icons[type] || FileText;
}
