"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function AdminSettingsPage() {
  const [maintenance, setMaintenance] = useState(false);
  const [fee, setFee] = useState("2.5");

  return (
    <div className="flex w-full max-w-4xl flex-col gap-8 mx-auto animate-in fade-in zoom-in-95 duration-500">
      <header>
        <h1 className="text-3xl font-extrabold text-text-heading dark:text-white">System Settings</h1>
        <p className="mt-1 text-text-body dark:text-gray-400">Configure global platform variables and security.</p>
      </header>

      <div className="flex flex-col gap-8">
        {/* Platform Fees */}
        <div className="rounded-3xl border border-white/50 bg-white/40 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
          <h2 className="text-xl font-bold text-text-heading dark:text-white mb-6">Financial Configuration</h2>
          <div className="flex flex-col gap-1.5 max-w-md">
            <label className="text-sm font-bold text-text-heading dark:text-white">Platform Fee Percentage (%)</label>
            <input 
              type="number" step="0.1" value={fee} onChange={(e) => setFee(e.target.value)}
              className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:bg-black/30 dark:text-white"
            />
            <p className="text-xs text-text-muted mt-1">This fee is automatically deducted from payouts to cover processing costs.</p>
          </div>
          <Button className="mt-4">Save Configuration</Button>
        </div>

        {/* Maintenance Mode */}
        <div className="rounded-3xl border border-red-500/30 bg-red-50/40 p-8 shadow-xl backdrop-blur-xl dark:border-red-500/20 dark:bg-red-900/10">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Danger Zone</h2>
          <p className="text-sm text-text-body dark:text-gray-300 mb-6">These settings directly affect the live platform.</p>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-black/40 border border-white/40 dark:border-white/10">
            <div>
              <h3 className="font-bold text-text-heading dark:text-white">Maintenance Mode</h3>
              <p className="text-xs text-text-muted">Prevents non-admins from accessing the platform.</p>
            </div>
            <button 
              onClick={() => setMaintenance(!maintenance)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${maintenance ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-700'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${maintenance ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}