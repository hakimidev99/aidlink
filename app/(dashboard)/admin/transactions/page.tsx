"use client";

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { Button } from '@/components/ui/button';

type TransactionType = 'Donation' | 'Settlement' | 'Withdrawal';
type TransactionStatus = 'Successful' | 'Failed' | 'Pending';

interface Transaction {
  id: string;
  donor: string;
  beneficiary: string;
  amount: string;
  type: TransactionType;
  status: TransactionStatus;
  date: string;
  reference?: string;
  campaign?: string;
  fee?: string;
}

const mockTransactions: Transaction[] = [
  { id: 'TXN-001', donor: 'Emeka Okafor', beneficiary: 'Community Clinic Renovation', amount: '₦500,000', type: 'Donation', status: 'Successful', date: 'Jul 7, 2026', reference: 'REF-AB1234', campaign: 'Clinic Renovation', fee: '₦12,500' },
  { id: 'TXN-002', donor: 'Jane Smith', beneficiary: 'Urban Agriculture Seeds', amount: '₦250,000', type: 'Donation', status: 'Successful', date: 'Jul 6, 2026', reference: 'REF-CD5678', campaign: 'Urban Agriculture', fee: '₦6,250' },
  { id: 'TXN-003', donor: 'System', beneficiary: 'John Doe', amount: '₦400,000', type: 'Settlement', status: 'Successful', date: 'Jul 5, 2026', reference: 'SET-9012', campaign: 'Clinic Renovation', fee: '₦0' },
  { id: 'TXN-004', donor: 'Anonymous', beneficiary: 'Flood Emergency Kits', amount: '₦50,000', type: 'Donation', status: 'Successful', date: 'Jul 4, 2026', reference: 'REF-EF3456', campaign: 'Flood Relief', fee: '₦1,250' },
  { id: 'TXN-005', donor: 'Chioma Eze', beneficiary: 'School Computer Lab', amount: '₦1,000,000', type: 'Donation', status: 'Pending', date: 'Jul 3, 2026', reference: 'REF-GH7890', campaign: 'School Lab', fee: '₦25,000' },
  { id: 'TXN-006', donor: 'John Doe', beneficiary: 'Self Withdrawal', amount: '₦150,000', type: 'Withdrawal', status: 'Pending', date: 'Jul 2, 2026', reference: 'WTH-3456', campaign: '—', fee: '₦3,750' },
  { id: 'TXN-007', donor: 'Sarah Jenkins', beneficiary: 'Self Withdrawal', amount: '₦75,000', type: 'Withdrawal', status: 'Failed', date: 'Jul 1, 2026', reference: 'WTH-7890', campaign: '—', fee: '₦0' },
  { id: 'TXN-008', donor: 'Lagos Relief Org', beneficiary: 'Flood Emergency Kits', amount: '₦2,000,000', type: 'Donation', status: 'Successful', date: 'Jun 30, 2026', reference: 'REF-IJ1234', campaign: 'Flood Relief', fee: '₦50,000' },
  { id: 'TXN-009', donor: 'System', beneficiary: 'Sarah Jenkins', amount: '₦250,000', type: 'Settlement', status: 'Pending', date: 'Jun 29, 2026', reference: 'SET-5678', campaign: 'Urban Agriculture', fee: '₦0' },
  { id: 'TXN-010', donor: 'System', beneficiary: 'Riverside Community', amount: '₦180,000', type: 'Settlement', status: 'Successful', date: 'Jun 28, 2026', reference: 'SET-9012', campaign: 'Well Water', fee: '₦0' },
];

const typeColors: Record<TransactionType, string> = {
  Donation: 'bg-success/10 text-success',
  Settlement: 'bg-info/10 text-info',
  Withdrawal: 'bg-warning/10 text-warning',
};

const statusColors: Record<TransactionStatus, string> = {
  Successful: 'bg-success/10 text-success border-success/20',
  Failed: 'bg-error/10 text-error border-error/20',
  Pending: 'bg-warning/10 text-warning border-warning/20',
};

