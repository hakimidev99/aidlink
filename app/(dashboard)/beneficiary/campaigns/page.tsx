"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([
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
    }
  ]);

  // --- STATE FOR CREATING A CAMPAIGN ---
  const [isCreating, setIsCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Medical & Health",
    goal: "",
    description: ""
  });

  // --- STATE FOR UPDATING A CAMPAIGN (POSTING PROOF) ---
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
  const [updateImagePreview, setUpdateImagePreview] = useState<string | null>(null);
  const [updateFormData, setUpdateFormData] = useState({
    title: "",
    content: ""
  });

  // --- HANDLERS ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleUpdateImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setUpdateImagePreview(previewUrl);
    }
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const newCampaign = {
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

  const handlePostUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the update to the backend database for the specific campaign ID.
    console.log(`Posting update to campaign ID: ${selectedCampaignId}`, updateFormData);
    
    // Simulate success and close modal
    setIsUpdating(false);
    setUpdateImagePreview(null);
    setUpdateFormData({ title: "", content: "" });
    alert("Update posted successfully! Your donors will be notified.");
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

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="flex flex-col rounded-3xl border border-white/50 bg-white/40 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
            
            <div className="relative mb-5 h-48 w-full overflow-hidden rounded-2xl bg-surface-dim shadow-sm group">
              <div className="absolute inset-0 bg-primary/5 dark:bg-white/5" />
              <img 
                src={campaign.image} 
                alt={campaign.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute left-3 top-3">
                <span className="bg-white/90 backdrop-blur-md text-primary px-3 py-1.5 rounded-full text-xs font-bold shadow-sm dark:bg-black/70 dark:text-white">
                  {campaign.category}
                </span>
              </div>

              <div className="absolute right-3 top-3">
                <span className={`px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md ${
                  campaign.status === 'Active' ? 'bg-emerald-100/90 text-emerald-700' :
                  campaign.status === 'Completed' ? 'bg-blue-100/90 text-blue-700' :
                  'bg-orange-100/90 text-[#FF9F1C]' 
                }`}>
                  {campaign.status}
                </span>
              </div>
            </div>

            <div className="px-2 pb-2 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-text-heading dark:text-white mb-6 line-clamp-2">
                {campaign.title}
              </h3>

              <div className="mt-auto flex flex-col gap-3">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-text-heading dark:text-white">Raised: {campaign.raised}</span>
                  <span className="text-text-muted">Goal: {campaign.goal}</span>
                </div>
                
                <div className="relative h-2.5 w-full rounded-full bg-white/50 dark:bg-white/10 overflow-hidden shadow-inner">
                  <div 
                    className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ${
                      campaign.progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-primary to-secondary'
                    }`}
                    style={{ width: `${campaign.progress}%` }} 
                  />
                </div>
                
                <div className="mt-5 flex gap-2">
                  <Link href={`/beneficiary/campaigns/${campaign.id}`} className="w-full">
                    <Button variant="outline" className="w-full text-sm h-10 hover:border-primary hover:text-primary transition-colors bg-white/50 dark:bg-black/20">
                      View Details
                    </Button>
                  </Link>

                  {/* Triggers the Update/Proof Modal */}
                  {campaign.status === 'Active' && (
                    <Button 
                      onClick={() => {
                        setSelectedCampaignId(campaign.id);
                        setIsUpdating(true);
                      }}
                      className="w-full text-sm h-10 shadow-md shadow-primary/20"
                    >
                      Update Details
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL 1: CREATE CAMPAIGN --- */}
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
                  value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-text-heading dark:text-white">Category</label>
                  <select 
                    value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white appearance-none"
                  >
                    <option value="Medical & Health">Medical & Health</option>
                    <option value="Education & Scholarships">Education & Scholarships</option>
                    <option value="Disaster Relief & Emergency">Disaster Relief & Emergency</option>
                    <option value="Infrastructure & Facilities">Infrastructure & Facilities</option>
                    <option value="Food Security & Agriculture">Food Security & Agriculture</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-text-heading dark:text-white">Funding Goal (₦)</label>
                  <input 
                    type="number" required min="10000" placeholder="e.g. 500000"
                    value={formData.goal} onChange={(e) => setFormData({...formData, goal: e.target.value})}
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
                  <button type="button" onClick={() => setImagePreview(null)} className="text-xs text-red-500 font-bold self-end mt-1 hover:underline">Remove Image</button>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading dark:text-white">Campaign Description</label>
                <textarea 
                  required rows={4} placeholder="Explain what the funds will be used for..."
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full resize-none rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white"
                />
              </div>

              <div className="mt-4 flex items-center justify-end gap-3 pt-4 border-t border-border-glass">
                <Button type="button" variant="ghost" onClick={() => { setIsCreating(false); setImagePreview(null); }}>Cancel</Button>
                <Button type="submit" className="px-8 shadow-lg shadow-primary/20">Submit for Verification</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: UPDATE / POST PROOF --- */}
      {isUpdating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/50 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-black/60 animate-in zoom-in-95 duration-300 custom-scrollbar">
            
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-text-heading dark:text-white">Post Progress & Proof</h2>
                <p className="text-sm text-text-body dark:text-gray-400">Share updates and upload receipts/photos for transparency.</p>
              </div>
              <button 
                onClick={() => { setIsUpdating(false); setUpdateImagePreview(null); }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
              >
                <svg className="h-5 w-5 text-text-heading dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handlePostUpdate} className="flex flex-col gap-5">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading dark:text-white">Update Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Roofing Materials Delivered!"
                  value={updateFormData.title}
                  onChange={(e) => setUpdateFormData({...updateFormData, title: e.target.value})}
                  className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading dark:text-white">Proof of Fulfillment (Image/Receipt)</label>
                <div className="relative flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 overflow-hidden cursor-pointer group">
                  
                  <input 
                    type="file" 
                    accept="image/*"
                    required
                    onChange={handleUpdateImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  />
                  
                  {updateImagePreview ? (
                    <img src={updateImagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <svg className="w-8 h-8 mb-2 opacity-80 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <p className="text-sm font-medium">Upload photos of items bought or receipts</p>
                    </div>
                  )}
                </div>
                {updateImagePreview && (
                  <button type="button" onClick={() => setUpdateImagePreview(null)} className="text-xs text-red-500 font-bold self-end mt-1 hover:underline">
                    Remove Image
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading dark:text-white">Update Details</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describe the milestone achieved and break down how the funds were used..."
                  value={updateFormData.content}
                  onChange={(e) => setUpdateFormData({...updateFormData, content: e.target.value})}
                  className="w-full resize-none rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white"
                />
              </div>

              <div className="mt-4 flex items-center justify-end gap-3 pt-4 border-t border-border-glass">
                <Button type="button" variant="ghost" onClick={() => {
                  setIsUpdating(false);
                  setUpdateImagePreview(null);
                }}>
                  Cancel
                </Button>
                <Button type="submit" className="px-8 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20">
                  Publish Update
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}