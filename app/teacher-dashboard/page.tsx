"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet, Users, Star, MessageSquare, Calendar, Sparkles, CheckCircle2,
  TrendingUp, Clock, ChevronRight, BookOpen, ArrowUpRight, Award,
  SlidersHorizontal, Lightbulb, Check
} from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MOCK_STUDENTS = [
  {
    id: "st1",
    name: "Aryan Kumar",
    grade: "Class 10 CBSE",
    subject: "Mathematics",
    sessionsCompleted: 14,
    lastTopic: "Quadratic Equations",
    progress: "88%",
    nextSession: "Today, 5:00 PM",
    avatar: "AK",
    avatarBg: "bg-blue-100 text-blue-800",
  },
  {
    id: "st2",
    name: "Ananya Gupta",
    grade: "Class 12 JEE",
    subject: "Maths (Calculus)",
    sessionsCompleted: 22,
    lastTopic: "Integration by Parts",
    progress: "92%",
    nextSession: "Tomorrow, 4:00 PM",
    avatar: "AG",
    avatarBg: "bg-purple-100 text-purple-800",
  },
  {
    id: "st3",
    name: "Rohan Verma",
    grade: "Class 9 CBSE",
    subject: "Mathematics",
    sessionsCompleted: 8,
    lastTopic: "Triangles & Congruence",
    progress: "76%",
    nextSession: "Thu, 6:00 PM",
    avatar: "RV",
    avatarBg: "bg-green-100 text-green-800",
  },
];

const MOCK_QUERIES = [
  {
    id: "q1",
    studentName: "Aryan Kumar",
    studentAvatar: "AK",
    time: "10 mins ago",
    question: "Ma'am, in x² − 5x + 6 = 0 why do we take factors as (x-2)(x-3) and not (x+2)(x+3)?",
    status: "Unanswered",
    misconception: "Confused sign multiplication in factoring",
  },
  {
    id: "q2",
    studentName: "Ananya Gupta",
    studentAvatar: "AG",
    time: "1 hour ago",
    question: "Can we use integration by parts when both functions are trigonometric?",
    status: "Unanswered",
    misconception: "Choice of U and V functions in ILATE rule",
  },
  {
    id: "q3",
    studentName: "Rohan Verma",
    studentAvatar: "RV",
    time: "Yesterday",
    question: "What is the difference between AAS and ASA congruence criteria?",
    status: "Answered",
    misconception: "Included side vs non-included side distinction",
  },
];

