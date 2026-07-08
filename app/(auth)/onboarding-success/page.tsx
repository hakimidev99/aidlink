"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function OnboardingSuccessPage() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="rounded-2xl border border-white/30 bg-white/20 p-6 shadow-2xl backdrop-blur-3xl text-center sm:rounded-3xl sm:p-10 dark:border-white/10 dark:bg-black/10">
        {/* Success checkmark */}
        <div className="mb-6 flex justify-center">
          <div
            className={`flex h-24 w-24 items-center justify-center rounded-full bg-success/20 transition-all duration-700 ${
              showContent ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            <svg className="h-12 w-12 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div
          className={`transition-all duration-700 delay-200 ${
            showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h1 className="mb-2 text-3xl font-bold text-text-heading">
            Verification Complete!
          </h1>
          <p className="mb-8 text-text-body">
            Your account is now fully verified. You can start donating and making a difference.
          </p>
        </div>

        {/* Account Summary */}
        <div
          className={`mb-8 rounded-xl border border-gray-200 dark:border-white/10 bg-surface-secondary dark:bg-white/[0.03] p-5 text-left backdrop-blur-md transition-all duration-700 delay-400 sm:rounded-2xl sm:p-6 ${
            showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-text-muted">
            Account Summary
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Name</span>
              <span className="text-sm font-medium text-text-heading">John Doe</span>
            </div>
            <div className="h-px bg-border dark:bg-white/5" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Email</span>
              <span className="text-sm font-medium text-text-heading">john.doe@example.com</span>
            </div>
            <div className="h-px bg-border dark:bg-white/5" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Verification Level</span>
              <span className="rounded-full bg-success/20 px-3 py-0.5 text-xs font-bold text-success">
                Level 3 - Fully Verified
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          className={`flex flex-col gap-3 transition-all duration-700 delay-600 ${
            showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <Button
            type="button"
            onClick={() => router.push("/beneficiary")}
            className="w-full py-4 text-base"
          >
            Go to Dashboard
          </Button>
          <Link
            href="/donor/campaigns"
            className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-surface-secondary dark:bg-white/5 px-6 py-3.5 text-center text-sm font-medium text-text-body transition-all hover:bg-gray-100 dark:hover:bg-white/10"
          >
            Browse Campaigns
          </Link>
        </div>

        {/* All steps complete */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {["phone", "nin", "selfie"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/20 text-success text-xs font-bold">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {i < 2 && <div className="h-px w-6 bg-success/30" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
