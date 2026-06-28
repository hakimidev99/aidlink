"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function AdminUsersPage() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Beneficiary", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Donor", status: "Active" },
    { id: 3, name: "Scammer123", email: "fake@email.com", role: "Beneficiary", status: "Suspended" },
    { id: 4, name: "Kingsley A.", email: "admin@aidlink.com", role: "Admin", status: "Active" },
  ];

  return (
    <div className="flex w-full max-w-7xl flex-col gap-8 mx-auto animate-in fade-in zoom-in-95 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-text-heading dark:text-white">User Management</h1>
          <p className="mt-1 text-text-body dark:text-gray-400">View and manage Donors, Beneficiaries, and Admins.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        {users.map(user => (
          <div key={user.id} className="flex flex-col rounded-3xl border border-white/50 bg-white/40 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-inner">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-text-heading dark:text-white line-clamp-1">{user.name}</h3>
                <span className="text-xs text-text-muted">{user.role}</span>
              </div>
            </div>
            <div className="text-sm text-text-body mb-4 truncate">{user.email}</div>
            <div className="mt-auto flex justify-between items-center border-t border-border-glass pt-4">
              <span className={`text-xs font-bold ${user.status === 'Active' ? 'text-emerald-600' : 'text-red-600'}`}>• {user.status}</span>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                {user.status === 'Suspended' ? 'Unban' : 'Suspend'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}