"use client";

import React from 'react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      action: "Donation Received",
      detail: "₦500,000 to Flood Relief",
      time: "Just now",
      color: "emerald"
    },
    {
      id: 2,
      action: "Payout Processed",
      detail: "₦250,000 to Jane Doe",
      time: "15 mins ago",
      color: "primary"
    },
    {
      id: 3,
      action: "Campaign Flagged",
      detail: "Suspicious activity detected",
      time: "1 hour ago",
      color: "red"
    },
    {
      id: 4,
      action: "New Beneficiary",
      detail: "EduCare Foundation joined",
      time: "3 hours ago",
      color: "orange"
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-text-heading dark:text-white">Live Activity</h2>
      
      <div className="flex flex-col rounded-3xl border border-white/50 bg-white/40 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20 h-full">
        
        <div className="relative border-l-2 border-border-glass ml-4 flex flex-col gap-8 pb-4">
          
          {activities.map((item) => (
            <div key={item.id} className="relative pl-6">
              {/* Timeline Dot */}
              <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-white dark:border-gray-900 ${
                item.color === 'emerald' ? 'bg-emerald-500' :
                item.color === 'primary' ? 'bg-primary' :
                item.color === 'red' ? 'bg-red-500' :
                'bg-[#FF9F1C]'
              }`} />
              
              <div className="flex flex-col">
                <span className="text-sm font-bold text-text-heading dark:text-white">{item.action}</span>
                <span className="text-xs text-text-body mt-0.5">{item.detail}</span>
                <span className="text-[10px] font-bold text-text-muted mt-1 uppercase tracking-wider">{item.time}</span>
              </div>
            </div>
          ))}

        </div>

        <button className="mt-auto w-full rounded-xl bg-white/50 py-3 text-sm font-bold text-primary hover:bg-white/80 transition-colors dark:bg-white/5 dark:hover:bg-white/10">
          View Audit Logs
        </button>
      </div>
    </div>
  );
}