"use client";

import React from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { AdminStats } from '@/components/admin/admin-stats';
import { VerificationQueue } from '@/components/admin/verification-queue';
import { RecentActivity } from '@/components/admin/recent-activity';

export default function AdminDashboardPage() {
  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto animate-in fade-in zoom-in-95 duration-500 pb-12">
      
      {/* 1. Header Section */}
      <AdminHeader />
      
      {/* 2. Platform-wide Stats Grid */}
      <AdminStats />

      {/* 3. Main Content Split */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Left Column (2/3 width) - Needs Admin Action */}
        <VerificationQueue />

        {/* Right Column (1/3 width) - Live Global Feed */}
        <RecentActivity />
        
      </div>
    </div>
  );
}