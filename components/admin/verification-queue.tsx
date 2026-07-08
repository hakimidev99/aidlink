"use client";

<<<<<<< HEAD
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
=======
import React from 'react';

interface QueueItem {
  id: string;
  title: string;
  beneficiary: string;
  date: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
}
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)

interface VerificationQueueProps {
  items: QueueItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onViewAll: () => void;
}

const priorityColors = {
  high: 'bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20',
  medium: 'bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
  low: 'bg-blue-100 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
};

const typeColors: Record<string, string> = {
  'Campaign': 'bg-primary/10 text-primary',
  'Proof of Fulfillment': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'Identity': 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
};

export function VerificationQueue({ items, onApprove, onReject, onViewAll }: VerificationQueueProps) {
  return (
<<<<<<< HEAD
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
=======
    <div className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl animate-fade-in-up delay-200">
      <div className="flex items-center justify-between p-6 pb-4 border-b border-border/50">
        <div>
          <h3 className="text-lg font-bold text-text-heading">Verification Queue</h3>
          <p className="text-xs text-text-muted mt-0.5">{items.length} items pending review</p>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-bold text-primary hover:underline"
        >
          View All
        </button>
      </div>
      <div className="p-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 rounded-xl hover:bg-white/40 dark:hover:bg-white/[0.04] transition-colors group"
          >
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-text-heading truncate">{item.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-text-muted">{item.beneficiary}</span>
                  <span className="text-xs text-text-muted">·</span>
                  <span className="text-xs text-text-muted">{item.date}</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${typeColors[item.type] || 'bg-gray-100 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400'}`}>
                    {item.type}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${priorityColors[item.priority]}`}>
                    {item.priority}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onApprove(item.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors"
                title="Approve"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button
                onClick={() => onReject(item.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                title="Reject"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
