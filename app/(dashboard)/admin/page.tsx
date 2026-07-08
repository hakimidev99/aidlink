"use client";

<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminStats } from "@/components/admin/admin-stats";
import { VerificationQueue } from "@/components/admin/verification-queue";
import { RecentActivity } from "@/components/admin/recent-activity";
import { RefreshCw } from "lucide-react";
=======
import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { AdminStats } from '@/components/admin/admin-stats';
import { VerificationQueue } from '@/components/admin/verification-queue';
import { RecentActivity } from '@/components/admin/recent-activity';
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)

const overviewStats = [
  {
    label: 'Total Processed',
    value: '₦2,400,000',
    change: '+12%',
    changeType: 'positive' as const,
    accent: 'success' as const,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Pending Verifications',
    value: '23',
    change: 'Needs attention',
    changeType: 'negative' as const,
    accent: 'error' as const,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    label: 'Active Campaigns',
    value: '156',
    change: '8 categories',
    changeType: 'neutral' as const,
    accent: 'primary' as const,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    label: 'Active Donors',
    value: '892',
    change: '+28 today',
    changeType: 'positive' as const,
    accent: 'info' as const,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const queueItems = [
  { id: '1', title: 'Community Clinic Renovation', beneficiary: 'John Doe', date: '2 hours ago', type: 'Proof of Fulfillment', priority: 'high' as const },
  { id: '2', title: 'Urban Agriculture Seeds', beneficiary: 'Sarah Jenkins', date: '5 hours ago', type: 'Campaign', priority: 'medium' as const },
  { id: '3', title: 'Flood Emergency Kits', beneficiary: 'Lagos Relief Org', date: 'Yesterday', type: 'Proof of Fulfillment', priority: 'high' as const },
  { id: '4', title: 'School Computer Lab', beneficiary: 'EduCare Foundation', date: 'Yesterday', type: 'Campaign', priority: 'low' as const },
  { id: '5', title: 'Well Water Project', beneficiary: 'Riverside Community', date: '2 days ago', type: 'Identity', priority: 'medium' as const },
];

const activities = [
  { id: '1', action: 'Donation Received', detail: '₦500,000 to Flood Relief Campaign', timestamp: 'Just now', type: 'donation' as const },
  { id: '2', action: 'User Registered', detail: 'New donor: Emeka Okafor', timestamp: '12 mins ago', type: 'user' as const },
  { id: '3', action: 'Campaign Created', detail: 'Clean Water Initiative by Hope Foundation', timestamp: '45 mins ago', type: 'campaign' as const },
  { id: '4', action: 'Payout Processed', detail: '₦250,000 to Jane Doe (Clinic Project)', timestamp: '2 hours ago', type: 'payout' as const },
  { id: '5', action: 'Campaign Flagged', detail: 'Suspicious activity detected on fund #1042', timestamp: '3 hours ago', type: 'alert' as const },
  { id: '6', action: 'Verification Approved', detail: 'Identity verified for Lagos Relief Org', timestamp: '5 hours ago', type: 'user' as const },
];

export default function AdminDashboardPage() {
<<<<<<< HEAD
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      // Decode and verify the user role is ADMIN
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = JSON.parse(window.atob(base64));

      if (jsonPayload?.role?.toUpperCase() === "ADMIN") {
        setIsAuthorized(true);
      } else {
        // Kick out unauthorized roles back to home
        router.push("/");
      }
    } catch (err) {
      router.push("/login");
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-3 p-4">
        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
        <p className="text-sm font-medium text-slate-500 text-center">
          Verifying administrative access...
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-7xl flex-col gap-6 sm:gap-8 mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in zoom-in-95 duration-500 pb-12">
      <AdminHeader />
      <AdminStats />

      {/* Asymmetric grid: Adapts column weight natively to prevent awkward design gaps */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3 items-start">
        <div className="lg:col-span-2 w-full min-w-0">
          <VerificationQueue />
        </div>
        <div className="w-full min-w-0">
          <RecentActivity />
=======
  const [dateRange, setDateRange] = useState('This Month');

  const handleApprove = (id: string) => {
    alert(`Approved verification #${id}`);
  };

  const handleReject = (id: string) => {
    alert(`Rejected verification #${id}`);
  };

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto pb-12">
      <AdminHeader title="Admin Dashboard" description="Monitor platform health, verify campaigns, and oversee transactions." />

      {/*
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 shadow-sm">
          <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium text-text-body">{dateRange}</span>
          <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="rounded-xl border border-border bg-surface px-4 py-2 text-sm text-text-body outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Quarter</option>
          <option>Custom Range</option>
        </select>
      </div>
      */}

      <AdminStats stats={overviewStats} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <VerificationQueue
            items={queueItems}
            onApprove={handleApprove}
            onReject={handleReject}
            onViewAll={() => window.location.href = '/admin/verifications'}
          />
        </div>
        <div>
          <RecentActivity activities={activities} />
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
        </div>
      </div>
    </div>
  );
}
