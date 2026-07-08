"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/public/navbar';
import { Footer } from '@/components/public/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Campaign {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  raised: number;
  goal: number;
  progress: number;
  backers: number;
  daysLeft: number;
}

const categories = ['All', 'Education', 'Healthcare', 'Food', 'Emergency'];

const allCampaigns: Campaign[] = [
  {
    id: 1,
    title: 'Clean Water for Rural Communities',
    category: 'Healthcare',
    description: 'Bringing clean drinking water to 5,000 people in rural villages through borehole drilling.',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777190?auto=format&fit=crop&w=800&q=80',
    raised: 28450,
    goal: 50000,
    progress: 57,
    backers: 89,
    daysLeft: 14,
  },
  {
    id: 2,
    title: 'School Supplies for District 4',
    category: 'Education',
    description: 'Providing books, uniforms, and learning materials to 500 underprivileged students.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    raised: 12500,
    goal: 25000,
    progress: 50,
    backers: 42,
    daysLeft: 21,
  },
  {
    id: 3,
    title: 'Emergency Food Relief Program',
    category: 'Food',
    description: 'Distributing emergency food packages to families affected by recent flooding.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    raised: 18750,
    goal: 30000,
    progress: 62,
    backers: 67,
    daysLeft: 10,
  },
  {
    id: 4,
    title: 'Community Clinic Renovation',
    category: 'Healthcare',
    description: 'Renovating the maternity ward and installing solar power for reliable medical care.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    raised: 1600000,
    goal: 2000000,
    progress: 80,
    backers: 142,
    daysLeft: 12,
  },
  {
    id: 5,
    title: 'Vocational Training Center',
    category: 'Education',
    description: 'Building a vocational training center to teach skills to 300 young adults.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    raised: 8000,
    goal: 45000,
    progress: 18,
    backers: 23,
    daysLeft: 45,
  },
  {
    id: 6,
    title: 'Disaster Relief Emergency Fund',
    category: 'Emergency',
    description: 'Rapid response fund for communities affected by natural disasters and emergencies.',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=800&q=80',
    raised: 32000,
    goal: 100000,
    progress: 32,
    backers: 115,
    daysLeft: 30,
  },
];

export default function BrowseCampaigns() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCampaigns = allCampaigns.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="gradient-hero relative overflow-hidden min-h-[50vh] flex items-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 relative">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                Discover Campaigns
              </h1>
              <p className="mt-4 text-lg text-white/70">
                Browse verified campaigns and make a direct impact on communities in need.
              </p>
              <div className="mt-8 max-w-lg mx-auto">
                <Input
                  placeholder="Search campaigns..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  icon={
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white dark:text-gray-900 shadow-md shadow-primary/25'
                    : 'bg-surface-secondary text-text-body hover:bg-surface-tertiary border border-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredCampaigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface-secondary">
                <svg className="h-10 w-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-heading mb-2">No campaigns match your search</h3>
              <p className="text-text-body mb-6 max-w-md">
                Try adjusting your search terms or selecting a different category.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch('');
                  setActiveCategory('All');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCampaigns.map((campaign) => (
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
                    <h3 className="text-lg font-bold text-text-heading mb-2 line-clamp-1">{campaign.title}</h3>
                    <p className="text-sm text-text-body mb-4 line-clamp-2">{campaign.description}</p>

                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-text-heading">${campaign.raised.toLocaleString()}</span>
                      <span className="text-text-muted">raised of ${campaign.goal.toLocaleString()}</span>
                    </div>

                    <div className="relative h-2.5 w-full rounded-full bg-surface-tertiary overflow-hidden mb-3">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-text-muted mb-4">
                      <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {campaign.backers} backers
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {campaign.daysLeft} days left
                      </span>
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
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
