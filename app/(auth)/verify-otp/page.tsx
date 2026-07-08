"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return;
    const next = [...otp];
    next[i] = val.substring(val.length - 1);
    setOtp(next);
    setError("");
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace" && !otp[i] && i > 0)
      inputRefs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text/plain").slice(0, 6).split("");
    if (data.some((c) => isNaN(Number(c)))) return;
    const next = [...otp];
    data.forEach((c, i) => (next[i] = c));
    setOtp(next);
    inputRefs.current[Math.min(data.length, 5)]?.focus();
  };

  const handleResend = () => {
    if (timeLeft > 0) return;
    setTimeLeft(30);
    setOtp(Array(6).fill(""));
    setError("");
    inputRefs.current[0]?.focus();
  };

  const handleVerify = () => {
    if (!isComplete) return;
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      setIsLoading(false);
      router.push("/verify-nin");
    }, 1500);
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <div className="animate-fade-in">
      <div className="rounded-2xl border border-white/30 bg-white/20 p-6 shadow-2xl backdrop-blur-3xl sm:rounded-3xl sm:p-10 dark:border-white/10 dark:bg-black/10">
        {/* Back */}
        <Link
          href="/signup"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-body transition-colors hover:text-text-heading"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to signup
        </Link>

        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/20">
            <svg className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-2 text-center text-2xl font-bold text-text-heading">
          Check your phone
        </h1>
        <p className="mb-8 text-center text-sm text-text-body">
          We&apos;ve sent a 6-digit code to your registered phone number.
          Enter it below to continue.
        </p>

        {/* OTP Inputs */}
        <div className="mb-6 flex justify-between gap-1 sm:gap-2 md:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
               className={`h-12 w-full min-w-0 rounded-xl border bg-surface-secondary dark:bg-white/5 text-center text-lg font-bold text-text-heading outline-none transition-all focus:ring-2 sm:h-14 sm:text-xl ${
                 error
                   ? "border-error/50 ring-error/30"
                   : digit
                     ? "border-secondary ring-secondary/30"
                      : "border-white/10 focus:border-secondary focus:ring-secondary/30 dark:border-white/20"
               }`}
            />
          ))}
        </div>

        {error && (
          <p className="mb-4 text-center text-sm text-error">{error}</p>
        )}

        {/* Timer + Resend */}
        <div className="mb-6 flex flex-col items-center gap-2 text-sm">
          <span className="font-medium text-text-muted">
            Code expires in{" "}
            <span className={`font-bold ${timeLeft <= 10 ? "text-error" : "text-secondary"}`}>
              {formatTime(timeLeft)}
            </span>
          </span>
          <button
            type="button"
            onClick={handleResend}
            disabled={timeLeft > 0}
            className={`text-sm font-bold transition-colors ${
              timeLeft > 0
                ? "cursor-not-allowed text-text-muted/50"
                : "text-secondary hover:text-secondary-light hover:underline"
            }`}
          >
            Resend Code
          </button>
        </div>

        <Button
          type="button"
          onClick={handleVerify}
          disabled={!isComplete}
          isLoading={isLoading}
          className="w-full py-4 text-base"
        >
          Verify Phone
        </Button>

        {/* Steps indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {["phone", "nin", "selfie"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  i === 0
                    ? "bg-secondary text-white dark:text-gray-900 shadow-lg shadow-secondary/30 scale-110"
                    : "bg-surface-secondary text-text-muted dark:bg-white/10 dark:text-white/40"
                }`}
              >
                {i + 1}
              </div>
              {i < 2 && <div className="h-px w-6 bg-border dark:bg-white/10" />}
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] text-text-muted/60 dark:text-white/30">
          Step 1 of 3: Phone verification
        </p>
      </div>
    </div>
  );
}
