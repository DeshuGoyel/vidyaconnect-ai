"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, ShieldCheck, HeartHandshake, BookOpen, Clock, Calendar,
  Award, TrendingUp, Sparkles, LogOut, ChevronRight, Settings,
  CheckCircle2, AlertCircle, Phone, Wallet, GraduationCap, Star,
  Users, Check, Lightbulb, ArrowUpRight
} from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SESSIONS, LEARNING_DNA, STATS } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const MOCK_TEACHER_STUDENTS = [
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

const MOCK_STUDENT_DOUBTS = [
  {
    id: "q1",
    studentName: "Aryan Kumar",
    studentAvatar: "AK",
    time: "10 mins ago",
    question: "Ma'am, in x² − 5x + 6 = 0 why do we take factors as (x-2)(x-3) and not (x+2)(x+3)?",
    status: "Unanswered",
    misconception: "Confused sign multiplication in factoring quadratic roots",
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
];

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [roleMode, setRoleMode] = useState<"student" | "parent" | "teacher">("student");
  const [teacherSubTab, setTeacherSubTab] = useState<"earnings" | "students" | "doubts">("earnings");

  useEffect(() => {
    const queryRole = searchParams.get("role");
    const storedRole = typeof window !== "undefined" ? localStorage.getItem("userRole") : null;
    
    if (queryRole === "teacher" || storedRole === "teacher") {
      setRoleMode("teacher");
    } else if (queryRole === "parent" || storedRole === "parent") {
      setRoleMode("parent");
    } else {
      setRoleMode("student");
    }
  }, [searchParams]);

  const handleResolveDoubt = (q: typeof MOCK_STUDENT_DOUBTS[0]) => {
    router.push(`/session?topic=${encodeURIComponent(q.question)}&misconception=${encodeURIComponent(q.misconception)}`);
  };

  return (
    <PageWrapper className="pt-6 space-y-6">

      {/* ── 1. STUDENT LOGGED-IN VIEW ── */}
      {roleMode === "student" && (
        <motion.div
          key="student"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          {/* Student Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Logged in Account Profile
              </span>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                👨‍🎓 Student Role
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-brand flex-shrink-0">
                AK
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="font-display font-bold text-lg text-slate-900 truncate">Aryan Kumar</h1>
                <p className="text-xs text-slate-500 mt-0.5">Class 10 CBSE • Lajpat Nagar, Delhi</p>
                <p className="text-[11px] text-slate-400 mt-0.5">aryan.k@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 font-normal">{s.label}</span>
                  <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                    {s.trend}
                  </span>
                </div>
                <p className="font-display font-bold text-2xl text-slate-900">
                  {s.unit === "₹" ? formatCurrency(s.value) : `${s.value} ${s.unit}`}
                </p>
              </div>
            ))}
          </div>

          {/* Learning DNA Progress */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-indigo-600" />
                <h2 className="font-display font-bold text-sm text-slate-900">Learning DNA Progress</h2>
              </div>
              <span className="text-xs text-indigo-600 font-semibold">GPT-5.6 Analysed</span>
            </div>

            <div className="space-y-3 pt-1">
              {LEARNING_DNA.map((item) => (
                <div key={item.subject}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-800">{item.subject}</span>
                    <span className="font-bold text-slate-900">{item.progress}% ({item.grade})</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card space-y-3">
            <h2 className="font-display font-bold text-sm text-slate-900">My Sessions</h2>
            <div className="space-y-2">
              {SESSIONS.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${session.avatarBg}`}>
                      {session.teacherAvatar}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{session.topic}</p>
                      <p className="text-[11px] text-slate-500">{session.teacherName} • {session.date}, {session.time}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    session.status === "upcoming" ? "bg-indigo-50 text-indigo-700" : "bg-emerald-50 text-emerald-700"
                  }`}>
                    {session.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── 2. PARENT LOGGED-IN VIEW ── */}
      {roleMode === "parent" && (
        <motion.div
          key="parent"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          {/* Parent Monitoring Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-elevated">
            <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-indigo-400" />
                <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Parent Portal Active</span>
              </div>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded-full font-bold">
                👨‍👩‍👦 Parent Account
              </span>
            </div>
            <h2 className="font-display font-bold text-lg text-white">Ramesh Kumar (Parent)</h2>
            <p className="text-xs text-slate-300 mt-1">Monitoring Aryan's VidyaConnect Account • Direct WhatsApp updates enabled</p>
          </div>

          {/* Attendance & Safety Report */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card space-y-3">
            <h3 className="font-display font-bold text-sm text-slate-900">Child Progress & Safety Metrics</h3>
            
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-emerald-700 mb-1">
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-bold">100% Attendance</span>
                </div>
                <p className="text-[11px] text-emerald-800">24/24 Sessions attended on time</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-purple-700 mb-1">
                  <Award size={16} />
                  <span className="text-xs font-bold">+18% Score</span>
                </div>
                <p className="text-[11px] text-purple-800">Improvement in last 30 days</p>
              </div>
            </div>
          </div>

          {/* Parent Financial Tracker */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Wallet size={16} className="text-indigo-600" />
                <h3 className="font-display font-bold text-sm text-slate-900">Tutoring Expenditure</h3>
              </div>
              <span className="text-xs font-bold text-slate-900">₹7,200 Total</span>
            </div>
            <p className="text-xs text-slate-500">All payments held in escrow until session completion. Verified teacher payouts.</p>
          </div>

          {/* Teacher Notes for Parent */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card space-y-2">
            <h3 className="font-display font-bold text-sm text-slate-900">Latest Tutor Notes for Parent</h3>
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-xs text-indigo-900 leading-relaxed">
              "Aryan showed great improvement in Quadratic Equations today. He grasped factoring quickly. Recommended 15 min daily practice on worksheets generated by Session Co-Pilot."
              <p className="text-[10px] text-indigo-700 font-bold mt-2">— Priya Sharma (Maths Tutor)</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── 3. TEACHER LOGGED-IN VIEW (Priya Sharma Profile) ── */}
      {roleMode === "teacher" && (
        <motion.div
          key="teacher"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          {/* Teacher Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Logged in Tutor Portal
              </span>
              <span className="text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full shadow-brand">
                👩‍🏫 Teacher Role
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-brand flex-shrink-0">
                PS
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h1 className="font-display font-bold text-lg text-slate-900 truncate">Priya Sharma</h1>
                  <CheckCircle2 size={16} className="text-indigo-600 flex-shrink-0" />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">IIT Delhi Alumna • Class 9–12 & JEE Maths Specialist</p>
                
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Star size={13} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-slate-900">4.9</span>
                    <span className="text-xs text-slate-400">(128 reviews)</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    38 Active Students
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Teacher Sub-tab Navigation */}
          <div className="flex border-b border-slate-200 text-xs font-semibold bg-white rounded-t-xl px-2">
            <button
              onClick={() => setTeacherSubTab("earnings")}
              className={`py-2.5 px-4 border-b-2 transition-colors ${
                teacherSubTab === "earnings"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Earnings & Schedule
            </button>
            <button
              onClick={() => setTeacherSubTab("students")}
              className={`py-2.5 px-4 border-b-2 transition-colors ${
                teacherSubTab === "students"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              My Students (38)
            </button>
            <button
              onClick={() => setTeacherSubTab("doubts")}
              className={`py-2.5 px-4 border-b-2 transition-colors ${
                teacherSubTab === "doubts"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Student Doubts (2)
            </button>
          </div>

          {/* Teacher Sub-tab 1: Earnings & Schedule */}
          {teacherSubTab === "earnings" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 block mb-1">Total Earnings</span>
                  <p className="font-display font-bold text-2xl text-slate-900">₹48,500</p>
                  <span className="text-[10px] text-emerald-600 font-semibold">+₹14,200 this month</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-400 block mb-1">Withdrawable Payout</span>
                  <p className="font-display font-bold text-2xl text-slate-900">₹6,800</p>
                  <span className="text-[10px] text-indigo-600 font-semibold">Instant UPI Transfer</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
                <h3 className="font-display font-bold text-sm text-slate-900">Today's Teaching Schedule</h3>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Aryan Kumar (Class 10)</p>
                      <p className="text-[11px] text-slate-500">Quadratic Equations • 5:00 PM</p>
                    </div>
                    <Link
                      href="/session?topic=Quadratic%20Equations&grade=Class%2010"
                      className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-0.5"
                    >
                      Prepare <ArrowUpRight size={13} />
                    </Link>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Ananya Gupta (Class 12 JEE)</p>
                      <p className="text-[11px] text-slate-500">Integration by Parts • 7:00 PM</p>
                    </div>
                    <Link
                      href="/session?topic=Integration%20by%20Parts&grade=Class%2012"
                      className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-0.5"
                    >
                      Prepare <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Teacher Sub-tab 2: Active Students */}
          {teacherSubTab === "students" && (
            <div className="space-y-3">
              {MOCK_TEACHER_STUDENTS.map((st) => (
                <div key={st.id} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${st.avatarBg}`}>
                        {st.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{st.name}</h4>
                        <p className="text-xs text-slate-500">{st.grade} • {st.subject}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                      {st.progress} Score
                    </span>
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => router.push(`/session?topic=${encodeURIComponent(st.lastTopic)}&grade=${encodeURIComponent(st.grade)}`)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
                    >
                      <Sparkles size={12} /> Generate Lesson
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Teacher Sub-tab 3: Student Doubts */}
          {teacherSubTab === "doubts" && (
            <div className="space-y-3">
              {MOCK_STUDENT_DOUBTS.map((q) => (
                <div key={q.id} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{q.studentName}</span>
                      <span className="text-[10px] text-slate-400">• {q.time}</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      Pending Doubt
                    </span>
                  </div>

                  <p className="text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    "{q.question}"
                  </p>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-900 flex items-start gap-2">
                    <Lightbulb size={15} className="text-amber-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">AI Misconception Diagnosis:</span>
                      <span>{q.misconception}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleResolveDoubt(q)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sparkles size={14} /> Resolve with GPT-5.6 Co-Pilot
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Switch role or Logout footer */}
      <div className="space-y-2 pt-2">
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-normal">Logged in role: <strong className="text-slate-900 uppercase">{roleMode}</strong></span>
          <button
            onClick={() => router.push("/login")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Switch Account / Role →
          </button>
        </div>

        <button
          onClick={() => {
            if (typeof window !== "undefined") localStorage.removeItem("userRole");
            router.push("/login");
          }}
          className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-red-600 rounded-xl py-3 text-sm font-semibold hover:bg-red-50 transition-colors shadow-soft"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </PageWrapper>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-xs text-slate-500">Loading Profile...</div>}>
      <ProfileContent />
    </Suspense>
  );
}
