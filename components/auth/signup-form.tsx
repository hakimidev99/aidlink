"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NinVerification } from "./nin-verification";
import { OtpVerification } from "./otp-verification";
import { FaceVerification } from "./face-verification";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://aidlink-jhur.onrender.com";

type RoleType = "BENEFICIARY" | "DONOR" | "PARTNER";

export function SignupForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [apiError, setApiError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "BENEFICIARY" as RoleType,
    // Partner-specific fields required by backend
    partnerName: "",
    category: "MOTORCYCLE", // default value matching expected tier formats
    bankAccount: "",
    bankAccountName: "",
    bankCode: "",
    otp: "",
    nin: "",
    selfie: null as File | null,
  });

  const [isFaceVerified, setIsFaceVerified] = useState(false);

  const getStepsArray = () => {
    if (formData.role === "BENEFICIARY") {
      return [
        { id: 1, label: "Profile" },
        { id: 2, label: "OTP" },
        { id: 3, label: "NIN" },
        { id: 4, label: "Biometric" },
      ];
    }
    return [
      { id: 1, label: "Profile" },
      { id: 2, label: "OTP" },
    ];
  };

  const steps = getStepsArray();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (apiError) setApiError(null);
  };

  const selectRole = (role: RoleType) => {
    setFormData((prev) => ({ ...prev, role }));
    if (apiError) setApiError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setApiError(null);

    try {
      // --- STEP 1: DYNAMIC REGISTRATION PAYLOAD ---
      if (currentStep === 1) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match.");
        }

        // Build base registration payload
        const registrationPayload: Record<string, any> = {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        };

        // Dynamically inject the commercial properties required if registering a logistics account
        if (formData.role === "PARTNER") {
          registrationPayload.partnerName = formData.partnerName;
          registrationPayload.category = formData.category;
          registrationPayload.bankAccount = formData.bankAccount;
          registrationPayload.bankAccountName = formData.bankAccountName;
          registrationPayload.bankCode = formData.bankCode;
        }

        await axios.post(`${API_BASE_URL}/auth/register`, registrationPayload);

        const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
          email: formData.email,
          password: formData.password,
        });

        setToken(loginResponse.data.token);
        setCurrentStep(2);
      }

      // --- STEP 2: OTP NETWORK VERIFICATION ---
      else if (currentStep === 2) {
        await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
          email: formData.email,
          code: formData.otp,
        });

        if (formData.role !== "BENEFICIARY") {
          router.push(`/${formData.role.toLowerCase()}`);
        } else {
          setCurrentStep(3);
        }
      }

      // --- STEP 3: BENEFICIARY IDENTITY CHECKS ---
      else if (currentStep === 3) {
        await axios.post(
          `${API_BASE_URL}/verification/verify-nin`,
          { nin: formData.nin },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setCurrentStep(4);
      }

      // --- STEP 4: BENEFICIARY BIOMETRIC MATCH ---
      else if (currentStep === 4) {
        if (!formData.selfie) {
          throw new Error("Please capture your selfie snapshot first.");
        }

        const verificationPayload = new FormData();
        verificationPayload.append("selfie", formData.selfie);
        verificationPayload.append(
          "selfieUrl",
          "https://res.cloudinary.com/mock-id-doc.jpg",
        );
        verificationPayload.append(
          "documentImageUrl",
          "https://res.cloudinary.com/mock-id-doc.jpg",
        );

        await axios.post(
          `${API_BASE_URL}/verification/verify-face`,
          verificationPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );

        router.push("/beneficiary");
      }
    } catch (err: any) {
      console.error(`Onboarding Error (Step ${currentStep}):`, err);
      const backendMessage = err.response?.data?.message || err.message;
      setApiError(
        backendMessage || "An unexpected error occurred. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-lg flex-col justify-center rounded-3xl border border-white/40 bg-white/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-black/40 sm:p-10 transition-all duration-300">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Account Setup
        </h2>
        <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-text-body/60 dark:text-gray-400">
          Step {currentStep} of {steps.length}
        </p>
      </div>

      {/* Responsive Progress Node Tracker */}
      <div className="relative mb-12 flex w-full items-center justify-between px-2">
        <div className="absolute left-4 right-4 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-primary to-secondary transition-all duration-500 ease-in-out"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1 || 1)) * 100}%`,
            }}
          />
        </div>

        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`h-4 w-4 rounded-full transition-all duration-500 ${
                  isActive || isCompleted
                    ? "bg-linear-to-r from-primary to-secondary shadow-[0_0_14px_rgba(0,119,182,0.5)] scale-110"
                    : "bg-slate-300 dark:bg-slate-700"
                }`}
              />
              <span
                className={`absolute top-6 w-20 text-center text-[10px] sm:text-xs tracking-tight transition-all duration-300 ${
                  isActive
                    ? "font-extrabold text-slate-900 dark:text-white scale-105"
                    : isCompleted
                      ? "font-bold text-primary dark:text-primary/90"
                      : "font-medium text-text-body/40 dark:text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {apiError && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400 animate-in fade-in duration-200">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Step 1: Profile & Dynamic Role Selection */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Select Account Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["BENEFICIARY", "DONOR", "PARTNER"] as RoleType[]).map(
                  (roleOption) => (
                    <button
                      key={roleOption}
                      type="button"
                      onClick={() => selectRole(roleOption)}
                      className={`h-11 rounded-xl text-xs font-bold transition-all border ${
                        formData.role === roleOption
                          ? "border-primary bg-primary/5 text-primary dark:border-primary dark:bg-primary/10"
                          : "border-slate-200 bg-transparent text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5"
                      }`}
                    >
                      {roleOption}
                    </button>
                  ),
                )}
              </div>
            </div>

            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
            <Input
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="johndoe"
              required
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="johndoe@example.com"
              required
            />

            {/* Render unique Logistics Partner compliance properties if selected */}
            {formData.role === "PARTNER" && (
              <div className="flex flex-col gap-4 border-l-2 border-primary/30 pl-3 my-2 animate-in fade-in duration-300">
                <Input
                  label="Business / Partner Name"
                  type="text"
                  name="partnerName"
                  value={formData.partnerName}
                  onChange={handleInputChange}
                  placeholder="Swift Deliveries Ltd"
                  required
                />
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-text-body/80 dark:text-gray-300">
                    Logistics Vehicle Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white/50 px-3 text-sm font-medium focus:border-primary focus:outline-hidden dark:border-white/10 dark:bg-black/20"
                    required
                  >
                    <option value="MOTORCYCLE">Motorcycle / Bike</option>
                    <option value="VAN">Delivery Van</option>
                    <option value="TRUCK">Freight Truck</option>
                  </select>
                </div>
                <Input
                  label="Bank Account Number (NUBAN)"
                  type="text"
                  name="bankAccount"
                  value={formData.bankAccount}
                  onChange={handleInputChange}
                  placeholder="0123456789"
                  required
                />
                <Input
                  label="Bank Account Holder Name"
                  type="text"
                  name="bankAccountName"
                  value={formData.bankAccountName}
                  onChange={handleInputChange}
                  placeholder="Swift Deliveries Logistics"
                  required
                />
                <Input
                  label="Bank Sorting Code"
                  type="text"
                  name="bankCode"
                  value={formData.bankCode}
                  onChange={handleInputChange}
                  placeholder="044"
                  required
                />
              </div>
            )}

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="*************"
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="*************"
              required
            />

            <div className="mt-2 flex items-start">
              <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-normal text-text-body/80 dark:text-gray-300">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 bg-white/50 accent-primary focus:ring-primary"
                />
                <span>
                  By signing up, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="font-bold text-primary transition-colors hover:text-secondary underline underline-offset-2"
                  >
                    Terms & Conditions
                  </Link>
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Step 2: OTP Verification */}
        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <OtpVerification
              email={formData.email || "johndoe@example.com"}
              onChange={(val) => setFormData((p) => ({ ...p, otp: val }))}
            />
          </div>
        )}

        {/* Step 3: NIN Verification */}
        {currentStep === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <NinVerification
              value={formData.nin}
              onChange={(val) => {
                if (apiError) setApiError(null);
                setFormData((p) => ({ ...p, nin: val }));
              }}
            />
          </div>
        )}

        {/* Step 4: Face Verification */}
        {currentStep === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <FaceVerification
              onComplete={(file) => {
                if (apiError) setApiError(null);
                setIsFaceVerified(true);
                setFormData((prev) => ({ ...prev, selfie: file }));
              }}
              onBack={() => {
                setIsFaceVerified(false);
                setFormData((prev) => ({ ...prev, selfie: null }));
                setCurrentStep(3);
              }}
            />
          </div>
        )}

        {/* Navigation Control Track Panel */}
        <div className="flex gap-4 mt-6">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              className="w-1/3 h-12 rounded-xl text-base font-bold border-slate-200 hover:bg-slate-50 transition-all dark:border-white/10 dark:hover:bg-white/5"
              onClick={() => {
                setApiError(null);
                setCurrentStep((prev) => prev - 1);
              }}
              disabled={isLoading}
            >
              Back
            </Button>
          )}
          <Button
            type="submit"
            className="flex-1 h-12 rounded-xl text-base font-bold shadow-md shadow-primary/10 transition-all"
            isLoading={isLoading}
            disabled={
              (currentStep === 2 && formData.otp.length < 6) ||
              (currentStep === 3 && formData.nin.length < 11) ||
              (currentStep === 4 && !isFaceVerified)
            }
          >
            {currentStep === steps.length ? "Complete Setup" : "Continue"}
          </Button>
        </div>

        {currentStep === 1 && (
          <div className="mt-4 text-center">
            <p className="text-xs font-medium text-text-body/70 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-xs font-bold text-primary transition-colors hover:text-secondary ml-1"
              >
                Login
              </Link>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
