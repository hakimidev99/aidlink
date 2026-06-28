import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      
      {/* The src path starts with "/" which tells Next.js 
        to look directly in the "public" folder 
      */}
      <Image 
        src="/logo.png" 
        alt="AidLink Logo icon" 
        width={140}  // Set this to match your desired width
        height={60} // Set this to match your desired height
        className="object-contain" // Ensures the image isn't distorted
      />
      
    

    </Link>
  );
}