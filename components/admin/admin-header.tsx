"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

export function AdminHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-text-heading dark:text-white">
          Platform Overview
        </h1>
        <p className="mt-1 text-text-body dark:text-gray-400">
          Monitor platform health, verify campaigns, and oversee transactions.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="shadow-sm bg-white/50 dark:bg-black/20">
          Generate System Report
        </Button>
        <Button className="shadow-lg shadow-primary/25" variant="accent">
          Manage Users
        </Button>
      </div>
    </header>
  );
}