"use client";

import React from 'react';

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      
      {/* Stat Card 1: Total Funds Raised (Emerald Theme) */}
      <div className="flex flex-col rounded-3xl border border-white/50 bg-white/40 p-6 shadow-xl backdrop-blur-xl transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-black/20">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            {/* Wallet / Money Icon */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-sm font-bold uppercase tracking-wider text-text-muted">
            Total Funds Raised
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-black text-text-heading dark:text-white">₦2,450,000</span>
          <span className="mt-1 w-fit rounded-md bg-emerald-100/50 px-2 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            +12% from last month
          </span>
        </div>
      </div>
      
      {/* Stat Card 2: Available to Withdraw (Primary Blue Theme) */}
      <div className="flex flex-col rounded-3xl border border-white/50 bg-white/40 p-6 shadow-xl backdrop-blur-xl transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-black/20">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary">
            {/* Bank / Withdraw Icon */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
          </div>
          <span className="text-sm font-bold uppercase tracking-wider text-text-muted">
            Available Balance
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-black text-primary dark:text-white">₦850,000</span>
          <span className="mt-1 flex items-center gap-1 text-xs font-medium text-text-body dark:text-gray-400">
            <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Next payout available in 2 days
          </span>
        </div>
      </div>

      {/* Stat Card 3: Active Donors (Vibrant Orange Accent Theme) */}
      <div className="flex flex-col rounded-3xl border border-white/50 bg-white/40 p-6 shadow-xl backdrop-blur-xl transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-black/20">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FF9F1C]/15 text-[#FF9F1C] dark:bg-[#FF9F1C]/20">
            {/* Heart / Backers Icon */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-sm font-bold uppercase tracking-wider text-text-muted">
            Active Backers
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-black text-text-heading dark:text-white">142</span>
          <span className="mt-1 flex items-center gap-1 text-xs font-medium text-[#FF9F1C]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Across 2 active campaigns
          </span>
        </div>
      </div>

    </div>
  );
}