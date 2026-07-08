"use client";

<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignupForm } from "@/components/auth/signup-form";
import { Logo } from "@/components/ui/logo";

// Static definitions moved outside component to prevent re-allocation on render
const SLIDES = [
  "Turning Donations Into Guaranteed Impact.",
  "Track Your Contributions From Wallet to Beneficiary.",
  "Empowering Communities Through Transparent Aid.",
];

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play effect
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
=======
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";

export default function SignupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!formData.fullName.trim()) e.fullName = "Full name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Invalid email";
    if (!formData.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\+?[\d\s-]{7,15}$/.test(formData.phone))
      e.phone = "Invalid phone number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 8)
      e.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    if (!formData.agreeTerms)
      e.agreeTerms = "You must agree to the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) setCurrentStep(2);
    else if (currentStep === 2 && validateStep2()) setCurrentStep(3);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/verify-otp");
    }, 1000);
  };

  const steps = [
    { id: 1, label: "Personal Info" },
    { id: 2, label: "Account Setup" },
    { id: 3, label: "Verification" },
  ];

  return (
<<<<<<< HEAD
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 lg:h-screen lg:flex-row lg:overflow-hidden">
      {/* Global Brand Logo Header */}
      <div className="absolute left-6 top-6 z-50 sm:left-8 lg:left-12 lg:top-5">
        <Logo />
      </div>

      {/* Premium Visual Ambient Glow Effects */}
      <div className="pointer-events-none absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-[10%] -right-[5%] h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[150px]" />

      {/* Left Column - Hero Sliders (Locked & Perfectly Centered on Desktop Viewports) */}
      <section className="relative z-10 flex w-full flex-col justify-center px-6 pt-32 pb-12 sm:px-12 md:px-16 lg:h-full lg:w-1/2 lg:px-20 xl:px-24 lg:py-0 lg:pt-20">
        <div
          className="flex w-full max-w-xl flex-col"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Typography Slider Framework */}
          <div className="w-full overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {SLIDES.map((text, index) => (
                <div key={index} className="w-full shrink-0 pr-6">
                  <h1 className="text-3xl font-black leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl">
                    {text}
                  </h1>
=======
    <div className="flex min-h-screen w-full flex-col bg-surface md:flex-row">
      {/* Fixed Logo */}
<div className="absolute left-6 top-6 z-50 md:left-10 md:top-10">
  <Logo 
    size="md" // This maps to 64x64px based on our previous setup
    imageClassName="brightness-0 dark:invert" 
  />
</div>
      {/* Left Panel */}
      <section className="relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-background px-6 py-16 sm:py-20 md:w-5/12 md:min-h-screen md:px-12 lg:w-1/2 lg:px-16 xl:px-20">
        <div className="pointer-events-none absolute -inset-[50%] opacity-30">
          <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-secondary/30 blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-lg">
          <div className="overflow-hidden">
            <p className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl">
              Join{" "}
              <span className="text-accent">AidLink</span>
            </p>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
              Create your account and start making a difference. Your journey
              toward transparent, impactful giving starts here.
            </p>
          </div>

          <div className="mt-10 space-y-4 md:mt-12 lg:mt-14">
            {[
              "Verified fulfillment partners",
              "Real-time impact tracking",
              "100% transparent donations",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-white/60">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <svg className="h-3 w-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
                </div>
                {item}
              </div>
            ))}
          </div>
<<<<<<< HEAD

          {/* Interactive Navigation Control Systems */}
          <div className="mt-10 flex flex-col items-start gap-8">
            {/* Smooth Indicator Trackers */}
            <div className="flex items-center gap-3">
              {SLIDES.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: index === activeIndex ? "2.5rem" : "0.5rem",
                    backgroundColor:
                      index === activeIndex
                        ? "var(--primary)"
                        : "rgba(var(--primary), 0.2)",
                  }}
                />
              ))}
            </div>

            {/* Slider Action Trigger Button */}
            <Button
              onClick={handleNext}
              className="h-12 w-40 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-primary/10 transition-all hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
              variant="primary"
            >
              {activeIndex === SLIDES.length - 1 ? "Start Over" : "Next Slide"}
            </Button>
          </div>
        </div>
      </section>

      {/* Right Column - Safe Viewport Form Scroller */}
      <section className="relative z-10 flex w-full justify-center px-4 pb-16 sm:px-12 lg:h-full lg:w-1/2 lg:overflow-y-auto lg:px-16 xl:px-20">
        <div className="w-full max-w-md my-auto pt-6 pb-12 lg:py-24 flex flex-col gap-6">
          <SignupForm />

          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an operational account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:text-blue-500 transition-colors dark:text-blue-400"
            >
              Sign In
            </Link>
          </p>
