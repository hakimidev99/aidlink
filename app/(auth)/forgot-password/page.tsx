"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      <div className="rounded-3xl border border-border/50 bg-surface/10 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="mb-2 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <svg
                className="h-8 w-8 text-primary-light"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
          </div>

          {isSent ? (
            <>
              <h1 className="mb-2 text-center text-2xl font-bold text-text-heading">
                Check your email
              </h1>
              <p className="mb-8 text-center text-sm text-text-body">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-bold text-secondary">{email}</span>.
                Please check your inbox and follow the instructions to reset
                your password.
              </p>
              <div className="rounded-xl border border-secondary/20 bg-secondary/10 p-4 text-sm text-text-body backdrop-blur-md">
                <strong className="text-secondary">
                  Didn&apos;t receive the email?
                </strong>
                <ul className="mt-2 list-inside list-disc space-y-1 text-text-muted">
                  <li>Check your spam or junk folder</li>
                  <li>Make sure you entered the correct email address</li>
                  <li>
                    Try again or{" "}
                    <button
                      type="button"
                      onClick={() => setIsSent(false)}
                      className="font-bold text-secondary-light hover:underline"
                    >
                      resend the email
                    </button>
                  </li>
                </ul>
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/login"
                  className="text-sm font-medium text-secondary transition-colors hover:text-secondary-light"
                >
                  &larr; Back to Login
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="mb-2 text-center text-2xl font-bold text-text-heading">
                Reset Password
              </h1>
              <p className="mb-8 text-center text-sm text-text-body">
                Enter the email address associated with your account and
                we&apos;ll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {error && (
                  <div className="rounded-lg bg-error/10 border border-error/20 px-4 py-3 text-sm text-error">
                    {error}
                  </div>
                )}
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  required
                />
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full py-6 text-lg"
                >
                  Send Reset Link
                </Button>
              </form>

              <div className="mt-8 text-center">
                <Link
                  href="/login"
                  className="text-sm font-medium text-secondary transition-colors hover:text-secondary-light"
                >
                  &larr; Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
    </div>
  );
}
