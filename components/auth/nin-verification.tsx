"use client";

import React from 'react';
import { Input } from '@/components/ui/input';

interface NinVerificationProps {
  value: string;
  onChange: (value: string) => void;
}

export function NinVerification({ value, onChange }: NinVerificationProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip out any non-numeric characters using regex
    const rawValue = e.target.value.replace(/\D/g, '');
    // Limit to exactly 11 digits
    const formattedValue = rawValue.slice(0, 11);
    onChange(formattedValue);
  };

  return (
    <div className="flex w-full flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Context Text */}
      <div className="text-center">
        <p className="text-text-body dark:text-gray-300">
          To ensure transparency and prevent fraud, we need to verify your identity using your 11-digit NIN.
        </p>
      </div>

      {/* NIN Input Field */}
      <Input 
        label="National Identity Number (NIN)" 
        type="text" 
        inputMode="numeric" // Triggers the number keypad on mobile
        name="nin"
        value={value}
        onChange={handleChange}
        placeholder="e.g. 12345678901" 
        required 
      />

      {/* Helper Tip Box */}
      <div className="mt-2 rounded-xl border border-primary/20 bg-primary/10 p-4 text-sm text-text-body shadow-inner backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
        <strong className="text-primary dark:text-white">💡 Quick Tip:</strong>
        <p className="mt-1">
          Can't remember your NIN? Dial <span className="font-bold text-primary dark:text-white">*346#</span> on the phone number associated with your registration to retrieve it.
        </p>
      </div>
      
    </div>
  );
}