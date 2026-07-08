import React from 'react';
import { DynamicSidebar } from '@/components/dashboard/dynamic-sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full bg-surface overflow-hidden">
      
      {/* Ambient Dashboard Background Blobs */}
      <div className="pointer-events-none absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[10%] right-[5%] h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[400px] rounded-full bg-accent/3 blur-[100px]" />

      {/* Renders Admin or Beneficiary sidebar automatically based on the URL */}
      <DynamicSidebar />
      
      {/* Main Content Area */}
      <main className="relative z-10 flex w-full flex-col p-6 sm:p-10 lg:p-12 overflow-y-auto h-screen custom-scrollbar">
        {children}
      </main>
    </div>
  );
}