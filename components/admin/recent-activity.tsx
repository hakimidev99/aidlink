"use client";

import React from "react";
import { Button } from "@/components/ui/button";

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
