"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, MicOff, Video, VideoOff, MessageSquare, Hand, PhoneOff, Settings, Users, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentLiveClass({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [view, setView] = useState<"video" | "whiteboard">("video");

  return (
    <div className="fixed inset-0 flex flex-col bg-ink-950 text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-ink-900 border-b border-ink-800">
        <div>
          <h1 className="font-heading text-lg font-bold">Class 10 Science - Periodic Table</h1>
          <p className="text-xs text-ink-400">By Priya Rao • 45:20 elapsed</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setView(view === "video" ? "whiteboard" : "video")} className="text-white hover:bg-ink-800">
            {view === "video" ? <PenTool className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setChatOpen(!chatOpen)} className="text-white hover:bg-ink-800">
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video or Whiteboard View */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
          {view === "whiteboard" ? (
            <div className="w-full h-full bg-white rounded-xl flex items-center justify-center text-ink-400">
              <span className="font-extrabold text-2xl">Shared Whiteboard</span>
            </div>
          ) : (
            <div className="w-full h-full max-w-4xl bg-ink-800 rounded-xl overflow-hidden relative shadow-elevated">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Teacher Video Placeholder */}
                <div className="text-center">
                  <div className="h-24 w-24 rounded-full bg-saffron-500 mx-auto mb-4 flex items-center justify-center text-3xl font-bold">P</div>
                  <p className="font-bold">Priya Rao (Teacher)</p>
                </div>
              </div>
            </div>
          )}

          {/* Student Pip (Picture in Picture) */}
          <div className="absolute bottom-4 right-4 w-32 h-40 bg-ink-800 rounded-xl border-2 border-ink-700 overflow-hidden z-10 shadow-lg">
             <div className="absolute inset-0 flex items-center justify-center text-ink-400">
               {camOn ? <span className="font-bold text-xs">You</span> : <VideoOff className="h-6 w-6" />}
             </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {chatOpen && (
          <div className="w-80 border-l border-ink-800 bg-ink-900 flex flex-col">
            <div className="p-4 border-b border-ink-800 font-bold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" /> Live Chat
            </div>
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 text-sm">
              <div className="bg-ink-800 p-2 rounded-lg rounded-tl-none self-start max-w-[85%]">
                <span className="font-bold text-saffron-400 text-xs block mb-1">Priya Rao</span>
                Welcome everyone! Let&apos;s start with chapter 4.
              </div>
            </div>
            <div className="p-3 border-t border-ink-800">
              <input type="text" placeholder="Type a message..." className="w-full bg-ink-800 border-none rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-saffron-500 outline-none" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="h-20 bg-ink-900 border-t border-ink-800 flex items-center justify-center gap-4 px-4">
        <Button 
          onClick={() => setMicOn(!micOn)} 
          variant="secondary" 
          size="icon" 
          className={`h-12 w-12 rounded-full ${!micOn ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-ink-800 hover:bg-ink-700 border-0'}`}
        >
          {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
        <Button 
          onClick={() => setCamOn(!camOn)} 
          variant="secondary" 
          size="icon" 
          className={`h-12 w-12 rounded-full ${!camOn ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-ink-800 hover:bg-ink-700 border-0'}`}
        >
          {camOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        <Button 
          onClick={() => setHandRaised(!handRaised)} 
          variant="secondary" 
          size="icon" 
          className={`h-12 w-12 rounded-full ${handRaised ? 'bg-saffron-500 text-white hover:bg-saffron-600' : 'bg-ink-800 hover:bg-ink-700 border-0'}`}
        >
          <Hand className="h-5 w-5" />
        </Button>
        
        <div className="w-px h-8 bg-ink-800 mx-2"></div>

        <Button 
          onClick={() => router.back()} 
          variant="destructive" 
          className="h-12 px-6 rounded-full font-bold shadow-lg hover:bg-red-600"
        >
          <PhoneOff className="h-5 w-5 mr-2" /> Leave Class
        </Button>
      </div>
    </div>
  );
}
