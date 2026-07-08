"use client";

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { Button } from '@/components/ui/button';

type UserRole = 'Admin' | 'Verifier' | 'Beneficiary' | 'Donor' | 'Partner';
type UserStatus = 'Active' | 'Suspended' | 'Pending';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinDate: string;
  phone?: string;
  location?: string;
  totalDonations?: string;
  campaignsCreated?: number;
}

const users: User[] = [
  { id: 'U-001', name: 'Kingsley A.', email: 'kingsley@aidlink.com', role: 'Admin', status: 'Active', joinDate: 'Jan 15, 2024', phone: '+234 801 234 5678', location: 'Lagos, Nigeria' },
  { id: 'U-002', name: 'Amara Okafor', email: 'amara@example.com', role: 'Verifier', status: 'Active', joinDate: 'Mar 3, 2024', phone: '+234 802 345 6789', location: 'Abuja, Nigeria' },
  { id: 'U-003', name: 'John Doe', email: 'john.doe@email.com', role: 'Beneficiary', status: 'Active', joinDate: 'Feb 20, 2024', campaignsCreated: 3, location: 'Kano, Nigeria' },
  { id: 'U-004', name: 'Jane Smith', email: 'jane.smith@email.com', role: 'Donor', status: 'Active', joinDate: 'Apr 12, 2024', totalDonations: '₦1,200,000', location: 'Lagos, Nigeria' },
  { id: 'U-005', name: 'Emeka Okafor', email: 'emeka.o@email.com', role: 'Donor', status: 'Active', joinDate: 'May 8, 2024', totalDonations: '₦850,000', location: 'Port Harcourt, Nigeria' },
  { id: 'U-006', name: 'Sarah Jenkins', email: 'sarah.j@email.com', role: 'Beneficiary', status: 'Active', joinDate: 'Jan 30, 2024', campaignsCreated: 2, location: 'Ibadan, Nigeria' },
  { id: 'U-007', name: 'Lagos Relief Org', email: 'info@lagosrelief.org', role: 'Partner', status: 'Active', joinDate: 'Dec 1, 2023', location: 'Lagos, Nigeria' },
  { id: 'U-008', name: 'EduCare Foundation', email: 'admin@educare.org', role: 'Partner', status: 'Pending', joinDate: 'Jun 15, 2024', location: 'Abuja, Nigeria' },
  { id: 'U-009', name: 'Scammer Alert', email: 'suspicious@fake.com', role: 'Beneficiary', status: 'Suspended', joinDate: 'Mar 22, 2024', location: 'Unknown' },
  { id: 'U-010', name: 'Chioma Eze', email: 'chioma.eze@email.com', role: 'Donor', status: 'Active', joinDate: 'Feb 14, 2024', totalDonations: '₦2,100,000', location: 'Enugu, Nigeria' },
  { id: 'U-011', name: 'Blessing Adeyemi', email: 'blessing.a@email.com', role: 'Verifier', status: 'Active', joinDate: 'Apr 5, 2024', location: 'Ilorin, Nigeria' },
  { id: 'U-012', name: 'Hope Foundation', email: 'contact@hopefoundation.org', role: 'Partner', status: 'Suspended', joinDate: 'Nov 10, 2023', location: 'Kaduna, Nigeria' },
];

const roleColors: Record<UserRole, string> = {
  Admin: 'bg-error/10 text-error',
  Verifier: 'bg-info/10 text-info',
  Beneficiary: 'bg-primary/10 text-primary',
  Donor: 'bg-success/10 text-success',
  Partner: 'bg-warning/10 text-warning',
};

