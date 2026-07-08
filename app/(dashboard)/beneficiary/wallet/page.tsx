"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://aidlink-jhur.onrender.com";

interface WithdrawalRecord {
  id: string | number;
  bank: string;
  account: string;
  amount: number;
  date: string;
  status: "Successful" | "Pending" | "Failed";
}

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'Successful' | 'Pending' | 'Failed';
  reference: string;
}

interface Withdrawal {
  id: number;
  bank: string;
  account: string;
  amount: number;
  date: string;
  status: string;
}

const initialTransactions: Transaction[] = [
  { id: 1, date: "Jul 5, 2026", description: "Donation from Chioma O. — Community Clinic", amount: 50000, type: "credit", status: "Successful", reference: "TXN-001" },
  { id: 2, date: "Jul 4, 2026", description: "Donation from Emeka N. — Community Clinic", amount: 25000, type: "credit", status: "Successful", reference: "TXN-002" },
  { id: 3, date: "Jul 3, 2026", description: "Donation from Aisha B. — School Supplies", amount: 10000, type: "credit", status: "Pending", reference: "TXN-003" },
  { id: 4, date: "Jul 2, 2026", description: "Withdrawal to GTBank •••• 4092", amount: 400000, type: "debit", status: "Successful", reference: "WTH-001" },
  { id: 5, date: "Jun 28, 2026", description: "Donation from Tunde A. — Flood Relief", amount: 100000, type: "credit", status: "Successful", reference: "TXN-004" },
  { id: 6, date: "Jun 25, 2026", description: "Withdrawal to Zenith Bank •••• 8112", amount: 50000, type: "debit", status: "Pending", reference: "WTH-002" },
  { id: 7, date: "Jun 20, 2026", description: "Donation from Ngozi E. — Community Clinic", amount: 15000, type: "credit", status: "Successful", reference: "TXN-005" },
  { id: 8, date: "Jun 15, 2026", description: "Donation from Kelechi O. — Farm Equipment", amount: 7500, type: "credit", status: "Successful", reference: "TXN-006" },
  { id: 9, date: "Jun 10, 2026", description: "Withdrawal to GTBank •••• 4092", amount: 250000, type: "debit", status: "Successful", reference: "WTH-003" },
  { id: 10, date: "Jun 5, 2026", description: "Donation from Fatima I. — Medical & Health", amount: 30000, type: "credit", status: "Successful", reference: "TXN-007" },
];

const initialWithdrawals: Withdrawal[] = [
  { id: 1, bank: "GTBank", account: "•••• 4092", amount: 400000, date: "Jun 15, 2026 • 10:30 AM", status: "Successful" },
  { id: 2, bank: "Zenith Bank", account: "•••• 8112", amount: 50000, date: "Jun 12, 2026 • 09:15 AM", status: "Pending" },
  { id: 3, bank: "GTBank", account: "•••• 4092", amount: 250000, date: "May 28, 2026 • 02:15 PM", status: "Successful" },
  { id: 4, bank: "GTBank", account: "•••• 4092", amount: 15000, date: "May 10, 2026 • 11:00 AM", status: "Failed" },
  { id: 5, bank: "Access Bank", account: "•••• 3341", amount: 80000, date: "Apr 22, 2026 • 04:45 PM", status: "Successful" },
  { id: 6, bank: "First Bank", account: "•••• 7782", amount: 120000, date: "Apr 8, 2026 • 01:20 PM", status: "Successful" },
  { id: 7, bank: "UBA", account: "•••• 5567", amount: 35000, date: "Mar 15, 2026 • 10:00 AM", status: "Pending" },
  { id: 8, bank: "GTBank", account: "•••• 4092", amount: 200000, date: "Feb 28, 2026 • 03:30 PM", status: "Successful" },
];

const banks = [
  "Access Bank", "Citibank", "Ecobank", "Fidelity Bank", "First Bank",
  "FCMB", "GTBank", "Heritage Bank", "Keystone Bank", "Opay",
  "PalmPay", "Polaris Bank", "Stanbic IBTC", "Standard Chartered",
  "Sterling Bank", "UBA", "Union Bank", "Unity Bank", "Wema Bank", "Zenith Bank",
];

