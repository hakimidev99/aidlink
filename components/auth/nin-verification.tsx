"use client";

<<<<<<< HEAD
import React from "react";
import Input from "@/components/ui/input";
=======
import React, { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)

interface NinVerificationProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

<<<<<<< HEAD
export function NinVerification({
  value,
  onChange,
  error,
}: NinVerificationProps) {
  // Helper to format raw numbers into readable chunks: XXXXXXX XXX X
  const formatNIN = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (digits.length <= 7) return digits;
    if (digits.length <= 10) return `${digits.slice(0, 7)} ${digits.slice(7)}`;
    return `${digits.slice(0, 7)} ${digits.slice(7, 10)} ${digits.slice(10, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip everything that isn't a digit for the raw state value
    const rawVal = e.target.value.replace(/\D/g, "");

    if (rawVal.length <= 11) {
      onChange(rawVal);
    }
=======
export function NinVerification({ value, onChange }: NinVerificationProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const formattedValue = rawValue.slice(0, 11);
    onChange(formattedValue);
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
  };

  const displayValue = value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1-$2-$3-$4");

  return (
<<<<<<< HEAD
    <div className="flex w-full flex-col gap-5 animate-in fade-in zoom-in-95 duration-300">
      {/* Context Text */}
      <div className="text-center">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-300">
          To ensure transparency and prevent fraud, we need to securely verify
          your identity using your 11-digit National Identity Number.
        </p>
      </div>

      {/* NIN Input Field with Custom UI component and Layout Extras */}
      <div className="relative">
        <Input
          label="National Identity Number (NIN)"
          type="text"
          inputMode="numeric"
          name="nin"
          pattern="[0-9\s]*" // Safe string validation matching formatting spaces
          value={formatNIN(value)}
          onChange={handleChange}
          placeholder="0000000 000 0"
          required
          className={`font-mono tracking-widest placeholder:tracking-normal placeholder:font-sans ${
            error ? "border-red-500 focus:ring-red-500/20" : ""
          }`}
        />

        {/* Absolute Character Counter Badge */}
        <span
          className={`absolute right-4 top-[42px] font-mono text-xs font-bold transition-colors ${
            value.length === 11
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-slate-400 dark:text-slate-500"
          }`}
        >
          {value.length}/11
        </span>
      </div>

      {/* Helper Tip Box + USSD Retrieval Code */}
      <div className="rounded-xl border border-primary/20 bg-primary/10 p-4 text-xs leading-normal text-slate-700 shadow-inner backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
        <strong className="text-primary dark:text-white">💡 Quick Tip:</strong>
        <p className="mt-1">
          Can't remember your NIN? Dial{" "}
          <span className="font-bold text-primary dark:text-white">*346#</span>{" "}
          on the phone number associated with your registration to retrieve it
          instantly.
        </p>
      </div>

      {/* Security Infrastructure Subtext */}
      <p className="text-[11px] leading-relaxed text-center text-slate-400 dark:text-slate-500">
        Identity validation queries are securely executed via encrypted
        endpoints through the secure **Smile ID portal** directly matching
        government registries.
      </p>
=======
    <div className="flex w-full flex-col gap-6">
      <div className="text-center">
        <p className="text-sm text-text-body">
          To ensure transparency and prevent fraud, we need to verify your
          identity using your 11-digit National Identification Number (NIN).
        </p>
      </div>

      <Input
        ref={inputRef}
        label="National Identity Number (NIN)"
        type="text"
        inputMode="numeric"
        name="nin"
        value={displayValue}
        onChange={handleChange}
        placeholder="123-456-789-01"
        required
      />

      <button
        type="button"
        className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-secondary-light transition-colors"
      >
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
          on the phone number associated with your registration to retrieve it.
        </p>
      </div>
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
    </div>
  );
}
