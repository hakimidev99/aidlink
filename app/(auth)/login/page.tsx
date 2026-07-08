"use client";

import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/ui/logo";

const SLIDES: string[] = [
  "Turning Donations Into Guaranteed Impact.",
  "Track Your Contributions From Wallet to Beneficiary.",
  "Empowering Communities Through Transparent Aid.",
];

const AUTOPLAY_INTERVAL_MS = 4000;

export default function Page() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Clean Auto-play handler
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
    }, AUTOPLAY_INTERVAL_MS);

=======
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const slides = [
    "Turning Donations Into Guaranteed Impact.",
    "Track Your Contributions From Wallet to Beneficiary.",
    "Empowering Communities Through Transparent Aid.",
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
    return () => clearInterval(timer);
  }, [isPaused]);

<<<<<<< HEAD
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
  };

  return (
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
=======
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full bg-surface dark:bg-background">
     {/* Fixed Logo */}
<div className="absolute left-6 top-6 z-50 md:left-10 md:top-10">
  <Logo 
    size="md" // This maps to 64x64px based on our previous setup
    imageClassName="brightness-0 dark:invert" 
  />
</div>

      {/* Left Panel - Carousel (Hidden on Mobile for better UX) */}
      <section className="relative hidden w-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-background px-12 md:flex md:w-1/2 lg:w-5/12 xl:px-20">
        {/* Abstract Background Elements */}
        <div className="pointer-events-none absolute -inset-[50%] opacity-30">
          <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-secondary/30 blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px]" />
        </div>

        <div
          className="relative z-10 w-full max-w-lg"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
<<<<<<< HEAD
              {SLIDES.map((text, index) => (
                <div key={index} className="w-full shrink-0 pr-6 select-none">
                  <h1 className="text-3xl font-black leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl">
=======
              {slides.map((text, index) => (
                <div key={index} className="w-full shrink-0 pr-4">
                  <p className="text-3xl font-extrabold leading-[1.2] tracking-tight text-white lg:text-4xl xl:text-5xl">
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
                    {text}
                  </h1>
                </div>
              ))}
            </div>
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
                  className={`h-2 rounded-full transition-all duration-500 outline-none ${
                    index === activeIndex
                      ? "w-10 bg-primary shadow-sm shadow-primary/30"
                      : "w-2 bg-primary/20 hover:bg-primary/40"
=======
          {/* Carousel Controls */}
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    index === activeIndex
                      ? "w-10 bg-accent shadow-md shadow-accent/30"
                      : "w-2.5 bg-white/30 hover:bg-white/50"
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
                  }`}
                />
              ))}
            </div>
<<<<<<< HEAD

            {/* Slider Action Trigger Button */}
            <Button
              onClick={handleNext}
              className="h-12 w-40 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-primary/10 transition-all hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
              variant="primary"
=======
            <Button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev + 1) % slides.length)}
              className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-bold text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/20"
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
            >
              {activeIndex === SLIDES.length - 1 ? "Start Over" : "Next Slide"}
            </Button>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Right Column - Safe Viewport Form Scroller */}
      <section className="relative z-10 flex w-full justify-center px-4 pb-16 sm:px-12 lg:h-full lg:w-1/2 lg:overflow-y-auto lg:px-16 xl:px-20">
        {/* my-auto self-centers whenever form is short; lg:py-24 ensures comfortable vertical padding margins during overflow */}
        <div className="w-full max-w-md my-auto pt-6 pb-12 lg:py-24">
          <LoginForm />
=======
      {/* Right Panel - Form (Full width on mobile) */}
      <section className="flex w-full items-center justify-center px-6 py-16 sm:py-24 md:w-1/2 lg:w-7/12">
        <div className="w-full max-w-sm lg:max-w-md">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-text-heading">Welcome Back</h1>
            <p className="mt-2 text-sm text-text-body">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div 
                aria-live="polite"
                className="rounded-lg border border-error/20 bg-error/10 px-4 py-3 text-sm text-error"
              >
                {error}
              </div>
            )}
            
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="•••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-text-body">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  disabled={isLoading}
                  className="h-4 w-4 rounded border-border accent-primary focus:ring-2 focus:ring-primary focus:ring-offset-1"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-secondary transition-colors hover:text-primary focus:outline-none focus:underline"
              >
                Forgot password?
              </Link>
            </div>
            
            <Button 
              type="submit" 
              className="mt-2 w-full" 
              disabled={isLoading} 
              // Assuming your Button component accepts an isLoading prop to show a spinner
              isLoading={isLoading} 
            >
              Sign In
            </Button>
          </form>

          <div className="my-8 flex items-center gap-4 text-sm text-text-muted">
            <div className="h-px flex-1 bg-border" />
            <span>or continue with</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface-secondary px-4 py-3 text-sm font-medium text-text-heading transition-all hover:bg-surface-tertiary focus:outline-none focus:ring-2 focus:ring-border disabled:opacity-50"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button
              type="button"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface-secondary px-4 py-3 text-sm font-medium text-text-heading transition-all hover:bg-surface-tertiary focus:outline-none focus:ring-2 focus:ring-border disabled:opacity-50"
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-text-body">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-bold text-secondary transition-colors hover:text-primary focus:outline-none focus:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
        </div>
      </section>
    </div>
  );
}