export default function AdminTransactionsPage() {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | 'All'>('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

  const totalVolume = transactions.reduce((acc, t) => {
    const num = parseFloat(t.amount.replace(/[₦,]/g, ''));
    return acc + num;
  }, 0);

  const successful = transactions.filter((t) => t.status === 'Successful');
  const failed = transactions.filter((t) => t.status === 'Failed');
  const pending = transactions.filter((t) => t.status === 'Pending');

  const successfulVol = successful.reduce((acc, t) => acc + parseFloat(t.amount.replace(/[₦,]/g, '')), 0);
  const failedVol = failed.reduce((acc, t) => acc + parseFloat(t.amount.replace(/[₦,]/g, '')), 0);
  const pendingVol = pending.reduce((acc, t) => acc + parseFloat(t.amount.replace(/[₦,]/g, '')), 0);

  const filtered = transactions.filter((t) => {
    if (typeFilter !== 'All' && t.type !== typeFilter) return false;
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    return true;
  });

  const summaryCards = [
    { label: 'Total Volume', value: `₦${(totalVolume / 1000000).toFixed(1)}M`, change: `${transactions.length} transactions`, accent: 'primary' as const },
    { label: 'Successful', value: `₦${(successfulVol / 1000000).toFixed(1)}M`, change: `${successful.length} txns`, accent: 'success' as const },
    { label: 'Failed', value: `₦${(failedVol / 1000000).toFixed(1)}M`, change: `${failed.length} txns`, accent: 'error' as const },
    { label: 'Pending', value: `₦${(pendingVol / 1000000).toFixed(1)}M`, change: `${pending.length} txns`, accent: 'warning' as const },
  ];

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto pb-12">
      <AdminHeader title="Transaction Monitoring" description="Monitor all platform donations, settlements, and withdrawals." />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-4 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">{card.label}</span>
            <p className={`text-xl font-black mt-1 text-${card.accent === 'primary' ? 'text-heading' : card.accent}`}>
              {card.value}
            </p>
            <span className="text-[11px] font-medium text-text-muted">{card.change}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="rounded-xl border border-white/60 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.03] px-3.5 py-2 text-sm text-text-body outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-xl"
        />
        <span className="text-text-muted text-sm">to</span>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="rounded-xl border border-white/60 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.03] px-3.5 py-2 text-sm text-text-body outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-xl"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as TransactionType | 'All')}
          className="rounded-xl border border-white/60 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.03] px-3.5 py-2 text-sm text-text-body outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-xl"
        >
          <option value="All">All Types</option>
          <option value="Donation">Donation</option>
          <option value="Settlement">Settlement</option>
          <option value="Withdrawal">Withdrawal</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as TransactionStatus | 'All')}
          className="rounded-xl border border-white/60 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.03] px-3.5 py-2 text-sm text-text-body outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-xl"
        >
          <option value="All">All Status</option>
          <option value="Successful">Successful</option>
          <option value="Failed">Failed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/60 dark:border-white/[0.06] bg-white/30 dark:bg-white/[0.02]">
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">ID</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Donor</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Beneficiary</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Amount</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Type</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Status</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/60 dark:divide-white/[0.06]">
              {filtered.map((txn) => (
                <tr
                  key={txn.id}
                  onClick={() => setSelectedTxn(txn)}
                  className="hover:bg-white/30 dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
                >
                  <td className="px-5 py-4 font-mono text-xs text-text-muted">{txn.id}</td>
                  <td className="px-5 py-4 font-medium text-text-heading dark:text-white">{txn.donor}</td>
                  <td className="px-5 py-4 text-text-body text-xs">{txn.beneficiary}</td>
                  <td className="px-5 py-4 font-bold text-text-heading dark:text-white">{txn.amount}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${typeColors[txn.type]}`}>
                      {txn.type}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${statusColors[txn.status]}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-text-muted text-xs">{txn.date}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-text-muted text-sm">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setSelectedTxn(null)}>
          <div className="w-full max-w-md rounded-2xl bg-white/80 dark:bg-black/80 border border-white/60 dark:border-white/[0.06] p-6 shadow-2xl backdrop-blur-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-text-heading dark:text-white">Transaction Details</h3>
              <button onClick={() => setSelectedTxn(null)} className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between mb-5 rounded-xl bg-white/40 dark:bg-white/[0.04] p-4 border border-white/40 dark:border-white/[0.04]">
              <div>
                <span className="text-xs text-text-muted">Amount</span>
                <p className="text-2xl font-black text-text-heading dark:text-white">{selectedTxn.amount}</p>
              </div>
              <span className={`inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusColors[selectedTxn.status]}`}>
                {selectedTxn.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-xs font-medium text-text-muted">Transaction ID</span>
                <p className="text-sm font-semibold font-mono text-text-body mt-0.5">{selectedTxn.id}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-text-muted">Reference</span>
                <p className="text-sm font-semibold font-mono text-text-body mt-0.5">{selectedTxn.reference || '—'}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-text-muted">Type</span>
                <p className="text-sm font-semibold text-text-body mt-0.5">
                  <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold uppercase ${typeColors[selectedTxn.type]}`}>
                    {selectedTxn.type}
                  </span>
                </p>
              </div>
              <div>
                <span className="text-xs font-medium text-text-muted">Date</span>
                <p className="text-sm font-semibold text-text-body mt-0.5">{selectedTxn.date}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-text-muted">Donor</span>
                <p className="text-sm font-semibold text-text-body mt-0.5">{selectedTxn.donor}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-text-muted">Beneficiary</span>
                <p className="text-sm font-semibold text-text-body mt-0.5">{selectedTxn.beneficiary}</p>
              </div>
              {selectedTxn.campaign && (
                <div>
                  <span className="text-xs font-medium text-text-muted">Campaign</span>
                  <p className="text-sm font-semibold text-text-body mt-0.5">{selectedTxn.campaign}</p>
                </div>
              )}
              {selectedTxn.fee && (
                <div>
                  <span className="text-xs font-medium text-text-muted">Platform Fee</span>
                  <p className="text-sm font-semibold text-text-body mt-0.5">{selectedTxn.fee}</p>
                </div>
              )}
            </div>

            <div className="border-t border-white/60 dark:border-white/[0.06] pt-4 flex justify-end">
              <Button variant="ghost" onClick={() => setSelectedTxn(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
