"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-text-heading dark:text-white">
          Welcome back, {userName}! 👋
        </h1>
        <p className="mt-1 text-text-body dark:text-gray-400">
          Here is what&apos;s happening with your aid campaigns today.
        </p>
      </div>
      <Button className="shadow-lg shadow-primary/25" variant="accent">
        + Create New Campaign
      </Button>
    </header>
  );
}