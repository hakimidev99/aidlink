"use client";

<<<<<<< HEAD
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface QueueItem {
  id: number;
  type: "Campaign" | "Proof";
  title: string;
  user: string;
  date: string;
  status: string;
  details: string;
  image: string;
}

export default function VerificationQueuePage() {
  const [activeTab, setActiveTab] = useState<"all" | "campaigns" | "proofs">(
    "all",
  );
  const [selectedItem, setSelectedItem] = useState<QueueItem | null>(null);

  const [queue, setQueue] = useState<QueueItem[]>([
    {
      id: 1,
      type: "Campaign",
      title: "Flood Relief Fund",
      user: "John Doe",
      date: "2 hours ago",
      status: "Pending",
      details: "Requesting ₦1,000,000 for emergency supplies.",
      image:
        "https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?w=800&q=80",
    },
    {
      id: 2,
      type: "Proof",
      title: "Roofing Materials",
      user: "Sarah Jenkins",
      date: "5 hours ago",
      status: "Pending",
      details: "Receipts and photos for ₦250,000 roofing materials.",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356f12?w=800&q=80",
    },
    {
      id: 3,
      type: "Campaign",
      title: "School Computers",
      user: "EduCare Org",
      date: "Yesterday",
      status: "Pending",
      details: "Requesting ₦5,000,000 for a new IT lab.",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    },
  ]);

  const filteredQueue = queue.filter(
    (item) =>
      activeTab === "all" ||
      item.type.toLowerCase() === activeTab.replace("s", ""),
  );

  const handleAction = (id: number, action: "approve" | "reject") => {
    setQueue(queue.filter((q) => q.id !== id));
    setSelectedItem(null);
    alert(`Item ${action}d successfully.`);
  };

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in zoom-in-95 duration-500">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Verification Queue
        </h1>
        <p className="mt-2 text-sm font-medium text-slate-500 dark:text-zinc-400">
          Review and approve campaign requests and proof of fulfillments.
        </p>
      </header>

      {/* Main Container */}
      <div className="flex flex-col rounded-3xl border border-white/40 bg-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-black/20 overflow-hidden transition-all duration-300">
        {/* Responsive Tabs Container */}
        <div className="flex w-full border-b border-slate-200/60 bg-white/20 px-2 sm:px-6 pt-2 gap-1 sm:gap-2 dark:border-white/10 dark:bg-white/5">
          {(["all", "campaigns", "proofs"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-none text-center px-3 sm:px-5 py-3.5 text-xs sm:text-sm font-bold capitalize transition-all border-b-2 relative -mb-0.5 whitespace-nowrap ${
                activeTab === tab
                  ? "border-primary text-primary dark:text-white dark:border-white"
                  : "border-transparent text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            {filteredQueue.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-white/80 dark:bg-black/40 border border-white/40 dark:border-white/5 shadow-sm transition-all duration-200 hover:bg-white dark:hover:bg-black/60 hover:shadow-md"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-bold text-xs tracking-wider uppercase ${
                      item.type === "Campaign"
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                        : "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                    }`}
                  >
                    {item.type === "Campaign" ? "CMP" : "PRF"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-zinc-400 mt-0.5 truncate">
                      Submitted by{" "}
                      <span className="text-slate-700 dark:text-zinc-300 font-semibold">
                        {item.user}
                      </span>{" "}
                      • {item.date}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedItem(item)}
                  variant="outline"
                  className="w-full md:w-auto h-10 px-5 rounded-xl font-bold shadow-sm shrink-0"
                >
                  Review Details
                </Button>
              </div>
            ))}

            {filteredQueue.length === 0 && (
              <div className="text-center py-12 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl">
                <p className="text-sm font-medium text-slate-400 dark:text-zinc-500">
                  No pending items in this queue.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="w-full max-w-xl my-auto rounded-3xl border border-white/40 bg-white/90 p-5 sm:p-8 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/90 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-4 gap-2">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Review {selectedItem.type}
              </h2>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-md tracking-wide uppercase shrink-0 ${
                  selectedItem.type === "Campaign"
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                    : "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
                }`}
              >
                {selectedItem.type}
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-white/5 mb-5 bg-slate-50 dark:bg-zinc-900">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-40 sm:h-56 object-cover"
              />
            </div>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex flex-col sm:grid sm:grid-cols-3 gap-1 sm:gap-2 py-2 border-b border-slate-100 dark:border-white/5">
                <span className="font-semibold text-slate-400 dark:text-zinc-500">
                  Title
                </span>
                <span className="sm:col-span-2 font-bold text-slate-800 dark:text-zinc-200 wrap-break-word">
                  {selectedItem.title}
                </span>
              </div>
              <div className="flex flex-col sm:grid sm:grid-cols-3 gap-1 sm:gap-2 py-2 border-b border-slate-100 dark:border-white/5">
                <span className="font-semibold text-slate-400 dark:text-zinc-500">
                  Submitted By
                </span>
                <span className="sm:col-span-2 font-bold text-slate-800 dark:text-zinc-200 wrap-break-word">
                  {selectedItem.user}
                </span>
              </div>
              <div className="flex flex-col sm:grid sm:grid-cols-3 gap-1 sm:gap-2 py-2">
                <span className="font-semibold text-slate-400 dark:text-zinc-500">
                  Details
                </span>
                <span className="sm:col-span-2 font-medium text-slate-600 dark:text-zinc-300 leading-relaxed wrap-break-word">
                  {selectedItem.details}
                </span>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-slate-100 dark:border-white/5 pt-5">
              <Button
                variant="ghost"
                onClick={() => setSelectedItem(null)}
                className="w-full sm:w-auto h-11 rounded-xl font-bold"
              >
                Cancel
              </Button>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  onClick={() => handleAction(selectedItem.id, "reject")}
                  className="flex-1 sm:flex-none sm:w-auto h-11 px-5 rounded-xl font-bold bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white shadow-sm shadow-red-500/10"
                >
                  Reject
                </Button>
                <Button
                  onClick={() => handleAction(selectedItem.id, "approve")}
                  className="flex-1 sm:flex-none sm:w-auto h-11 px-5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white shadow-sm shadow-emerald-600/10"
                >
                  Approve
                </Button>
              </div>
=======
import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { Button } from '@/components/ui/button';

type VerificationStatus = 'Pending' | 'Approved' | 'Rejected';
type FilterTab = 'All' | 'Pending' | 'Approved' | 'Rejected';

interface Verification {
  id: string;
  title: string;
  beneficiary: string;
  verifier: string;
  submissionDate: string;
  status: VerificationStatus;
  type: string;
  documents: { name: string; url: string }[];
  notes?: string;
}

const mockVerifications: Verification[] = [
  {
    id: 'V-001', title: 'Community Clinic Renovation', beneficiary: 'John Doe', verifier: 'Amara Okafor',
    submissionDate: 'Jul 2, 2026', status: 'Pending', type: 'Proof of Fulfillment',
    documents: [{ name: 'Receipt_Clinic_Materials.pdf', url: '#' }, { name: 'Site_Photos_July.zip', url: '#' }],
  },
  {
    id: 'V-002', title: 'Urban Agriculture Seeds', beneficiary: 'Sarah Jenkins', verifier: 'Blessing Adeyemi',
    submissionDate: 'Jun 30, 2026', status: 'Pending', type: 'Campaign Launch',
    documents: [{ name: 'Business_Plan.pdf', url: '#' }, { name: 'Budget_Breakdown.xlsx', url: '#' }],
  },
  {
    id: 'V-003', title: 'Flood Emergency Kits', beneficiary: 'Lagos Relief Org', verifier: 'Amara Okafor',
    submissionDate: 'Jun 28, 2026', status: 'Approved', type: 'Proof of Fulfillment',
    documents: [{ name: 'Distribution_Report.pdf', url: '#' }, { name: 'Beneficiary_Signatures.pdf', url: '#' }],
  },
  {
    id: 'V-004', title: 'School Computer Lab', beneficiary: 'EduCare Foundation', verifier: '—',
    submissionDate: 'Jun 25, 2026', status: 'Pending', type: 'Campaign Launch',
    documents: [{ name: 'Proposal_Document.pdf', url: '#' }, { name: 'Vendor_Quotes.pdf', url: '#' }],
  },
  {
    id: 'V-005', title: 'Well Water Project', beneficiary: 'Riverside Community', verifier: 'Kingsley A.',
    submissionDate: 'Jun 22, 2026', status: 'Rejected', type: 'Proof of Fulfillment',
    documents: [{ name: 'Payment_Receipts.pdf', url: '#' }], notes: 'Insufficient documentation. Receipts do not match budget.',
  },
  {
    id: 'V-006', title: 'Women Empowerment Workshop', beneficiary: 'Chioma Eze', verifier: '—',
    submissionDate: 'Jun 20, 2026', status: 'Pending', type: 'Campaign Launch',
    documents: [{ name: 'Workshop_Plan.pdf', url: '#' }, { name: 'Venue_Contract.pdf', url: '#' }],
  },
  {
    id: 'V-007', title: 'Medical Outreach', beneficiary: 'Hope Foundation', verifier: 'Blessing Adeyemi',
    submissionDate: 'Jun 18, 2026', status: 'Approved', type: 'Proof of Fulfillment',
    documents: [{ name: 'Medical_Report.pdf', url: '#' }, { name: 'Pharmacy_Receipts.pdf', url: '#' }],
  },
  {
    id: 'V-008', title: 'Solar Panel Installation', beneficiary: 'Green Energy Co-op', verifier: 'Amara Okafor',
    submissionDate: 'Jun 15, 2026', status: 'Pending', type: 'Proof of Fulfillment',
    documents: [{ name: 'Installation_Photos.pdf', url: '#' }],
  },
];

const statusStyles: Record<VerificationStatus, string> = {
  Pending: 'bg-warning/10 text-warning border-warning/20',
  Approved: 'bg-success/10 text-success border-success/20',
  Rejected: 'bg-error/10 text-error border-error/20',
};

const tabs: FilterTab[] = ['All', 'Pending', 'Approved', 'Rejected'];

export default function VerificationsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const [verifications, setVerifications] = useState<Verification[]>(mockVerifications);
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);

  const filtered = activeTab === 'All' ? verifications : verifications.filter((v) => v.status === activeTab);

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    setVerifications((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: action === 'approve' ? 'Approved' : 'Rejected' as VerificationStatus } : v))
    );
    if (selectedVerification?.id === id) {
      setSelectedVerification((prev) => prev && { ...prev, status: action === 'approve' ? 'Approved' : 'Rejected' });
    }
  };

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto pb-12">
      <AdminHeader title="Verification Management" description="Review campaign launches and proof of fulfillments." />

      <div className="flex items-center gap-1 rounded-xl bg-white/50 dark:bg-white/[0.03] p-1 w-fit border border-white/60 dark:border-white/[0.06] shadow-sm overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-white/60 dark:bg-white/[0.06] text-text-heading shadow-sm'
                : 'text-text-muted hover:text-text-body'
            }`}
          >
            {tab}
            {tab !== 'All' && (
              <span className="ml-1.5 text-xs opacity-60">
                ({verifications.filter((v) => v.status === tab).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/60 dark:border-white/[0.06] bg-white/30 dark:bg-white/[0.02]">
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Request Title</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Beneficiary</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Verifier</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Submitted</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Status</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/60 dark:divide-white/[0.06]">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-white/30 dark:hover:bg-white/[0.04] transition-colors">
                  <td className="px-5 py-4 font-semibold text-text-heading dark:text-white">{v.title}</td>
                  <td className="px-5 py-4 text-text-body">{v.beneficiary}</td>
                  <td className="px-5 py-4 text-text-muted text-xs">{v.verifier}</td>
                  <td className="px-5 py-4 text-text-muted text-xs">{v.submissionDate}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${statusStyles[v.status]}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedVerification(v)}
                        className="h-8 px-3 text-xs"
                      >
                        View Docs
                      </Button>
                      {v.status === 'Pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAction(v.id, 'reject')}
                            className="h-8 px-3 text-xs text-error hover:bg-error/10"
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAction(v.id, 'approve')}
                            className="h-8 px-3 text-xs bg-success hover:bg-success/90 text-white shadow-sm"
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
                  <td colSpan={6} className="px-5 py-12 text-center text-text-muted text-sm">
                    No verifications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedVerification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setSelectedVerification(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-white/80 dark:bg-black/80 border border-white/60 dark:border-white/[0.06] p-6 shadow-2xl backdrop-blur-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-text-heading dark:text-white">{selectedVerification.title}</h3>
              <button onClick={() => setSelectedVerification(null)} className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <span className="text-xs font-medium text-text-muted">Beneficiary</span>
                <p className="text-sm font-semibold text-text-body mt-0.5">{selectedVerification.beneficiary}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-text-muted">Verifier</span>
                <p className="text-sm font-semibold text-text-body mt-0.5">{selectedVerification.verifier}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-text-muted">Type</span>
                <p className="text-sm font-semibold text-text-body mt-0.5">{selectedVerification.type}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-text-muted">Submitted</span>
                <p className="text-sm font-semibold text-text-body mt-0.5">{selectedVerification.submissionDate}</p>
              </div>
            </div>

            <div className="mb-5">
              <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase mb-4 ${statusStyles[selectedVerification.status]}`}>
                {selectedVerification.status}
              </span>
            </div>

            <div className="mb-5">
              <h4 className="text-sm font-semibold text-text-heading dark:text-white mb-3">Uploaded Documents</h4>
              <div className="flex flex-col gap-2">
                {selectedVerification.documents.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-white/40 dark:bg-white/[0.04] p-3 border border-white/40 dark:border-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-text-body">{doc.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">View</Button>
                  </div>
                ))}
              </div>
            </div>

            {selectedVerification.notes && (
              <div className="mb-5 rounded-xl bg-warning/5 border border-warning/20 p-3">
                <p className="text-xs font-medium text-warning">Notes</p>
                <p className="text-sm text-text-body mt-1">{selectedVerification.notes}</p>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-white/60 dark:border-white/[0.06] pt-4">
              <Button variant="ghost" onClick={() => setSelectedVerification(null)}>Close</Button>
              {selectedVerification.status === 'Pending' && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleAction(selectedVerification.id, 'reject')}
                    className="text-error border-error/30"
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleAction(selectedVerification.id, 'approve')}
                    className="bg-success hover:bg-success/90 text-white shadow-sm"
                  >
                    Approve & Verify
                  </Button>
                </div>
              )}
>>>>>>> 5ed0da5 (added landing apge and dashboard routing)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
