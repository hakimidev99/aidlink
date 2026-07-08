"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/public/navbar';
import { Footer } from '@/components/public/footer';
import { Button } from '@/components/ui/button';

type Tab = 'overview' | 'updates' | 'donors';

interface Update {
  id: number;
  date: string;
  title: string;
  content: string;
  image: string;
}

const donorColors = [
  'from-pink-500 to-rose-500',
  'from-blue-500 to-cyan-500',
  'from-amber-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-purple-500 to-violet-500',
];

export default function DonorCampaignDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationStep, setDonationStep] = useState<'amount' | 'confirm'>('amount');
  const [donateError, setDonateError] = useState('');

  const campaign = {
    id,
    title: 'Clean Water for Rural Communities',
    category: 'Healthcare',
    heroImage: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777190?auto=format&fit=crop&w=1200&q=80',
    description:
      'Access to clean water is a fundamental human right, yet over 5,000 people in rural villages lack this basic necessity. This campaign will fund the drilling of boreholes, installation of water purification systems, and training of local maintenance teams to ensure sustainable access to clean drinking water for generations to come. Every dollar brings us one step closer to a future where no one has to walk miles for clean water.',
    organizer: 'Clean Water Initiative NGO',
    raised: 28450,
    goal: 50000,
    progress: 57,
    backers: 89,
    daysLeft: 14,
    updates: [
      {
        id: 1,
        date: 'June 25, 2026',
        title: 'Site Assessment Completed!',
        content: 'Our engineering team has completed the geological survey for the first borehole location. The water table is at an ideal depth of 120 feet. Drilling equipment has been mobilized.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 2,
        date: 'June 10, 2026',
        title: 'Community Town Hall Held',
        content: 'We held a community meeting with village leaders and residents to discuss the project plan. Over 200 community members attended and the project received overwhelming support.',
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
      },
    ],
    donorList: [
      { initials: 'CO', name: 'Chioma O.', amount: '$500', time: '2 hours ago' },
      { initials: 'EN', name: 'Emeka N.', amount: '$250', time: '1 day ago' },
      { initials: 'AB', name: 'Aisha B.', amount: '$100', time: '2 days ago' },
      { initials: 'TA', name: 'Tunde A.', amount: '$1,000', time: '3 days ago' },
      { initials: 'NE', name: 'Ngozi E.', amount: '$150', time: '4 days ago' },
    ],
  };

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;

  const quickAmounts = [25, 50, 100, 250, 500];

  const handleDonateClick = (amount: number) => {
    setDonationAmount(amount.toString());
    setCustomAmount('');
    setDonationStep('confirm');
    setDonateError('');
  };

  const handleCustomDonate = () => {
    if (!customAmount || Number(customAmount) < 1) {
      setDonateError('Please enter a valid donation amount.');
      return;
    }
    setDonationAmount(customAmount);
    setDonationStep('confirm');
    setDonateError('');
  };

  const handleConfirmDonation = () => {
    alert(`Thank you for your donation of $${Number(donationAmount).toLocaleString()}!\n\nYou are supporting:\n${campaign.title}\n\nA confirmation receipt will be sent to your email.`);
    setShowDonateModal(false);
    setDonationStep('amount');
    setDonationAmount('');
    setCustomAmount('');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          {/* Back Navigation */}
          <Link
            href="/donor/campaigns"
            className="group mb-8 inline-flex w-fit items-center gap-2 rounded-xl border border-white/60 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.03] px-4 py-2 text-sm font-bold text-text-body shadow-sm backdrop-blur-xl transition-all hover:bg-white/80 dark:hover:bg-white/[0.06]"
          >
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Campaigns
          </Link>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

            {/* Left Column */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Hero Image */}
              <div className="group relative h-[300px] w-full overflow-hidden rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] shadow-lg dark:shadow-black/20 backdrop-blur-xl sm:h-[400px]">
                <img
                  src={campaign.heroImage}
                  alt={campaign.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-3 sm:bottom-6 sm:left-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-primary shadow-sm dark:bg-black/70 dark:text-white">
                      {campaign.category}
                    </span>
                  </div>
                  <h1 className="text-2xl font-extrabold text-white drop-shadow-lg sm:text-3xl lg:text-4xl">
                    {campaign.title}
                  </h1>
                  <p className="text-sm text-white/80 flex items-center gap-1.5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Organized by {campaign.organizer}
                  </p>
                </div>
              </div>

              {/* Tabs Card */}
              <div className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
                <div className="flex border-b border-border/50 bg-white/20 dark:bg-white/[0.02] px-3 pt-2 overflow-x-auto scrollbar-hide">
                  {(['overview', 'updates', 'donors'] as Tab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative px-5 py-3.5 text-sm font-bold capitalize whitespace-nowrap transition-colors ${
                        activeTab === tab
                          ? 'text-primary'
                          : 'text-text-muted hover:text-text-heading'
                      }`}
                    >
                      {tab}
                      {tab === 'updates' && ` (${campaign.updates.length})`}
                      {tab === 'donors' && ` (${campaign.donorList.length})`}
                      {activeTab === tab && (
                        <span className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="p-6 sm:p-8">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="flex flex-col gap-6 animate-fade-in">
                      <div>
                        <h3 className="flex items-center gap-2 text-lg font-bold text-text-heading mb-3">
                          <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          About This Campaign
                        </h3>
                        <p className="text-text-body leading-relaxed">{campaign.description}</p>
                      </div>
                      <div>
                        <h3 className="flex items-center gap-2 text-lg font-bold text-text-heading mb-3">
                          <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Organizer
                        </h3>
                        <p className="text-text-body">{campaign.organizer}</p>
                      </div>
                      <div className="flex items-center gap-2 rounded-xl bg-primary/5 dark:bg-primary/[0.04] border border-primary/10 px-4 py-3 text-sm text-text-muted">
                        <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        This campaign is verified by AidLink. All funds are tracked and milestone-based.
                      </div>
                    </div>
                  )}

                  {/* Updates Tab */}
                  {activeTab === 'updates' && (
                    <div className="flex flex-col gap-6 animate-fade-in">
                      {campaign.updates.length === 0 ? (
                        <p className="text-center py-12 text-text-muted">No updates posted yet.</p>
                      ) : (
                        campaign.updates.map((update) => (
                          <div
                            key={update.id}
                            className="group flex flex-col gap-5 rounded-2xl bg-white/40 dark:bg-white/[0.04] border border-white/40 dark:border-white/[0.04] p-5 sm:flex-row transition-all hover:bg-white/60 dark:hover:bg-white/[0.06]"
                          >
                            <div className="h-48 w-full shrink-0 overflow-hidden rounded-xl bg-surface-tertiary sm:h-36 sm:w-44">
                              <img src={update.image} alt={update.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <div className="flex flex-1 flex-col gap-2">
                              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{update.date}</span>
                              <h3 className="text-lg font-bold text-text-heading">{update.title}</h3>
                              <p className="text-sm text-text-body leading-relaxed">{update.content}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* Donors Tab */}
                  {activeTab === 'donors' && (
                    <div className="flex flex-col gap-2 animate-fade-in">
                      {campaign.donorList.length === 0 ? (
                        <p className="text-center py-12 text-text-muted">Be the first to donate!</p>
                      ) : (
                        campaign.donorList.map((donor, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-xl bg-white/30 dark:bg-white/[0.03] px-4 py-3.5 transition-all hover:bg-white/60 dark:hover:bg-white/[0.06]"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${donorColors[i % donorColors.length]} text-white text-xs font-bold shadow-sm`}>
                                {donor.initials}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-text-heading truncate">{donor.name}</p>
                                <p className="text-xs text-text-muted">{donor.time}</p>
                              </div>
                            </div>
                            <span className="shrink-0 ml-3 text-sm font-bold text-emerald-600 dark:text-emerald-400">{donor.amount}</span>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column — Sticky Stats & Donate */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 flex flex-col gap-6 rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
                {/* Raised Amount */}
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-black tracking-tight text-primary">{formatCurrency(campaign.raised)}</span>
                    <span className="text-sm font-bold text-text-muted">raised</span>
                  </div>
                  <span className="text-sm text-text-body">of {formatCurrency(campaign.goal)} goal</span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-3 w-full rounded-full bg-white/60 dark:bg-white/5 overflow-hidden shadow-inner">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary via-primary-light to-secondary transition-all duration-1000 ease-out"
                    style={{ width: `${campaign.progress}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white dark:bg-gray-800 shadow-md border-2 border-primary transition-all duration-1000 ease-out"
                    style={{ left: `calc(${campaign.progress}% - 10px)` }}
                  />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 rounded-xl bg-white/40 dark:bg-white/[0.04] p-4 border border-white/40 dark:border-white/[0.04]">
                  <div className="text-center">
                    <p className="text-xl font-black tracking-tight text-text-heading">{campaign.progress}%</p>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider font-medium mt-0.5">Funded</p>
                  </div>
                  <div className="text-center border-x border-border/40">
                    <p className="text-xl font-black tracking-tight text-text-heading">{campaign.backers}</p>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider font-medium mt-0.5">Backers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-black tracking-tight text-text-heading">{campaign.daysLeft}</p>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider font-medium mt-0.5">Days Left</p>
                  </div>
                </div>

                {/* Donate Button */}
                <button
                  onClick={() => setShowDonateModal(true)}
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-dark px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Donate Now
                </button>

                <p className="text-xs text-text-muted text-center leading-relaxed">
                  Your donation is secure and tracked. You will receive a receipt via email.
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />

      {/* DONATE MODAL */}
      {showDonateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-white/80 dark:bg-black/80 border border-white/60 dark:border-white/[0.06] p-6 shadow-2xl backdrop-blur-2xl animate-scale-in sm:p-8">

            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-text-heading">
                  {donationStep === 'amount' ? 'Make a Donation' : 'Confirm Donation'}
                </h2>
                <p className="text-sm text-text-muted mt-0.5">{campaign.title}</p>
              </div>
              <button
                onClick={() => { setShowDonateModal(false); setDonationStep('amount'); setDonationAmount(''); setCustomAmount(''); setDonateError(''); }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
              >
                <svg className="h-5 w-5 text-text-heading" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {donationStep === 'amount' ? (
              <div className="flex flex-col gap-5">
                <p className="text-sm text-text-body">Select an amount to donate:</p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {quickAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handleDonateClick(amt)}
                      className="rounded-xl border border-white/40 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.03] px-4 py-4 text-center font-bold text-text-heading transition-all hover:border-primary hover:bg-primary/5 hover:shadow-md"
                    >
                      <span className="text-lg">${amt}</span>
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <span className="relative flex justify-center text-xs text-text-muted">
                    <span className="bg-white/80 dark:bg-black/80 px-3">or enter a custom amount</span>
                  </span>
                </div>

                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-text-muted">$</span>
                    <input
                      type="number"
                      min="1"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setDonateError(''); }}
                      className="w-full rounded-xl border border-border bg-surface pl-8 pr-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <Button onClick={handleCustomDonate} className="px-8 shadow-md shadow-primary/20">
                    Donate
                  </Button>
                </div>
                {donateError && <p className="text-xs font-bold text-error">{donateError}</p>}
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <div className="rounded-2xl bg-primary/5 dark:bg-primary/[0.04] border border-primary/10 p-5 text-center">
                  <p className="text-sm text-text-muted mb-1">Your Donation</p>
                  <p className="text-4xl font-black text-primary">${Number(donationAmount).toLocaleString()}</p>
                </div>

                <div className="space-y-3 rounded-xl bg-white/40 dark:bg-white/[0.04] p-4 border border-white/40 dark:border-white/[0.04]">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Campaign</span>
                    <span className="font-bold text-text-heading text-right max-w-[60%]">{campaign.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Organizer</span>
                    <span className="font-bold text-text-heading">{campaign.organizer}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Platform Fee</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Free</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-sm">
                    <span className="font-bold text-text-heading">Total</span>
                    <span className="font-black text-text-heading">${Number(donationAmount).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-success/5 border border-success/10">
                  <svg className="h-5 w-5 shrink-0 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p className="text-xs text-success font-medium">100% of your donation goes to the campaign. AidLink charges no platform fees.</p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setDonationStep('amount')}
                  >
                    Change Amount
                  </Button>
                  <Button
                    onClick={handleConfirmDonation}
                    className="bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 px-8"
                  >
                    Confirm ${Number(donationAmount).toLocaleString()}
                  </Button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
