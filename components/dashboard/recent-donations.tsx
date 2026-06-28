"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

export function RecentDonations() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-text-heading dark:text-white">Recent Donations</h2>
      
      <div className="flex flex-col gap-4 rounded-3xl border border-white/50 bg-white/40 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20 h-full">
        
        {/* Transaction Item 1 */}
        <div className="flex items-center justify-between border-b border-border-glass pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-text-heading dark:text-white">Samuel A.</span>
              <span className="text-xs text-text-muted">2 mins ago</span>
            </div>
          </div>
          <span className="font-bold text-emerald-600">+₦25,000</span>
        </div>

        {/* Transaction Item 2 */}
        <div className="flex items-center justify-between border-b border-border-glass pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-text-heading dark:text-white">Anonymous</span>
              <span className="text-xs text-text-muted">1 hour ago</span>
            </div>
          </div>
          <span className="font-bold text-emerald-600">+₦5,000</span>
        </div>

        {/* Transaction Item 3 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-accent font-bold">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-text-heading dark:text-white">Mary C.</span>
              <span className="text-xs text-text-muted">Yesterday</span>
            </div>
          </div>
          <span className="font-bold text-emerald-600">+₦150,000</span>
        </div>

        <Button variant="ghost" className="mt-auto w-full text-primary">View All History</Button>
      </div>
    </div>
  );
}