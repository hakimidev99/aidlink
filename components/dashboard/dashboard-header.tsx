// ==========================================
// FILE: dashboard-header.tsx
// ==========================================
"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl truncate">
          Welcome back, {userName}! 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Here is what&apos;s happening with your aid campaigns today.
        </p>
      </div>
      <Button
        className="w-full sm:w-auto h-11 px-5 rounded-xl shadow-md shadow-primary/20 text-sm font-semibold shrink-0"
        variant="accent"
      >
        + Create New Campaign
      </Button>
    </header>
  );
}