export default function TeacherDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "students" | "queries">("overview");
  const [answeredQueries, setAnsweredQueries] = useState<string[]>(["q3"]);

  const handleResolveDoubt = (q: typeof MOCK_QUERIES[0]) => {
    // Save doubt to session storage so copilot can auto fill
    router.push(`/session?topic=${encodeURIComponent(q.question)}&misconception=${encodeURIComponent(q.misconception)}`);
  };

  return (
    <PageWrapper className="pt-6 space-y-6">
      {/* Teacher Profile Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-[16px] p-5 border border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-400">Live Teacher Portal</span>
          </div>
          <span className="text-[11px] bg-white/10 text-slate-200 px-2.5 py-0.5 rounded-full border border-white/10 font-normal">
            IIT Delhi Alumna
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-[12px] bg-indigo-600 text-white flex items-center justify-center font-medium text-xl flex-shrink-0">
            PS
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-medium text-lg text-white">Priya Sharma</h1>
              <CheckCircle2 size={16} className="text-indigo-400" />
            </div>
            <p className="text-xs text-slate-300 mt-0.5">Senior Maths Tutor • 38 Active Students</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="mt-5 p-1 bg-white/10 rounded-[12px] flex text-xs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-2 font-medium rounded-[8px] transition-colors ${
              activeTab === "overview" ? "bg-white text-slate-900" : "text-slate-300 hover:text-white"
            }`}
          >
            Earnings & Schedule
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`flex-1 py-2 font-medium rounded-[8px] transition-colors ${
              activeTab === "students" ? "bg-white text-slate-900" : "text-slate-300 hover:text-white"
            }`}
          >
            My Students (38)
          </button>
          <button
            onClick={() => setActiveTab("queries")}
            className={`flex-1 py-2 font-medium rounded-[8px] transition-colors ${
              activeTab === "queries" ? "bg-indigo-600 text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            Student Doubts (2)
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-5"
          >
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-[12px] border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 font-normal mb-1">
                  <span>Total Earnings</span>
                  <Wallet size={16} className="text-emerald-600" />
                </div>
                <p className="font-medium text-2xl text-slate-900">₹48,500</p>
                <p className="text-[11px] text-emerald-600 font-normal mt-1 flex items-center gap-0.5">
                  <TrendingUp size={12} /> +₹14,200 this month
                </p>
              </div>

              <div className="bg-white p-4 rounded-[12px] border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 font-normal mb-1">
                  <span>Sessions Taught</span>
                  <BookOpen size={16} className="text-indigo-600" />
                </div>
                <p className="font-medium text-2xl text-slate-900">342</p>
                <p className="text-[11px] text-slate-500 font-normal mt-1">
                  99% Completion rate
                </p>
              </div>

              <div className="bg-white p-4 rounded-[12px] border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 font-normal mb-1">
                  <span>Teacher Rating</span>
                  <Star size={16} className="text-amber-500 fill-amber-500" />
                </div>
                <p className="font-medium text-2xl text-slate-900">4.9 ★</p>
                <p className="text-[11px] text-slate-500 font-normal mt-1">
                  From 128 student reviews
                </p>
              </div>

              <div className="bg-white p-4 rounded-[12px] border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 font-normal mb-1">
                  <span>Available Payout</span>
                  <Award size={16} className="text-indigo-600" />
                </div>
                <p className="font-medium text-2xl text-slate-900">₹6,800</p>
                <p className="text-[11px] text-indigo-600 font-normal mt-1">
                  Ready to withdraw via UPI
                </p>
              </div>
            </div>

            {/* Quick Action: Open AI Session Co-Pilot */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-[12px] p-4 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-900 font-medium text-sm">
                  <Sparkles size={16} className="text-indigo-600" />
                  <span>Prepare Lesson with AI Co-Pilot</span>
                </div>
                <p className="text-xs text-indigo-800 font-normal">
                  Generate explanations, 5 questions & printable worksheets for your next session.
                </p>
              </div>
              <Link
                href="/session"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3.5 py-2 rounded-[8px] flex-shrink-0 transition-colors"
              >
                Open Co-Pilot
              </Link>
            </div>

            {/* Today's Booked Teaching Schedule */}
            <div className="bg-white rounded-[12px] border border-slate-200 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-medium text-sm text-slate-900">Today's Booked Sessions</h2>
                <span className="text-xs font-normal text-indigo-600">2 Sessions Today</span>
              </div>

              <div className="space-y-2">
                <div className="p-3.5 rounded-[12px] border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-[8px] bg-blue-100 text-blue-800 font-medium flex items-center justify-center text-xs">
                      AK
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Aryan Kumar (Class 10)</p>
                      <p className="text-xs text-slate-500 font-normal">Quadratic Equations • 5:00 PM (60 min)</p>
                    </div>
                  </div>
                  <Link
                    href="/session?topic=Quadratic%20Equations&grade=Class%2010"
                    className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-0.5"
                  >
                    Prepare <ArrowUpRight size={14} />
                  </Link>
                </div>

                <div className="p-3.5 rounded-[12px] border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-[8px] bg-purple-100 text-purple-800 font-medium flex items-center justify-center text-xs">
                      AG
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Ananya Gupta (Class 12 JEE)</p>
                      <p className="text-xs text-slate-500 font-normal">Integration by Parts • 7:00 PM (60 min)</p>
                    </div>
                  </div>
                  <Link
                    href="/session?topic=Integration%20by%20Parts&grade=Class%2012"
                    className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-0.5"
                  >
                    Prepare <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "students" && (
          <motion.div
            key="students"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-sm text-slate-900">Active Students Roster</h2>
              <span className="text-xs text-slate-500">38 Total Students</span>
            </div>

            <div className="space-y-3">
              {MOCK_STUDENTS.map((st) => (
                <div key={st.id} className="bg-white border border-slate-200 rounded-[12px] p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center font-medium text-sm ${st.avatarBg}`}>
                        {st.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-slate-900">{st.name}</h3>
                        <p className="text-xs text-slate-500">{st.grade} • {st.subject}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-[6px]">
                      {st.progress} Score
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Last Topic</span>
                      <span className="font-medium text-slate-800">{st.lastTopic}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Next Session</span>
                      <span className="font-medium text-slate-800">{st.nextSession}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => router.push(`/session?topic=${encodeURIComponent(st.lastTopic)}&grade=${encodeURIComponent(st.grade)}`)}
                      className="flex-1 min-h-[36px] bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-[8px] transition-colors flex items-center justify-center gap-1"
                    >
                      <Sparkles size={14} /> Co-Pilot Material
                    </button>
                    <button
                      onClick={() => alert(`Parent Report sent for ${st.name}`)}
                      className="min-h-[36px] px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-[8px] transition-colors"
                    >
                      Send Parent Progress Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "queries" && (
          <motion.div
            key="queries"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium text-sm text-slate-900">Student Doubts & Misconceptions</h2>
                <p className="text-xs text-slate-500">GPT-5.6 assists you in diagnosing why student got it wrong</p>
              </div>
              <span className="text-xs bg-amber-100 text-amber-900 font-medium px-2 py-0.5 rounded-[6px]">
                {MOCK_QUERIES.filter((q) => !answeredQueries.includes(q.id)).length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {MOCK_QUERIES.map((q) => {
                const isAnswered = answeredQueries.includes(q.id);
                return (
                  <div key={q.id} className="bg-white border border-slate-200 rounded-[12px] p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-[6px] bg-slate-100 text-slate-800 text-xs font-medium flex items-center justify-center">
                          {q.studentAvatar}
                        </div>
                        <span className="text-xs font-medium text-slate-900">{q.studentName}</span>
                        <span className="text-[10px] text-slate-400">• {q.time}</span>
                      </div>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-[6px] ${
                        isAnswered ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-900 border border-amber-200"
                      }`}>
                        {isAnswered ? "Resolved" : "Pending Doubt"}
                      </span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-[8px] p-3 text-xs text-slate-800 font-normal">
                      "{q.question}"
                    </div>

                    {/* AI Misconception Diagnosis Note */}
                    <div className="bg-amber-50 border border-amber-200 rounded-[8px] p-2.5 text-xs text-amber-900 flex items-start gap-2">
                      <Lightbulb size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium block text-amber-900">AI Diagnosed Misconception:</span>
                        <span>{q.misconception}</span>
                      </div>
                    </div>

                    {!isAnswered ? (
                      <button
                        onClick={() => handleResolveDoubt(q)}
                        className="w-full min-h-[38px] bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-[8px] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Sparkles size={14} /> Resolve with GPT-5.6 Co-Pilot
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium pt-1">
                        <Check size={16} /> Solution & explanation sent to student
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
