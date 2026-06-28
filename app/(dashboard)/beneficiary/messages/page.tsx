"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
export default function MessagesPage() {
  return (
    <div className="flex w-full h-[85vh] max-w-7xl flex-col gap-6 mx-auto animate-in fade-in zoom-in-95 duration-500">
      
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-text-heading dark:text-white">
          Messages
        </h1>
      </header>

      <div className="flex flex-1 overflow-hidden rounded-3xl border border-white/50 bg-white/40 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/20">
        
        {/* Left Column - Chat List */}
        <div className="w-1/3 border-r border-border-glass flex flex-col bg-white/20">
          <div className="p-4 border-b border-border-glass">
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full rounded-xl bg-white/50 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Chat Item */}
            <div className="flex cursor-pointer items-center gap-3 p-4 hover:bg-white/40 transition-colors border-l-4 border-primary bg-white/30">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">Aid</div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-text-heading text-sm">AidLink Support</span>
                  <span className="text-[10px] text-text-muted">10:42 AM</span>
                </div>
                <span className="text-xs text-text-body truncate block">Your recent verification was approved!</span>
              </div>
            </div>
            
            {/* Chat Item */}
            <div className="flex cursor-pointer items-center gap-3 p-4 hover:bg-white/40 transition-colors border-l-4 border-transparent">
              <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary">SA</div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-text-heading text-sm">Samuel A.</span>
                  <span className="text-[10px] text-text-muted">Yesterday</span>
                </div>
                <span className="text-xs text-text-body truncate block">Thank you for the update on the clinic.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Active Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-border-glass bg-white/20 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">Aid</div>
            <span className="font-bold text-text-heading">AidLink Support</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {/* Incoming Message */}
            <div className="flex max-w-[80%] flex-col gap-1 items-start">
              <div className="rounded-2xl rounded-tl-none bg-white/60 p-3 text-sm text-text-heading shadow-sm dark:bg-black/40 dark:text-white">
                Hello John, your documentation for the "Community Clinic Renovation" has been reviewed and verified. Your funds are now unlocked.
              </div>
              <span className="text-[10px] text-text-muted">10:42 AM</span>
            </div>

            {/* Outgoing Message */}
            <div className="flex max-w-[80%] flex-col gap-1 self-end items-end">
              <div className="rounded-2xl rounded-tr-none bg-primary p-3 text-sm text-white shadow-sm">
                That is wonderful news. Thank you! I will initiate the withdrawal today.
              </div>
              <span className="text-[10px] text-text-muted">10:45 AM</span>
            </div>
          </div>

          <div className="p-4 border-t border-border-glass bg-white/20">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 rounded-xl bg-white/50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button className="rounded-xl px-6">Send</Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}