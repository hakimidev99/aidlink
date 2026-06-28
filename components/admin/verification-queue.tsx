"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

export function VerificationQueue() {
  const queueItems = [
    {
      id: 1,
      type: "Proof of Fulfillment",
      beneficiary: "John Doe",
      campaign: "Community Clinic Renovation",
      submittedAt: "2 hours ago",
      tag: "Withdrawal Unlock",
    },
    {
      id: 2,
      type: "New Campaign Setup",
      beneficiary: "Sarah Jenkins",
      campaign: "Urban Agriculture Seeds",
      submittedAt: "5 hours ago",
      tag: "Campaign Launch",
    },
    {
      id: 3,
      type: "Proof of Fulfillment",
      beneficiary: "Lagos Relief Org",
      campaign: "Flood Emergency Kits",
      submittedAt: "Yesterday",
      tag: "Withdrawal Unlock",
    }
  ];

  return (
    <div className="flex flex-col gap-6 lg:col-span-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-heading dark:text-white">Verification Queue</h2>
        <Button variant="ghost" className="text-sm font-bold text-primary hover:bg-primary/10">View All Queue</Button>
      </div>
      
      <div className="flex flex-col gap-4 rounded-3xl border border-white/50 bg-white/40 p-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
        
        {queueItems.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white/60 p-4 transition-colors hover:bg-white/80 dark:bg-black/40 dark:hover:bg-black/60">
            
            <div className="flex items-start sm:items-center gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold ${
                item.type === 'New Campaign Setup' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
              }`}>
                {item.type === 'New Campaign Setup' ? 'NC' : 'PF'}
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-text-heading dark:text-white">{item.campaign}</span>
                  <span className="hidden sm:inline-block rounded-md bg-white/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-text-muted border border-border-glass dark:bg-white/5">
                    {item.tag}
                  </span>
                </div>
                <span className="text-xs text-text-body mt-0.5">
                  Submitted by <span className="font-bold">{item.beneficiary}</span> • {item.submittedAt}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white/50 dark:bg-black/20">Review</Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20">Approve</Button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}