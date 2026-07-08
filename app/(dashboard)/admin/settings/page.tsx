"use client";

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/admin-header';
import { Button } from '@/components/ui/button';

export default function AdminSettingsPage() {
  const [platformName, setPlatformName] = useState('AidLink');
  const [description, setDescription] = useState('A transparent donation platform connecting donors with verified beneficiaries across Africa.');
  const [contactEmail, setContactEmail] = useState('support@aidlink.com');
  const [feePercentage, setFeePercentage] = useState('2.5');
  const [settlementPeriod, setSettlementPeriod] = useState('7');
  const [autoApproveThreshold, setAutoApproveThreshold] = useState('100000');
  const [maxVerificationAttempts, setMaxVerificationAttempts] = useState('3');
  const [adminAlerts, setAdminAlerts] = useState(true);
  const [newUserNotifications, setNewUserNotifications] = useState(true);
  const [campaignNotifications, setCampaignNotifications] = useState(true);
  const [transactionNotifications, setTransactionNotifications] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  const handleSave = (section: string) => {
    setSaving((prev) => ({ ...prev, [section]: true }));
    setTimeout(() => {
      setSaving((prev) => ({ ...prev, [section]: false }));
    }, 1000);
  };

  return (
    <div className="flex w-full max-w-4xl flex-col gap-8 mx-auto pb-12">
      <AdminHeader title="Platform Settings" description="Configure global platform variables, fees, and security." />

      <div className="flex flex-col gap-8">
        {/* General */}
        <div className="rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
          <h2 className="text-lg font-bold text-text-heading dark:text-white mb-5">General</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-text-heading dark:text-white">Platform Name</label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="rounded-xl border border-white/60 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.04] px-4 py-2.5 text-sm text-text-body outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-text-heading dark:text-white">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="rounded-xl border border-white/60 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.04] px-4 py-2.5 text-sm text-text-body outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-text-heading dark:text-white">Platform Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-xl border border-border bg-surface-secondary px-4 py-2.5 text-sm text-text-body outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
          </div>
          <Button
            onClick={() => handleSave('general')}
            className="mt-5"
            disabled={saving.general}
            isLoading={saving.general}
          >
            Save Changes
          </Button>
        </div>

        {/* Fees */}
        <div className="rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
          <h2 className="text-lg font-bold text-text-heading dark:text-white mb-5">Fees & Settlement</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-text-heading dark:text-white">Platform Fee (%)</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={feePercentage}
                  onChange={(e) => setFeePercentage(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface-secondary px-4 py-2.5 pr-8 text-sm text-text-body outline-none focus:ring-2 focus:ring-primary/20"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-muted font-medium">%</span>
              </div>
              <p className="text-xs text-text-muted">Auto-deducted from payouts to cover processing costs.</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-text-heading dark:text-white">Settlement Period (days)</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={settlementPeriod}
                  onChange={(e) => setSettlementPeriod(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface-secondary px-4 py-2.5 pr-12 text-sm text-text-body outline-none focus:ring-2 focus:ring-primary/20"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-muted font-medium">days</span>
              </div>
              <p className="text-xs text-text-muted">How often settlements are processed for beneficiaries.</p>
            </div>
          </div>
          <Button
            onClick={() => handleSave('fees')}
            className="mt-5"
            disabled={saving.fees}
            isLoading={saving.fees}
          >
            Save Changes
          </Button>
        </div>

        {/* Verification */}
        <div className="rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
          <h2 className="text-lg font-bold text-text-heading dark:text-white mb-5">Verification Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-text-heading dark:text-white">Auto-Approve Threshold (₦)</label>
              <input
                type="number"
                min="0"
                step="10000"
                value={autoApproveThreshold}
                onChange={(e) => setAutoApproveThreshold(e.target.value)}
                className="rounded-xl border border-white/60 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.04] px-4 py-2.5 text-sm text-text-body outline-none focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-text-muted">Campaigns under this amount are auto-approved.</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-text-heading dark:text-white">Max Verification Attempts</label>
              <input
                type="number"
                min="1"
                max="10"
                value={maxVerificationAttempts}
                onChange={(e) => setMaxVerificationAttempts(e.target.value)}
                className="rounded-xl border border-white/60 dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.04] px-4 py-2.5 text-sm text-text-body outline-none focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-text-muted">Maximum attempts before beneficiary is locked.</p>
            </div>
          </div>
          <Button
            onClick={() => handleSave('verification')}
            className="mt-5"
            disabled={saving.verification}
            isLoading={saving.verification}
          >
            Save Changes
          </Button>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] p-6 shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
          <h2 className="text-lg font-bold text-text-heading dark:text-white mb-5">Admin Notifications</h2>
          <div className="flex flex-col gap-4">
            <ToggleSetting label="Admin Alert Emails" description="Receive email alerts for critical platform events" enabled={adminAlerts} onChange={setAdminAlerts} />
            <ToggleSetting label="New User Registration" description="Get notified when a new user signs up" enabled={newUserNotifications} onChange={setNewUserNotifications} />
            <ToggleSetting label="Campaign Activity" description="Notifications for campaign creation and updates" enabled={campaignNotifications} onChange={setCampaignNotifications} />
            <ToggleSetting label="Transaction Alerts" description="Email for large or suspicious transactions" enabled={transactionNotifications} onChange={setTransactionNotifications} />
          </div>
          <Button
            onClick={() => handleSave('notifications')}
            className="mt-5"
            disabled={saving.notifications}
            isLoading={saving.notifications}
          >
            Save Changes
          </Button>
        </div>

        {/* Security */}
        <div className="rounded-2xl border border-error/20 bg-error/5 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-error mb-2">Security & Maintenance</h2>
          <p className="text-sm text-text-body mb-6">These settings directly affect the live platform. Use with caution.</p>
          <div className="flex items-center justify-between rounded-xl bg-white/40 dark:bg-white/[0.04] p-4 border border-white/40 dark:border-white/[0.04]">
            <div>
              <h3 className="font-bold text-text-heading dark:text-white">Maintenance Mode</h3>
              <p className="text-xs text-text-muted mt-0.5">Prevents non-admin users from accessing the platform.</p>
            </div>
            <button
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                maintenanceMode ? 'bg-error' : 'bg-white/20 dark:bg-white/10'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                  maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-white/40 dark:bg-white/[0.04] p-4 border border-white/40 dark:border-white/[0.04]">
            <div>
              <h3 className="font-bold text-text-heading dark:text-white">Two-Factor Authentication</h3>
              <p className="text-xs text-text-muted mt-0.5">Require 2FA for all admin account access.</p>
            </div>
            <button
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/20 dark:bg-white/10"
            >
              <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleSetting({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/40 dark:bg-white/[0.04] p-4 border border-white/40 dark:border-white/[0.04]">
      <div>
        <span className="text-sm font-semibold text-text-heading dark:text-white">{label}</span>
        <p className="text-xs text-text-muted mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${
          enabled ? 'bg-primary' : 'bg-white/20 dark:bg-white/10'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}
