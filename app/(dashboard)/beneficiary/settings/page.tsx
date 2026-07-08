"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+234 800 000 0000",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    campaignUpdates: true,
    donationAlerts: true,
    weeklyDigest: false,
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="flex w-full max-w-4xl flex-col gap-8 mx-auto animate-in fade-in zoom-in-95 duration-500 pb-12">

      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-text-heading dark:text-white">
          Account Settings
        </h1>
        <p className="mt-1 text-text-body dark:text-gray-400">
          Update your profile, notification preferences, and security settings.
        </p>
      </header>

      <div className="flex flex-col gap-8">

        {/* Profile Section */}
        <div className="flex flex-col rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 sm:p-8 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-heading dark:text-white">Personal Information</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="relative h-20 w-20 shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white shadow-inner">
              JD
              <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 dark:bg-emerald-600 border-2 border-white dark:border-black flex items-center justify-center">
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
              </div>
            </div>
            <div>
              <p className="text-lg font-bold text-text-heading dark:text-white">{profile.name}</p>
              <p className="text-sm text-text-muted">Beneficiary • Verified Account</p>
            </div>
          </div>

          <form onSubmit={handleProfileSave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-text-heading dark:text-white">Full Name</label>
              <input
                type="text" readOnly={!isEditing}
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className={`w-full rounded-xl border bg-white/50 px-4 py-3 text-sm outline-none transition-all dark:bg-black/30 dark:text-white ${isEditing ? 'border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20' : 'border-white/40 dark:border-white/10 cursor-default'}`}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-text-heading dark:text-white">Email Address</label>
              <input
                type="email" readOnly
                value={profile.email}
                className="w-full rounded-xl border border-white/40 dark:border-white/10 bg-white/30 px-4 py-3 text-sm cursor-not-allowed text-text-muted dark:bg-black/20 dark:text-gray-400"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-text-heading dark:text-white">Phone Number</label>
              <input
                type="tel" readOnly={!isEditing}
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className={`w-full rounded-xl border bg-white/50 px-4 py-3 text-sm outline-none transition-all dark:bg-black/30 dark:text-white ${isEditing ? 'border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20' : 'border-white/40 dark:border-white/10 cursor-default'}`}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-text-heading dark:text-white">Account Type</label>
              <input type="text" readOnly value="Individual Beneficiary" className="w-full rounded-xl border border-white/40 dark:border-white/10 bg-white/30 px-4 py-3 text-sm cursor-not-allowed text-text-muted dark:bg-black/20 dark:text-gray-400" />
            </div>
            {isEditing && (
              <div className="md:col-span-2 flex justify-end mt-2">
                <Button type="submit" className="px-8 shadow-lg shadow-primary/20">Save Changes</Button>
              </div>
            )}
          </form>
        </div>

        {/* Notification Preferences */}
        <div className="flex flex-col rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 sm:p-8 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-text-heading dark:text-white mb-6">Notification Preferences</h2>
          <div className="flex flex-col gap-5">
            {[
              { key: 'email' as const, label: 'Email Notifications', desc: 'Receive updates via email' },
              { key: 'sms' as const, label: 'SMS Notifications', desc: 'Receive text message alerts' },
              { key: 'push' as const, label: 'Push Notifications', desc: 'Receive browser push notifications' },
              { key: 'campaignUpdates' as const, label: 'Campaign Updates', desc: 'When your campaign reaches milestones' },
              { key: 'donationAlerts' as const, label: 'Donation Alerts', desc: 'When someone donates to your campaign' },
              { key: 'weeklyDigest' as const, label: 'Weekly Digest', desc: 'Weekly summary of your campaign activity' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div>
                  <span className="text-sm font-bold text-text-heading dark:text-white">{item.label}</span>
                  <p className="text-xs text-text-muted">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotification(item.key)}
                  className={`relative h-7 w-12 rounded-full transition-colors ${
                    notifications[item.key] ? 'bg-primary' : 'bg-gray-300 dark:bg-white/20'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform ${
                      notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security Section */}
        <div className="flex flex-col rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 sm:p-8 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-text-heading dark:text-white mb-6">Security & Authentication</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-text-heading dark:text-white">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white" />
            </div>
            <div className="hidden md:block" />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-text-heading dark:text-white">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-text-heading dark:text-white">Confirm New Password</label>
              <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-black/30 dark:text-white" />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button variant="outline" className="px-8">Update Password</Button>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-text-heading dark:text-white">Two-Factor Authentication (2FA)</span>
                <p className="text-xs text-text-muted">Add an extra layer of security to your account</p>
              </div>
              <button
                type="button"
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative h-7 w-12 rounded-full transition-colors ${
                  twoFactorEnabled ? 'bg-primary' : 'bg-gray-300 dark:bg-white/20'
                }`}
              >
                <span className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-transform ${twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="flex flex-col rounded-3xl border border-red-200/50 bg-red-50/50 p-6 sm:p-8 shadow-xl backdrop-blur-xl dark:border-red-500/10 dark:bg-red-500/5">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Danger Zone</h2>
          <p className="text-sm text-text-body dark:text-gray-400 mb-6">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          {!showDeleteConfirm ? (
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white border-none shadow-lg shadow-red-600/20"
              >
                Delete Account
              </Button>
            </div>
          ) : (
            <div className="rounded-2xl bg-white/60 dark:bg-black/30 p-5 border border-red-200 dark:border-red-500/20">
              <p className="text-sm font-bold text-text-heading dark:text-white mb-3">
                Are you absolutely sure?
              </p>
              <p className="text-xs text-text-body dark:text-gray-400 mb-4">
                This action cannot be undone. All your campaigns, donor data, and personal information will be permanently removed.
              </p>
              <div className="flex items-center gap-3 justify-end">
                <Button type="button" variant="ghost" onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white border-none shadow-lg shadow-red-600/20"
                >
                  Yes, Delete My Account
                </Button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
