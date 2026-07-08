"use client";

<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import PrimaryCampaignCard from "@/components/dashboard/primary-campaign-card";
import { RecentDonations } from "@/components/dashboard/recent-donations";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://aidlink-jhur.onrender.com";

interface CampaignData {
  title: string;
  description: string;
  image: string;
  category: string;
  raised: number;
  target: number;
}

interface StatMetrics {
  totalRaised: number;
  campaignCount: number;
  disbursedAmount: number; // Mapped cleanly from totalFundsNeeded or available balances
}

interface DonationRecord {
  id: string;
  donorName: string;
  amount: number;
  createdAt: string;
}

export default function BeneficiaryDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [activeCampaign, setActiveCampaign] = useState<CampaignData | null>(
    null,
  );
  const [stats, setStats] = useState<StatMetrics | null>(null);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardState = async () => {
      try {
        if (isMounted) {
          setIsLoading(true);
          setError(null);
        }

        const token = localStorage.getItem("auth_token");
        if (!token) {
          router.push("/login");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        // Run user profile verification and dashboard summaries side-by-side
        const [profileRes, dashboardRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/auth/me`, { headers }),
          axios.get(`${API_BASE_URL}/dashboard/me`, { headers }),
        ]);

        if (!isMounted) return;

        // 1. Assign Profile Details
        if (profileRes.data?.user) {
          setUserName(
            profileRes.data.user.name ||
              profileRes.data.user.username ||
              "Beneficiary",
          );
        }

        // 2. Unpack Nested Dashboard Response Array safely
        const dashboardData = dashboardRes.data?.dashboard;
        if (dashboardData) {
          // Map backend stats summaries cleanly
          if (dashboardData.summary) {
            setStats({
              totalRaised: Number(dashboardData.summary.totalFundsRaised) || 0,
              campaignCount: Number(dashboardData.summary.totalCampaigns) || 0,
              disbursedAmount:
                Number(dashboardData.summary.totalFundsNeeded) || 0,
            });
          }

          // Map the latest active request campaign card
          if (
            dashboardData.activeCampaigns &&
            dashboardData.activeCampaigns.length > 0
          ) {
            const current = dashboardData.activeCampaigns[0];
            setActiveCampaign({
              title: current.title,
              description: `Campaign Status: ${current.status} (${current.percentageFunded} funded)`,
              image: "/placeholder-campaign.jpg", // Replace with a default value or document asset path if needed
              category: current.category || "General Aid",
              raised: Number(current.raisedAmount) || 0,
              target: Number(current.targetAmount) || 0,
            });
          }

          // Map the transaction rows into the recent activities ledger
          if (dashboardData.recentTransactions) {
            setDonations(
              dashboardData.recentTransactions.map((tx: any) => ({
                id: tx.id,
                donorName: tx.donorName || tx.campaignTitle || "Direct Support",
                amount: Number(tx.amount) || 0,
                createdAt: tx.createdAt,
              })),
            );
          }
        }
      } catch (err: any) {
        console.error("Dashboard payload integration error:", err);
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "We encountered an error synchronizing your profile details. Please try again.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDashboardState();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-3">
        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
        <p className="text-sm font-medium text-text-body/70">
          Syncing with backend ledger...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/30 dark:bg-red-950/10">
        <AlertTriangle className="h-8 w-8 text-red-500" />
        <h3 className="mt-3 text-base font-bold text-red-800 dark:text-red-400">
          Synchronization Error
        </h3>
        <p className="mt-1 text-sm text-red-600 dark:text-red-400/80">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-red-700"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto animate-in fade-in zoom-in-95 duration-500">
      <DashboardHeader userName={userName} />

      <DashboardStats metrics={stats} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <PrimaryCampaignCard campaignData={activeCampaign} />
        <RecentDonations history={donations} />
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/30 dark:bg-red-950/10">
        <AlertTriangle className="h-8 w-8 text-red-500" />
        <h3 className="mt-3 text-base font-bold text-red-800 dark:text-red-400">
          Server Diagnostics
        </h3>
        <div className="mt-2 text-left bg-white p-3 rounded-xl border text-xs font-mono text-slate-700 w-full overflow-x-auto">
          <p className="font-bold text-red-600 mb-1">Error Blueprint:</p>
          {error}
        </div>
        <p className="mt-3 text-xs text-text-body/60">
          Tip: Log out, register a brand new account marked specifically as a
          Beneficiary, complete KYC, and try again!
        </p>
        <button
          onClick={() => {
            localStorage.removeItem("auth_token"); // Force clearing any broken tokens
            window.location.reload();
          }}
          className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-red-700"
        >
          Clear Token & Retry
        </button>
      </div>
    );
  }
=======
import React, { useState } from 'react';
import Link from 'next/link';

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  change: string;
  changeType: 'up' | 'down' | 'neutral';
  bg: string;
  delay: number;
}

const stats: Stat[] = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    value: "₦1,600,000",
    label: "Total Funds Raised",
    change: "+12.5%",
    changeType: 'up',
    bg: "from-emerald-500 to-emerald-600",
    delay: 100,
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    value: "₦245,000",
    label: "Available Balance",
    change: "Withdrawable",
    changeType: 'neutral',
    bg: "from-blue-500 to-blue-600",
    delay: 200,
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    value: "142",
    label: "Active Backers",
    change: "+8 this week",
    changeType: 'up',
    bg: "from-violet-500 to-violet-600",
    delay: 300,
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    value: "80%",
    label: "Goal Progress",
    change: "₦400K remaining",
    changeType: 'neutral',
    bg: "from-amber-500 to-amber-600",
    delay: 400,
  },
];

interface Donation {
  donor: string;
  amount: string;
  date: string;
  status: 'Completed' | 'Pending';
  campaign: string;
  initials: string;
  avatarBg: string;
}

const recentDonations: Donation[] = [
  { donor: "Chioma O.", amount: "₦50,000", date: "Jul 5, 2026", status: "Completed", campaign: "Community Clinic Renovation", initials: "CO", avatarBg: "from-pink-500 to-rose-500" },
  { donor: "Emeka N.", amount: "₦25,000", date: "Jul 4, 2026", status: "Completed", campaign: "Community Clinic Renovation", initials: "EN", avatarBg: "from-blue-500 to-cyan-500" },
  { donor: "Aisha B.", amount: "₦10,000", date: "Jul 3, 2026", status: "Pending", campaign: "School Supplies Drive", initials: "AB", avatarBg: "from-amber-500 to-orange-500" },
  { donor: "Tunde A.", amount: "₦100,000", date: "Jul 2, 2026", status: "Completed", campaign: "Emergency Flood Relief", initials: "TA", avatarBg: "from-emerald-500 to-teal-500" },
  { donor: "Ngozi E.", amount: "₦15,000", date: "Jul 1, 2026", status: "Completed", campaign: "Community Clinic Renovation", initials: "NE", avatarBg: "from-purple-500 to-violet-500" },
];

const activities = [
  { action: "New donation received", detail: "₦50,000 from Chioma O.", time: "2 hours ago", type: "donation" },
  { action: "Campaign milestone reached", detail: "80% of funding goal achieved", time: "5 hours ago", type: "milestone" },
  { action: "Withdrawal processed", detail: "₦150,000 to verified bank account", time: "1 day ago", type: "withdrawal" },
  { action: "New backer joined", detail: "Emeka N. backed your campaign", time: "2 days ago", type: "backer" },
];

function SparklineChart() {
  const points = [35, 50, 42, 65, 58, 72, 68, 85, 78, 90, 82, 95];
  const width = 200;
  const height = 50;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width;
    const y = height - ((p - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  });
  const d = `M ${coords.join(' L ')}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L ${width},${height} L 0,${height} Z`} fill="url(#spark-gradient)" />
      <path d={d} fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={coords[coords.length-1].split(',')[0]} cy={coords[coords.length-1].split(',')[1]} r="3" fill="var(--primary)" stroke="white" strokeWidth="2" />
    </svg>
  );
}

export default function BeneficiaryDashboard() {
  const [notifications] = useState(3);

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto">

      {/* Welcome Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 animate-fade-in-down">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-primary/25 ring-4 ring-white/50 dark:ring-white/10">
              JD
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-success border-2 border-white dark:border-surface text-[9px] font-bold text-white">
              <svg fill="currentColor" viewBox="0 0 20 20" className="h-3 w-3">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-heading">
                Welcome back, John
              </h1>
              <span className="hidden sm:inline-flex h-2 w-2 rounded-full bg-success animate-pulse-soft" />
            </div>
            <p className="text-sm text-text-body">
              Here&apos;s what&apos;s happening with your campaigns today.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/60 backdrop-blur-md border border-white/60 shadow-sm hover:bg-white/90 transition-all dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 group">
            <svg className="h-5 w-5 text-text-heading dark:text-white/80 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {notifications > 0 && (
              <span className="counter-badge absolute -right-1.5 -top-1.5 shadow-lg shadow-error/30">
                {notifications}
              </span>
            )}
          </button>
          <Link href="/beneficiary/campaigns">
            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-dark px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create Campaign
            </button>
          </Link>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-5 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl hover:shadow-xl hover:border-white/80 dark:hover:border-white/10 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${stat.delay}ms` }}
          >
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br opacity-[0.08] dark:opacity-[0.12] blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-[0.15]" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.bg} text-white dark:text-gray-900 shadow-md`}>
                  {stat.icon}
                </div>
                {stat.changeType === 'up' && (
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    {stat.change}
                  </span>
                )}
                {stat.changeType === 'neutral' && (
                  <span className="text-[11px] font-medium text-text-muted">{stat.change}</span>
                )}
              </div>
              <p className="text-2xl font-black tracking-tight text-text-heading">{stat.value}</p>
              <p className="mt-0.5 text-sm text-text-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

        {/* Left Column - Campaign + Chart */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* Primary Campaign Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl hover:shadow-xl transition-all duration-300 animate-fade-in-up delay-200">
            <div className="relative h-56 w-full overflow-hidden sm:h-64">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
                alt="Community Clinic Renovation"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute left-4 top-4 flex gap-2">
                <span className="bg-white/90 backdrop-blur-md text-primary px-3 py-1.5 rounded-full text-xs font-bold shadow-sm dark:bg-black/70 dark:text-white">
                  Medical & Health
                </span>
                <span className="bg-white/90 backdrop-blur-md text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm dark:bg-black/70 dark:text-emerald-400">
                  Active
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Created Jun 15, 2026</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-text-heading">
                    Community Clinic Renovation
                  </h2>
                  <p className="mt-1 text-sm text-text-body">
                    Renovating the maternity ward and installing solar power for reliable medical care.
                  </p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>

              {/* Progress Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black tracking-tight text-text-heading">80%</span>
                    <span className="text-sm text-text-muted">of ₦2,000,000 goal</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-xs text-text-muted">
                    <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse-soft" />
                    12 days remaining
                  </div>
                </div>
                <div className="relative h-3 w-full rounded-full bg-white/60 dark:bg-white/5 overflow-hidden shadow-inner">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary via-primary-light to-secondary transition-all duration-1000 ease-out"
                    style={{ width: "80%" }}
                  />
                  <div className="absolute right-[20%] top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white dark:bg-gray-800 shadow-md border-2 border-primary" />
                </div>
              </div>

              {/* Mini Metric Grid */}
              <div className="mb-6 grid grid-cols-3 gap-4 rounded-xl bg-white/40 dark:bg-white/[0.04] p-4 border border-white/40 dark:border-white/[0.04]">
                {[
                  { label: "Raised", value: "₦1,600,000", accent: "text-emerald-600 dark:text-emerald-400" },
                  { label: "Backers", value: "142", accent: "text-primary" },
                  { label: "Days Left", value: "12", accent: "text-amber-600 dark:text-amber-400" },
                ].map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="text-xs text-text-muted uppercase tracking-wider font-medium">{m.label}</p>
                    <p className={`text-lg font-black tracking-tight mt-0.5 ${m.accent}`}>{m.value}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/beneficiary/campaigns/1" className="flex-1">
                  <button className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-dark px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200">
                    Manage Campaign
                  </button>
                </Link>
                <button className="flex-1 rounded-xl border border-border bg-white/50 dark:bg-white/[0.04] px-5 py-3 text-sm font-bold text-text-heading hover:bg-white/80 dark:hover:bg-white/[0.08] hover:border-text-muted/30 transition-all duration-200 flex items-center justify-center gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share Campaign
                </button>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl animate-fade-in-up delay-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-text-heading">Recent Activity</h3>
              <button className="text-xs font-bold text-primary hover:underline">View All</button>
            </div>
            <div className="space-y-0">
              {activities.map((activity, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-border/50 last:border-0">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    activity.type === 'donation' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    activity.type === 'milestone' ? 'bg-primary/10 text-primary' :
                    activity.type === 'withdrawal' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                    'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400'
                  }`}>
                    {activity.type === 'donation' && (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {activity.type === 'milestone' && (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {activity.type === 'withdrawal' && (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    )}
                    {activity.type === 'backer' && (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-text-heading">{activity.action}</p>
                    <p className="text-xs text-text-muted mt-0.5">{activity.detail}</p>
                  </div>
                  <span className="text-[11px] text-text-muted whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Donations + Quick Stats */}
        <div className="flex flex-col gap-8">

          {/* Revenue Trend Mini Chart */}
          <div className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl animate-fade-in-up delay-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-text-heading">Revenue Trend</h3>
                <p className="text-xs text-text-muted">Last 12 months</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +18.3%
              </span>
            </div>
            <div className="h-[120px]">
              <SparklineChart />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-border/50">
              {[
                { label: "This Month", value: "₦285K", accent: "text-primary" },
                { label: "Avg. Donation", value: "₦12,500", accent: "text-text-heading" },
                { label: "Best Day", value: "Jul 2", accent: "text-emerald-600 dark:text-emerald-400" },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <p className={`text-sm font-black ${m.accent}`}>{m.value}</p>
                  <p className="text-[10px] text-text-muted mt-0.5 uppercase tracking-wider">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Donations */}
          <div className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl animate-fade-in-up delay-200 flex-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-text-heading">Recent Donations</h3>
              <button className="text-xs font-bold text-primary hover:underline">View All</button>
            </div>
            <div className="flex flex-col gap-4">
              {recentDonations.map((donation, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-border/40 last:border-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${donation.avatarBg} text-white text-xs font-bold shadow-sm`}>
                      {donation.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-text-heading truncate">{donation.donor}</p>
                      <p className="text-[11px] text-text-muted truncate">{donation.campaign}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0 ml-3">
                    <span className="text-sm font-bold text-text-heading">{donation.amount}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${
                      donation.status === "Completed"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-amber-600 dark:text-amber-400"
                    }`}>
                      {donation.status === "Completed" ? (
                        <span className="flex items-center gap-1">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {donation.date}
                        </span>
                      ) : donation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {recentDonations.length === 0 && (
              <p className="text-center text-text-muted py-8">No donations yet.</p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 animate-fade-in-up delay-300">
            {[
              { label: "Campaigns", value: "3", accent: "from-primary to-primary-light" },
              { label: "Completed", value: "7", accent: "from-success to-success-light" },
            ].map((q) => (
              <div key={q.label} className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-5 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl hover:shadow-xl transition-all duration-300 group">
                <div className={`absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br ${q.accent} opacity-[0.08] dark:opacity-[0.12] blur-xl group-hover:opacity-[0.15] group-hover:scale-150 transition-all duration-500`} />
                <p className="relative text-3xl font-black tracking-tight text-text-heading">{q.value}</p>
                <p className="relative text-sm text-text-muted mt-0.5">{q.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
}
