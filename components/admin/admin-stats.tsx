"use client";

import React from 'react';

export function AdminStats() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      
      {/* Stat 1: Total Volume */}
      <div className="flex flex-col rounded-3xl border border-white/50 bg-white/40 p-6 shadow-xl backdrop-blur-xl transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-black/20">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Total Processed</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-black text-text-heading dark:text-white">₦54.2M</span>
          <span className="text-xs font-bold text-emerald-600">+18% this month</span>
        </div>
      </div>

      {/* Stat 2: Pending Verifications (Alert State) */}
      <div className="flex flex-col rounded-3xl border border-red-500/30 bg-red-50/40 p-6 shadow-xl backdrop-blur-xl transition-transform hover:-translate-y-1 dark:border-red-500/20 dark:bg-red-900/10">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/15 text-red-600 dark:bg-red-500/20 dark:text-red-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Pending Audits</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-black text-red-600 dark:text-red-400">24</span>
          <span className="text-xs font-bold text-red-600/70">Requires attention</span>
        </div>
      </div>
      
      {/* Stat 3: Active Campaigns */}
      <div className="flex flex-col rounded-3xl border border-white/50 bg-white/40 p-6 shadow-xl backdrop-blur-xl transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-black/20">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Active Campaigns</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-black text-text-heading dark:text-white">156</span>
          <span className="text-xs font-bold text-text-muted">Across 8 categories</span>
        </div>
      </div>

      {/* Stat 4: Active Donors */}
      <div className="flex flex-col rounded-3xl border border-white/50 bg-white/40 p-6 shadow-xl backdrop-blur-xl transition-transform hover:-translate-y-1 dark:border-white/10 dark:bg-black/20">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FF9F1C]/15 text-[#FF9F1C] dark:bg-[#FF9F1C]/20">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Total Backers</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-black text-text-heading dark:text-white">12.4K</span>
          <span className="text-xs font-bold text-[#FF9F1C]">+124 new today</span>
        </div>
      </div>

    </div>
  );
}