"use client";

import React, { useState, use } from 'react'; 
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CampaignDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); 
  
  const [activeTab, setActiveTab] = useState<'overview' | 'updates' | 'donors'>('overview');

  // 1. Convert campaign to state so it can be updated
  const [campaign, setCampaign] = useState({
    id: id, 
    title: "Community Clinic Renovation",
    category: "Medical Aid",
    status: "Active",
    heroImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    description: "Our district's primary health clinic has not been updated in over 15 years. This campaign will fund the complete renovation of the maternity ward, repair the leaking roof, and provide solar panels to ensure uninterrupted power supply for critical medical equipment.",
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
        image: "https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 2,
        date: "June 10, 2026",
        title: "New Medical Beds Purchased",
        content: "We successfully acquired 10 new medical beds for the maternity ward. Here is the proof of purchase and delivery.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
      }
    ]
  });

  // --- MODAL STATES ---
  const [isEditing, setIsEditing] = useState(false);
  const [isPostingUpdate, setIsPostingUpdate] = useState(false);

  // --- FORM STATES ---
  const [editFormData, setEditFormData] = useState({
    title: campaign.title,
    description: campaign.description,
    goal: campaign.goal.toString(),
  });

  const [updateFormData, setUpdateFormData] = useState({ title: "", content: "" });
  const [updateImagePreview, setUpdateImagePreview] = useState<string | null>(null);

  // --- HANDLERS ---
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

    setCampaign({
      ...campaign,
      title: editFormData.title,
      description: editFormData.description,
      goal: newGoal,
      progress: newProgress, // Recalculate progress based on new goal
    });
    setIsEditing(false);
  };

  const handlePostUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUpdate = {
      id: campaign.updates.length + 1,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      title: updateFormData.title,
      content: updateFormData.content,
      // Use uploaded image or a placeholder
      image: updateImagePreview || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
    };

    setCampaign({
      ...campaign,
      updates: [newUpdate, ...campaign.updates] // Add to the top of the list
    });
    
    // Reset and close
    setIsPostingUpdate(false);
    setUpdateFormData({ title: "", content: "" });
    setUpdateImagePreview(null);
    setActiveTab('updates'); // Auto-switch to updates tab to see it
  };

  return (
    <div className="flex w-full max-w-7xl flex-col gap-6 mx-auto animate-in fade-in zoom-in-95 duration-500 pb-12">
      
      {/* Back Navigation */}
      <Link href="/beneficiary/campaigns" className="flex items-center gap-2 text-sm font-bold text-primary hover:underline w-fit">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Campaigns
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Hero Image & Tabs (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden rounded-3xl shadow-xl">
            <img src={campaign.heroImage} alt={campaign.title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent dark:from-black/80 dark:via-black/30" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3">
              <div className="flex gap-2">
                <span className="bg-white/90 backdrop-blur-md text-primary px-3 py-1 rounded-full text-xs font-bold shadow-sm dark:bg-black/70 dark:text-white">
                  {campaign.category}
                </span>
                <span className="bg-emerald-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">
                  {campaign.status}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading dark:text-white z-10 drop-shadow-lg">
                {campaign.title}
              </h1>
            </div>
          </div>

          <div className="flex flex-col rounded-3xl border border-white/50 bg-white/40 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20 overflow-hidden">
            <div className="flex border-b border-border-glass bg-white/20 px-2 pt-2">
              <button onClick={() => setActiveTab('overview')} className={`px-6 py-4 text-sm font-bold transition-colors border-b-2 ${activeTab === 'overview' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-heading dark:hover:text-white'}`}>Overview</button>
              <button onClick={() => setActiveTab('updates')} className={`px-6 py-4 text-sm font-bold transition-colors border-b-2 ${activeTab === 'updates' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-heading dark:hover:text-white'}`}>Updates & Proofs ({campaign.updates.length})</button>
              <button onClick={() => setActiveTab('donors')} className={`px-6 py-4 text-sm font-bold transition-colors border-b-2 ${activeTab === 'donors' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-heading dark:hover:text-white'}`}>Donors ({campaign.donorsCount})</button>
            </div>

            <div className="p-6 sm:p-8">
              {activeTab === 'overview' && (
                <div className="flex flex-col gap-4 text-text-body dark:text-gray-300 leading-relaxed">
                  <p>{campaign.description}</p>
                  <p>Our transparency promise: Every milestone achieved will be documented in the Updates tab with corresponding receipts and visual proof.</p>
                </div>
              )}

              {activeTab === 'updates' && (
                <div className="flex flex-col gap-8 text-text-body">
                  {campaign.updates.map((update) => (
                    <div key={update.id} className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-border-glass last:border-0 last:pb-0 animate-in slide-in-from-bottom-4 duration-500">
                      <div className="w-full sm:w-1/3 h-48 sm:h-auto shrink-0 rounded-2xl overflow-hidden bg-surface-dim">
                        <img src={update.image} alt={update.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col flex-1 gap-2">
                        <span className="text-xs font-bold text-text-muted">{update.date}</span>
                        <h3 className="text-xl font-bold text-text-heading dark:text-white">{update.title}</h3>
                        <p className="text-sm text-text-body dark:text-gray-300">{update.content}</p>
                      </div>
                    </div>
                  ))}
                  <Button 
                    onClick={() => setIsPostingUpdate(true)}
                    variant="outline" 
                    className="w-full sm:w-fit mt-4 border-dashed border-2 bg-white/50 dark:bg-black/20"
                  >
                    + Post New Update / Proof
                  </Button>
                </div>
              )}

              {activeTab === 'donors' && (
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-text-muted mb-4">Displaying recent donors out of {campaign.donorsCount} total.</p>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/30 dark:bg-black/30">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">JD</div>
                      <div>
                        <span className="block font-bold text-text-heading dark:text-white">Jane Doe</span>
                        <span className="block text-xs text-text-muted">2 hours ago</span>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-600">₦20,000</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Action & Stats Panel (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 flex flex-col rounded-3xl border border-white/50 bg-white/40 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20 gap-6">
            
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-black text-primary">{formatCurrency(campaign.raised)}</span>
                <span className="text-sm font-bold text-text-muted">raised</span>
              </div>
              <span className="text-sm text-text-body dark:text-gray-400">of {formatCurrency(campaign.goal)} goal</span>
            </div>

            <div className="relative h-3 w-full rounded-full bg-white/50 dark:bg-white/10 overflow-hidden shadow-inner">
              <div 
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                style={{ width: `${campaign.progress}%` }} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border-glass">
              <div className="flex flex-col">
                <span className="text-xl font-black text-text-heading dark:text-white">{campaign.progress}%</span>
                <span className="text-xs text-text-muted uppercase tracking-wider">Funded</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-text-heading dark:text-white">{campaign.donorsCount}</span>
                <span className="text-xs text-text-muted uppercase tracking-wider">Donors</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-text-heading dark:text-white">{campaign.daysLeft}</span>
                <span className="text-xs text-text-muted uppercase tracking-wider">Days Left</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button onClick={() => setIsPostingUpdate(true)} className="w-full h-12 text-md shadow-lg shadow-primary/20">
                Post Quick Update
              </Button>
              <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full h-12 text-md bg-white/50 dark:bg-black/20">
                Edit Campaign
              </Button>
            </div>
            
            <p className="text-xs text-text-muted text-center mt-2">
              Funds can only be withdrawn once verification milestones are met.
            </p>

          </div>
        </div>

      </div>

      {/* --- MODAL 1: EDIT CAMPAIGN --- */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-xl rounded-3xl border border-white/50 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-black/60 animate-in zoom-in-95 duration-300">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-text-heading dark:text-white">Edit Campaign</h2>
              <button onClick={() => setIsEditing(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors">
                <svg className="h-5 w-5 text-text-heading dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading dark:text-white">Campaign Title</label>
                <input 
                  type="text" required value={editFormData.title}
                  onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                  className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading dark:text-white">Funding Goal (₦)</label>
                <input 
                  type="number" required min="10000" value={editFormData.goal}
                  onChange={(e) => setEditFormData({...editFormData, goal: e.target.value})}
                  className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading dark:text-white">Description</label>
                <textarea 
                  required rows={4} value={editFormData.description}
                  onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                  className="w-full resize-none rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white"
                />
              </div>

              <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-border-glass">
                <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button type="submit" className="shadow-md shadow-primary/20">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: POST UPDATE / PROOF --- */}
      {isPostingUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/50 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-black/60 animate-in zoom-in-95 duration-300 custom-scrollbar">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-text-heading dark:text-white">Post Progress & Proof</h2>
                <p className="text-sm text-text-body dark:text-gray-400">Share updates and upload receipts/photos.</p>
              </div>
              <button onClick={() => { setIsPostingUpdate(false); setUpdateImagePreview(null); }} className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors">
                <svg className="h-5 w-5 text-text-heading dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handlePostUpdateSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading dark:text-white">Update Title</label>
                <input 
                  type="text" required placeholder="e.g. Phase 1 Complete!" value={updateFormData.title}
                  onChange={(e) => setUpdateFormData({...updateFormData, title: e.target.value})}
                  className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading dark:text-white">Proof of Fulfillment (Image/Receipt)</label>
                <div className="relative flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors dark:border-emerald-500/20 dark:bg-emerald-500/10 cursor-pointer group overflow-hidden">
                  <input type="file" accept="image/*" required onChange={handleUpdateImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  {updateImagePreview ? (
                    <img src={updateImagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <svg className="w-8 h-8 mb-2 opacity-80 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <p className="text-sm font-medium">Upload photos of items or receipts</p>
                    </div>
                  )}
                </div>
                {updateImagePreview && <button type="button" onClick={() => setUpdateImagePreview(null)} className="text-xs text-red-500 font-bold self-end mt-1 hover:underline">Remove Image</button>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading dark:text-white">Update Details</label>
                <textarea 
                  required rows={4} placeholder="Describe the milestone achieved..." value={updateFormData.content}
                  onChange={(e) => setUpdateFormData({...updateFormData, content: e.target.value})}
                  className="w-full resize-none rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white"
                />
              </div>

              <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-border-glass">
                <Button type="button" variant="ghost" onClick={() => { setIsPostingUpdate(false); setUpdateImagePreview(null); }}>Cancel</Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20">Publish Update</Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}