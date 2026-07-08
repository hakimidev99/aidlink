"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Tab = 'overview' | 'updates' | 'donors';

interface Update {
  id: number;
  date: string;
  title: string;
  content: string;
  image: string;
}

interface Donor {
  initials: string;
  name: string;
  amount: string;
  time: string;
}

const donorColors = [
  'from-pink-500 to-rose-500',
  'from-blue-500 to-cyan-500',
  'from-amber-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-purple-500 to-violet-500',
  'from-primary to-secondary',
  'from-accent to-accent-dark',
];

export default function CampaignDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isPostingUpdate, setIsPostingUpdate] = useState(false);

  const [campaign, setCampaign] = useState({
    id,
    title: "Community Clinic Renovation",
    category: "Medical & Health",
    status: "Active",
    heroImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Our district's primary health clinic has not been updated in over 15 years. This campaign will fund the complete renovation of the maternity ward, repair the leaking roof, and provide solar panels to ensure uninterrupted power supply for critical medical equipment. All expenses will be documented with receipts and photographic proof.",
    verificationDocs: [
      "Certificate of Registration (Clinic)",
      "Quotation from 3 contractors (signed)",
      "Community leader endorsement letter",
    ],
    partnerInfo: "Ministry of Health, Lagos State | Community Development Association",
    raised: 1600000,
    goal: 2000000,
    progress: 80,
    donorsCount: 142,
    daysLeft: 12,
    updates: [
      {
        id: 1,
        date: "June 20, 2026",
        title: "Roofing Materials Delivered!",
        content: "Thanks to your generous donations, we have purchased and received the roofing materials. Construction begins tomorrow.",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&w=800&q=80",
      },
      {
        id: 2,
        date: "June 10, 2026",
        title: "New Medical Beds Purchased",
        content: "We successfully acquired 10 new medical beds for the maternity ward. Here is the proof of purchase and delivery.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
      },
    ],
    donors: [
      { initials: "CO", name: "Chioma O.", amount: "₦50,000", time: "2 hours ago" },
      { initials: "EN", name: "Emeka N.", amount: "₦25,000", time: "1 day ago" },
      { initials: "AB", name: "Aisha B.", amount: "₦10,000", time: "2 days ago" },
      { initials: "TA", name: "Tunde A.", amount: "₦100,000", time: "3 days ago" },
      { initials: "NE", name: "Ngozi E.", amount: "₦15,000", time: "4 days ago" },
      { initials: "KO", name: "Kelechi O.", amount: "₦7,500", time: "5 days ago" },
      { initials: "FI", name: "Fatima I.", amount: "₦30,000", time: "1 week ago" },
    ],
  });

  const [editFormData, setEditFormData] = useState({
    title: campaign.title,
    description: campaign.description,
    goal: campaign.goal.toString(),
  });

  const [updateFormData, setUpdateFormData] = useState({ title: "", content: "" });
  const [updateImagePreview, setUpdateImagePreview] = useState<string | null>(null);

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  const handleUpdateImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUpdateImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGoal = Number(editFormData.goal);
    const newProgress = Math.min(Math.round((campaign.raised / newGoal) * 100), 100);
    setCampaign({ ...campaign, title: editFormData.title, description: editFormData.description, goal: newGoal, progress: newProgress });
    setIsEditing(false);
  };

  const handlePostUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUpdate: Update = {
      id: campaign.updates.length + 1,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      title: updateFormData.title,
      content: updateFormData.content,
      image: updateImagePreview || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    };
    setCampaign({ ...campaign, updates: [newUpdate, ...campaign.updates] });
    setIsPostingUpdate(false);
    setUpdateFormData({ title: "", content: "" });
    setUpdateImagePreview(null);
    setActiveTab('updates');
  };

  return (
    <div className="flex w-full max-w-7xl flex-col mx-auto pb-12 animate-fade-in">

      {/* Back Navigation */}
      <Link
        href="/beneficiary/campaigns"
        className="group mb-6 inline-flex w-fit items-center gap-2 rounded-xl border border-white/60 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.03] px-4 py-2 text-sm font-bold text-text-body shadow-sm backdrop-blur-xl transition-all hover:bg-white/80 dark:hover:bg-white/[0.06]"
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
                <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-primary shadow-sm dark:bg-black/70">
                  {campaign.category}
                </span>
                <span className="bg-emerald-500/90 dark:bg-emerald-600/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-sm">
                  {campaign.status}
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white drop-shadow-lg sm:text-3xl lg:text-4xl">
                {campaign.title}
              </h1>
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
                  {tab === 'donors' && ` (${campaign.donors.length})`}
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
                      Description
                    </h3>
                    <p className="text-text-body leading-relaxed">{campaign.description}</p>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-text-heading mb-3">
                      <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Verification Documents
                    </h3>
                    <ul className="flex flex-col gap-2">
                      {campaign.verificationDocs.map((doc, i) => (
                        <li key={i} className="flex items-center gap-3 rounded-xl bg-white/40 dark:bg-white/[0.04] px-4 py-3 text-sm text-text-body border border-white/40 dark:border-white/[0.04]">
                          <svg className="h-5 w-5 shrink-0 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-text-heading mb-3">
                      <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Partner Organizations
                    </h3>
                    <p className="text-text-body">{campaign.partnerInfo}</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-primary/5 dark:bg-primary/[0.04] border border-primary/10 px-4 py-3 text-sm text-text-muted">
                    <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Every milestone is documented in the Updates tab with receipts and visual proof.
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
                  <Button
                    onClick={() => setIsPostingUpdate(true)}
                    variant="outline"
                    className="w-full border-2 border-dashed border-border bg-transparent py-6 text-text-muted hover:border-primary/50 hover:text-primary transition-all sm:w-fit"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Post New Update / Proof
                  </Button>
                </div>
              )}

              {/* Donors Tab */}
              {activeTab === 'donors' && (
                <div className="flex flex-col gap-2 animate-fade-in">
                  {campaign.donors.map((donor, i) => (
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
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Sticky Stats & Actions */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 flex flex-col gap-6 rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
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
                <p className="text-xl font-black tracking-tight text-text-heading">{campaign.donorsCount}</p>
                <p className="text-[10px] text-text-muted uppercase tracking-wider font-medium mt-0.5">Donors</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-black tracking-tight text-text-heading">{campaign.daysLeft}</p>
                <p className="text-[10px] text-text-muted uppercase tracking-wider font-medium mt-0.5">Days Left</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setIsPostingUpdate(true)}
                className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-dark px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
              >
                Post Quick Update
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full rounded-xl border border-border bg-white/50 dark:bg-white/[0.04] px-5 py-3 text-sm font-bold text-text-heading hover:bg-white/80 dark:hover:bg-white/[0.08] transition-all duration-200"
              >
                Edit Campaign
              </button>
            </div>

            <p className="text-xs text-text-muted text-center leading-relaxed">
              Funds can only be withdrawn once verification milestones are met.
            </p>
          </div>
        </div>

      </div>

      {/* EDIT CAMPAIGN MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl rounded-2xl bg-white/80 dark:bg-black/80 border border-white/60 dark:border-white/[0.06] p-6 shadow-2xl backdrop-blur-2xl animate-scale-in sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-text-heading">Edit Campaign</h2>
              <button onClick={() => setIsEditing(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors">
                <svg className="h-5 w-5 text-text-heading" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading">Campaign Title</label>
                <input type="text" required value={editFormData.title} onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })} className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading">Funding Goal (₦)</label>
                <input type="number" required min="10000" value={editFormData.goal} onChange={(e) => setEditFormData({ ...editFormData, goal: e.target.value })} className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading">Description</label>
                <textarea required rows={4} value={editFormData.description} onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })} className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button type="submit" className="shadow-md shadow-primary/20">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POST UPDATE MODAL */}
      {isPostingUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white/80 dark:bg-black/80 border border-white/60 dark:border-white/[0.06] p-6 shadow-2xl backdrop-blur-2xl animate-scale-in sm:p-8 custom-scrollbar">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-text-heading">Post Progress & Proof</h2>
                <p className="text-sm text-text-muted mt-0.5">Share updates and upload receipts/photos.</p>
              </div>
              <button onClick={() => { setIsPostingUpdate(false); setUpdateImagePreview(null); }} className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors">
                <svg className="h-5 w-5 text-text-heading" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handlePostUpdateSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading">Update Title</label>
                <input type="text" required placeholder="e.g. Phase 1 Complete!" value={updateFormData.title} onChange={(e) => setUpdateFormData({ ...updateFormData, title: e.target.value })} className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading">Proof of Fulfillment (Image/Receipt)</label>
                <div className="relative flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-success/30 bg-success/5 hover:bg-success/10 transition-colors cursor-pointer group overflow-hidden">
                  <input type="file" accept="image/*" required onChange={handleUpdateImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  {updateImagePreview ? (
                    <img src={updateImagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-success">
                      <svg className="w-8 h-8 mb-2 opacity-80 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <p className="text-sm font-medium">Upload photos of items or receipts</p>
                    </div>
                  )}
                </div>
                {updateImagePreview && <button type="button" onClick={() => setUpdateImagePreview(null)} className="text-xs text-error font-bold self-end mt-1 hover:underline">Remove Image</button>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading">Update Details</label>
                <textarea required rows={4} placeholder="Describe the milestone achieved..." value={updateFormData.content} onChange={(e) => setUpdateFormData({ ...updateFormData, content: e.target.value })} className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="ghost" onClick={() => { setIsPostingUpdate(false); setUpdateImagePreview(null); }}>Cancel</Button>
                <Button type="submit" className="bg-gradient-to-r from-success to-emerald-600 dark:to-emerald-700 text-white shadow-lg shadow-success/20 hover:shadow-success/30">Publish Update</Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
