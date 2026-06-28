"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface FaceVerificationProps {
  isCaptured: boolean;
  onCapture: () => void;
  onRetake: () => void;
}

export function FaceVerification({ isCaptured, onCapture, onRetake }: FaceVerificationProps) {
  const [isScanning, setIsScanning] = useState(false);

  const handleCaptureClick = () => {
    setIsScanning(true);
    // Simulate the camera taking a picture and processing it
    setTimeout(() => {
      setIsScanning(false);
      onCapture();
    }, 1500);
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Context Text */}
      <div className="text-center">
        <p className="text-text-body dark:text-gray-300">
          {isCaptured 
            ? "Verification complete. Your face matches your NIN profile." 
            : "Please position your face clearly within the frame to verify your identity."}
        </p>
      </div>

      {/* Camera Viewfinder */}
      <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-full border-4 border-dashed border-primary/50 bg-black/10 shadow-inner backdrop-blur-sm sm:h-72 sm:w-72">
        
        {!isCaptured ? (
          <>
            {/* Simulated Live Feed Placeholder (You would put a <video> or <Webcam> tag here) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
            
            {/* Scanning Animation Line */}
            <div className={`absolute left-0 top-0 h-1 w-full bg-primary shadow-[0_0_15px_#033A95] transition-all duration-1000 ${isScanning ? 'translate-y-[288px]' : '-translate-y-4'}`} />

            {/* Viewfinder overlay corners */}
            <div className="absolute h-full w-full opacity-30">
              <div className="absolute left-10 top-10 h-10 w-10 border-l-4 border-t-4 border-white" />
              <div className="absolute right-10 top-10 h-10 w-10 border-r-4 border-t-4 border-white" />
              <div className="absolute bottom-10 left-10 h-10 w-10 border-b-4 border-l-4 border-white" />
              <div className="absolute bottom-10 right-10 h-10 w-10 border-b-4 border-r-4 border-white" />
            </div>

            {isScanning && (
              <span className="relative z-10 font-bold text-white drop-shadow-md animate-pulse">
                Hold still...
              </span>
            )}
          </>
        ) : (
          // Captured Success State
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/20 backdrop-blur-md">
            <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]">
              {/* Success Checkmark SVG */}
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-bold text-primary dark:text-white">Captured!</span>
          </div>
        )}
      </div>

      {/* Capture / Retake Controls */}
      <div className="flex w-full max-w-xs flex-col gap-3">
        {!isCaptured ? (
          <Button 
            type="button" 
            onClick={handleCaptureClick} 
            isLoading={isScanning}
            className="w-full rounded-full shadow-lg shadow-primary/20"
          >
            Take Photo
          </Button>
        ) : (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onRetake}
            className="w-full rounded-full border-white/40 bg-white/10 text-text-heading hover:bg-white/20 dark:text-white"
          >
            Retake Photo
          </Button>
        )}
      </div>

    </div>
  );
}