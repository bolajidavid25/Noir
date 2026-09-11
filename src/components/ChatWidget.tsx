import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';

import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('onyx_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [{ role: 'model', content: "Hey bestie! ✨ I'm Onyx, your personal style guru at NŌIR. What's the vibe we're going for today?" }];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('onyx_chat_history', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setMessages([...newMessages, { role: 'model', content: data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'model', content: "My bad bestie, my connection is acting totally unhinged rn 😭 Try hitting me up again in a sec!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }} className="border shadow-2xl rounded-2xl w-[350px] sm:w-[400px] h-[500px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border)' }} className="border-b px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <h3 style={{ color: 'var(--text)' }} className="font-serif tracking-wide">Onyx Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ color: 'var(--text-muted)' }} className="hover:opacity-70 transition-opacity">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  style={{ 
                    backgroundColor: msg.role === 'user' ? 'var(--gold)' : 'var(--bg-elevated)',
                    color: msg.role === 'user' ? 'var(--gold-on)' : 'var(--text)',
                    borderColor: msg.role === 'user' ? 'transparent' : 'var(--border)'
                  }}
                  className={`max-w-[85%] rounded-2xl px-4 py-2 border ${
                    msg.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'
                  }`}
                >
                  <div className="text-sm leading-relaxed prose prose-sm prose-invert max-w-none [&>p]:mb-0 [&>p+p]:mt-2 [&_strong]:font-semibold [&_em]:italic">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--gold)', borderColor: 'var(--border)' }} className="border rounded-2xl rounded-tl-sm px-4 py-3">
                  <Loader2 size={16} className="animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border)' }} className="p-3 border-t">
            <form onSubmit={sendMessage} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Onyx about style..."
                style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text)', borderColor: 'var(--border)' }}
                className="w-full border rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                style={{ backgroundColor: 'var(--gold)', color: 'var(--gold-on)' }}
                className="absolute right-2 p-1.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{ backgroundColor: 'var(--gold)', color: 'var(--gold-on)' }}
          className="p-4 rounded-full shadow-lg shadow-black/20 hover:scale-105 transition-transform duration-200"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}
