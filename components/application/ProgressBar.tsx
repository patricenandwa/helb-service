"use client";

import { motion } from "motion/react";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, CheckCircle2, Clock } from "lucide-react";

interface ProgressBarProps {
  current: number;
  total: number;
}

const STEP_LABELS = [
  "Personal Info",
  "Education",
  "Background",
  "Documents",
  "Review",
];

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round(((current + 1) / total) * 100);

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-text-primary">
            HELB & HEF Application
          </h1>
        </div>
        <div className="hidden items-center gap-4 text-xs font-medium text-text-muted sm:flex">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            Secure
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            Autosaved
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-primary" />
            ~8 minutes
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative">
        <Progress value={percentage} className="h-2" />

        {/* Step Indicators */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-medium text-text-secondary">
            Step {current + 1} of {total}
          </p>
          <p className="text-sm font-semibold text-primary">{percentage}%</p>
        </div>

        {/* Step Labels */}
        <div className="mt-2 hidden gap-1 sm:flex">
          {STEP_LABELS.map((label, i) => (
            <button
              key={label}
              disabled={i > current}
              className={`flex-1 rounded-md py-1.5 text-center text-xs font-medium transition-all ${i === current
                  ? "bg-primary-light text-primary"
                  : i < current
                    ? "cursor-pointer text-success hover:bg-success-light"
                    : "cursor-not-allowed text-text-muted"
                }`}
            >
              {i < current && (
                <CheckCircle2 className="mr-0.5 inline h-3 w-3" />
              )}
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
