// ==========================================
// FILE: primary-campaign-card.tsx
// ==========================================
"use client";

import React from "react";
import Image from "next/image";

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
        </div>
      </div>
    </div>
  );
}
