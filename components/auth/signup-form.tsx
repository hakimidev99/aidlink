"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 1. Import useRouter
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { OtpVerification } from './otp-verification';
import { NinVerification } from './nin-verification';
import { FaceVerification } from './face-verification';

export function SignupForm() {
  const router = useRouter(); // 2. Initialize the router
  
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [otpValue, setOtpValue] = useState(""); 
  const [ninValue, setNinValue] = useState("");
  const [isFaceVerified, setIsFaceVerified] = useState(false);
  
  const steps = [
    { id: 1, label: 'Personal info' },
    { id: 2, label: 'Otp verification' },
    { id: 3, label: 'Nin verification' },
    { id: 4, label: 'Face verification' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call or validation
    setTimeout(() => {
      setIsLoading(false);
      
      if (currentStep === 2) {
        console.log("Submitting OTP to backend:", otpValue);
      }

      // Move to the next step if we aren't at the end
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        // 3. Navigate to the dashboard! 
        // Update this path to '/donor' or '/partner' depending on user type
        router.push('/beneficiary'); 
      }
    }, 1000);
  };

  return (
    <div className="flex w-[70vw] min-w-[500px] min-h-[0vh] flex-col justify-center rounded-3xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-3xl dark:border-white/10 dark:bg-black/10 px-10 py-10">
      
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-text-heading dark:text-white">Account Setup</h2>
      </div>
      
      <div className="relative mb-14 flex w-full flex items-center justify-between">
        <div className="absolute left-[8px] right-[8px] top-1/2 h-[6px] -translate-y-1/2 rounded-full bg-white/20 dark:bg-white/10 overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-in-out" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
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
                    ? 'bg-gradient-to-r from-primary to-secondary shadow-[0_0_12px_rgba(0,119,182,0.6)] border-none scale-110' 
                    : 'bg-white/50 border-2 border-white/30 backdrop-blur-sm dark:bg-black/50 dark:border-white/20' 
                }`} 
              />
              <span 
                className={`absolute top-6 w-32 text-center text-xs transition-all duration-300 ${
                  isActive 
                    ? 'font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary scale-105' 
                    : isCompleted
                    ? 'font-bold text-primary dark:text-primary' 
                    : 'font-medium text-text-body/70 dark:text-gray-500' 
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:px-8">
        
        {currentStep === 1 && (
          <>
            <Input label="Enter name" type="text" name="name" placeholder="John Doe" required />
            <Input label="Enter username" type="text" name="username" placeholder="John_Doe" required />
            <Input label="Enter email" type="email" name="email" placeholder="johndoe@example.com" required />
            <Input label="Enter password" type="password" name="password" placeholder="*************" required />
            <Input label="Confirm password" type="password" name="confirmPassword" placeholder="*************" required />

            <div className="mt-2 flex items-center">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-text-body dark:text-gray-300">
                <input 
                  type="checkbox" 
                  required
                  className="h-4 w-4 rounded border-white/40 bg-white/20 accent-primary focus:ring-primary"
                />
                By signing, you have agreed with our{' '}
                <Link href="/terms" className="font-bold text-primary transition-colors hover:text-secondary">
                  Terms & Conditions
                </Link>
              </label>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <OtpVerification 
            email="johndoe@example.com" 
            onChange={(val) => setOtpValue(val)} 
          />
        )}
        
        {currentStep === 3 && (
          <NinVerification 
            value={ninValue}
            onChange={(val) => setNinValue(val)}
          />
        )}
        
        {currentStep === 4 && (
          <FaceVerification 
            isCaptured={isFaceVerified}
            onCapture={() => setIsFaceVerified(true)}
            onRetake={() => setIsFaceVerified(false)}
          />
        )}
        
        <Button 
          type="submit" 
          className="mt-6 w-full py-6 text-lg" 
          isLoading={isLoading}
          disabled={
            (currentStep === 2 && otpValue.length < 6) || 
            (currentStep === 3 && ninValue.length < 11) ||
            (currentStep === 4 && !isFaceVerified) 
          }
        >
          {currentStep === 4 ? "Complete Setup" : "Continue"}
        </Button>
        
        {currentStep === 1 && (
          <div className="mt-4 flex items-center justify-center">
            <p className="font-medium text-text-heading dark:text-white">
              Already have an account?{' '}
              <Link href="/login" className="text-sm font-bold text-primary transition-colors hover:text-secondary">
                Login
              </Link>
            </p>
          </div>
        )}

      </form>
    </div>
  );
}