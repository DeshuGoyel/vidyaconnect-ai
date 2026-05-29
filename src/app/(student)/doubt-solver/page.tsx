"use client";

import { useState, useRef, useEffect } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Sparkles, Image as ImageIcon, Send, Bot, User, Check, Loader2, Maximize2 } from "lucide-react";
import { Card } from "@/components/ui/card";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  image?: string;
  isTyping?: boolean;
};

const DUMMY_RESPONSES = [
  "Looking at the photo, you need to use the Pythagorean theorem: a² + b² = c².",
  "That's a great question about the Periodic Table. The element with atomic number 6 is Carbon.",
  "Let me break down the steps for balancing this chemical equation...",
];

export default function DoubtSolverPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hi Rohan! I'm your AI Doubt Solver. Type your question or snap a photo of your homework and I'll help you solve it step-by-step!"
    }
  ]);
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg: Message = { id: Date.now().toString(), sender: "user", text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulate AI thinking
    const thinkingId = Date.now().toString() + "think";
    setMessages((prev) => [...prev, { id: thinkingId, sender: "ai", text: "", isTyping: true }]);

    setTimeout(() => {
      setMessages((prev) => 
        prev.map(m => m.id === thinkingId ? { 
          id: thinkingId, 
          sender: "ai", 
          text: DUMMY_RESPONSES[Math.floor(Math.random() * DUMMY_RESPONSES.length)] 
        } : m)
      );
    }, 2000);
  };

  const handleUploadPhoto = () => {
    // Simulate photo upload
    const newMsg: Message = { 
      id: Date.now().toString(), 
      sender: "user", 
      text: "Can you help me solve this?",
      image: "https://images.unsplash.com/photo-1632559648939-50cb05c1979b?w=400&q=80" // math homework placeholder
    };
    setMessages((prev) => [...prev, newMsg]);

    const thinkingId = Date.now().toString() + "think";
    setMessages((prev) => [...prev, { id: thinkingId, sender: "ai", text: "", isTyping: true }]);

    setTimeout(() => {
      setMessages((prev) => 
        prev.map(m => m.id === thinkingId ? { 
          id: thinkingId, 
          sender: "ai", 
          text: "I see a math problem in the image. To solve for x in 2x + 5 = 15:\n\n1. Subtract 5 from both sides: 2x = 10\n2. Divide by 2: x = 5\n\nThe correct answer is x = 5!" 
        } : m)
      );
    }, 2500);
  };

  return (
    <PageWrapper className="flex flex-col h-[calc(100vh-80px)] pb-0">
      <TopBar title="AI Doubt Solver" />

      {/* Hero Banner */}
      <div className="mt-4 shrink-0 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 p-4 text-white shadow-card relative overflow-hidden">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/20 backdrop-blur-md">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-extrabold text-white">Snap. Ask. Learn.</h2>
            <p className="text-xs font-semibold text-white/80">Available 24/7. Step-by-step solutions.</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto mt-4 pb-20 space-y-4 px-1 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center shadow-sm ${msg.sender === 'user' ? 'bg-saffron-500 text-white' : 'bg-violet-600 text-white'}`}>
                {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div className={`p-3 rounded-2xl ${
                msg.sender === 'user' 
                  ? 'bg-ink-900 text-white rounded-tr-none' 
                  : 'bg-white border border-ink-100 shadow-sm text-ink-800 rounded-tl-none'
              }`}>
                {msg.image && (
                  <div className="mb-2 relative rounded-xl overflow-hidden group cursor-pointer">
                    <img src={msg.image} alt="Uploaded homework" className="w-full object-cover max-h-48" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                )}
                
                {msg.isTyping ? (
                  <div className="flex gap-1 items-center h-6 px-2">
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                ) : (
                  <div className="text-sm font-semibold whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-[72px] md:bottom-0 left-0 right-0 p-4 bg-cream/90 backdrop-blur-xl border-t border-ink-100 md:relative md:bg-transparent md:border-t-0 md:p-0 md:pt-4">
        <div className="max-w-md mx-auto md:max-w-none flex gap-2 relative">
          <Button 
            onClick={handleUploadPhoto}
            variant="secondary" 
            size="md" 
            className="h-12 w-12 shrink-0 rounded-2xl border-2 border-violet-200 bg-violet-50 text-violet-600 hover:bg-violet-100 hover:text-violet-700 hover:border-violet-300 transition-all"
          >
            <ImageIcon className="h-5 w-5" />
          </Button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..." 
            className="flex-1 h-12 rounded-2xl border-2 border-ink-200 px-4 text-sm font-semibold focus:border-violet-500 focus:outline-none transition-colors shadow-sm"
          />
          <Button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="h-12 w-12 shrink-0 rounded-2xl bg-violet-600 text-white shadow-md hover:bg-violet-700 transition-all"
            size="md"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
