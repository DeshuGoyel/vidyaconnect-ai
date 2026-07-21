"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, ShieldCheck, HeartHandshake, BookOpen, Clock, Calendar,
  Award, TrendingUp, Sparkles, LogOut, ChevronRight, Settings,
  CheckCircle2, AlertCircle, Phone, Wallet
} from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { SESSIONS, LEARNING_DNA, STATS } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"student" | "parent">("student");

  return (
    <PageWrapper className="pt-6 space-y-6">
      {/* Top Profile Card */}
      <div className="bg-white rounded-2xl border border-ink-100 p-5 shadow-card">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-bold text-xl shadow-brand flex-shrink-0">
            AK
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-lg text-ink-900 truncate">Aryan Kumar</h1>
              <span className="text-[10px] bg-brand-50 text-brand-700 font-bold px-2 py-0.5 rounded-full border border-brand-200">
                Class 10 CBSE
              </span>
            </div>
            <p className="text-xs text-ink-400 mt-0.5">aryan.k@gmail.com • Lajpat Nagar, Delhi</p>
          </div>
        </div>

        {/* View Switcher (Student vs Parent Portal vs Teacher Portal) */}
        <div className="mt-5 p-1 bg-ink-100 rounded-xl flex">
          <button
            onClick={() => setActiveTab("student")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "student"
                ? "bg-white text-ink-900 shadow-soft"
                : "text-ink-500 hover:text-ink-900"
            }`}
          >
            <User size={14} /> Student Profile
          </button>
          <button
            onClick={() => setActiveTab("parent")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "parent"
                ? "bg-brand-500 text-white shadow-brand"
                : "text-ink-500 hover:text-ink-900"
            }`}
          >
            <HeartHandshake size={14} /> Parent Portal View
          </button>
        </div>

        {/* Teacher Portal Switcher Link */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">Are you a registered Tutor?</span>
          <Link
            href="/teacher-dashboard"
            className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1"
          >
            Open Teacher Dashboard →
          </Link>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "student" ? (
          <motion.div
            key="student"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white p-4 rounded-2xl border border-ink-100 shadow-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-ink-400 font-medium">{s.label}</span>
                    <span className="text-[10px] font-semibold text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded">
                      {s.trend}
                    </span>
                  </div>
                  <p className="font-display font-bold text-2xl text-ink-900">
                    {s.unit === "₹" ? formatCurrency(s.value) : `${s.value} ${s.unit}`}
                  </p>
                </div>
              ))}
            </div>

            {/* Learning DNA */}
            <div className="bg-white rounded-2xl border border-ink-100 p-5 shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-brand-500" />
                  <h2 className="font-display font-bold text-sm text-ink-900">Learning DNA Progress</h2>
                </div>
                <span className="text-xs text-brand-600 font-semibold">GPT-5.6 Analysed</span>
              </div>

              <div className="space-y-3 pt-1">
                {LEARNING_DNA.map((item) => (
                  <div key={item.subject}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-ink-800">{item.subject}</span>
                      <span className="font-bold text-ink-900">{item.progress}% ({item.grade})</span>
                    </div>
                    <div className="w-full h-2 bg-ink-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} transition-all duration-500`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent & Upcoming Sessions */}
            <div className="bg-white rounded-2xl border border-ink-100 p-5 shadow-card space-y-3">
              <h2 className="font-display font-bold text-sm text-ink-900">My Sessions</h2>
              <div className="space-y-2">
                {SESSIONS.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-ink-100 bg-ink-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${session.avatarBg}`}>
                        {session.teacherAvatar}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-ink-900">{session.topic}</p>
                        <p className="text-[11px] text-ink-400">{session.teacherName} • {session.date}, {session.time}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                      session.status === "upcoming" ? "bg-brand-50 text-brand-700" : "bg-green-50 text-green-700"
                    }`}>
                      {session.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Parent Portal View */
          <motion.div
            key="parent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            {/* Parent Monitoring Banner */}
            <div className="bg-gradient-to-r from-ink-900 to-ink-800 text-white rounded-2xl p-5 shadow-elevated">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck size={16} className="text-brand-400" />
                <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider">Parent Monitoring Active</span>
              </div>
              <h2 className="font-display font-bold text-lg text-white">Ramesh Kumar (Parent)</h2>
              <p className="text-xs text-ink-300 mt-1">Connected to Aryan's VidyaConnect Account • Direct WhatsApp updates enabled</p>
            </div>

            {/* Attendance & Safety Report */}
            <div className="bg-white rounded-2xl border border-ink-100 p-5 shadow-card space-y-3">
              <h3 className="font-display font-bold text-sm text-ink-900">Child Progress & Safety Metrics</h3>
              
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <div className="flex items-center gap-1.5 text-green-700 mb-1">
                    <CheckCircle2 size={16} />
                    <span className="text-xs font-bold">100% Attendance</span>
                  </div>
                  <p className="text-[11px] text-green-800">24/24 Sessions attended on time</p>
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
            <div className="bg-white rounded-2xl border border-ink-100 p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Wallet size={16} className="text-brand-600" />
                  <h3 className="font-display font-bold text-sm text-ink-900">Tutoring Expenditure</h3>
                </div>
                <span className="text-xs font-bold text-ink-900">₹7,200 Total</span>
              </div>
              <p className="text-xs text-ink-500">All payments held in escrow until session completion. Verified teacher payouts.</p>
            </div>

            {/* Teacher Notes for Parent */}
            <div className="bg-white rounded-2xl border border-ink-100 p-5 shadow-card space-y-2">
              <h3 className="font-display font-bold text-sm text-ink-900">Latest Tutor Notes for Parent</h3>
              <div className="bg-brand-50 border border-brand-100 rounded-xl p-3 text-xs text-brand-900 leading-relaxed">
                "Aryan showed great improvement in Quadratic Equations today. He grasped factoring quickly. Recommended 15 min daily practice on worksheets generated by Session Co-Pilot."
                <p className="text-[10px] text-brand-700 font-bold mt-2">— Priya Sharma (Maths Tutor)</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout / Action */}
      <div className="pt-2">
        <button
          onClick={() => router.push("/login")}
          className="w-full flex items-center justify-center gap-2 bg-white border border-ink-200 text-danger rounded-xl py-3 text-sm font-semibold hover:bg-red-50 transition-colors shadow-soft"
        >
          <LogOut size={16} /> Sign Out of Account
        </button>
      </div>
    </PageWrapper>
  );
}
