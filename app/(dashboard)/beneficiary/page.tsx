"use client";

import React from 'react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { PrimaryCampaignCard } from '@/components/dashboard/primary-campaign-card';
import { RecentDonations } from '@/components/dashboard/recent-donations';

export default function BeneficiaryDashboard() {
  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto animate-in fade-in zoom-in-95 duration-500">
      
      <DashboardHeader userName="John" />
      
      <DashboardStats />

      {/* Main Content Split */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <PrimaryCampaignCard />
        <RecentDonations />
      </div>
      
    </div>
  );
}