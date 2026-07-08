"use client";

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { Button } from '@/components/ui/button';

type CampaignStatus = 'Active' | 'Pending' | 'Paused' | 'Completed' | 'Rejected';
type CampaignCategory = 'Health' | 'Education' | 'Environment' | 'Emergency' | 'Agriculture' | 'Infrastructure';

interface Campaign {
  id: string;
  title: string;
  beneficiary: string;
  category: CampaignCategory;
  goal: number;
  raised: number;
  status: CampaignStatus;
  featured: boolean;
  createdAt: string;
}

const mockCampaigns: Campaign[] = [
  { id: 'C-001', title: 'Community Clinic Renovation', beneficiary: 'John Doe', category: 'Health', goal: 2000000, raised: 1650000, status: 'Active', featured: true, createdAt: 'Mar 15, 2024' },
  { id: 'C-002', title: 'School Computer Lab', beneficiary: 'EduCare Foundation', category: 'Education', goal: 5000000, raised: 1200000, status: 'Active', featured: true, createdAt: 'Apr 2, 2024' },
  { id: 'C-003', title: 'Urban Agriculture Seeds', beneficiary: 'Sarah Jenkins', category: 'Agriculture', goal: 1000000, raised: 780000, status: 'Active', featured: false, createdAt: 'May 10, 2024' },
  { id: 'C-004', title: 'Flood Emergency Kits', beneficiary: 'Lagos Relief Org', category: 'Emergency', goal: 3000000, raised: 2850000, status: 'Active', featured: true, createdAt: 'Jun 1, 2024' },
  { id: 'C-005', title: 'Well Water Project', beneficiary: 'Riverside Community', category: 'Infrastructure', goal: 800000, raised: 800000, status: 'Completed', featured: false, createdAt: 'Jan 20, 2024' },
  { id: 'C-006', title: 'Women Empowerment Workshop', beneficiary: 'Chioma Eze', category: 'Education', goal: 500000, raised: 0, status: 'Pending', featured: false, createdAt: 'Jun 20, 2024' },
  { id: 'C-007', title: 'Medical Outreach Program', beneficiary: 'Hope Foundation', category: 'Health', goal: 1500000, raised: 1100000, status: 'Paused', featured: false, createdAt: 'Feb 14, 2024' },
  { id: 'C-008', title: 'Solar Panel Installation', beneficiary: 'Green Energy Co-op', category: 'Environment', goal: 2500000, raised: 450000, status: 'Active', featured: false, createdAt: 'Apr 25, 2024' },
  { id: 'C-009', title: 'Suspicious Fundraiser', beneficiary: 'Unknown User', category: 'Health', goal: 10000000, raised: 10000, status: 'Rejected', featured: false, createdAt: 'May 5, 2024' },
  { id: 'C-010', title: 'Clean Water Initiative', beneficiary: 'Riverside Community', category: 'Infrastructure', goal: 1200000, raised: 890000, status: 'Active', featured: false, createdAt: 'Mar 30, 2024' },
];

const statusColors: Record<CampaignStatus, string> = {
  Active: 'bg-success/10 text-success border-success/20',
  Pending: 'bg-warning/10 text-warning border-warning/20',
  Paused: 'bg-info/10 text-info border-info/20',
  Completed: 'bg-primary/10 text-primary border-primary/20',
  Rejected: 'bg-error/10 text-error border-error/20',
};

const categories: CampaignCategory[] = ['Health', 'Education', 'Environment', 'Emergency', 'Agriculture', 'Infrastructure'];

