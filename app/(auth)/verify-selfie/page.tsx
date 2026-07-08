"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VerifySelfiePage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "failed">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTakeSelfie = () => {
    setStatus("scanning");
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  const handleRetake = () => {
    setStatus("idle");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("scanning");
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  const handleContinue = () => {
    router.push("/onboarding-success");
  };

  return (
    <div className="animate-fade-in">
      <div className="rounded-2xl border border-white/30 bg-white/20 p-6 shadow-2xl backdrop-blur-3xl sm:rounded-3xl sm:p-10 dark:border-white/10 dark:bg-black/10">
        {/* Back */}
        <Link
          href="/verify-nin"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-body transition-colors hover:text-text-heading"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to NIN
        </Link>

        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20">
            <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        <h1 className="mb-2 text-center text-2xl font-bold text-text-heading">
          Face Verification
        </h1>
        <p className="mb-8 text-center text-sm text-text-body">
          Position your face clearly within the frame and take a selfie to complete identity verification.
        </p>

        {/* Camera Frame */}
        <div className="mb-6 flex flex-col items-center gap-6">
          <div className="relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border-4 border-dashed border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-black/30 shadow-inner sm:h-64 sm:w-64">
            {status === "success" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-success/20 backdrop-blur-sm">
                <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg">
                  <svg className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-bold text-text-heading dark:text-white">Captured!</span>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                {status === "scanning" && (
                  <>
                    <div className="absolute left-0 top-0 h-1 w-full bg-secondary shadow-[0_0_15px_#0891b2] dark:shadow-[0_0_15px_#06b6d4] animate-scan" />
                    <span className="relative z-10 animate-pulse font-bold text-text-heading drop-shadow-md dark:text-white">
                      Scanning...
                    </span>
                  </>
                )}
                {status === "idle" && (
                  <svg className="h-20 w-20 text-gray-300 dark:text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
                <div className="absolute h-full w-full opacity-20">
                  <div className="absolute left-8 top-8 h-8 w-8 border-l-3 border-t-3 border-gray-400 dark:border-white" />
                  <div className="absolute right-8 top-8 h-8 w-8 border-r-3 border-t-3 border-gray-400 dark:border-white" />
                  <div className="absolute bottom-8 left-8 h-8 w-8 border-b-3 border-l-3 border-gray-400 dark:border-white" />
                  <div className="absolute bottom-8 right-8 h-8 w-8 border-b-3 border-r-3 border-gray-400 dark:border-white" />
                </div>
              </>
            )}
          </div>

          {status === "success" ? (
            <Button type="button" onClick={handleContinue} className="w-full py-4 text-base">
              Continue to Dashboard
            </Button>
          ) : (
            <div className="flex w-full flex-col gap-3">
              <Button
                type="button"
                onClick={handleTakeSelfie}
                isLoading={status === "scanning"}
                className="w-full rounded-full py-4 text-base shadow-lg shadow-primary/20"
              >
                Take Selfie
              </Button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border dark:bg-white/10" />
                <span className="text-xs text-text-muted">or</span>
                <div className="h-px flex-1 bg-border dark:bg-white/10" />
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="user"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 bg-surface-secondary dark:bg-white/5 px-6 py-3 text-sm text-text-body transition-all hover:bg-gray-100 dark:hover:bg-white/15"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload a photo instead
              </button>
            </div>
          )}

          {status === "failed" && (
            <Button type="button" variant="outline" onClick={handleRetake} className="w-full">
              Try Again
            </Button>
          )}
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2">
          {["phone", "nin", "selfie"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  i < 2
                    ? "bg-accent/20 text-accent"
                    : i === 2
                      ? "bg-accent text-white dark:text-gray-900 shadow-lg shadow-accent/30 scale-110"
                      : "bg-surface-secondary text-text-muted dark:bg-white/10 dark:text-white/40"
                }`}
              >
                {i < 2 ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {i < 2 && <div className="h-px w-6 bg-accent/30" />}
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] text-text-muted/60 dark:text-white/30">
          Step 3 of 3: Face verification
        </p>
      </div>
    </div>
  );
}
