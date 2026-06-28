"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function WalletPage() {
  // --- STATE MANAGEMENT ---
  const [availableBalance, setAvailableBalance] = useState(850000);
  const [pendingBalance] = useState(150000); // Keeping static for this example
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Modal states
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [error, setError] = useState("");

  const [withdrawals, setWithdrawals] = useState([
    {
      id: 1,
      bank: "GTBank",
      account: "•••• 4092",
      amount: 400000,
      date: "June 15, 2026 • 10:30 AM",
      status: "Successful",
    },
    {
      id: 2,
      bank: "Zenith Bank",
      account: "•••• 8112",
      amount: 50000,
      date: "June 12, 2026 • 09:15 AM",
      status: "Pending",
    },
    {
      id: 3,
      bank: "GTBank",
      account: "•••• 4092",
      amount: 250000,
      date: "May 28, 2026 • 02:15 PM",
      status: "Successful",
    },
    {
      id: 4,
      bank: "GTBank",
      account: "•••• 4092",
      amount: 15000,
      date: "May 10, 2026 • 11:00 AM",
      status: "Failed",
    }
  ]);

  // --- HANDLERS ---
  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  const handleDownloadStatement = () => {
    setIsDownloading(true);
    // Simulate API call for generating PDF statement
    setTimeout(() => {
      setIsDownloading(false);
      alert("Your statement has been downloaded successfully.");
    }, 1500);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const amount = Number(withdrawAmount);

    // Validation
    if (amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (amount > availableBalance) {
      setError("Insufficient funds. You cannot withdraw more than your available balance.");
      return;
    }

    // Create new withdrawal record
    const newWithdrawal = {
      id: Date.now(), // simple unique ID
      bank: "GTBank", // Defaulting to the linked account
      account: "•••• 4092",
      amount: amount,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) + " • " + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: "Pending",
    };

    // Update state
    setWithdrawals([newWithdrawal, ...withdrawals]);
    setAvailableBalance((prev) => prev - amount);
    
    // Close modal and reset
    setIsWithdrawModalOpen(false);
    setWithdrawAmount("");
  };

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto animate-in fade-in zoom-in-95 duration-500 relative">
      
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text-heading dark:text-white">
            Wallet & Withdrawals
          </h1>
          <p className="mt-1 text-text-body dark:text-gray-400">
            Manage your funds, linked accounts, and payout history.
          </p>
        </div>
        <Button 
          variant="outline" 
          className="shadow-sm" 
          isLoading={isDownloading}
          onClick={handleDownloadStatement}
        >
          Download Statement
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Balance Card */}
        <div className="lg:col-span-1 flex flex-col rounded-3xl border border-white/50 bg-gradient-to-br from-primary to-secondary p-8 shadow-xl text-white relative overflow-hidden h-fit">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          
          <span className="text-sm font-semibold opacity-80 uppercase tracking-wider mb-2 relative z-10">Available Balance</span>
          <span className="text-5xl font-black mb-6 relative z-10">{formatCurrency(availableBalance)}</span>
          
          <div className="flex flex-col gap-1 mb-8 relative z-10">
            <span className="text-sm font-medium text-white/80">Pending Verification: {formatCurrency(pendingBalance)}</span>
            <span className="text-xs text-white/60">Funds unlock as campaign milestones are met.</span>
          </div>
          
          <div className="mt-auto flex flex-col gap-4 border-t border-white/20 pt-6 relative z-10">
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-80">Linked Account</span>
              <span className="text-sm font-bold">GTBank •••• 4092</span>
            </div>
            <Button 
              onClick={() => setIsWithdrawModalOpen(true)}
              disabled={availableBalance <= 0}
              className="w-full bg-accent hover:bg-white/90 font-bold  shadow-lg shadow-black/10 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Withdraw Funds
            </Button>
          </div>
        </div>

        {/* Withdrawal History */}
        <div className="lg:col-span-2 flex flex-col rounded-3xl border border-white/50 bg-white/40 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-heading dark:text-white">Recent Withdrawals</h2>
            <button className="text-sm font-bold text-primary hover:underline">View All</button>
          </div>
          
          <div className="flex flex-col gap-5">
            {withdrawals.length === 0 ? (
              <p className="text-center text-text-muted py-8">No transaction history found.</p>
            ) : (
              withdrawals.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-border-glass pb-5 last:border-0 last:pb-0 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center gap-4">
                    
                    {/* Dynamic Icon based on Status */}
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                      item.status === 'Successful' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' :
                      item.status === 'Pending' ? 'bg-orange-100 text-[#FF9F1C] dark:bg-orange-500/20 dark:text-orange-400' :
                      'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400'
                    }`}>
                      {item.status === 'Successful' && (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      )}
                      {item.status === 'Pending' && (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      )}
                      {item.status === 'Failed' && (
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="font-bold text-text-heading dark:text-white">Payout to {item.bank}</span>
                      <span className="text-xs text-text-muted mt-0.5">{item.date}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="font-bold text-text-heading dark:text-white text-lg">{formatCurrency(item.amount)}</span>
                    <span className={`text-xs font-bold mt-0.5 ${
                      item.status === 'Successful' ? 'text-emerald-600 dark:text-emerald-400' :
                      item.status === 'Pending' ? 'text-[#FF9F1C] dark:text-orange-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* --- WITHDRAW FUNDS MODAL --- */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-md rounded-3xl border border-white/50 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-black/60 animate-in zoom-in-95 duration-300">
            
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-text-heading dark:text-white">Initiate Withdrawal</h2>
                <p className="text-sm text-text-body dark:text-gray-400">Transfer funds to your linked account.</p>
              </div>
              <button 
                onClick={() => {
                  setIsWithdrawModalOpen(false);
                  setWithdrawAmount("");
                  setError("");
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
              >
                <svg className="h-5 w-5 text-text-heading dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="flex flex-col gap-6">
              
              <div className="rounded-2xl bg-white/40 p-4 border border-white/50 dark:bg-black/20 dark:border-white/5">
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted">Available to Withdraw</span>
                <p className="text-2xl font-black text-text-heading dark:text-white mt-1">{formatCurrency(availableBalance)}</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading dark:text-white">Amount to Withdraw (₦)</label>
                <input 
                  type="number" 
                  required
                  autoFocus
                  placeholder="e.g. 50000"
                  value={withdrawAmount}
                  onChange={(e) => {
                    setWithdrawAmount(e.target.value);
                    setError(""); // Clear error when typing
                  }}
                  className={`w-full rounded-xl border bg-white/50 px-4 py-3 text-lg outline-none transition-all dark:bg-black/30 dark:text-white ${
                    error ? 'border-red-500 focus:ring-red-500/20' : 'border-white/40 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10'
                  }`}
                />
                {error && <span className="text-xs font-bold text-red-500 mt-1">{error}</span>}
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-xs font-medium">Funds will be sent to <strong>GTBank •••• 4092</strong>. Processing typically takes 1-2 business hours.</p>
              </div>

              <div className="mt-2 flex items-center justify-end gap-3 pt-4 border-t border-border-glass">
                <Button type="button" variant="ghost" onClick={() => {
                  setIsWithdrawModalOpen(false);
                  setWithdrawAmount("");
                  setError("");
                }}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="px-8 shadow-lg bg-[#f97316] hover:bg-[#ea580c] text-white border-none"
                >
                  Confirm Withdrawal
                </Button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}