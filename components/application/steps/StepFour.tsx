"use client";

import type { FormData, StepErrors } from "@/lib/validation";
import type { DocumentFile } from "@/lib/validation";
import UploadField from "../UploadField";

interface StepFourProps {
  data: FormData;
  errors: StepErrors;
  onFileSelect: (type: string, file: File) => void;
  onFileRemove: (type: string) => void;
}

interface DocumentConfig {
  type: string;
  required: boolean;
  condition?: boolean;
}

export default function StepFour({
  data,
  errors,
  onFileSelect,
  onFileRemove,
}: StepFourProps) {
  const documentConfigs: DocumentConfig[] = [
    { type: "passport_photo", required: true },
    { type: "identity_document", required: true },
    {
      type: "sponsorship_letter",
      required: false,
      condition: data.wasSponsored === true,
    },
    {
      type: "ncpwd_certificate",
      required: false,
      condition: data.hasDisabilities === true,
    },
    {
      type: "death_certificate",
      required: false,
      condition:
        data.familyStatus === "Parent/parents deceased",
    },
    {
      type: "single_parent_certificate",
      required: false,
      condition: data.familyStatus === "Single parent",
    },
    {
      type: "chronic_disease_document",
      required: false,
    },
  ];

  // Filter documents: show required ones + conditionally visible ones
  const visibleDocs = documentConfigs.filter(
    (d) => d.required || d.condition === true || d.condition === undefined
  );

  function getDocData(type: string): DocumentFile {
    return (
      data.documents.find((d) => d.type === type) || {
        type,
        file: null,
        preview: "",
        uploaded: false,
        progress: 0,
      }
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          Upload Documents
        </h2>
        <p className="mt-1 text-sm text-text-muted">
          Upload clear scans or photos of your documents. We accept JPG, PNG,
          and PDF files.
        </p>
      </div>

      {/* Required docs */}
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
          Required documents
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {visibleDocs
            .filter((d) => d.required)
            .map((doc) => {
              const docData = getDocData(doc.type);
              return (
                <UploadField
                  key={doc.type}
                  documentType={doc.type}
                  file={docData.file}
                  fileName={docData.fileName}
                  fileSize={docData.fileSize}
                  preview={docData.preview}
                  progress={docData.progress}
                  uploaded={docData.uploaded}
                  error={errors[doc.type] || docData.error}
                  onFileSelect={onFileSelect}
                  onRemove={onFileRemove}
                />
              );
            })}
        </div>
      </div>

      {/* Conditional docs */}
      {visibleDocs.filter((d) => !d.required).length > 0 && (
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
            Supporting documents
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {visibleDocs
              .filter((d) => !d.required)
              .map((doc) => {
                const docData = getDocData(doc.type);
                return (
                  <UploadField
                    key={doc.type}
                    documentType={doc.type}
                    file={docData.file}
                    fileName={docData.fileName}
                    fileSize={docData.fileSize}
                    preview={docData.preview}
                    progress={docData.progress}
                    uploaded={docData.uploaded}
                    error={errors[doc.type] || docData.error}
                    onFileSelect={onFileSelect}
                    onRemove={onFileRemove}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
