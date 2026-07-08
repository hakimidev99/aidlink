"use client";

import React from "react";
import { Button } from "@/components/ui/button";

<<<<<<< HEAD
type ActivityColor = "blue" | "neutral" | "red" | "amber";

interface Activity {
  id: number;
  action: string;
  detail: string;
  time: string;
  color: ActivityColor;
}

interface RecentActivityProps {
  activities?: Activity[];
  loading?: boolean;
}

const defaultActivities: Activity[] = [
  {
    id: 1,
    action: "Donation Received",
    detail: "₦500,000 donated to Flood Relief Campaign",
    time: "Just now",
    color: "blue",
  },
  {
    id: 2,
    action: "Withdrawal Approved",
    detail: "₦250,000 released to Jane Doe",
    time: "15 mins ago",
    color: "blue",
  },
  {
    id: 3,
    action: "Campaign Flagged",
    detail: "AI detected suspicious invoice upload",
    time: "1 hour ago",
    color: "red",
  },
  {
    id: 4,
    action: "New Beneficiary Registered",
    detail: "EduCare Foundation joined AidLink",
    time: "3 hours ago",
    color: "amber",
  },
];

const colorMap: Record<ActivityColor, string> = {
  blue: "bg-blue-600 ring-4 ring-blue-50 dark:ring-blue-950/40",
  neutral: "bg-slate-400 ring-4 ring-slate-50 dark:ring-slate-900/40",
  red: "bg-red-500 ring-4 ring-red-50 dark:ring-red-950/40",
  amber: "bg-amber-500 ring-4 ring-amber-50 dark:ring-amber-950/40",
};

function Skeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex animate-pulse gap-4">
          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-3/4 rounded bg-slate-100 dark:bg-slate-900" />
            <div className="h-2.5 w-16 rounded bg-slate-100 dark:bg-slate-900" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RecentActivity({
  activities = defaultActivities,
  loading = false,
}: RecentActivityProps) {
  return (
    <section className="flex flex-col gap-4">
      {/* Widget Header Area */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Live Activity
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Latest platform events happening in real-time.
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-600 dark:bg-blue-400" />
          Live
        </div>
      </div>

      {/* Main Container Box */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs dark:border-slate-800 dark:bg-slate-950">
        {loading ? (
          <Skeleton />
        ) : (
          <div className="flex flex-col">
            {/* Timeline Wrapper Layout */}
            <div className="flex flex-col">
              {activities.map((activity, index) => (
                <div key={activity.id} className="flex gap-4">
                  {/* Left Side: Timeline Line Track and Node */}
                  <div className="flex flex-col items-center shrink-0">
                    {/* The Node Dot */}
                    <div
                      className={`mt-1.5 h-2 w-2 rounded-full z-10 ${colorMap[activity.color]}`}
                    />
                    {/* The Connecting Line (Hidden for the last list element) */}
                    {index !== activities.length - 1 && (
                      <div className="w-px flex-1 bg-slate-200 my-2 dark:bg-slate-800" />
                    )}
                  </div>

                  {/* Right Side: Text Details Content Grid */}
                  <div className="space-y-1 pb-6 min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-slate-900 dark:text-slate-50 leading-none">
                      {activity.action}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-normal break-words">
                      {activity.detail}
                    </p>
                    <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* View Full Audit Log Anchor Button */}
            <Button
              variant="outline"
              className="h-9 w-full rounded-lg border-slate-200 text-xs font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              View Full Audit Log
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
=======
interface Activity {
  id: string;
  action: string;
  detail: string;
  timestamp: string;
  type: 'donation' | 'user' | 'campaign' | 'payout' | 'alert';
}

interface RecentActivityProps {
  activities: Activity[];
}

const typeStyles: Record<string, { bg: string; icon: React.ReactNode }> = {
  donation: {
    bg: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  user: {
    bg: 'bg-primary/10 text-primary',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  campaign: {
    bg: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  payout: {
    bg: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  alert: {
    bg: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
  },
};

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl animate-fade-in-up delay-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-text-heading">Recent Activity</h3>
          <p className="text-xs text-text-muted mt-0.5">Platform updates</p>
        </div>
        <div className="flex h-2 w-2 rounded-full bg-success animate-pulse-soft" />
      </div>
      <div className="space-y-0">
        {activities.map((activity, i) => {
          const style = typeStyles[activity.type] || typeStyles.user;
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 py-3.5 border-b border-border/40 last:border-0"
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${style.bg}`}>
                {style.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-text-heading truncate">{activity.action}</p>
                <p className="text-xs text-text-muted mt-0.5 truncate">{activity.detail}</p>
              </div>
              <span className="text-[10px] text-text-muted whitespace-nowrap mt-0.5">{activity.timestamp}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
