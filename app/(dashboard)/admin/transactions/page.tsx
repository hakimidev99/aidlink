"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

export default function AdminTransactionsPage() {
  const transactions = [
    { id: "TXN-901", type: "Donation", amount: "₦50,000", party: "Jane Doe -> Clinic Rehab", date: "June 27, 2026", status: "Completed" },
    { id: "TXN-902", type: "Payout", amount: "₦400,000", party: "System -> John Doe", date: "June 26, 2026", status: "Completed" },
    { id: "TXN-903", type: "Donation", amount: "₦5,000", party: "Anonymous -> Flood Relief", date: "June 26, 2026", status: "Completed" },
    { id: "TXN-904", type: "Payout", amount: "₦50,000", party: "System -> Sarah J.", date: "June 25, 2026", status: "Pending" },
  ];

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto animate-in fade-in zoom-in-95 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-text-heading dark:text-white">Global Ledger</h1>
          <p className="mt-1 text-text-body dark:text-gray-400">Monitor all platform donations and payouts.</p>
        </div>
        <Button variant="outline">Export CSV</Button>
      </header>

      <div className="rounded-3xl border border-white/50 bg-white/40 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20 p-6">
        <div className="flex gap-4 mb-6">
          <input type="date" className="rounded-xl border border-white/40 bg-white/50 px-4 py-2 text-sm outline-none dark:bg-black/30 dark:text-white" />
          <select className="rounded-xl border border-white/40 bg-white/50 px-4 py-2 text-sm outline-none dark:bg-black/30 dark:text-white">
            <option value="all">All Types</option>
            <option value="donation">Donations</option>
            <option value="payout">Payouts</option>
          </select>
        </div>

        <table className="w-full text-left text-sm text-text-body dark:text-gray-300">
          <thead className="border-b border-border-glass text-xs font-bold text-text-muted uppercase">
            <tr>
              <th className="pb-3">TXN ID</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Parties</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(txn => (
              <tr key={txn.id} className="border-b border-border-glass last:border-0">
                <td className="py-4 font-mono text-xs">{txn.id}</td>
                <td className="py-4 font-bold text-text-heading dark:text-white">
                  <span className={txn.type === 'Donation' ? 'text-emerald-600' : 'text-blue-600'}>{txn.type}</span>
                </td>
                <td className="py-4">{txn.party}</td>
                <td className="py-4 font-bold">{txn.amount}</td>
                <td className="py-4 text-xs">{txn.date}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${txn.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}