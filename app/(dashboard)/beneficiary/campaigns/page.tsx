"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Campaign {
  id: number;
  title: string;
  category: string;
  image: string;
  raised: string;
  goal: string;
  progress: number;
  status: "Active" | "Completed" | "Pending Verification";
}

const defaultCampaigns: Campaign[] = [
  {
    id: 1,
    title: "Community Clinic Renovation",
    category: "Medical & Health",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    raised: "₦1,600,000",
    goal: "₦2,000,000",
    progress: 80,
    status: "Active",
  },
  {
    id: 2,
    title: "School Supplies for District 4",
    category: "Education & Scholarships",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    raised: "₦500,000",
    goal: "₦500,000",
    progress: 100,
    status: "Completed",
  },
  {
    id: 3,
    title: "Emergency Flood Relief",
    category: "Disaster Relief & Emergency",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=800&q=80",
    raised: "₦150,000",
    goal: "₦1,000,000",
    progress: 15,
    status: "Pending Verification",
  },
  {
    id: 4,
    title: "Clean Water Borehole Project",
    category: "Infrastructure & Facilities",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777190?auto=format&fit=crop&w=800&q=80",
    raised: "₦850,000",
    goal: "₦3,000,000",
    progress: 28,
    status: "Active",
  },
  {
    id: 5,
    title: "Farm Equipment Cooperative",
    category: "Food Security & Agriculture",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
    raised: "₦420,000",
    goal: "₦1,500,000",
    progress: 28,
    status: "Active",
  },
  {
    id: 6,
    title: "Vocational Training Center",
    category: "Education & Scholarships",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    raised: "₦0",
    goal: "₦2,500,000",
    progress: 0,
    status: "Pending Verification",
  },
];

const statusStyles: Record<string, string> = {
  "Active": "bg-emerald-100/90 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
  "Completed": "bg-blue-100/90 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  "Pending Verification": "bg-amber-100/90 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(defaultCampaigns);
  const [isCreating, setIsCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Medical & Health",
    goal: "",
    description: "",
  });

  const categories = [
    "Medical & Health",
    "Education & Scholarships",
    "Disaster Relief & Emergency",
    "Infrastructure & Facilities",
    "Food Security & Agriculture",
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const newCampaign: Campaign = {
      id: campaigns.length + 1,
      title: formData.title,
      category: formData.category,
      image: imagePreview || "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
      raised: "₦0",
      goal: `₦${Number(formData.goal).toLocaleString()}`,
      progress: 0,
      status: "Pending Verification",
    };
    setCampaigns([newCampaign, ...campaigns]);
    setIsCreating(false);
    setImagePreview(null);
    setFormData({ title: "", category: "Medical & Health", goal: "", description: "" });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      setCampaigns(campaigns.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto animate-in fade-in zoom-in-95 duration-500">

      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text-heading dark:text-white">
            My Campaigns
          </h1>
          <p className="mt-1 text-text-body dark:text-gray-400">
            Manage your ongoing projects and track their funding status.
          </p>
        </div>
        <Button
          className="shadow-lg shadow-primary/25"
          variant="accent"
          onClick={() => setIsCreating(true)}
        >
          + Create New Campaign
        </Button>
      </header>

      {/* Empty State */}
      {campaigns.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface-secondary dark:bg-white/5">
            <svg className="h-10 w-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-text-heading dark:text-white mb-2">No campaigns yet</h3>
          <p className="text-text-body dark:text-gray-400 mb-6 max-w-md">
            Create your first campaign to start raising funds for your community project.
          </p>
          <Button variant="accent" onClick={() => setIsCreating(true)}>
            + Create New Campaign
          </Button>
        </div>
      )}

      {/* Campaigns Grid */}
      {campaigns.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex flex-col rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl transition-all hover:shadow-xl overflow-hidden group"
            >
              {/* Image */}
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
                <div className="absolute right-3 top-3">
                  <span className={`px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${statusStyles[campaign.status]}`}>
                    {campaign.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-text-heading dark:text-white mb-4 line-clamp-2">
                  {campaign.title}
                </h3>

                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-text-heading dark:text-white">{campaign.raised}</span>
                  <span className="text-text-muted">of {campaign.goal}</span>
                </div>

                <div className="relative h-2.5 w-full rounded-full bg-white/50 dark:bg-white/10 overflow-hidden shadow-inner mb-5">
                  <div
                    className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ${
                      campaign.progress === 100 ? "bg-emerald-500 dark:bg-emerald-600" : "bg-gradient-to-r from-primary to-secondary"
                    }`}
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  <Link href={`/beneficiary/campaigns/${campaign.id}`}>
                    <Button variant="primary" className="w-full text-sm shadow-md shadow-primary/20">
                      View Details
                    </Button>
                  </Link>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(campaign.id)}
                      className="flex-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-100 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE CAMPAIGN MODAL */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/50 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-black/60 animate-in zoom-in-95 duration-300 custom-scrollbar">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-text-heading dark:text-white">Create New Campaign</h2>
                <p className="text-sm text-text-body dark:text-gray-400">Draft a new aid request for verification.</p>
              </div>
              <button
                onClick={() => { setIsCreating(false); setImagePreview(null); }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
              >
                <svg className="h-5 w-5 text-text-heading dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading dark:text-white">Campaign Title</label>
                <input
                  type="text" required placeholder="e.g. Clean Water for District 5"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-text-heading dark:text-white">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white appearance-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-text-heading dark:text-white">Funding Goal (₦)</label>
                  <input
                    type="number" required min="10000" placeholder="e.g. 500000"
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading dark:text-white">Campaign Cover Image</label>
                <div className="relative flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-primary/30 bg-white/30 hover:bg-white/50 transition-colors dark:border-white/20 dark:bg-black/20 dark:hover:bg-black/40 overflow-hidden cursor-pointer group">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-primary dark:text-white/70">
                      <svg className="w-8 h-8 mb-2 opacity-80 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                      </svg>
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    </div>
                  )}
                </div>
                {imagePreview && (
                  <button type="button" onClick={() => setImagePreview(null)} className="text-xs text-red-500 dark:text-red-400 font-bold self-end mt-1 hover:underline">Remove Image</button>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading dark:text-white">Campaign Description</label>
                <textarea
                  required rows={4} placeholder="Explain what the funds will be used for..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full resize-none rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white"
                />
              </div>

              <div className="mt-4 flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="ghost" onClick={() => { setIsCreating(false); setImagePreview(null); }}>Cancel</Button>
                <Button type="submit" className="px-8 shadow-lg shadow-primary/20">Submit for Verification</Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
