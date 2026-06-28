"use client";

import type { FormData, StepErrors } from "@/lib/validation";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StepOneProps {
  data: FormData;
  errors: StepErrors;
  onChange: (field: keyof FormData, value: string) => void;
}

function Input({
  label,
  value,
  error,
  placeholder,
  type = "text",
  required = true,
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-text-primary">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>
      <ShadcnInput
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={error ? "border-destructive focus-visible:ring-destructive" : ""}
      />
      {error && (
        <p className="text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}

export default function StepOne({ data, errors, onChange }: StepOneProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">
          Personal Information
        </h2>
        <p className="mt-1 text-sm text-text-muted">
          Tell us about yourself. All fields marked with * are required.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Full Name"
          value={data.fullName}
          error={errors.fullName}
          placeholder="e.g. John Kamau Mwangi"
          onChange={(v) => onChange("fullName", v)}
        />

        <Input
          label="Email"
          type="email"
          value={data.email}
          error={errors.email}
          placeholder="you@example.com"
          onChange={(v) => onChange("email", v)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="WhatsApp Number"
            type="tel"
            value={data.whatsappNumber}
            error={errors.whatsappNumber}
            placeholder="0712 345 678"
            onChange={(v) => onChange("whatsappNumber", v)}
          />

          <Input
            label="Alternative Number"
            type="tel"
            value={data.alternativeNumber}
            error={errors.alternativeNumber}
            placeholder="Optional"
            required={false}
            onChange={(v) => onChange("alternativeNumber", v)}
          />
        </div>

        <Input
          label="Parent / Guardian Phone Number"
          type="tel"
          value={data.parentGuardianPhoneNumber}
          error={errors.parentGuardianPhoneNumber}
          placeholder="0722 000 000"
          onChange={(v) => onChange("parentGuardianPhoneNumber", v)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="KCSE Index Number"
            value={data.kcseIndexNumber}
            error={errors.kcseIndexNumber}
            placeholder="e.g. 20401001001"
            onChange={(v) => onChange("kcseIndexNumber", v)}
          />

          <Input
            label="KCPE Index Number"
            value={data.kcpeIndexNumber}
            error={errors.kcpeIndexNumber}
            placeholder="e.g. 30401001001"
            onChange={(v) => onChange("kcpeIndexNumber", v)}
          />
        </div>
      </div>
    </div>
  );
}
