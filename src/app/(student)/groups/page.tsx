"use client";

import { useState } from "react";
import { Users, Plus, IndianRupee, MapPin, Share2, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Group {
  id: string;
  name: string;
  locality: string;
  subject: string;
  classGrade: string;
  maxStudents: number;
  currentStudents: number;
  pricePerStudent: number;
  status: "forming" | "active";
}

const mockGroups: Group[] = [
  {
    id: "g1",
    name: "Sector 12 Math Scholars",
    locality: "Sector 12, Indiranagar",
    subject: "Mathematics",
    classGrade: "Class 8",
    maxStudents: 8,
    currentStudents: 5,
    pricePerStudent: 260,
    status: "forming"
  },
  {
    id: "g2",
    name: "HAL Layout Chemistry Club",
    locality: "HAL 2nd Stage",
    subject: "Chemistry",
    classGrade: "Class 10",
    maxStudents: 6,
    currentStudents: 3,
    pricePerStudent: 310,
    status: "forming"
  }
];

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [activeTab, setActiveTab] = useState<"near-you" | "create" | "join">("near-you");
  const [copied, setCopied] = useState(false);

  // Create Group Form States
  const [subject, setSubject] = useState("");
  const [classGrade, setClassGrade] = useState("");
  const [locality, setLocality] = useState("");
  const [groupSize, setGroupSize] = useState(5);
  const [inviteCode, setInviteCode] = useState("");

  // Join Group States
  const [joinCode, setJoinCode] = useState("");
  const [joinedGroup, setJoinedGroup] = useState<Group | null>(null);

  const calculateAISplit = (size: number) => {
    // Standard rate is ₹800/hr, groups get discount pricing split
    const baseGroupRate = 1200; // slightly higher base rate for group
    return Math.round(baseGroupRate / size);
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !classGrade || !locality) return;

    const generatedCode = `VIDYA-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const newGroup: Group = {
      id: `g-${Date.now()}`,
      name: `${locality} ${subject} Group`,
      locality,
      subject,
      classGrade,
      maxStudents: groupSize,
      currentStudents: 1,
      pricePerStudent: calculateAISplit(groupSize),
      status: "forming"
    };

    setGroups([newGroup, ...groups]);
    setInviteCode(generatedCode);
  };

  const handleShareInvite = () => {
    if (!inviteCode) return;
    setCopied(true);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`Hi! Book tuition with me on VidyaConnect and split the price! Join my Colony Group using code: ${inviteCode}`);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode) return;

    // Simulate joining
    const targetGroup = groups.find(g => g.id === "g1") || groups[0];
    if (targetGroup) {
      const updated = groups.map(g => 
        g.id === targetGroup.id 
          ? { ...g, currentStudents: Math.min(g.maxStudents, g.currentStudents + 1) }
          : g
      );
      setGroups(updated);
      setJoinedGroup({ ...targetGroup, currentStudents: targetGroup.currentStudents + 1 });
    }
  };

  return (
    <PageWrapper>
      <div className="py-6">
        <h1 className="font-heading text-3xl font-extrabold text-ink-800">🏘️ Colony Group Bookings</h1>
        <p className="mt-1 text-sm font-semibold text-ink-500">Study together with batchmates from your colony and split tuition costs!</p>

        {/* Tab Selection */}
        <div className="mt-6 flex gap-2 rounded-xl bg-ink-50 p-1">
          {(["near-you", "create", "join"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-lg py-2.5 text-sm font-extrabold transition-all ${
                activeTab === tab 
                  ? "bg-white text-saffron-500 shadow-sm" 
                  : "text-ink-500 hover:text-ink-800"
              }`}
            >
              {tab === "near-you" ? "Groups Near You" : tab === "create" ? "Create Group" : "Join with Code"}
            </button>
          ))}
        </div>

        {/* Dynamic Content Views */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {activeTab === "near-you" && (
              <motion.div
                key="near-you"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid gap-4"
              >
                {groups.map((group) => (
                  <Card key={group.id} className="relative overflow-hidden border border-ink-100 p-5 shadow-card hover:shadow-elevated transition-shadow duration-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge tone="saffron" className="mb-2">{group.classGrade} • {group.subject}</Badge>
                        <h3 className="font-heading text-xl font-extrabold text-ink-800">{group.name}</h3>
                        <p className="mt-1 flex items-center gap-1 text-xs font-bold text-ink-400">
                          <MapPin className="h-3 w-3 text-saffron-500" /> {group.locality}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-success font-extrabold text-xl">
                          <IndianRupee className="h-4 w-4" />
                          <span>{group.pricePerStudent}</span>
                          <span className="text-xs font-bold text-ink-400">/hr</span>
                        </div>
                        <span className="text-xs font-bold text-success-500 bg-success/10 px-2 py-0.5 rounded-full inline-block mt-1">Split pricing</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-ink-50 pt-4">
                      <div className="flex items-center gap-1.5 text-sm font-extrabold text-ink-600">
                        <Users className="h-4 w-4 text-saffron-500" />
                        <span>{group.currentStudents} / {group.maxStudents} Joined</span>
                      </div>
                      <Button size="sm" onClick={() => { setJoinCode(group.id); setActiveTab("join"); }}>
                        Join Group <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </motion.div>
            )}

            {activeTab === "create" && (
              <motion.div
                key="create"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {!inviteCode ? (
                  <Card className="p-6 border border-ink-100 shadow-card">
                    <h2 className="font-heading text-xl font-extrabold text-ink-800 flex items-center gap-1.5">
                      <Plus className="h-5 w-5 text-saffron-500" /> Form a New Tuition Batch
                    </h2>
                    <form onSubmit={handleCreateGroup} className="mt-4 grid gap-4">
                      <div>
                        <label className="text-xs font-extrabold text-ink-500 uppercase tracking-wider">Subject</label>
                        <input
                          type="text"
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="e.g. Mathematics"
                          className="mt-1 w-full h-11 px-3 rounded-lg border border-ink-200 text-sm font-bold focus:border-saffron-500 focus:outline-none bg-white text-ink-800"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-extrabold text-ink-500 uppercase tracking-wider">Class Grade</label>
                        <input
                          type="text"
                          required
                          value={classGrade}
                          onChange={(e) => setClassGrade(e.target.value)}
                          placeholder="e.g. Class 8"
                          className="mt-1 w-full h-11 px-3 rounded-lg border border-ink-200 text-sm font-bold focus:border-saffron-500 focus:outline-none bg-white text-ink-800"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-extrabold text-ink-500 uppercase tracking-wider">Locality</label>
                        <input
                          type="text"
                          required
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                          placeholder="e.g. Sector 12, Indiranagar"
                          className="mt-1 w-full h-11 px-3 rounded-lg border border-ink-200 text-sm font-bold focus:border-saffron-500 focus:outline-none bg-white text-ink-800"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-extrabold text-ink-500 uppercase tracking-wider">Max Batch Size: {groupSize} students</label>
                        <input
                          type="range"
                          min={3}
                          max={10}
                          value={groupSize}
                          onChange={(e) => setGroupSize(Number(e.target.value))}
                          className="mt-2 w-full accent-saffron-500"
                        />
                        <div className="mt-3 rounded-xl bg-saffron-50/50 p-3 border border-saffron-100 flex items-center justify-between text-xs font-extrabold text-saffron-700">
                          <span>🤖 AI Estimated Split Price:</span>
                          <span className="text-sm font-black flex items-center"><IndianRupee className="h-3 w-3" /> {calculateAISplit(groupSize)}/head <span className="text-[10px] text-ink-400 font-normal"> (vs ₹800 solo)</span></span>
                        </div>
                      </div>
                      <Button type="submit" className="mt-2 w-full">Create & Calculate AI Pricing</Button>
                    </form>
                  </Card>
                ) : (
                  <Card className="p-6 border border-success/20 bg-success/5 shadow-card text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success text-white">
                      <Check className="h-6 w-6" />
                    </div>
                    <h2 className="mt-4 font-heading text-2xl font-extrabold text-ink-800">Colony Group Formed!</h2>
                    <p className="mt-1 text-sm font-bold text-ink-500">Group split price: ₹{calculateAISplit(groupSize)}/hr per student.</p>

                    <div className="mt-6 rounded-xl border border-ink-200 bg-white p-4">
                      <span className="text-xs font-extrabold text-ink-400 uppercase">Share Group Code with Batchmates</span>
                      <div className="mt-2 text-2xl font-black tracking-wider text-saffron-500 select-all">{inviteCode}</div>
                    </div>

                    <Button onClick={handleShareInvite} className="mt-6 w-full flex items-center justify-center gap-1.5">
                      {copied ? (
                        <>Copied to Clipboard! <Check className="h-4 w-4" /></>
                      ) : (
                        <>Share Invite Link <Share2 className="h-4 w-4" /></>
                      )}
                    </Button>

                    <button onClick={() => setInviteCode("")} className="mt-4 text-xs font-extrabold text-saffron-500 hover:underline">
                      Create another group
                    </button>
                  </Card>
                )}
              </motion.div>
            )}

            {activeTab === "join" && (
              <motion.div
                key="join"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {!joinedGroup ? (
                  <Card className="p-6 border border-ink-100 shadow-card">
                    <h2 className="font-heading text-xl font-extrabold text-ink-800">Join a Colony Group</h2>
                    <p className="mt-1 text-xs font-bold text-ink-500">Enter invite code or group ID shared by your batchmates.</p>
                    <form onSubmit={handleJoin} className="mt-4 grid gap-4">
                      <input
                        type="text"
                        required
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
                        placeholder="e.g. VIDYA-X8YZ9"
                        className="w-full h-11 px-3 rounded-lg border border-ink-200 text-sm font-bold focus:border-saffron-500 focus:outline-none uppercase tracking-wider bg-white text-ink-800 text-center"
                      />
                      <Button type="submit" className="w-full">Verify & Split Payment</Button>
                    </form>
                  </Card>
                ) : (
                  <Card className="p-6 border border-success/20 bg-white shadow-card">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-success text-white">
                        <Check className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-extrabold text-ink-800">Joined Group Successfully!</h3>
                        <p className="text-xs font-bold text-success-500">Split payment: Verified & Success</p>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-ink-50 pt-4">
                      <h4 className="text-xs font-extrabold text-ink-400 uppercase">Group Booking Breakdown</h4>
                      <div className="mt-3 grid gap-2">
                        <div className="flex justify-between text-sm font-bold text-ink-600">
                          <span>Group:</span>
                          <span className="text-ink-800">{joinedGroup.name}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-ink-600">
                          <span>Subject:</span>
                          <span className="text-ink-800">{joinedGroup.subject} ({joinedGroup.classGrade})</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-ink-600">
                          <span>Your Split Share:</span>
                          <span className="text-success font-black flex items-center"><IndianRupee className="h-3 w-3" /> {joinedGroup.pricePerStudent}/hr</span>
                        </div>
                      </div>
                    </div>

                    <Button onClick={() => setJoinedGroup(null)} className="mt-6 w-full">Back to Groups</Button>
                  </Card>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
}
