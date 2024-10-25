import React from 'react';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-4 message-appear ${
          message.role === 'user'
            ? 'bg-emerald-600 text-white'
            : 'bg-gray-800 text-gray-100'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <span className="text-xs opacity-50 mt-2 block">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}