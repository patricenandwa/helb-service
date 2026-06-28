"use client";

import type { FormData } from "@/lib/validation";
import { getFileTypeLabel } from "@/lib/upload";

interface ReviewProps {
  data: FormData;
  onEdit: (step: number) => void;
}

function Section({
  title,
  step,
  onEdit,
  children,
}: {
  title: string;
  step: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between border-b border-border bg-gray-50/80 px-5 py-3">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-success" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
        </div>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="text-xs font-semibold text-primary transition-colors hover:text-primary-hover"
        >
          Edit
        </button>
      </div>
      <div className="space-y-0 divide-y divide-border/50">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 px-5 py-3">
      <span className="text-xs font-medium text-text-muted">{label}</span>
      <span className="text-right text-sm font-medium text-text-primary">
        {value || "—"}
      </span>
    </div>
  );
}

export default function Review({ data, onEdit }: ReviewProps) {
  const uploadedDocs = data.documents.filter((d) => d.uploaded);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          Review Your Application
        </h2>
        <p className="mt-1 text-sm text-text-muted">
          Please review all information before submitting. Click Edit to make
          changes.
        </p>
      </div>

      {/* Personal Info */}
      <Section title="Personal Information" step={0} onEdit={onEdit}>
        <Field label="Full Name" value={data.fullName} />
        <Field label="Email" value={data.email} />
        <Field label="WhatsApp" value={data.whatsappNumber} />
        <Field label="Alternative Number" value={data.alternativeNumber} />
        <Field label="Parent Phone" value={data.parentGuardianPhoneNumber} />
        <Field label="KCSE Index" value={data.kcseIndexNumber} />
        <Field label="KCPE Index" value={data.kcpeIndexNumber} />
      </Section>

      {/* Education */}
      <Section title="Education" step={1} onEdit={onEdit}>
        <Field label="Level" value={data.level} />
        <Field label="Course" value={data.course} />
        <Field label="Institution Type" value={data.institutionType} />
        <Field label="Institution Name" value={data.institutionName} />
        <Field label="Admission Number" value={data.admissionNumber} />
      </Section>

      {/* Background */}
      <Section title="Background" step={2} onEdit={onEdit}>
        <Field
          label="Has Disabilities"
          value={data.hasDisabilities ? "Yes" : "No"}
        />
        <Field
          label="Was Sponsored"
          value={data.wasSponsored ? "Yes" : "No"}
        />
        <Field label="Family Status" value={data.familyStatus} />
      </Section>

      {/* Documents */}
      <Section title="Documents" step={3} onEdit={onEdit}>
        {uploadedDocs.length > 0 ? (
          uploadedDocs.map((doc) => (
            <div
              key={doc.type}
              className="flex items-center gap-3 px-5 py-3"
            >
              <svg className="h-4 w-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-text-primary">
                {getFileTypeLabel(doc.type)}
              </span>
              {doc.file && (
                <span className="ml-auto text-xs text-text-muted">
                  {doc.file.name}
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="px-5 py-3 text-sm text-text-muted">
            No documents uploaded
          </div>
        )}
      </Section>

      {/* Service & Price */}
      <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary-light/30 to-blue-50 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Service selected
            </p>
            <p className="mt-1 text-lg font-bold text-text-primary">
              HELB + HEF Application
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">KSh 750</p>
            <p className="text-xs text-text-muted">One-time fee</p>
          </div>
        </div>
      </div>
    </div>
  );
}
