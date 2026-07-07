// ==========================================
// FILE: recent-donations.tsx
// ==========================================
"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export function RecentDonations() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
        Recent Donations
      </h2>

      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
        {/* Transaction Item 1 */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex shrink-0 items-center justify-center text-emerald-600 dark:text-emerald-400 text-sm font-bold">
              S
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                Samuel A.
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                2 mins ago
              </span>
            </div>
          </div>
          <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400 shrink-0">
            +₦25,000
          </span>
        </div>

        {/* Transaction Item 2 */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 py-3.5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex shrink-0 items-center justify-center text-slate-600 dark:text-slate-400 text-sm font-bold">
              A
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                Anonymous
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                1 hour ago
              </span>
            </div>
          </div>
          <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400 shrink-0">
            +₦5,000
          </span>
        </div>

        {/* Transaction Item 3 */}
        <div className="flex items-center justify-between pt-3.5 pb-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-full bg-amber-50 dark:bg-amber-950/30 flex shrink-0 items-center justify-center text-amber-600 dark:text-amber-400 text-sm font-bold">
              M
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                Mary C.
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                Yesterday
              </span>
            </div>
          </div>
          <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400 shrink-0">
            +₦150,000
          </span>
        </div>

        <Button
          variant="ghost"
          className="mt-4 h-10 w-full text-xs font-semibold tracking-wide text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View All History
        </Button>
      </div>
    </div>
  );
}