const statusColors: Record<UserStatus, string> = {
  Active: 'bg-success/10 text-success border-success/20',
  Suspended: 'bg-error/10 text-error border-error/20',
  Pending: 'bg-warning/10 text-warning border-warning/20',
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'All'>('All');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userList, setUserList] = useState<User[]>(users);

  const filtered = userList.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const toggleStatus = (id: string) => {
    setUserList((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const newStatus: UserStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        return { ...u, status: newStatus };
      })
    );
    if (selectedUser?.id === id) {
      setSelectedUser((prev) => prev && { ...prev, status: prev.status === 'Active' ? 'Suspended' : 'Active' });
    }
  };

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto pb-12">
      <AdminHeader title="User Management" description="View and manage all platform users across roles." />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/60 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-text-body outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-text-muted backdrop-blur-xl"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as UserRole | 'All')}
          className="rounded-xl border border-white/60 dark:border-white/[0.06] bg-white/50 dark:bg-white/[0.03] px-4 py-2.5 text-sm text-text-body outline-none focus:ring-2 focus:ring-primary/20 backdrop-blur-xl"
        >
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Verifier">Verifier</option>
          <option value="Beneficiary">Beneficiary</option>
          <option value="Donor">Donor</option>
          <option value="Partner">Partner</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/60 dark:border-white/[0.06] bg-white/30 dark:bg-white/[0.02]">
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">User</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Email</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Role</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Status</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Joined</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/60 dark:divide-white/[0.06]">
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className="hover:bg-white/30 dark:hover:bg-white/[0.04] transition-colors cursor-pointer"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white text-sm font-bold shadow-inner">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-text-heading dark:text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-text-body text-xs">{user.email}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${roleColors[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${statusColors[user.status]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-text-muted text-xs">{user.joinDate}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }}
                        className="h-8 px-3 text-xs"
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); toggleStatus(user.id); }}
                        className={`h-8 px-3 text-xs ${user.status === 'Active' ? 'text-error border-error/30 hover:bg-error/10' : 'text-success border-success/30 hover:bg-success/10'}`}
                      >
                        {user.status === 'Active' ? 'Suspend' : 'Activate'}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-text-muted text-sm">
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={() => setSelectedUser(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-white/80 dark:bg-black/80 border border-white/60 dark:border-white/[0.06] p-6 shadow-2xl backdrop-blur-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white text-xl font-bold shadow-inner">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-heading dark:text-white">{selectedUser.name}</h3>
                  <span className={`inline-block rounded-md px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider mt-1 ${roleColors[selectedUser.role]}`}>
                    {selectedUser.role}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-xs font-medium text-text-muted">Email</span>
                <p className="text-sm font-semibold text-text-body mt-0.5">{selectedUser.email}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-text-muted">Phone</span>
                <p className="text-sm font-semibold text-text-body mt-0.5">{selectedUser.phone || '—'}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-text-muted">Location</span>
                <p className="text-sm font-semibold text-text-body mt-0.5">{selectedUser.location || '—'}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-text-muted">Joined</span>
                <p className="text-sm font-semibold text-text-body mt-0.5">{selectedUser.joinDate}</p>
              </div>
              {selectedUser.totalDonations && (
                <div>
                  <span className="text-xs font-medium text-text-muted">Total Donations</span>
                  <p className="text-sm font-semibold text-text-body mt-0.5">{selectedUser.totalDonations}</p>
                </div>
              )}
              {selectedUser.campaignsCreated !== undefined && (
                <div>
                  <span className="text-xs font-medium text-text-muted">Campaigns</span>
                  <p className="text-sm font-semibold text-text-body mt-0.5">{selectedUser.campaignsCreated}</p>
                </div>
              )}
              <div>
                <span className="text-xs font-medium text-text-muted">Status</span>
                <p className="mt-0.5">
                  <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${statusColors[selectedUser.status]}`}>
                    {selectedUser.status}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-white/60 dark:border-white/[0.06] pt-4">
              <Button variant="ghost" onClick={() => setSelectedUser(null)}>Close</Button>
              <Button
                variant="outline"
                onClick={() => toggleStatus(selectedUser.id)}
                className={selectedUser.status === 'Active' ? 'text-error border-error/30' : 'text-success border-success/30'}
              >
                {selectedUser.status === 'Active' ? 'Suspend User' : 'Activate User'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
