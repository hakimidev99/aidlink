"use client";

import React from "react";

type AdminStatsProps = {
  stats?: {
    totalProcessed: number;
    totalProcessedGrowth: number;
    pendingAudits: number;
    activeCampaigns: number;
    totalBackers: number;
    newBackersToday: number;
  };
  loading?: boolean;
};

const defaultStats = {
  totalProcessed: 54200000,
  totalProcessedGrowth: 18,
  pendingAudits: 24,
  activeCampaigns: 156,
  totalBackers: 12400,
  newBackersToday: 124,
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

const formatCompact = (value: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

function CardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-950 animate-pulse space-y-3">
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
        <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-800" />
      </div>
      <div className="h-7 w-32 rounded bg-slate-200 dark:bg-slate-800 mt-4" />
      <div className="h-3 w-20 rounded bg-slate-100 dark:bg-slate-900 mt-1" />
    </div>
  );
}

export function AdminStats({
  stats = defaultStats,
  loading = false,
}: AdminStatsProps) {
  const cards = [
    {
      title: "Total Processed",
      value: formatCurrency(stats.totalProcessed),
      subtitle: `+${stats.totalProcessedGrowth}% this month`,
      statusClasses: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-50 dark:bg-blue-950/40",
      icon: (
        <svg
          className="h-4 w-4 text-blue-600 dark:text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1"
          />
          <circle cx="12" cy="12" r="9" />
        </svg>
      ),
    },
    {
      title: "Pending Audits",
      value: stats.pendingAudits.toString(),
      subtitle: "Requires attention",
      statusClasses: "text-amber-600 dark:text-amber-400 font-medium",
      bgClass: "bg-amber-50 dark:bg-amber-950/40",
      icon: (
        <svg
          className="h-4 w-4 text-amber-600 dark:text-amber-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
    {
      title: "Active Campaigns",
      value: stats.activeCampaigns.toString(),
      subtitle: "Across all categories",
      statusClasses: "text-slate-500 dark:text-slate-400",
      bgClass: "bg-blue-50 dark:bg-blue-950/40",
      icon: (
        <svg
          className="h-4 w-4 text-blue-600 dark:text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"
          />
        </svg>
      ),
    },
    {
      title: "Total Backers",
      value: formatCompact(stats.totalBackers),
      subtitle: `+${stats.newBackersToday} joined today`,
      statusClasses: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-50 dark:bg-blue-950/40",
      icon: (
        <svg
          className="h-4 w-4 text-blue-600 dark:text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M7 20H2v-2a3 3 0 015.356-1.857"
          />
        </svg>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition-colors dark:border-slate-800 dark:bg-slate-950 min-w-0"
        >
          {/* Card Meta Header */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${card.bgClass}`}
            >
              {card.icon}
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate">
              {card.title}
            </span>
          </div>

          {/* Central Value Metrics */}
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 truncate">
            {card.value}
          </h3>

          {/* Change/Subtext Context */}
          <p className={`mt-1 text-xs truncate ${card.statusClasses}`}>
            {card.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}
