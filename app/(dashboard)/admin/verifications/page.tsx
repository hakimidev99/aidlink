"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function VerificationQueuePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'campaigns' | 'proofs'>('all');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [queue, setQueue] = useState([
    { id: 1, type: "Campaign", title: "Flood Relief Fund", user: "John Doe", date: "2 hours ago", status: "Pending", details: "Requesting ₦1,000,000 for emergency supplies.", image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?w=800&q=80" },
    { id: 2, type: "Proof", title: "Roofing Materials", user: "Sarah Jenkins", date: "5 hours ago", status: "Pending", details: "Receipts and photos for ₦250,000 roofing materials.", image: "https://images.unsplash.com/photo-1504307651254-35680f356f12?w=800&q=80" },
    { id: 3, type: "Campaign", title: "School Computers", user: "EduCare Org", date: "Yesterday", status: "Pending", details: "Requesting ₦5,000,000 for a new IT lab.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80" }
  ]);

  const filteredQueue = queue.filter(item => activeTab === 'all' || item.type.toLowerCase() === activeTab.replace('s', ''));

  const handleAction = (id: number, action: 'approve' | 'reject') => {
    setQueue(queue.filter(q => q.id !== id));
    setSelectedItem(null);
    alert(`Item ${action}d successfully.`);
  };

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto animate-in fade-in zoom-in-95 duration-500">
      <header>
        <h1 className="text-3xl font-extrabold text-text-heading dark:text-white">Verification Queue</h1>
        <p className="mt-1 text-text-body dark:text-gray-400">Review and approve campaign requests and proof of fulfillments.</p>
      </header>

      <div className="flex flex-col rounded-3xl border border-white/50 bg-white/40 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20 overflow-hidden">
        <div className="flex border-b border-border-glass bg-white/20 px-4 pt-2 gap-4">
          {['all', 'campaigns', 'proofs'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-4 py-3 text-sm font-bold capitalize transition-colors border-b-2 ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-heading dark:hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          <div className="flex flex-col gap-4">
            {filteredQueue.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/60 dark:bg-black/40 border border-white/20 dark:border-white/5 transition-colors hover:bg-white/80 dark:hover:bg-black/60">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl font-bold ${item.type === 'Campaign' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                    {item.type === 'Campaign' ? 'CP' : 'PR'}
                  </div>
                  <div>
                    <h3 className="font-bold text-text-heading dark:text-white">{item.title}</h3>
                    <p className="text-xs text-text-muted">Submitted by {item.user} • {item.date}</p>
                  </div>
                </div>
                <Button onClick={() => setSelectedItem(item)} className="shadow-sm">Review Details</Button>
              </div>
            ))}
            {filteredQueue.length === 0 && <p className="text-center py-8 text-text-muted">No pending items in this queue.</p>}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl rounded-3xl border border-white/50 bg-white/80 p-8 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-black/80">
            <h2 className="text-2xl font-bold text-text-heading dark:text-white mb-4">Review {selectedItem.type}</h2>
            <img src={selectedItem.image} alt="Proof" className="w-full h-48 object-cover rounded-xl mb-4 bg-black/10" />
            <div className="mb-6 space-y-2">
              <p><strong>Title:</strong> {selectedItem.title}</p>
              <p><strong>Submitted By:</strong> {selectedItem.user}</p>
              <p><strong>Details:</strong> {selectedItem.details}</p>
            </div>
            <div className="flex justify-end gap-3 border-t border-border-glass pt-4">
              <Button variant="ghost" onClick={() => setSelectedItem(null)}>Cancel</Button>
              <Button onClick={() => handleAction(selectedItem.id, 'reject')} className="bg-red-500 hover:bg-red-600 text-white">Reject</Button>
              <Button onClick={() => handleAction(selectedItem.id, 'approve')} className="bg-emerald-600 hover:bg-emerald-700 text-white">Approve</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}