"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";

interface NavigationProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
}

export default function Navigation({
  step,
  totalSteps,
  onBack,
  onNext,
  isSubmitting = false,
}: NavigationProps) {
  const isLast = step === totalSteps - 1;

  return (
    <div className="mt-10 flex items-center justify-between">
      {step > 0 ? (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="group px-6 py-6"
        >
          <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back
        </Button>
      ) : (
        <div />
      )}

      <Button
        type="button"
        onClick={onNext}
        disabled={isSubmitting}
        className="group px-8 py-6 shadow-lg transition-all hover:shadow-xl hover:shadow-primary/30"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting…
          </>
        ) : isLast ? (
          <>
            Submit Application
            <Check className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            Continue
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </Button>
    </div>
  );
}
