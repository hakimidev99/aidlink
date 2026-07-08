<<<<<<< HEAD
// ==========================================
// FILE: dashboard-header.tsx
// ==========================================
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
=======
import React from 'react';
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)

interface DashboardHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function DashboardHeader({ title, description, action }: DashboardHeaderProps) {
  return (
<<<<<<< HEAD
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
=======
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in-down">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-heading">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-text-body/80">{description}</p>
        )}
      </div>
      {action && <div className="flex items-center gap-3">{action}</div>}
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
    </header>
  );
}
