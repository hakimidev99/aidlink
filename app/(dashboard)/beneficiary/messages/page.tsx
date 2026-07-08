"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Message {
  id: number;
  sender: 'them' | 'me';
  text: string;
  time: string;
}

interface Conversation {
  id: number;
  initials: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatarColor: string;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: 1,
    initials: "AS",
    name: "AidLink Support",
    lastMessage: "Your recent verification was approved!",
    time: "10:42 AM",
    unread: 2,
    avatarColor: "bg-primary/20 text-primary",
    messages: [
      { id: 1, sender: "them", text: "Hello John, your documentation for the 'Community Clinic Renovation' has been reviewed and verified. Your funds are now unlocked.", time: "10:42 AM" },
      { id: 2, sender: "me", text: "That is wonderful news. Thank you! I will initiate the withdrawal today.", time: "10:45 AM" },
      { id: 3, sender: "them", text: "Great! Let us know if you need any assistance with the withdrawal process.", time: "10:46 AM" },
      { id: 4, sender: "me", text: "Will do. Thanks for the prompt response!", time: "10:48 AM" },
    ],
  },
  {
    id: 2,
    initials: "SA",
    name: "Samuel A.",
    lastMessage: "Thank you for the update on the clinic.",
    time: "Yesterday",
    unread: 0,
    avatarColor: "bg-secondary/20 text-secondary",
    messages: [
      { id: 1, sender: "them", text: "Hi John, I saw the photos you posted of the roofing work. It looks great!", time: "Yesterday" },
      { id: 2, sender: "me", text: "Thank you Samuel! We made good progress this week.", time: "Yesterday" },
      { id: 3, sender: "them", text: "Thank you for the update on the clinic. Keep up the good work!", time: "Yesterday" },
    ],
  },
  {
    id: 3,
    initials: "CO",
    name: "Chioma O.",
    lastMessage: "I'd like to visit the project site next week.",
    time: "2 days ago",
    unread: 1,
    avatarColor: "bg-accent/20 text-accent-dark dark:text-accent",
    messages: [
      { id: 1, sender: "them", text: "Hello John, I donated to your clinic campaign and I'd like to visit the project site next week.", time: "2 days ago" },
      { id: 2, sender: "me", text: "Hi Chioma! That would be wonderful. Let me arrange a visit for you.", time: "2 days ago" },
      { id: 3, sender: "them", text: "I'd like to visit the project site next week. Is Tuesday possible?", time: "2 days ago" },
    ],
  },
  {
    id: 4,
    initials: "MK",
    name: "Moses K.",
    lastMessage: "Can you review my campaign proposal?",
    time: "3 days ago",
    unread: 0,
    avatarColor: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
    messages: [
      { id: 1, sender: "them", text: "Hi John, I'm working on a new campaign for a school in my district. Can you review my campaign proposal?", time: "3 days ago" },
      { id: 2, sender: "me", text: "Sure Moses, send it over and I'll take a look.", time: "3 days ago" },
    ],
  },
];

export default function MessagesPage() {
  const [activeConversationId, setActiveConversationId] = useState<number>(1);
  const [conversationList, setConversationList] = useState<Conversation[]>(conversations);
  const [newMessage, setNewMessage] = useState("");

  const activeConversation = conversationList.find((c) => c.id === activeConversationId) || conversationList[0];

  const handleSelectConversation = (id: number) => {
    setActiveConversationId(id);
    setConversationList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: activeConversation.messages.length + 1,
      sender: "me",
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setConversationList((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? { ...c, messages: [...c.messages, msg], lastMessage: msg.text, time: "Just now" }
          : c
      )
    );
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex w-full h-[85vh] max-w-7xl flex-col gap-6 mx-auto animate-in fade-in zoom-in-95 duration-500">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight text-text-heading dark:text-white">Messages</h1>
        <p className="mt-1 text-text-body dark:text-gray-400">Communicate with supporters and AidLink support.</p>
      </header>

      <div className="flex flex-1 overflow-hidden rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.06] shadow-lg shadow-black/[0.02] dark:shadow-black/20 backdrop-blur-xl">
        {/* Left Column — Conversation List */}
        <div className="w-full max-w-[360px] border-r border-border flex flex-col bg-white/20 dark:bg-black/10 shrink-0">
          <div className="p-4 border-b border-border">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full rounded-xl bg-white/50 dark:bg-black/30 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 text-text-heading dark:text-white placeholder:text-text-muted"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversationList.map((conv) => (
              <button
                key={conv.id}
                onClick={() => handleSelectConversation(conv.id)}
                className={`w-full flex items-center gap-3 p-4 transition-colors text-left border-l-4 ${
                  activeConversationId === conv.id
                    ? 'border-primary bg-white/40 dark:bg-white/5'
                    : 'border-transparent hover:bg-white/30 dark:hover:bg-white/5'
                }`}
              >
                <div className={`relative h-11 w-11 shrink-0 rounded-full ${conv.avatarColor} flex items-center justify-center text-sm font-bold`}>
                  {conv.initials}
                  {conv.unread > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-error text-[9px] font-bold text-white shadow-lg shadow-error/30">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-text-heading dark:text-white truncate">{conv.name}</span>
                    <span className="text-[10px] text-text-muted shrink-0 ml-2">{conv.time}</span>
                  </div>
                  <span className="text-xs text-text-body dark:text-gray-400 truncate block mt-0.5">{conv.lastMessage}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column — Chat View */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Chat Header */}
          <div className="flex items-center gap-3 p-4 border-b border-border bg-white/20 dark:bg-black/10">
            <div className="md:hidden flex items-center mr-2">
              <select
                value={activeConversationId}
                onChange={(e) => handleSelectConversation(Number(e.target.value))}
                className="rounded-xl bg-white/50 dark:bg-black/30 px-3 py-2 text-sm font-bold text-text-heading dark:text-white outline-none focus:ring-2 focus:ring-primary/50 appearance-none"
              >
                {conversationList.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className={`hidden md:flex h-10 w-10 rounded-full ${activeConversation.avatarColor} items-center justify-center text-sm font-bold`}>
              {activeConversation.initials}
            </div>
            <span className="hidden md:block font-bold text-text-heading dark:text-white">{activeConversation.name}</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {activeConversation.messages.map((msg) => (
              <div key={msg.id} className={`flex max-w-[75%] flex-col gap-1 ${msg.sender === 'me' ? 'self-end items-end' : 'items-start'}`}>
                <div className={`rounded-2xl p-3.5 text-sm shadow-sm ${
                  msg.sender === 'me'
                    ? 'rounded-tr-none bg-primary text-white'
                    : 'rounded-tl-none bg-white/60 dark:bg-black/40 text-text-heading dark:text-white'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-text-muted">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-white/20 dark:bg-black/10">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 rounded-xl bg-white/50 dark:bg-black/30 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 text-text-heading dark:text-white placeholder:text-text-muted"
              />
              <Button onClick={handleSendMessage} className="rounded-xl px-6" disabled={!newMessage.trim()}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
