"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 md:px-8 md:py-6 lg:flex-row lg:items-center lg:justify-between dark:border-slate-800 dark:bg-slate-950">
      {/* Title & Metadata Layout Block */}
      <div className="min-w-0 flex-1">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-50">
          Platform Overview
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400 max-w-2xl leading-relaxed">
          Monitor platform health, verify campaigns, and oversee transactions.
        </p>
      </div>

      {/* Primary Actions Grid System */}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center lg:shrink-0">
        <Button
          variant="outline"
          className="h-9 w-full rounded-lg border-slate-200 px-4 text-sm font-medium text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900 sm:w-auto dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100"
        >
          Generate System Report
        </Button>
        <Button className="h-9 w-full rounded-lg bg-blue-600 px-4 text-sm font-medium text-white shadow-xs transition-colors hover:bg-blue-700 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700">
          Manage Users
        </Button>
      </div>
    </header>
  );
}
