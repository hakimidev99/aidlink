"use client";

import React from 'react';

interface StatsCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  color?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  delay?: number;
}

export function StatsCard({ label, value, icon, color = 'bg-primary/10 text-primary', trend, trendValue, delay = 0 }: StatsCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl hover:shadow-xl hover:border-white/80 dark:hover:border-white/10 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br opacity-[0.08] dark:opacity-[0.12] blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-[0.15]" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          {icon && (
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color} shadow-sm`}>
              {icon}
            </div>
          )}
          {trend && (
            <span
              className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                trend === 'up'
                  ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
              }`}
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                {trend === 'up' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                )}
              </svg>
              {trendValue || '+12%'}
            </span>
          )}
        </div>
        <p className="text-2xl font-black tracking-tight text-text-heading">{value}</p>
        <p className="mt-0.5 text-sm text-text-muted">{label}</p>
      </div>
    </div>
  );
}