=======
        </div>
      </section>

      {/* Right Panel - Form */}
      <section className="flex w-full items-center justify-center px-4 py-12 md:w-7/12 md:min-h-screen md:px-8 lg:w-1/2 lg:px-12 xl:px-20">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-bold text-text-heading">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-text-body">
              Step {currentStep} of {steps.length} — {steps[currentStep - 1].label}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="relative mb-10 flex items-center justify-between">
            <div className="absolute left-[8px] right-[8px] top-1/2 h-[5px] -translate-y-1/2 rounded-full bg-border overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-in-out"
                style={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>
            {steps.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`h-4 w-4 rounded-full transition-all duration-300 ${
                      isActive || isCompleted
                        ? "bg-gradient-to-r from-primary to-secondary shadow-[0_0_12px_rgba(0,119,182,0.6)] dark:shadow-[0_0_12px_rgba(59,130,246,0.6)] scale-110"
                        : "bg-surface-tertiary border-2 border-border"
                    }`}
                  />
                  <span
                    className={`absolute top-6 w-20 text-center text-[10px] leading-tight transition-all duration-300 sm:w-24 sm:text-xs ${
                      isActive
                        ? "font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                        : isCompleted
                          ? "font-bold text-primary"
                          : "font-medium text-text-body/70"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-5">
            {currentStep === 1 && (
              <>
                <Input
                  label="Full Name"
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  required
                />
                {errors.fullName && (
                  <p className="-mt-3 text-xs text-error">{errors.fullName}</p>
                )}
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                />
                {errors.email && (
                  <p className="-mt-3 text-xs text-error">{errors.email}</p>
                )}
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  required
                />
                {errors.phone && (
                  <p className="-mt-3 text-xs text-error">{errors.phone}</p>
                )}
              </>
            )}

            {currentStep === 2 && (
              <>
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  required
                />
                {errors.password && (
                  <p className="-mt-3 text-xs text-error">{errors.password}</p>
                )}
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    updateField("confirmPassword", e.target.value)
                  }
                  required
                />
                {errors.confirmPassword && (
                  <p className="-mt-3 text-xs text-error">
                    {errors.confirmPassword}
                  </p>
                )}
                <div className="flex items-start">
                  <label className="flex cursor-pointer items-start gap-2 text-sm text-text-body">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) =>
                        updateField("agreeTerms", e.target.checked)
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-border bg-surface accent-primary focus:ring-primary"
                    />
                    <span>
                      By signing up, you agree to our{" "}
                      <Link
                        href="/terms"
                        className="font-bold text-primary transition-colors hover:text-secondary"
                      >
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="font-bold text-primary transition-colors hover:text-secondary"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="text-xs text-error">{errors.agreeTerms}</p>
                )}
              </>
            )}

            {currentStep === 3 && (
              <div className="flex flex-col gap-4">
                <p className="text-center text-sm text-text-body">
                  Choose your preferred verification method
                </p>
                <button
                  type="button"
                  onClick={() => router.push("/verify-otp")}
                  className="flex w-full items-center gap-4 rounded-xl border border-border bg-surface-secondary px-5 py-4 transition-all hover:bg-surface-tertiary"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="font-medium text-text-heading">OTP via SMS</p>
                    <p className="text-xs text-text-muted">
                      Receive a one-time code on your phone
                    </p>
                  </div>
                  <svg className="h-5 w-5 shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/verify-nin")}
                  className="flex w-full items-center gap-4 rounded-xl border border-border bg-surface-secondary px-5 py-4 transition-all hover:bg-surface-tertiary"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/20">
                    <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="font-medium text-text-heading">NIN Verification</p>
                    <p className="text-xs text-text-muted">
                      Verify with your National ID Number
                    </p>
                  </div>
                  <svg className="h-5 w-5 shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            <div className="mt-4 flex gap-3">
              {currentStep > 1 && currentStep < 3 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              {currentStep < 3 && (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1"
                >
                  Next
                </Button>
              )}
              {currentStep === 3 && (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  className="w-full"
                >
                  Continue to Verification
                </Button>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-text-body">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-secondary transition-colors hover:text-secondary"
              >
                Sign in
              </Link>
            </p>
          </div>
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
        </div>
      </section>
    </div>
  );
}
