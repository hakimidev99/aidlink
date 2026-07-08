"use client";

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/public/navbar';
import { Footer } from '@/components/public/footer';
import { Button } from '@/components/ui/button';

const stats = [
  {
    value: '$2,450',
    label: 'Total Donated',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'bg-success/10 text-success',
  },
  {
    value: '12',
    label: 'Campaigns Supported',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'bg-primary/10 text-primary',
  },
  {
    value: '47',
    label: 'Lives Impacted',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'bg-accent/10 text-accent-dark',
  },
];

const recommendedCampaigns = [
  {
    id: 1,
    title: 'Clean Water for Rural Communities',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777190?auto=format&fit=crop&w=800&q=80',
    raised: 28450,
    goal: 50000,
    progress: 57,
    daysLeft: 14,
  },
  {
    id: 2,
    title: 'School Supplies for District 4',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    raised: 12500,
    goal: 25000,
    progress: 50,
    daysLeft: 21,
  },
  {
    id: 3,
    title: 'Emergency Food Relief Program',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    raised: 18750,
    goal: 30000,
    progress: 62,
    daysLeft: 10,
  },
];

const impactTimeline = [
  {
    campaign: 'Clean Water Borehole Project',
    amount: '$500',
    date: 'Jun 28, 2026',
    status: 'Delivered',
    description: 'Borehole drilling completed. Community now has access to clean water.',
  },
  {
    campaign: 'School Supplies for District 4',
    amount: '$250',
    date: 'Jun 15, 2026',
    status: 'In Progress',
    description: 'Supplies being distributed to 120 students.',
  },
  {
    campaign: 'Emergency Flood Relief',
    amount: '$1,000',
    date: 'May 30, 2026',
    status: 'Delivered',
    description: 'Food and medical supplies delivered to 45 families.',
  },
  {
    campaign: 'Community Clinic Renovation',
    amount: '$700',
    date: 'May 12, 2026',
    status: 'Delivered',
    description: 'Maternity ward equipment installed and operational.',
  },
];

export default function DonorDashboard() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-text-heading sm:text-4xl">
              Welcome back, Sarah
            </h1>
            <p className="mt-2 text-text-body">Track your impact and discover campaigns making a difference.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-12">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-5 rounded-2xl border border-border bg-surface p-6 shadow-card transition-all hover:shadow-card-lg"
              >
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-black text-text-heading">{stat.value}</p>
                  <p className="text-sm text-text-muted">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text-heading">Recommended Campaigns</h2>
              <Link href="/donor/campaigns" className="text-sm font-bold text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommendedCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="group flex flex-col rounded-2xl border border-border bg-surface shadow-card transition-all hover:shadow-card-lg overflow-hidden"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-surface-tertiary">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute left-3 top-3">
                      <span className="bg-white/90 backdrop-blur-md text-primary px-3 py-1.5 rounded-full text-xs font-bold shadow-sm dark:bg-black/70 dark:text-white">
                        {campaign.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-text-heading mb-3 line-clamp-2">{campaign.title}</h3>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-text-heading">${campaign.raised.toLocaleString()}</span>
                      <span className="text-text-muted">raised of ${campaign.goal.toLocaleString()}</span>
                    </div>
                    <div className="relative h-2.5 w-full rounded-full bg-surface-tertiary overflow-hidden mb-4">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-text-muted mb-4">
                      <span>{campaign.progress}% funded</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                    <div className="mt-auto">
                      <Link href={`/donor/campaigns/${campaign.id}`}>
                        <Button variant="primary" className="w-full text-sm shadow-md shadow-primary/20">
                          Donate Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-text-heading mb-6">My Impact</h2>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-8">
                {impactTimeline.map((item, i) => (
                  <div key={i} className="relative flex gap-6">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-surface">
                      <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 rounded-2xl border border-border bg-surface p-5 shadow-card">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <h4 className="font-bold text-text-heading">{item.campaign}</h4>
                          <p className="text-sm text-text-muted mt-0.5">{item.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-success">{item.amount}</p>
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            item.status === 'Delivered' ? 'text-success' : 'text-warning'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-text-body">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-text-heading mb-3">Ready to Make More Impact?</h2>
            <p className="text-text-body mb-6 max-w-md mx-auto">
              Browse verified campaigns and fund the causes that matter most to you.
            </p>
            <Link href="/donor/campaigns">
              <Button size="lg" className="shadow-lg shadow-primary/25">
                Discover More Campaigns
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
