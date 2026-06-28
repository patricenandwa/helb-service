"use client";

import type { FormData, StepErrors } from "@/lib/validation";

interface StepTwoProps {
  data: FormData;
  errors: StepErrors;
  onChange: (field: keyof FormData, value: string) => void;
}

function RadioGroup({
  label,
  options,
  value,
  error,
  onChange,
}: {
  label: string;
  options: { value: string; label: string; description?: string }[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-text-primary">
        {label}
        <span className="ml-0.5 text-error">*</span>
      </p>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`group relative flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
              value === option.value
                ? "border-primary bg-primary-light/50 shadow-md shadow-primary/10"
                : "border-border bg-white hover:border-primary/30 hover:shadow-sm"
            }`}
          >
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                value === option.value
                  ? "border-primary bg-primary"
                  : "border-gray-300 group-hover:border-primary/50"
              }`}
            >
              {value === option.value && (
                <div className="h-2 w-2 rounded-full bg-white" />
              )}
            </div>
            <div>
              <span className="text-sm font-semibold text-text-primary">
                {option.label}
              </span>
              {option.description && (
                <p className="text-xs text-text-muted">{option.description}</p>
              )}
            </div>
          </button>
        ))}
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-error">{error}</p>
      )}
    </div>
  );
}

function TextInput({
  label,
  value,
  error,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-text-primary">
        {label}
        <span className="ml-0.5 text-error">*</span>
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-text-primary outline-none transition-all placeholder:text-text-muted focus:ring-4 ${
          error
            ? "border-error focus:border-error focus:ring-error/10"
            : "border-border focus:border-primary focus:ring-primary/10"
        }`}
      />
      {error && (
        <p className="mt-1 text-xs font-medium text-error">{error}</p>
      )}
    </div>
  );
}

export default function StepTwo({ data, errors, onChange }: StepTwoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Education</h2>
        <p className="mt-1 text-sm text-text-muted">
          Tell us about your academic program and institution.
        </p>
      </div>

      <RadioGroup
        label="Which level?"
        value={data.level}
        error={errors.level}
        options={[
          { value: "Degree", label: "Degree", description: "University" },
          { value: "Tvet", label: "TVET", description: "Technical" },
          { value: "Kmtc", label: "KMTC", description: "Medical" },
        ]}
        onChange={(v) => onChange("level", v)}
      />

      <TextInput
        label="Which course?"
        value={data.course}
        error={errors.course}
        placeholder="e.g. Bachelor of Science in Computer Science"
        onChange={(v) => onChange("course", v)}
      />

      <RadioGroup
        label="Institution type"
        value={data.institutionType}
        error={errors.institutionType}
        options={[
          {
            value: "Public",
            label: "Public",
            description: "Applied via KUCCPS",
          },
          {
            value: "Private",
            label: "Private",
            description: "Applied via KUCCPS or directly",
          },
          {
            value: "Kmtc",
            label: "KMTC",
            description: "Kenya Medical Training",
          },
        ]}
        onChange={(v) => onChange("institutionType", v)}
      />

      <TextInput
        label="Institution name"
        value={data.institutionName}
        error={errors.institutionName}
        placeholder="e.g. University of Nairobi"
        onChange={(v) => onChange("institutionName", v)}
      />

      <TextInput
        label="Admission / Reg. Number"
        value={data.admissionNumber}
        error={errors.admissionNumber}
        placeholder="As per your admission letter"
        onChange={(v) => onChange("admissionNumber", v)}
      />
    </div>
  );
}
