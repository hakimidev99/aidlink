"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function PrimaryCampaignCard() {
  const [copied, setCopied] = useState(false);

  // Mock data - This can easily be replaced by props passed from the parent page
  const campaignData = {
    id: 1,
    title: "Community Clinic Renovation",
    category: "Medical Aid",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    raised: 1600000,
    goal: 2000000,
    progress: 80,
    donors: 142,
    daysLeft: 12,
  };

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  // Functionality: Share Campaign Link
  const handleShare = () => {
    // In production, this would be your actual domain (e.g., https://aidlink.com/campaigns/1)
    const shareLink = `localhost:3000/beneficiary/campaigns/${campaignData.id}`;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 lg:col-span-2 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-heading dark:text-white">Primary Campaign Status</h2>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          Active Now
        </span>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-6 rounded-3xl border border-white/50 bg-white/40 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
        
        {/* Left Side: Campaign Image */}
        <div className="relative h-48 w-full sm:w-1/3 shrink-0 overflow-hidden rounded-2xl bg-surface-dim shadow-inner">
          <img 
            src={campaignData.image} 
            alt={campaignData.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute left-3 top-3">
            <span className="bg-white/90 backdrop-blur-md text-primary px-3 py-1 rounded-full text-xs font-bold shadow-sm dark:bg-black/70 dark:text-white">
              {campaignData.category}
            </span>
          </div>
        </div>

        {/* Right Side: Details & Actions */}
        <div className="flex flex-1 flex-col justify-between">
          
          {/* Title & Quick Stats */}
          <div>
            <h3 className="text-2xl font-bold text-text-heading dark:text-white line-clamp-1">
              {campaignData.title}
            </h3>
            <div className="mt-2 flex items-center gap-4 text-xs font-medium text-text-muted">
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                {campaignData.donors} Backers
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {campaignData.daysLeft} Days Left
              </span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-text-heading dark:text-white">
                Raised: <span className="text-primary">{formatCurrency(campaignData.raised)}</span>
              </span>
              <span className="text-text-muted">Goal: {formatCurrency(campaignData.goal)}</span>
            </div>
            
            <div className="relative h-3 w-full rounded-full bg-white/50 dark:bg-white/10 overflow-hidden shadow-inner">
              <div 
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                style={{ width: `${campaignData.progress}%` }} 
              />
            </div>
            <span className="text-right text-xs font-bold text-primary">{campaignData.progress}% Funded</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-3 pt-4 border-t border-border-glass">
            <Link href={`/beneficiary/campaigns/${campaignData.id}`} className="flex-1">
              <Button className="w-full shadow-md shadow-primary/20">
                Manage Campaign
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              onClick={handleShare}
              className={`w-[120px] bg-white/50 transition-colors dark:bg-black/20 ${copied ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : ''}`}
            >
              {copied ? 'Copied!' : 'Share'}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}