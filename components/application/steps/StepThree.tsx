"use client";

import { motion, AnimatePresence } from "motion/react";
import type { FormData, StepErrors } from "@/lib/validation";
import {
  Accessibility,
  FileText,
  Users,
  User,
  Handshake,
  Bird
} from "lucide-react";

interface StepThreeProps {
  data: FormData;
  errors: StepErrors;
  onChange: (field: keyof FormData, value: string | boolean) => void;
}

function YesNoQuestion({
  label,
  description,
  value,
  error,
  onChange,
}: {
  label: string;
  description?: string;
  value: boolean | null;
  error?: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-white p-5">
      <p className="text-sm font-semibold text-text-primary">
        {label}
        <span className="ml-0.5 text-error">*</span>
      </p>
      {description && (
        <p className="mt-0.5 text-xs text-text-muted">{description}</p>
      )}
      <div className="mt-3 flex gap-3">
        {[
          { val: true, label: "Yes" },
          { val: false, label: "No" },
        ].map((option) => (
          <button
            key={String(option.val)}
            type="button"
            onClick={() => onChange(option.val)}
            className={`flex-1 rounded-xl border-2 px-6 py-3 text-sm font-semibold transition-all ${
              value === option.val
                ? option.val
                  ? "border-primary bg-primary-light/50 text-primary shadow-md shadow-primary/10"
                  : "border-gray-400 bg-gray-50 text-text-primary shadow-md"
                : "border-border bg-white text-text-secondary hover:border-gray-300 hover:shadow-sm"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {error && (
        <p className="mt-2 text-xs font-medium text-error">{error}</p>
      )}
    </div>
  );
}

function FamilyStatusSelect({
  value,
  error,
  onChange,
}: {
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const options = [
    {
      value: "Both parents alive",
      label: "Both parents alive",
      icon: Users,
    },
    { value: "Single parent", label: "Single parent", icon: User },
    { value: "Adopted", label: "Adopted", icon: Handshake },
    {
      value: "Parent/parents deceased",
      label: "Parent/parents deceased",
      icon: Bird,
    },
  ];

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-text-primary">
        Family status
        <span className="ml-0.5 text-error">*</span>
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
              value === option.value
                ? "border-primary bg-primary-light/50 shadow-md shadow-primary/10"
                : "border-border bg-white hover:border-primary/30 hover:shadow-sm"
            }`}
          >
            <option.icon className="h-5 w-5 text-primary shrink-0" />
            <span className="text-sm font-medium text-text-primary">
              {option.label}
            </span>
          </button>
        ))}
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-error">{error}</p>
      )}
    </div>
  );
}

export default function StepThree({ data, errors, onChange }: StepThreeProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Background</h2>
        <p className="mt-1 text-sm text-text-muted">
          This helps us determine your eligibility for specific funding
          categories.
        </p>
      </div>

      <YesNoQuestion
        label="Do you have any disabilities?"
        value={data.hasDisabilities}
        error={errors.hasDisabilities}
        onChange={(v) => onChange("hasDisabilities", v)}
      />

      {/* Conditional hint */}
      <AnimatePresence>
        {data.hasDisabilities === true && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary-light/30 p-4">
              <Accessibility className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-primary">
                  NCPWD Certificate Required
                </p>
                <p className="text-xs text-text-muted">
                  You&apos;ll need to upload your NCPWD certificate in the next step.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <YesNoQuestion
        label="Were you sponsored in high school or primary school?"
        value={data.wasSponsored}
        error={errors.wasSponsored}
        onChange={(v) => onChange("wasSponsored", v)}
      />

      {/* Conditional hint */}
      <AnimatePresence>
        {data.wasSponsored === true && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary-light/30 p-4">
              <FileText className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-primary">
                  Sponsorship Letter Required
                </p>
                <p className="text-xs text-text-muted">
                  You&apos;ll need to upload your sponsorship letter in the next step.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FamilyStatusSelect
        value={data.familyStatus}
        error={errors.familyStatus}
        onChange={(v) => onChange("familyStatus", v)}
      />
    </div>
  );
}
