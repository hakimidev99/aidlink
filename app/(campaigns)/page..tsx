// Example file: src/app/campaigns/page.tsx
import React from "react";

export default function CampaignsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Campaigns Management
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Create, track, and optimize live funding and resource pools.
        </p>
      </div>

      {/* Content Canvas */}
      <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center">
        <span className="text-sm text-slate-400">
          Campaign view modules mount here.
        </span>
      </div>
    </div>
  );
}
