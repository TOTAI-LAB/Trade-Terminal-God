import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Message } from './types/chat';
import { chatApi } from './services/api';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Sidebar } from './components/Sidebar';
import { WelcomeScreen } from './components/WelcomeScreen';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [userId] = useState(`user-${Date.now()}`);
  const [error, setError] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    startNewSession();
  }, []);

  const startNewSession = async () => {
    try {
      setError('');
      const { session_id } = await chatApi.startSession();
      setSessionId(session_id);
      setMessages([]);
    } catch (error) {
      setError('Failed to start new session. Please try again.');
      console.error('Failed to start new session:', error);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!sessionId) {
      setError('No active session. Starting a new one...');
      await startNewSession();
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError('');

    try {
      const response = await chatApi.sendMessage({
        session_id: sessionId,
        user_id: userId,
        query: content,
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setError('Failed to send message. Please try again.');
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar onNewChat={startNewSession} />

      <div className="flex-1 flex flex-col">
        <header className="border-b border-gray-700 p-4">
          <h2 className="text-lg font-semibold">Terminal of Trade AI Assistant</h2>
          <p className="text-sm text-gray-400">Your crypto and finance AI companion</p>
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          
          {isLoading && (
            <div className="flex items-center gap-2 text-emerald-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Processing your request...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;