import React from 'react';
import { Terminal, MessageSquare } from 'lucide-react';

interface SidebarProps {
  onNewChat: () => void;
}

export function Sidebar({ onNewChat }: SidebarProps) {
  return (
    <div className="hidden md:flex w-64 flex-col bg-gray-800 p-4">
      <div className="flex items-center gap-2 mb-8">
        <Terminal className="h-8 w-8 text-emerald-500" />
        <h1 className="text-xl font-bold">TOTAI</h1>
      </div>
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg p-3 mb-4"
      >
        <MessageSquare className="h-5 w-5" />
        New Chat
      </button>
      <div className="flex-1 overflow-y-auto">
        {/* Chat history would go here */}
      </div>
    </div>
  );
}