export default function WalletPage() {
<<<<<<< HEAD
  const router = useRouter();

  // --- STATE MANAGEMENT ---
  const [availableBalance, setAvailableBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);
  const [linkedBank, setLinkedBank] = useState({
    name: "Loading Bank...",
    account: "••••",
  });
  const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal states
=======
  const [availableBalance, setAvailableBalance] = useState(850000);
  const [pendingBalance] = useState(150000);
  const [isDownloading, setIsDownloading] = useState(false);

  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(initialWithdrawals);
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');

>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("GTBank");
  const [accountNumber, setAccountNumber] = useState("0123456789");
  const [accountName, setAccountName] = useState("John Doe");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [modalError, setModalError] = useState("");

<<<<<<< HEAD
  // --- FETCH INITIAL WALLET & PROFILE DATA ---
  useEffect(() => {
    let isMounted = true;

    const fetchWalletState = async () => {
      try {
        if (isMounted) {
          setIsLoading(true);
          setError(null);
        }

        const token = localStorage.getItem("auth_token");
        if (!token) {
          router.push("/login");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        // Fetch User profile to get linked bank account setup information
        const profileRes = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers,
        });

        if (!isMounted) return;

        if (profileRes.data?.user) {
          const user = profileRes.data.user;
          // Parse the bank fields collected during partner onboarding setup
          setLinkedBank({
            name: user.bankAccountName || "Linked Partner Account",
            account: user.bankAccount
              ? `•••• ${user.bankAccount.slice(-4)}`
              : "••••",
          });

          // Map balances dynamically from the profile schema if present
          setAvailableBalance(user.availableBalance || 0);
          setPendingBalance(user.pendingBalance || 0);
        }

        // Fetch official withdrawal statement history safely from your payments endpoint
        try {
          const payoutsRes = await axios.get(
            `${API_BASE_URL}/payments/withdrawals`,
            { headers },
          );
          if (isMounted && payoutsRes.data) {
            setWithdrawals(payoutsRes.data);
          }
        } catch (payoutsErr) {
          console.warn(
            "Withdrawal history endpoint unavailable or empty:",
            payoutsErr,
          );
          // Defaults to an empty list instead of crashing layout scope
        }
      } catch (err: any) {
        console.error("Wallet loading configuration failure:", err);
        if (isMounted) {
          setError(
            "Failed to synchronize financial data. Please try refreshing.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchWalletState();

    return () => {
      isMounted = false;
    };
  }, [router]);

  // --- HANDLERS ---
  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  const handleDownloadStatement = async () => {
    try {
      setIsDownloading(true);
      const token = localStorage.getItem("auth_token");
      const headers = { Authorization: `Bearer ${token}` };

      // Make download point match server layout processing metrics
      await axios.get(`${API_BASE_URL}/payments/statements/download`, {
        headers,
      });
=======
  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  const totalBalance = availableBalance + pendingBalance;

  const filteredTransactions = filter === 'all' ? transactions : transactions.filter((t) => t.type === filter);

  const handleDownloadStatement = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
      alert("Your statement has been downloaded successfully.");
    } catch (err) {
      alert("Could not generate statement asset at this time.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    setModalError("");

    const amount = Number(withdrawAmount);

    // Initial local validations
    if (amount <= 0 || isNaN(amount)) {
      setModalError("Please enter a valid amount.");
      return;
    }
    if (amount > availableBalance) {
      setModalError(
        "Insufficient funds. You cannot withdraw more than your available balance.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("auth_token");
      const headers = { Authorization: `Bearer ${token}` };

      // Submit request payload to the active financial handling route
      const response = await axios.post(
        `${API_BASE_URL}/payments/withdraw`,
        { amount },
        { headers },
      );

      // Append returned tracking schema into local state list tracking array
      const processingTransaction: WithdrawalRecord = response.data
        ?.transaction || {
        id: Date.now(),
        bank: "Transfer Payout",
        account: linkedBank.account,
        amount: amount,
        date:
          new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }) +
          " • " +
          new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        status: "Pending",
      };

      setWithdrawals((prev) => [processingTransaction, ...prev]);
      setAvailableBalance((prev) => prev - amount);

      setIsWithdrawModalOpen(false);
      setWithdrawAmount("");
    } catch (err: any) {
      console.error("Payout creation failed:", err);
      setModalError(
        err.response?.data?.message ||
          "Server rejected payout process. Verify details.",
      );
    } finally {
      setIsSubmitting(false);
    }
=======
    setError("");
    const amount = Number(withdrawAmount);
    if (amount <= 0) { setError("Please enter a valid amount."); return; }
    if (amount > availableBalance) { setError("Insufficient funds."); return; }
    const newWithdrawal: Withdrawal = {
      id: Date.now(),
      bank: selectedBank,
      account: `•••• ${accountNumber.slice(-4)}`,
      amount,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) + " • " + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: "Pending",
    };
    setWithdrawals([newWithdrawal, ...withdrawals]);
    setAvailableBalance((prev) => prev - amount);
    setIsWithdrawModalOpen(false);
    setWithdrawAmount("");
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-3">
        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
        <p className="text-sm font-medium text-text-body/70">
          Syncing with ledger...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/30 dark:bg-red-950/10">
        <AlertTriangle className="h-8 w-8 text-red-500" />
        <h3 className="mt-3 text-base font-bold text-red-800 dark:text-red-400">
          Something went wrong
        </h3>
        <p className="mt-1 text-sm text-red-600 dark:text-red-400/80">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto animate-in fade-in zoom-in-95 duration-500 relative">
=======
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto animate-in fade-in zoom-in-95 duration-500">

      {/* Header */}
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text-heading dark:text-white">
            Wallet & Withdrawals
          </h1>
          <p className="mt-1 text-text-body dark:text-gray-400">
            Manage your funds, linked accounts, and payout history.
          </p>
        </div>
<<<<<<< HEAD
        <Button
          variant="outline"
          className="shadow-sm"
          isLoading={isDownloading}
          onClick={handleDownloadStatement}
        >
=======
        <Button variant="outline" className="shadow-sm" isLoading={isDownloading} onClick={handleDownloadStatement}>
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
          Download Statement
        </Button>
      </header>

<<<<<<< HEAD
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Balance Card */}
        <div className="lg:col-span-1 flex flex-col rounded-3xl border border-white/50 bg-gradient-to-br from-primary to-secondary p-8 shadow-xl text-white relative overflow-hidden h-fit">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <span className="text-sm font-semibold opacity-80 uppercase tracking-wider mb-2 relative z-10">
            Available Balance
          </span>
          <span className="text-5xl font-black mb-6 relative z-10">
            {formatCurrency(availableBalance)}
          </span>

          <div className="flex flex-col gap-1 mb-8 relative z-10">
            <span className="text-sm font-medium text-white/80">
              Pending Verification: {formatCurrency(pendingBalance)}
            </span>
            <span className="text-xs text-white/60">
              Funds unlock as campaign milestones are met.
            </span>
          </div>

          <div className="mt-auto flex flex-col gap-4 border-t border-white/20 pt-6 relative z-10">
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-80">Linked Account</span>
              <span className="text-sm font-bold truncate max-w-[180px]">
                {linkedBank.name} {linkedBank.account}
              </span>
            </div>
            <Button
              onClick={() => setIsWithdrawModalOpen(true)}
              disabled={availableBalance <= 0 || isSubmitting}
              className="w-full bg-accent hover:bg-white/90 font-bold shadow-lg shadow-black/10 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
=======
      {/* Balance Overview + Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col rounded-3xl border border-white/50 dark:border-white/10 bg-gradient-to-br from-primary to-secondary p-8 shadow-xl text-white relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <span className="relative z-10 text-sm font-semibold opacity-80 uppercase tracking-wider mb-1">Total Balance</span>
          <span className="relative z-10 text-3xl font-black mb-6 sm:text-5xl">{formatCurrency(totalBalance)}</span>
          <div className="relative z-10 flex flex-col gap-2 text-sm border-t border-white/20 dark:border-white/10 pt-4 mb-6">
            <div className="flex justify-between">
              <span className="opacity-80">Available for Withdrawal</span>
              <span className="font-bold">{formatCurrency(availableBalance)}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-80">Pending Verification</span>
              <span className="font-bold">{formatCurrency(pendingBalance)}</span>
            </div>
          </div>
          <div className="relative z-10 mt-auto flex flex-col gap-3 border-t border-white/20 dark:border-white/10 pt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-80">Linked Account</span>
              <span className="font-bold">GTBank •••• 4092</span>
            </div>
            <Button
              onClick={() => setIsWithdrawModalOpen(true)}
              disabled={availableBalance <= 0}
              className="w-full bg-accent hover:bg-white/90 dark:hover:bg-white/80 font-bold text-white shadow-lg shadow-black/10 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
            >
              Withdraw Funds
            </Button>
          </div>
        </div>

<<<<<<< HEAD
        {/* Withdrawal History */}
        <div className="lg:col-span-2 flex flex-col rounded-3xl border border-white/50 bg-white/40 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-heading dark:text-white">
              Recent Withdrawals
            </h2>
            <button className="text-sm font-bold text-primary hover:underline">
              View All
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {withdrawals.length === 0 ? (
              <p className="text-center text-text-muted py-8">
                No transaction history found.
              </p>
            ) : (
              withdrawals.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-border-glass pb-5 last:border-0 last:pb-0 animate-in slide-in-from-top-2 duration-300"
                >
                  <div className="flex items-center gap-4">
                    {/* Dynamic Icon based on Status */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                        item.status === "Successful"
                          ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                          : item.status === "Pending"
                            ? "bg-orange-100 text-[#FF9F1C] dark:bg-orange-500/20 dark:text-orange-400"
                            : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                      }`}
                    >
                      {item.status === "Successful" && (
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                      {item.status === "Pending" && (
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                      {item.status === "Failed" && (
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <span className="font-bold text-text-heading dark:text-white">
                        Payout to {item.bank}
                      </span>
                      <span className="text-xs text-text-muted mt-0.5">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="font-bold text-text-heading dark:text-white text-lg">
                      {formatCurrency(item.amount)}
                    </span>
                    <span
                      className={`text-xs font-bold mt-0.5 ${
                        item.status === "Successful"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : item.status === "Pending"
                            ? "text-[#FF9F1C] dark:text-orange-400"
                            : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
=======
        {/* Quick Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 mb-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-black text-text-heading dark:text-white">{formatCurrency(totalBalance)}</span>
            <span className="text-sm text-text-muted">Total Balance</span>
          </div>
          <div className="flex flex-col rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 mb-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-2xl font-black text-text-heading dark:text-white">{transactions.length}</span>
            <span className="text-sm text-text-muted">Total Transactions</span>
          </div>
          <div className="flex flex-col rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 mb-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <span className="text-2xl font-black text-text-heading dark:text-white">{formatCurrency(availableBalance)}</span>
            <span className="text-sm text-text-muted">Available to Withdraw</span>
          </div>
          <div className="flex flex-col rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 mb-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-black text-text-heading dark:text-white">{formatCurrency(pendingBalance)}</span>
            <span className="text-sm text-text-muted">Pending Verification</span>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="flex flex-col rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 sm:p-8 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-text-heading dark:text-white">Transaction History</h2>
          <div className="flex gap-2">
            {(['all', 'credit', 'debit'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                  filter === f
                    ? 'bg-primary text-white dark:text-gray-900 shadow-md'
                    : 'bg-white/50 text-text-muted hover:bg-white/80 dark:bg-black/30 dark:hover:bg-black/50'
                }`}
              >
                {f === 'all' ? 'All' : f === 'credit' ? 'Incoming' : 'Outgoing'}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-bold uppercase tracking-wider text-text-muted">
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">Description</th>
                <th className="pb-3 pr-4">Reference</th>
                <th className="pb-3 pr-4 text-right">Amount</th>
                <th className="pb-3 pr-0 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="pt-8 text-center text-text-muted">No transactions found.</td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-border/50 last:border-0">
                    <td className="py-4 pr-4 whitespace-nowrap text-text-muted">{tx.date}</td>
                    <td className="py-4 pr-4 font-medium text-text-heading dark:text-white">{tx.description}</td>
                    <td className="py-4 pr-4 text-text-muted font-mono text-xs">{tx.reference}</td>
                    <td className={`py-4 pr-4 text-right font-bold whitespace-nowrap ${tx.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </td>
                    <td className="py-4 pr-0 text-right">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                        tx.status === 'Successful' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                        tx.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400' :
                        'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
      </div>

      {/* Recent Withdrawals */}
      <div className="flex flex-col rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 sm:p-8 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-heading dark:text-white">Withdrawal History</h2>
          <button className="text-sm font-bold text-primary hover:underline">View All</button>
        </div>
        <div className="flex flex-col gap-4">
          {withdrawals.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  item.status === 'Successful' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' :
                  item.status === 'Pending' ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' :
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
                <div>
                  <span className="block font-bold text-text-heading dark:text-white">Payout to {item.bank}</span>
                  <span className="block text-xs text-text-muted mt-0.5">{item.date}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold text-text-heading dark:text-white">{formatCurrency(item.amount)}</span>
                <span className={`text-xs font-bold mt-0.5 ${
                  item.status === 'Successful' ? 'text-emerald-600 dark:text-emerald-400' :
                  item.status === 'Pending' ? 'text-amber-600 dark:text-amber-400' :
                  'text-red-600 dark:text-red-400'
                }`}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WITHDRAW MODAL */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-md rounded-3xl border border-white/50 bg-white/70 p-8 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-black/60 animate-in zoom-in-95 duration-300">
            <div className="mb-6 flex items-center justify-between">
              <div>
<<<<<<< HEAD
                <h2 className="text-2xl font-extrabold text-text-heading dark:text-white">
                  Initiate Withdrawal
                </h2>
                <p className="text-sm text-text-body dark:text-gray-400">
                  Transfer funds to your linked account.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsWithdrawModalOpen(false);
                  setWithdrawAmount("");
                  setModalError("");
                }}
                disabled={isSubmitting}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
              >
                <svg
                  className="h-5 w-5 text-text-heading dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form
              onSubmit={handleWithdrawSubmit}
              className="flex flex-col gap-6"
            >
=======
                <h2 className="text-2xl font-extrabold text-text-heading dark:text-white">Initiate Withdrawal</h2>
                <p className="text-sm text-text-body dark:text-gray-400">Transfer funds to your bank account.</p>
              </div>
              <button onClick={() => { setIsWithdrawModalOpen(false); setWithdrawAmount(""); setError(""); }} className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors">
                <svg className="h-5 w-5 text-text-heading dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="flex flex-col gap-5">
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
              <div className="rounded-2xl bg-white/40 p-4 border border-white/50 dark:bg-black/20 dark:border-white/5">
                <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                  Available to Withdraw
                </span>
                <p className="text-2xl font-black text-text-heading dark:text-white mt-1">
                  {formatCurrency(availableBalance)}
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
<<<<<<< HEAD
                <label className="text-sm font-bold text-text-heading dark:text-white">
                  Amount to Withdraw (₦)
                </label>
                <input
                  type="number"
                  required
                  autoFocus
                  disabled={isSubmitting}
                  placeholder="e.g. 50000"
                  value={withdrawAmount}
                  onChange={(e) => {
                    setWithdrawAmount(e.target.value);
                    setModalError("");
                  }}
                  className={`w-full rounded-xl border bg-white/50 px-4 py-3 text-lg outline-none transition-all dark:bg-black/30 dark:text-white ${
                    modalError
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-white/40 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10"
                  }`}
                />
                {modalError && (
                  <span className="text-xs font-bold text-red-500 mt-1">
                    {modalError}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                <svg
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xs font-medium">
                  Funds will be sent to{" "}
                  <strong>
                    {linkedBank.name} {linkedBank.account}
                  </strong>
                  . Processing typically takes 1-2 business hours.
                </p>
              </div>

              <div className="mt-2 flex items-center justify-end gap-3 pt-4 border-t border-border-glass">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={isSubmitting}
                  onClick={() => {
                    setIsWithdrawModalOpen(false);
                    setWithdrawAmount("");
                    setModalError("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="px-8 shadow-lg bg-[#f97316] hover:bg-[#ea580c] text-white border-none"
                >
                  Confirm Withdrawal
                </Button>
=======
                <label className="text-sm font-bold text-text-heading dark:text-white">Select Bank</label>
                <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)} className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white appearance-none">
                  {banks.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-text-heading dark:text-white">Account Number</label>
                  <input type="text" required placeholder="0123456789" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} maxLength={10} className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-text-heading dark:text-white">Account Name</label>
                  <input type="text" required placeholder="John Doe" value={accountName} onChange={(e) => setAccountName(e.target.value)} className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-text-heading dark:text-white">Amount to Withdraw (₦)</label>
                <input type="number" required autoFocus placeholder="e.g. 50000" value={withdrawAmount} onChange={(e) => { setWithdrawAmount(e.target.value); setError(""); }} className={`w-full rounded-xl border bg-white/50 px-4 py-3 text-lg outline-none transition-all dark:bg-black/30 dark:text-white ${error ? 'border-red-500 dark:border-red-400 focus:ring-red-500/20' : 'border-white/40 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10'}`} />
                {error && <span className="text-xs font-bold text-red-500 dark:text-red-400 mt-1">{error}</span>}
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-xs font-medium">Funds will be sent to <strong>{selectedBank} •••• {accountNumber.slice(-4)}</strong>. Processing typically takes 1-2 business hours.</p>
              </div>

              <div className="mt-2 flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="ghost" onClick={() => { setIsWithdrawModalOpen(false); setWithdrawAmount(""); setError(""); }}>Cancel</Button>
                <Button type="submit" className="px-8 shadow-lg bg-accent hover:bg-amber-600 dark:hover:bg-amber-700 text-white border-none">Confirm Withdrawal</Button>
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