function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
  const pct = Math.min(Math.round((raised / goal) * 100), 100);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full bg-surface-tertiary overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            pct >= 100 ? 'bg-success' : pct >= 50 ? 'bg-primary' : 'bg-warning'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-bold text-text-muted w-10 text-right">{pct}%</span>
    </div>
  );
}

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | 'All'>('All');
  const [categoryFilter, setCategoryFilter] = useState<CampaignCategory | 'All'>('All');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filtered = campaigns.filter((c) => {
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    if (categoryFilter !== 'All' && c.category !== categoryFilter) return false;
    return true;
  });

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((c) => c.id)));
    }
  };

  const toggleFeatured = (id: string) => {
    setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, featured: !c.featured } : c)));
  };

  const updateStatus = (id: string, status: CampaignStatus) => {
    setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const bulkAction = (action: 'approve' | 'reject') => {
    selectedIds.forEach((id) => {
      updateStatus(id, action === 'approve' ? 'Active' : 'Rejected');
    });
    setSelectedIds(new Set());
  };

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto pb-12">
      <AdminHeader title="Campaign Management" description="Oversee all campaigns — approve, feature, and moderate." />

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as CampaignStatus | 'All')}
          className="rounded-xl border border-white/60 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.03] px-3.5 py-2 text-sm text-text-body outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-xl"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Paused">Paused</option>
          <option value="Completed">Completed</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as CampaignCategory | 'All')}
          className="rounded-xl border border-white/60 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.03] px-3.5 py-2 text-sm text-text-body outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-xl"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-text-muted">{selectedIds.size} selected</span>
            <Button size="sm" variant="outline" onClick={() => bulkAction('approve')} className="text-success border-success/30 h-8 text-xs">
              Approve Selected
            </Button>
            <Button size="sm" variant="outline" onClick={() => bulkAction('reject')} className="text-error border-error/30 h-8 text-xs">
              Reject Selected
            </Button>
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/60 dark:border-white/[0.06] bg-white/30 dark:bg-white/[0.02]">
                <th className="px-4 py-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={filtered.length > 0 && selectedIds.size === filtered.length}
                    onChange={toggleAll}
                    className="rounded border-border accent-primary"
                  />
                </th>
                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Campaign</th>
                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Beneficiary</th>
                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Category</th>
                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Progress</th>
                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Status</th>
                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Featured</th>
                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/60 dark:divide-white/[0.06]">
              {filtered.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-white/30 dark:hover:bg-white/[0.04] transition-colors">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(campaign.id)}
                      onChange={() => toggleSelected(campaign.id)}
                      className="rounded border-border accent-primary"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-semibold text-text-heading dark:text-white">{campaign.title}</span>
                  </td>
                  <td className="px-4 py-4 text-text-body text-xs">{campaign.beneficiary}</td>
                  <td className="px-4 py-4">
                    <span className="inline-block rounded-md bg-surface-secondary px-2 py-0.5 text-[11px] font-medium text-text-muted">
                      {campaign.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 min-w-[160px]">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-text-heading dark:text-white">
                          ₦{(campaign.raised / 1000000).toFixed(1)}M
                        </span>
                        <span className="text-xs text-text-muted">
                          ₦{(campaign.goal / 1000000).toFixed(1)}M
                        </span>
                      </div>
                      <ProgressBar raised={campaign.raised} goal={campaign.goal} />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${statusColors[campaign.status]}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => toggleFeatured(campaign.id)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        campaign.featured ? 'bg-warning' : 'bg-surface-tertiary'
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm ${
                          campaign.featured ? 'translate-x-[18px]' : 'translate-x-[2px]'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">View</Button>
                      {campaign.status === 'Active' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateStatus(campaign.id, 'Paused')}
                          className="h-7 px-2 text-xs text-warning hover:bg-warning/10"
                        >
                          Pause
                        </Button>
                      )}
                      {campaign.status === 'Paused' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateStatus(campaign.id, 'Active')}
                          className="h-7 px-2 text-xs text-success hover:bg-success/10"
                        >
                          Resume
                        </Button>
                      )}
                      {campaign.status === 'Pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateStatus(campaign.id, 'Rejected')}
                            className="h-7 px-2 text-xs text-error hover:bg-error/10"
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => updateStatus(campaign.id, 'Active')}
                            className="h-7 px-2 text-xs bg-success hover:bg-success/90 text-white"
                          >
                            Approve
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-text-muted text-sm">
                    No campaigns found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>{filtered.length} campaign{filtered.length !== 1 ? 's' : ''} found</span>
        <span>Featured count: {campaigns.filter((c) => c.featured).length}</span>
      </div>
    </div>
  );
}
