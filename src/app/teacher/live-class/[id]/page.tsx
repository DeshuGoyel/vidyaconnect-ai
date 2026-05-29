"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, MicOff, Video, VideoOff, MessageSquare, Users, PhoneOff, Settings, Share, Hand, PenTool, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeacherLiveClass({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState<"chat" | "participants" | null>(null);
  const [view, setView] = useState<"video" | "whiteboard">("video");

  const toggleSidebar = (s: "chat" | "participants") => setSidebarOpen(sidebarOpen === s ? null : s);

  return (
    <div className="fixed inset-0 flex flex-col bg-ink-950 text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-ink-900 border-b border-ink-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-lg font-bold">Class 10 Science - Periodic Table</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-500 uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Live
            </span>
          </div>
          <p className="text-xs text-ink-400">45:20 elapsed • 5 Participants</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setView(view === "video" ? "whiteboard" : "video")} className="text-white hover:bg-ink-800">
            {view === "video" ? <PenTool className="h-5 w-5 mr-1" /> : <Video className="h-5 w-5 mr-1" />}
            {view === "video" ? "Whiteboard" : "Stop Whiteboard"}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => toggleSidebar("participants")} className={`text-white hover:bg-ink-800 ${sidebarOpen === 'participants' ? 'bg-ink-800' : ''}`}>
            <Users className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => toggleSidebar("chat")} className={`text-white hover:bg-ink-800 ${sidebarOpen === 'chat' ? 'bg-ink-800' : ''}`}>
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video or Whiteboard View */}
        <div className="flex-1 flex flex-col p-4 relative">
          {view === "whiteboard" ? (
            <div className="w-full h-full bg-white rounded-xl flex flex-col overflow-hidden shadow-elevated">
               <div className="h-10 border-b flex items-center px-4 gap-4 text-ink-600 bg-ink-50">
                  <PenTool className="h-4 w-4" />
                  <span className="text-sm font-bold">Teacher Controls Active</span>
               </div>
               <div className="flex-1 flex items-center justify-center text-ink-300">
                  <span className="font-extrabold text-2xl">Whiteboard Canvas</span>
               </div>
            </div>
          ) : (
            <div className="w-full h-full grid grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Teacher Main */}
              <div className="col-span-2 lg:col-span-2 bg-ink-800 rounded-xl relative overflow-hidden flex items-center justify-center border-2 border-saffron-500 shadow-elevated">
                 {camOn ? <span className="font-bold text-saffron-500">You (Teacher)</span> : <VideoOff className="h-8 w-8 text-ink-400" />}
                 <div className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 rounded text-xs font-bold backdrop-blur">You</div>
              </div>
              
              {/* Students */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-ink-800 rounded-xl relative overflow-hidden flex items-center justify-center shadow-md">
                   <div className="h-12 w-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl font-bold">S</div>
                   <div className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 rounded text-xs font-bold backdrop-blur">Student {i}</div>
                   {i === 1 && (
                     <div className="absolute top-3 right-3 text-saffron-500">
                       <Hand className="h-5 w-5 drop-shadow-md" />
                     </div>
                   )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        {sidebarOpen === "chat" && (
          <div className="w-80 border-l border-ink-800 bg-ink-900 flex flex-col">
            <div className="p-4 border-b border-ink-800 font-bold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" /> Live Chat
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <p className="text-center text-xs text-ink-500">Chat started</p>
            </div>
            <div className="p-3 border-t border-ink-800">
              <input type="text" placeholder="Message everyone..." className="w-full bg-ink-800 border-none rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-saffron-500 outline-none" />
            </div>
          </div>
        )}
        
        {sidebarOpen === "participants" && (
          <div className="w-80 border-l border-ink-800 bg-ink-900 flex flex-col">
            <div className="p-4 border-b border-ink-800 font-bold flex items-center justify-between">
              <div className="flex items-center gap-2"><Users className="h-5 w-5" /> Participants (5)</div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-ink-800">
                <span className="font-bold text-saffron-400">You (Teacher)</span>
                <div className="flex gap-2 text-ink-400"><Mic className="h-4 w-4" /><Video className="h-4 w-4" /></div>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-ink-800">
                <span className="flex items-center gap-2">Student 1 <Hand className="h-3 w-3 text-saffron-500" /></span>
                <div className="flex gap-2 text-ink-400"><MicOff className="h-4 w-4 text-red-400" /><Video className="h-4 w-4" /></div>
              </div>
            </div>
            <div className="p-4 border-t border-ink-800">
              <Button variant="secondary" className="w-full bg-ink-800 hover:bg-ink-700 border-0 mb-2">Mute All</Button>
              <Button variant="secondary" className="w-full bg-ink-800 hover:bg-ink-700 border-0 text-saffron-400">
                <CheckCircle className="h-4 w-4 mr-2" /> Mark Attendance
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="h-20 bg-ink-900 border-t border-ink-800 flex items-center justify-center gap-4 px-4">
        <Button 
          onClick={() => setMicOn(!micOn)} 
          variant="secondary" 
          size="md" 
          className={`h-12 w-12 rounded-full ${!micOn ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-ink-800 hover:bg-ink-700 border-0'}`}
        >
          {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
        <Button 
          onClick={() => setCamOn(!camOn)} 
          variant="secondary" 
          size="md" 
          className={`h-12 w-12 rounded-full ${!camOn ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-ink-800 hover:bg-ink-700 border-0'}`}
        >
          {camOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        <Button 
          variant="secondary" 
          size="md" 
          className="h-12 w-12 rounded-full bg-ink-800 hover:bg-ink-700 border-0"
        >
          <Share className="h-5 w-5" />
        </Button>
        
        <div className="w-px h-8 bg-ink-800 mx-2"></div>

        <Button 
          onClick={() => router.back()} 
          variant="destructive" 
          className="h-12 px-6 rounded-full font-bold shadow-lg hover:bg-red-600"
        >
          <PhoneOff className="h-5 w-5 mr-2" /> End Class
        </Button>
      </div>
    </div>
  );
}
