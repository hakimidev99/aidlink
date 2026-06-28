"use client";

import React, { useState, useRef, useEffect } from 'react';

interface OtpVerificationProps {
  email: string;
  onChange: (otp: string) => void;
}

export function OtpVerification({ email, onChange }: OtpVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    onChange(newOtp.join('')); // Send the value back to the SignupForm

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 6).split('');
    
    if (pasteData.some((char) => isNaN(Number(char)))) return;

    const newOtp = [...otp];
    pasteData.forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    onChange(newOtp.join('')); // Send the value back to the SignupForm

    const focusIndex = pasteData.length < 6 ? pasteData.length : 5;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleResend = () => {
    if (timeLeft > 0) return;
    console.log("Resending OTP...");
    setTimeLeft(60);
  };

  return (
    <div className="flex w-full flex-col items-center animate-in fade-in zoom-in-95 duration-300">
      <p className="mb-8 text-center text-text-body dark:text-gray-300">
        We've sent a verification code to<br />
        <span className="font-bold text-text-heading dark:text-white">{email}</span>
      </p>

      <div className="mb-6 flex w-full max-w-sm justify-between gap-2 sm:gap-3">
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
            className="h-12 w-12 rounded-xl border bg-white/40  backdrop-blur-md px-5 py-4 text-white outline-none transition-all focus:bg-white/40 focus:ring-2 focus:ring-white/50 sm:h-14 sm:w-14"
          />
        ))}
      </div>

      <div className="mb-4 flex flex-col items-center gap-2 text-sm">
        <span className="font-medium text-text-body dark:text-gray-400">
          Time remaining: <span className="font-bold text-primary">{formatTime(timeLeft)}</span>
        </span>
        
        <button
          type="button"
          onClick={handleResend}
          disabled={timeLeft > 0}
          className={`font-bold transition-colors ${
            timeLeft > 0 
              ? 'cursor-not-allowed text-gray-400 dark:text-gray-600' 
              : 'text-primary hover:text-secondary hover:underline'
          }`}
        >
          Didn't receive code? Resend
        </button>
      </div>
    </div>
  );
}