"use client";

import { motion, AnimatePresence } from "motion/react";
import { type ReactNode } from "react";

interface StepWrapperProps {
  children: ReactNode;
  stepKey: number;
}

export default function StepWrapper({ children, stepKey }: StepWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
