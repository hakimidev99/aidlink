"use client";

import React from "react";
import { Button } from "@/components/ui/button";

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
    },
  ];

  return (
    <div className="flex flex-col gap-4 lg:col-span-2">
      {/* Title Bar */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Verification Queue
        </h2>
        <Button
          variant="ghost"
          className="text-xs font-semibold text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-950/30"
        >
          View All Queue
        </Button>
      </div>

      {/* List Container */}
      <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-950">
        {queueItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 p-4 md:p-5 lg:flex-row lg:items-center lg:justify-between"
          >
            {/* Left Side: Avatar & Information */}
            <div className="flex items-start gap-3 min-w-0">
              {/* Short Identifier Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
                  item.type === "New Campaign Setup"
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                    : "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400"
                }`}
              >
                {item.type === "New Campaign Setup" ? "NC" : "PF"}
              </div>

              {/* Text Description Details */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">
                    {item.campaign}
                  </span>
                  <span className="inline-block rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {item.tag}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Submitted by{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {item.beneficiary}
                  </span>{" "}
                  • {item.submittedAt}
                </p>
              </div>
            </div>

            {/* Right Side: Responsive Buttons */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-full rounded-lg border-slate-200 text-xs font-medium text-slate-700 lg:w-auto dark:border-slate-800 dark:text-slate-300"
              >
                Review
              </Button>
              <Button
                size="sm"
                className="h-8 w-full rounded-lg bg-blue-600 text-xs font-medium text-white hover:bg-blue-700 lg:w-auto dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Approve
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
