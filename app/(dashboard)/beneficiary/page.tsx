"use client";

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
}
