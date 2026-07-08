// ==========================================
// FILE: primary-campaign-card.tsx
// ==========================================
"use client";

import React from "react";
import Image from "next/image";

<<<<<<< HEAD
interface CampaignProps {
  campaignData?: {
    title: string;
    description: string;
    image: string;
    category: string;
    raised: number;
    target: number;
  } | null;
}

export default function PrimaryCampaignCard({ campaignData }: CampaignProps) {
  if (!campaignData) {
    return (
      <div className="flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm font-medium text-slate-400 dark:border-slate-800 dark:bg-slate-950">
        <p>No active campaign details found at this time.</p>
      </div>
    );
  }

  const targetAmount = campaignData.target || 1;
  const raisedAmount = campaignData.raised || 0;
  const completionPercentage = Math.min(
    (raisedAmount / targetAmount) * 100,
    100,
  );

  return (
    <div className="flex flex-col sm:flex-row w-full gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      {/* Media Box */}
      <div className="relative h-44 w-full sm:w-1/3 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900">
        <Image
          src={campaignData.image || "/placeholder-campaign.jpg"}
          alt={campaignData.title || "Campaign cover image"}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          priority
          className="object-cover transition-transform duration-500 hover:scale-102"
        />
        {campaignData.category && (
          <div className="absolute left-3 top-3 rounded-md bg-white/90 dark:bg-slate-900/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 shadow-xs">
            {campaignData.category}
=======
interface PrimaryCampaignCardProps {
  campaign: {
    id: number;
    title: string;
    category: string;
    image: string;
    raised: number;
    goal: number;
    progress: number;
    donors: number;
    daysLeft: number;
  };
  manageHref?: string;
}

export function PrimaryCampaignCard({ campaign, manageHref }: PrimaryCampaignCardProps) {
  const [copied, setCopied] = useState(false);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

  const handleShare = () => {
    const shareLink = `${window.location.origin}/campaigns/${campaign.id}`;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 lg:col-span-2 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-heading">Primary Campaign Status</h2>
        <span className="flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          Active Now
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 rounded-2xl border border-border bg-surface p-6 shadow-card">
        <div className="relative h-48 w-full sm:w-1/3 shrink-0 overflow-hidden rounded-xl bg-surface-tertiary">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <span className="bg-white/90 backdrop-blur-md text-primary px-3 py-1 rounded-full text-xs font-bold shadow-sm dark:bg-black/70 dark:text-white">
              {campaign.category}
            </span>
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
          </div>
        )}
      </div>

      {/* Campaign Content Details */}
      <div className="flex flex-col justify-between flex-1 py-0.5 min-w-0">
        <div>
          <h3 className="font-bold text-lg tracking-tight text-slate-900 dark:text-white mb-1.5 truncate">
            {campaignData.title || "Untitled Campaign"}
          </h3>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
            {campaignData.description ||
              "No description provided for this campaign."}
          </p>
        </div>

<<<<<<< HEAD
        {/* Progress System */}
        <div className="mt-auto">
          <div className="flex justify-between items-end text-xs font-medium mb-2">
            <span className="text-slate-400 dark:text-slate-500">
              Raised{" "}
              <strong className="text-sm font-bold text-slate-900 dark:text-white">
                ₦{raisedAmount.toLocaleString()}
              </strong>
            </span>
            <span className="text-slate-400 dark:text-slate-500">
              Target: ₦{targetAmount.toLocaleString()}
            </span>
          </div>

          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
=======
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-text-heading line-clamp-1">{campaign.title}</h3>
            <div className="mt-2 flex items-center gap-4 text-xs font-medium text-text-muted">
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                {campaign.donors} Backers
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {campaign.daysLeft} Days Left
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-text-heading">
                Raised: <span className="text-primary">{formatCurrency(campaign.raised)}</span>
              </span>
              <span className="text-text-muted">Goal: {formatCurrency(campaign.goal)}</span>
            </div>

            <div className="relative h-3 w-full rounded-full bg-surface-tertiary overflow-hidden shadow-inner">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                style={{ width: `${campaign.progress}%` }}
              />
            </div>
            <span className="text-right text-xs font-bold text-primary">{campaign.progress}% Funded</span>
          </div>

          <div className="mt-4 flex gap-3 pt-4 border-t border-border">
            <Link href={manageHref || `/campaigns/${campaign.id}`} className="flex-1">
              <Button className="w-full shadow-md shadow-primary/20">Manage Campaign</Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleShare}
              className={`w-[120px] transition-colors ${copied ? 'border-success text-success' : ''}`}
            >
              {copied ? 'Copied!' : 'Share'}
            </Button>
          </div>
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
        </div>
      </div>
    </div>
  );
}
