"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VerifyNinPage() {
  const router = useRouter();
  const [nin, setNin] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "verified" | "failed">("idle");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formatNIN = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const parts: string[] = [];
    for (let i = 0; i < digits.length; i += 3) {
      parts.push(digits.slice(i, i + 3));
    }
    return parts.join("-");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNIN(e.target.value);
    setNin(formatted);
  };

  const handleVerify = () => {
    const raw = nin.replace(/\D/g, "");
    if (raw.length !== 11) return;
    setIsLoading(true);
    setStatus("pending");
    setTimeout(() => {
      setIsLoading(false);
      setStatus("verified");
    }, 2000);
  };

  const handleContinue = () => {
    router.push("/verify-selfie");
  };

  const rawNIN = nin.replace(/\D/g, "");
  const isComplete = rawNIN.length === 11;

  return (
    <div className="animate-fade-in">
      <div className="rounded-2xl border border-white/30 bg-white/20 p-6 shadow-2xl backdrop-blur-3xl sm:rounded-3xl sm:p-10 dark:border-white/10 dark:bg-black/10">
        {/* Back */}
        <Link
          href="/verify-otp"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-body transition-colors hover:text-text-heading"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to OTP
        </Link>

        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
            <svg className="h-8 w-8 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
          </div>
        </div>

        <h1 className="mb-2 text-center text-2xl font-bold text-text-heading">
          NIN Verification
        </h1>
        <p className="mb-8 text-center text-sm text-text-body">
          Enter your 11-digit National Identification Number to verify your identity.
        </p>

        {status === "verified" ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/20">
              <svg className="h-10 w-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-bold text-text-heading">NIN Verified Successfully</p>
            <p className="text-sm text-text-body">Your identity has been confirmed.</p>
            <Button type="button" onClick={handleContinue} className="mt-2 w-full py-4 text-base">
              Continue to Face Verification
            </Button>
          </div>
        ) : status === "failed" ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-error/20">
              <svg className="h-10 w-10 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-lg font-bold text-text-heading">Verification Failed</p>
            <p className="text-sm text-text-body">Please check your NIN and try again.</p>
            <Button type="button" variant="outline" onClick={() => setStatus("idle")} className="mt-2 w-full py-4">
              Try Again
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <Input
              ref={inputRef}
              label="National Identity Number (NIN)"
              type="text"
              inputMode="numeric"
              name="nin"
              value={nin}
              onChange={handleChange}
              placeholder="123-456-789-01"
              required
            />

            <button type="button" className="flex items-center gap-2 text-sm text-secondary hover:text-secondary-light transition-colors">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Use my phone NIN
            </button>

            <div className="rounded-xl border border-primary/20 bg-primary/10 p-4 text-sm text-text-body shadow-inner backdrop-blur-md">
              <strong className="text-primary-light">Don&apos;t know your NIN?</strong>
              <p className="mt-1">
                Dial{" "}
                <span className="font-bold text-primary-light">*346#</span>{" "}
                on the phone number registered with your NIN to retrieve it.
              </p>
            </div>

            <Button
              type="button"
              onClick={handleVerify}
              disabled={!isComplete}
              isLoading={isLoading}
              className="w-full py-4 text-base"
            >
              Verify NIN
            </Button>
          </div>
        )}

        {/* Steps indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {["phone", "nin", "selfie"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  i === 0
                    ? "bg-surface-secondary text-text-muted dark:bg-white/10 dark:text-white/40"
                    : i === 1
                      ? "bg-primary text-white dark:text-gray-900 shadow-lg shadow-primary/30 scale-110"
                      : "bg-surface-secondary text-text-muted dark:bg-white/10 dark:text-white/40"
                }`}
              >
                {i === 0 ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {i < 2 && <div className={`h-px w-6 ${i === 0 ? "bg-primary/40" : "bg-border dark:bg-white/10"}`} />}
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] text-text-muted/60 dark:text-white/30">
          Step 2 of 3: NIN verification
        </p>
      </div>
    </div>
  );
}
