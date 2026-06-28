"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  formatFileSize,
  isValidFileType,
  getFileTypeLabel,
  getFileTypeIcon,
} from "@/lib/upload";

interface UploadFieldProps {
  documentType: string;
  file: File | null;
  preview: string;
  progress: number;
  uploaded: boolean;
  error?: string;
  onFileSelect: (type: string, file: File) => void;
  onRemove: (type: string) => void;
}

export default function UploadField({
  documentType,
  file,
  preview,
  progress,
  uploaded,
  error,
  onFileSelect,
  onRemove,
}: UploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const label = getFileTypeLabel(documentType);
  const Icon = getFileTypeIcon(documentType);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const selected = files[0];
      if (!isValidFileType(selected)) {
        alert("Please upload a JPG, PNG, WebP, or PDF file.");
        return;
      }
      onFileSelect(documentType, selected);
    },
    [documentType, onFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  // File is uploaded and ready
  if (file && uploaded) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="group relative overflow-hidden rounded-xl border-2 border-success/30 bg-success-light/50 p-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
            <svg className="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-text-primary">
              {file.name}
            </p>
            <p className="text-xs text-text-muted">{formatFileSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(documentType)}
            className="rounded-lg p-1.5 text-text-muted opacity-0 transition-all hover:bg-white hover:text-error group-hover:opacity-100"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Image preview */}
        {preview && (
          <div className="mt-3 overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt={label}
              className="h-20 w-full object-cover"
            />
          </div>
        )}
      </motion.div>
    );
  }

  // Upload in progress
  if (file && !uploaded) {
    return (
      <div className="overflow-hidden rounded-xl border-2 border-primary/30 bg-primary-light/30 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <svg className="h-5 w-5 animate-spin text-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-text-primary">
              Uploading {file.name}…
            </p>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <span className="text-xs font-semibold text-primary">{progress}%</span>
        </div>
      </div>
    );
  }

  // Empty state — drag & drop card
  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`group relative cursor-pointer overflow-hidden rounded-xl border-2 border-dashed p-6 text-center transition-all ${
          isDragging
            ? "border-primary bg-primary-light/50 shadow-lg shadow-primary/10"
            : error
              ? "border-error/40 bg-error-light/30 hover:border-error/60"
              : "border-border bg-gray-50/50 hover:border-primary/40 hover:bg-primary-light/20 hover:shadow-md"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-2">
          <span className="transition-transform group-hover:scale-110">
            <Icon className="h-8 w-8 text-primary" />
          </span>
          <p className="text-sm font-semibold text-text-primary">{label}</p>
          <p className="text-xs text-text-muted">PNG, JPG, PDF</p>
          <div className="mt-1 flex items-center gap-1 text-xs font-medium text-primary">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Click or drag file here
          </div>
        </div>
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-error">{error}</p>
      )}
    </div>
  );
}
