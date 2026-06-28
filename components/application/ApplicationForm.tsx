"use client";

import { useState, useCallback, useEffect } from "react";
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
import {
  createDocumentUploadUrl,
  saveBackgroundInfo,
  saveDocumentMetadata,
  saveEducationInfo,
  savePersonalInfo,
  submitApplication,
  uploadToSignedUrl,
} from "@/lib/api";

const TOTAL_STEPS = 5;
const DRAFT_STORAGE_KEY = "helb-service-application-draft";

type StoredDraft = {
  step: number;
  userId: string | null;
  data: Omit<FormData, "documents"> & {
    documents: Array<Omit<DocumentFile, "file">>;
  };
};

function getStoredDraft(): StoredDraft | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredDraft;
  } catch {
    return null;
  }
}

function serializeDraft(data: FormData, step: number, userId: string | null): StoredDraft {
  return {
    step,
    userId,
    data: {
      ...data,
      documents: data.documents.map((document) => ({
        type: document.type,
        fileName: document.fileName,
        fileSize: document.fileSize,
        mimeType: document.mimeType,
        storageKey: document.storageKey,
        publicUrl: document.publicUrl,
        uploaded: document.uploaded,
        progress: document.progress,
        error: document.error,
        preview: "",
      })),
    },
  };
}

export default function ApplicationForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<StepErrors>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);

  useEffect(() => {
    let isActive = true;

    queueMicrotask(() => {
      if (!isActive) return;

      const stored = getStoredDraft();
      if (stored) {
        setStep(Math.min(stored.step, TOTAL_STEPS - 1));
        setUserId(stored.userId);
        setData({
          ...stored.data,
          documents: stored.data.documents.map((document) => ({
            ...document,
            file: null,
          })),
        });
      }

      setHasRestoredDraft(true);
    });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!hasRestoredDraft) return;

    window.localStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify(serializeDraft(data, step, userId))
    );
  }, [data, step, userId, hasRestoredDraft]);

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

  const handleFileSelect = useCallback(async (type: string, file: File) => {
    if (!userId) {
      setErrors((prev) => ({
        ...prev,
        [type]: "Save your personal information before uploading documents.",
      }));
      return;
    }

    const preview = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : "";

    setData((prev) => {
      const existingIndex = prev.documents.findIndex((d) => d.type === type);
      const doc: DocumentFile = {
        type,
        file,
        preview,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        uploaded: false,
        progress: 0,
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

    try {
      const upload = await createDocumentUploadUrl(userId, type, file);
      await uploadToSignedUrl(upload.signedUrl, file, (progress) => {
        setData((prev) => ({
          ...prev,
          documents: prev.documents.map((document) =>
            document.type === type ? { ...document, progress } : document
          ),
        }));
      });

      const uploadedDocument = {
        type,
        storageKey: upload.storageKey,
        publicUrl: upload.publicUrl,
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
      };

      await saveDocumentMetadata(userId, uploadedDocument);

      setData((prev) => ({
        ...prev,
        documents: prev.documents.map((document) =>
          document.type === type
            ? {
                ...document,
                ...uploadedDocument,
                uploaded: true,
                progress: 100,
                error: undefined,
              }
            : document
        ),
      }));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Document upload failed";

      setData((prev) => ({
        ...prev,
        documents: prev.documents.map((document) =>
          document.type === type
            ? { ...document, uploaded: false, progress: 0, error: message }
            : document
        ),
      }));
      setErrors((prev) => ({ ...prev, [type]: message }));
    }
  }, [userId]);

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
        if (!userId) {
          throw new Error("Application draft was not created.");
        }

        await submitApplication(userId);
        window.localStorage.removeItem(DRAFT_STORAGE_KEY);
        router.push("/apply/success");
      } catch (err) {
        console.error("Submission failed:", err);
        setErrors({
          submit:
            err instanceof Error ? err.message : "Submission failed",
        });
        setIsSubmitting(false);
      }
      return;
    }

    setIsSaving(true);
    try {
      if (step === 0) {
        const savedUserId = await savePersonalInfo(data, userId);
        setUserId(savedUserId);
      }

      if (step === 1) {
        if (!userId) throw new Error("Application draft was not created.");
        await saveEducationInfo(userId, data);
      }

      if (step === 2) {
        if (!userId) throw new Error("Application draft was not created.");
        await saveBackgroundInfo(userId, data);
      }
    } catch (err) {
      console.error("Autosave failed:", err);
      setErrors({
        submit:
          err instanceof Error ? err.message : "Could not save your progress",
      });
      return;
    } finally {
      setIsSaving(false);
    }

    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  }, [step, data, router, userId]);

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
        isSubmitting={isSubmitting || isSaving}
      />
      {errors.submit && (
        <p className="mt-4 text-center text-sm font-medium text-destructive">
          {errors.submit}
        </p>
      )}
    </div>
  );
}
