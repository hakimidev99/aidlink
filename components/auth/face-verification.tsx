"use client";

<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useRef } from "react";
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
import { Button } from "@/components/ui/button";

interface FaceVerificationProps {
  onComplete: (file: File) => void;
  onBack: () => void;
}

export function FaceVerification({
<<<<<<< HEAD
  onComplete,
  onBack,
}: FaceVerificationProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);

  const handleCaptureClick = () => {
    setIsScanning(true);

    // Simulate camera snapshot processing delay
=======
  isCaptured,
  onCapture,
  onRetake,
}: FaceVerificationProps) {
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCaptureClick = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onCapture();
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsScanning(true);
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
    setTimeout(() => {
      setIsScanning(false);

      const mockFile = new File(["mock-image-data"], "selfie.jpg", {
        type: "image/jpeg",
      });

      setCapturedFile(mockFile);
      // Immediately notify the parent wizard that the file is ready
      onComplete(mockFile);
    }, 2000);
  };

  return (
<<<<<<< HEAD
    <div className="flex w-full flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Dynamic Context Header Layout */}
      <div className="text-center px-2">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-300">
          {capturedFile
            ? "Photo captured successfully! Review your placement or proceed to complete verification."
            : "Please position your face clearly within the circular frame to match against official registries."}
        </p>
      </div>

      {/* Camera Scanning Viewport Frame Container */}
      <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-full border-4 border-dashed border-primary-600/50 bg-black/10 shadow-inner backdrop-blur-sm sm:h-72 sm:w-72 dark:border-white/20">
        {!capturedFile ? (
          <>
            {/* Viewfinder Vignette Overlay Shading */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

            {/* Scanning Laser Tracker Line Animation */}
            <div
              className={`absolute left-0 top-0 h-1 w-full bg-primary-600 shadow-[0_0_15px_#2563eb] transition-all duration-1000 ${
                isScanning ? "translate-y-[288px]" : "-translate-y-4"
              }`}
            />

            {/* Target Alignment Guide Marks */}
            <div className="absolute h-full w-full opacity-30">
              <div className="absolute left-10 top-10 h-10 w-10 border-l-4 border-t-4 border-white" />
              <div className="absolute right-10 top-10 h-10 w-10 border-r-4 border-t-4 border-white" />
              <div className="absolute bottom-10 left-10 h-10 w-10 border-b-4 border-l-4 border-white" />
              <div className="absolute bottom-10 right-10 h-10 w-10 border-b-4 border-r-4 border-white" />
            </div>

            {isScanning && (
              <span className="relative z-10 font-sans text-xs font-bold uppercase tracking-wider text-white drop-shadow-md animate-pulse">
=======
    <div className="flex w-full flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-sm text-text-body">
          {isCaptured
            ? "Face verification complete. Your face matches your NIN profile."
            : "Please position your face clearly within the frame to verify your identity."}
        </p>
      </div>

      <div className="relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border-4 border-dashed border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-black/30 shadow-inner sm:h-64 sm:w-64">
        {!isCaptured ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            <div
              className={`absolute left-0 top-0 h-1 w-full bg-secondary shadow-[0_0_15px_#0891b2] transition-transform duration-1000 ${
                isScanning ? "translate-y-[224px]" : "-translate-y-4"
              }`}
            />
            {isScanning && (
              <span className="relative z-10 animate-pulse font-bold text-text-heading drop-shadow-md dark:text-white">
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
                Hold still...
              </span>
            )}
            {!isScanning && (
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
        ) : (
<<<<<<< HEAD
          /* Biometric Ready Context Mask */
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-600/20 backdrop-blur-md dark:bg-emerald-500/10">
            <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_0_20px_rgba(16,185,129,0.4)] dark:bg-slate-900">
              <svg
                className="h-8 w-8 text-emerald-600 dark:text-emerald-400"
                fill="none"
                view="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              Ready
            </span>
=======
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-success/20 backdrop-blur-sm">
            <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
              <svg className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-bold text-text-heading dark:text-white">Captured!</span>
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
          </div>
        )}
      </div>

<<<<<<< HEAD
      {/* Action Controls System - Only shows when waiting for a capture */}
      <div className="flex w-full max-w-xs flex-col items-center gap-4 mt-2">
        {!capturedFile && (
=======
      <div className="flex w-full max-w-xs flex-col gap-3">
        {!isCaptured ? (
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
          <>
            <Button
              type="button"
              onClick={handleCaptureClick}
<<<<<<< HEAD
              disabled={isScanning}
              className="w-full rounded-xl py-6 font-semibold shadow-lg bg-primary-600 hover:bg-primary-700 text-white cursor-pointer"
            >
              {isScanning ? "Processing..." : "Take Photo"}
            </Button>
          </>
=======
              isLoading={isScanning}
              className="w-full rounded-full shadow-lg shadow-primary/20"
            >
              Take Photo
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
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 bg-surface-secondary dark:bg-white/5 px-6 py-3 text-sm text-text-body backdrop-blur-md transition-all hover:bg-gray-100 dark:hover:bg-white/10"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload a photo instead
            </button>
          </>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={onRetake}
            className="w-full rounded-full border-gray-300 dark:border-white/20 bg-surface-secondary dark:bg-white/5 text-text-heading hover:bg-gray-100 dark:hover:bg-white/10"
          >
            Retake Photo
          </Button>
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
        )}
      </div>
    </div>
  );
}
