"use client";

import React, { useState, useRef, useEffect } from "react";

interface OtpVerificationProps {
  email: string;
  onChange: (otp: string) => void;
}

export function OtpVerification({ email, onChange }: OtpVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
<<<<<<< HEAD
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
=======
  const [timeLeft, setTimeLeft] = useState(60);
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
<<<<<<< HEAD

    // Only permit numeric values
    if (value && isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Snag only the last character if a user types over an existing digit
    const targetValue = value.substring(value.length - 1);
    newOtp[index] = targetValue;

    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Move focus forward dynamically
    if (targetValue && index < 5) {
=======
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    onChange(newOtp.join(""));
    if (value && index < 5) {
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
      inputRefs.current[index + 1]?.focus();
    }
  };

<<<<<<< HEAD
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If empty, wipe previous field and move back
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        onChange(newOtp.join(""));
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index]) {
        // If field has content, wipe it out immediately
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChange(newOtp.join(""));
      }
=======
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
<<<<<<< HEAD
    const pasteData = e.clipboardData
      .getData("text/plain")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    if (pasteData.length === 0) return;

=======
    const pasteData = e.clipboardData.getData("text/plain").slice(0, 6).split("");
    if (pasteData.some((char) => isNaN(Number(char)))) return;
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
    const newOtp = [...otp];
    pasteData.forEach((char, i) => {
      newOtp[i] = char;
    });
<<<<<<< HEAD

    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Determine target focus index based on paste length safely
=======
    setOtp(newOtp);
    onChange(newOtp.join(""));
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
    const focusIndex = pasteData.length < 6 ? pasteData.length : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = () => {
    if (timeLeft > 0) return;
<<<<<<< HEAD
    console.log("Resending OTP...");
    setOtp(Array(6).fill(""));
    onChange("");
    setTimeLeft(60);
=======
    setTimeLeft(60);
    setOtp(Array(6).fill(""));
    onChange("");
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
    inputRefs.current[0]?.focus();
  };

  return (
<<<<<<< HEAD
    <div className="flex w-full flex-col items-center animate-in fade-in zoom-in-95 duration-300">
      <p className="mb-8 text-center text-sm text-slate-600 dark:text-gray-300">
        We've sent a verification code to
        <br />
        <span className="font-bold text-slate-900 dark:text-white">
          {email}
        </span>
=======
    <div className="flex w-full flex-col items-center">
      <p className="mb-8 text-center text-sm text-white/60">
        We&apos;ve sent a verification code to
        <br />
        <span className="font-bold text-white">{email}</span>
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
      </p>

      <div className="mb-6 flex w-full max-w-sm justify-between gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
<<<<<<< HEAD
            className="h-12 w-12 rounded-xl border border-slate-200 bg-white/50 text-center text-lg font-black text-slate-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-primary dark:focus:bg-slate-900 sm:h-14 sm:w-14 sm:text-xl"
=======
            className={`h-14 w-full rounded-xl border bg-surface-secondary dark:bg-white/5 text-center text-xl font-bold text-text-heading outline-none transition-all focus:ring-2 ${
              digit ? "border-secondary ring-secondary/30" : "border-white/10 focus:border-secondary focus:ring-secondary/30"
            }`}
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
          />
        ))}
      </div>

<<<<<<< HEAD
      <div className="mb-4 flex flex-col items-center gap-2 text-xs sm:text-sm">
        <span className="font-medium text-slate-500 dark:text-gray-400">
          Time remaining:{" "}
          <span className="font-mono font-bold text-primary">
            {formatTime(timeLeft)}
          </span>
        </span>

=======
      <div className="mb-4 flex flex-col items-center gap-2 text-sm">
        <span className="font-medium text-text-muted">
          Time remaining:{" "}
          <span className={`font-bold ${timeLeft <= 10 ? "text-error" : "text-secondary"}`}>
            {formatTime(timeLeft)}
          </span>
        </span>
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
        <button
          type="button"
          onClick={handleResend}
          disabled={timeLeft > 0}
<<<<<<< HEAD
          className={`mt-1 rounded-full px-4 py-1.5 text-xs font-bold tracking-tight transition-all duration-200 ${
            timeLeft > 0
              ? "cursor-not-allowed text-slate-400 bg-slate-100/50 dark:text-gray-600 dark:bg-white/5"
              : "cursor-pointer text-primary bg-primary/5 hover:bg-primary/10 hover:text-secondary active:scale-[0.96]"
=======
          className={`font-bold transition-colors ${
            timeLeft > 0
              ? "cursor-not-allowed text-text-muted/50"
              : "text-secondary hover:text-secondary-light hover:underline"
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
          }`}
        >
          Didn&apos;t receive code? Resend
        </button>
      </div>
    </div>
  );
}
