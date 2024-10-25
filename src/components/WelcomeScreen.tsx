import React from 'react';
import { Terminal } from 'lucide-react';

export function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
      <Terminal className="h-16 w-16 mb-4 text-emerald-500" />
      <h3 className="text-xl font-semibold mb-2">Welcome to TOTAI</h3>
      <p className="max-w-md">
        Your advanced crypto and finance AI assistant. Ask me anything about markets, trading strategies, or blockchain technology.
      </p>
    </div>
  );
}