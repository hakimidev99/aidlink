"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login submitted");
    }, 1500);
  };

  return (
    // Viewport sizing (50vw/50vh) with pure, clear glassmorphism
    <div className="flex w-[40vw] min-h-[60vh] flex-col justify-center rounded-3xl border border-white/30 bg-white/20  shadow-2xl backdrop-blur-3xl dark:border-white/10 dark:bg-black/10">
      
      {/* Header text */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-medium text-text-heading">Login Account</h2>
      </div>
      
      {/* Divider - Made highly transparent for the clear glass look */}
      <div className="mb-8 h-[2px] w-full bg-white/20 dark:bg-white/10" />

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-19">
        
        <Input 
          label="Email" 
          type="email" 
          name="email"
          placeholder="user@example.com" 
          required 
        />
        
        <Input 
          label="Password" 
          type="password" 
          name="password"
          placeholder="*************" 
          required 
        />

        {/* Remember me & Forgot Password Row */}
        <div className="mt-2 flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-text-body">
            <input 
              type="checkbox" 
              className="h-4 w-4 rounded border-input-border accent-primary focus:ring-primary"
            />
            Remember me
          </label>
          
          <Link 
            href="/forgot-password" 
            className="text-sm font-medium text-secondary transition-colors hover:text-secondary"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="mt-4 w-full" 
          isLoading={isLoading}
        >
          Sign In
        </Button>
<div className='flex items-center justify-center'><p className='text-text-heading font-medium'>already have an account?  <Link 
            href="/signup" 
            className="text-sm font-bold text-secondary transition-colors hover:text-secondary"
          >
            Sign up
          </Link></p></div>
      </form>
    </div>
  );
}