"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";
import Review from "./steps/Review";

import ProgressBar from "./ProgressBar";
import Navigation from "./Navigation";
import StepWrapper from "./StepWrapper";

import {
  type FormData,
  type DocumentFile,
  type StepErrors,
  INITIAL_FORM_DATA,
  validateStep,
} from "@/lib/validation";
import { submitApplication } from "@/lib/api";

const TOTAL_STEPS = 5;

export default function ApplicationForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<StepErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback(
    (field: keyof FormData, value: string | boolean) => {
      setData((prev) => ({ ...prev, [field]: value }));
      // Clear error for this field when user edits it
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    []
  );

  const handleFileSelect = useCallback((type: string, file: File) => {
    const preview = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : "";

    setData((prev) => {
      const existingIndex = prev.documents.findIndex((d) => d.type === type);
      const doc: DocumentFile = {
        type,
        file,
        preview,
        uploaded: true, // Mark as uploaded immediately for now (no R2 in dev)
        progress: 100,
      };

      const newDocs = [...prev.documents];
      if (existingIndex >= 0) {
        newDocs[existingIndex] = doc;
      } else {
        newDocs.push(doc);
      }
      return { ...prev, documents: newDocs };
    });

    // Clear error for this document type
    setErrors((prev) => {
      const next = { ...prev };
      delete next[type];
      return next;
    });
  }, []);

  const handleFileRemove = useCallback((type: string) => {
    setData((prev) => ({
      ...prev,
      documents: prev.documents.filter((d) => d.type !== type),
    }));
  }, []);

  const handleNext = useCallback(async () => {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});

    if (step === TOTAL_STEPS - 1) {
      // Submit
      setIsSubmitting(true);
      try {
        await submitApplication(data);
        router.push("/apply/success");
      } catch (err) {
        console.error("Submission failed:", err);
        setIsSubmitting(false);
      }
      return;
    }

    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  }, [step, data, router]);

  const handleBack = useCallback(() => {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleEditStep = useCallback((targetStep: number) => {
    setErrors({});
    setStep(targetStep);
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-16">
      <ProgressBar current={step} total={TOTAL_STEPS} />

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-xl shadow-gray-200/50 sm:p-10">
        <StepWrapper stepKey={step}>
          {step === 0 && (
            <StepOne data={data} errors={errors} onChange={updateField} />
          )}
          {step === 1 && (
            <StepTwo data={data} errors={errors} onChange={updateField} />
          )}
          {step === 2 && (
            <StepThree data={data} errors={errors} onChange={updateField} />
          )}
          {step === 3 && (
            <StepFour
              data={data}
              errors={errors}
              onFileSelect={handleFileSelect}
              onFileRemove={handleFileRemove}
            />
          )}
          {step === 4 && <Review data={data} onEdit={handleEditStep} />}
        </StepWrapper>
      </div>

      <Navigation
        step={step}
        totalSteps={TOTAL_STEPS}
        onBack={handleBack}
        onNext={handleNext}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
