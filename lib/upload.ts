import { createDocumentUploadUrl, uploadToSignedUrl } from "@/lib/api";
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
  userId: string,
  file: File,
  documentType: string,
  onProgress?: (progress: number) => void
): Promise<{ publicUrl: string; storageKey: string }> {
  const { signedUrl, publicUrl, storageKey } = await createDocumentUploadUrl(
    userId,
    documentType,
    file
  );

  await uploadToSignedUrl(signedUrl, file, onProgress);

  return { publicUrl, storageKey };
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
