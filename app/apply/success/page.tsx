"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Mail, ClipboardCheck, Coins, ArrowLeft } from "lucide-react";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md text-center"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10"
        >
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="h-10 w-10 text-success"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>

        <h1 className="text-3xl font-bold text-text-primary">
          Application Submitted!
        </h1>
        <p className="mt-3 text-text-secondary">
          Your HELB & HEF application has been received successfully. We&apos;ll
          review your documents and send a confirmation to your email.
        </p>

        {/* Timeline */}
        <div className="mt-8 space-y-4 text-left">
          {[
            {
              icon: Mail,
              title: "Confirmation Email",
              desc: "Check your inbox within 24 hours",
            },
            {
              icon: ClipboardCheck,
              title: "Document Review",
              desc: "Your documents will be verified within 3-5 days",
            },
            {
              icon: Coins,
              title: "Funding Decision",
              desc: "You'll be notified once a decision is made",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.15 }}
              className="flex items-start gap-3 rounded-xl border border-border bg-white p-4"
            >
              <item.icon className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {item.title}
                </p>
                <p className="text-xs text-text-muted">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:shadow-xl"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </motion.div>
    </main>
  );
}
