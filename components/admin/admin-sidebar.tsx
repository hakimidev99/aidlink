"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/logo';

export function AdminSidebar() {
  const pathname = usePathname();
  // State to control mobile sidebar open/close
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Platform Overview', path: '/admin', icon: DashboardIcon },
    { name: 'Verification Queue', path: '/admin/verifications', icon: VerificationIcon },
    { name: 'All Campaigns', path: '/admin/campaigns', icon: CampaignIcon },
    { name: 'Transactions', path: '/admin/transactions', icon: TransactionIcon },
    { name: 'Manage Users', path: '/admin/users', icon: UsersIcon },
    { name: 'System Settings', path: '/admin/settings', icon: SettingsIcon },
  ];

  return (
    <>
      {/* --- MOBILE TOGGLE BUTTON --- */}
      {/* A floating glassmorphic hamburger menu visible only on small screens */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg dark:bg-black/50 dark:border-white/10 lg:hidden text-text-heading dark:text-white hover:scale-105 transition-transform"
        aria-label="Open Menu"
      >
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* --- MOBILE OVERLAY BACKDROP --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      {/* 
        Mobile: Fixed positioning, slides in from left (translate-x). 
        Desktop (lg): Sticky positioning, always visible.
      */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-border-glass bg-white/80 p-6 backdrop-blur-3xl dark:bg-black/80 transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:bg-white/40 lg:dark:bg-black/20 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        <div>
          <div className="mb-10 flex items-center justify-between pl-2">
            <Logo /> 
            
            {/* Mobile Close Button inside the sidebar */}
            <button 
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors lg:hidden"
            >
              <svg className="h-5 w-5 text-text-heading dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              // Intelligent routing logic
              const isActive = item.path === '/admin' 
                ? pathname === item.path 
                : pathname.startsWith(item.path);

              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsOpen(false)} // Auto-close sidebar on mobile after clicking a link
                  className={`flex items-center gap-4 rounded-2xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'text-text-body hover:bg-white/50 hover:text-primary dark:hover:bg-white/5'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-text-muted'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Action / Admin Profile Snippet */}
        <div className="mt-auto">
          <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/50 p-4 backdrop-blur-md dark:border-white/10 dark:bg-black/40 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-inner font-bold">
              KA
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-text-heading dark:text-white">Kingsley A.</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Super Admin</span>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
}

// --- Admin-Specific SVG Icons ---

function DashboardIcon(props: React.SVGProps<SVGSVGElement>) { 
  return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>; 
}

function VerificationIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
}

function CampaignIcon(props: React.SVGProps<SVGSVGElement>) { 
  return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>; 
}

function TransactionIcon(props: React.SVGProps<SVGSVGElement>) { 
  return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>; 
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) { 
  return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>; 
}