"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function AdminCampaignsPage() {
  const [search, setSearch] = useState("");

  const campaigns = [
    { id: 1, title: "Community Clinic Renovation", user: "John Doe", raised: "₦1,600,000", status: "Active" },
    { id: 2, title: "School Supplies for District 4", user: "Jane Smith", raised: "₦500,000", status: "Completed" },
    { id: 3, title: "Emergency Flood Relief", user: "Lagos Org", raised: "₦150,000", status: "Pending Verification" },
    { id: 4, title: "Suspicious Fundraiser", user: "Unknown User", raised: "₦10,000", status: "Frozen" },
  ];

  const filtered = campaigns.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.user.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto animate-in fade-in zoom-in-95 duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-text-heading dark:text-white">All Campaigns</h1>
          <p className="mt-1 text-text-body dark:text-gray-400">Manage and oversee all campaigns created on AidLink.</p>
        </div>
        <input 
          type="text" placeholder="Search campaigns or users..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 rounded-xl border border-white/40 bg-white/50 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 dark:bg-black/30 dark:text-white"
        />
      </header>

      <div className="rounded-3xl border border-white/50 bg-white/40 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-body dark:text-gray-300">
            <thead className="border-b border-border-glass bg-white/20 uppercase text-xs font-bold text-text-muted">
              <tr>
                <th className="px-6 py-4">Campaign Title</th>
                <th className="px-6 py-4">Beneficiary</th>
                <th className="px-6 py-4">Raised</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(campaign => (
                <tr key={campaign.id} className="border-b border-border-glass last:border-0 hover:bg-white/30 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-text-heading dark:text-white">{campaign.title}</td>
                  <td className="px-6 py-4">{campaign.user}</td>
                  <td className="px-6 py-4 font-bold">{campaign.raised}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      campaign.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                      campaign.status === 'Frozen' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>{campaign.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button size="sm" className={campaign.status === 'Frozen' ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'}>
                      {campaign.status === 'Frozen' ? 'Unfreeze' : 'Freeze'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}