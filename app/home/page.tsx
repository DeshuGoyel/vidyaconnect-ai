"use client";

import { motion } from "framer-motion";
import { Bell, Search, Zap } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TeacherCardMini } from "@/components/teachers/TeacherCard";
import { TEACHERS, SUBJECTS } from "@/lib/data";
import { getGreeting } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const greeting = getGreeting();

  const featured = TEACHERS.slice(0, 4);
  const nearby = TEACHERS.slice(2, 6);

  return (
    <PageWrapper className="pt-6 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-medium text-ink-400 uppercase tracking-wider">{greeting}</p>
          <h1 className="font-display font-bold text-2xl text-ink-900 mt-0.5">
            Hello, Aryan 👋
          </h1>
          <p className="text-sm text-ink-500 mt-1">Ready to learn something new?</p>
        </motion.div>
        <button className="relative w-10 h-10 rounded-xl bg-white border border-ink-100 shadow-soft flex items-center justify-center text-ink-500 hover:text-ink-900 transition-colors">
          <Bell size={19} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-500" />
        </button>
      </div>

      {/* AI Match Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Link href="/signup">
          <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl p-5 shadow-brand flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Zap size={14} className="text-white/80 fill-white/80" />
                <span className="text-xs font-semibold text-white/80">AI MATCH ENGINE</span>
              </div>
              <p className="font-display font-bold text-white text-lg leading-tight">
                Find your perfect<br />teacher in 60 seconds
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Zap size={24} className="text-white" />
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div
          onClick={() => router.push("/teachers")}
          className="flex items-center gap-3 bg-white rounded-2xl border border-ink-200 shadow-soft px-4 py-3.5 cursor-pointer hover:border-brand-300 transition-colors"
        >
          <Search size={18} className="text-ink-400" />
          <span className="text-sm text-ink-400">Search teachers, subjects, topics…</span>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-base text-ink-900">Browse by subject</h2>
          <Link href="/teachers" className="text-xs font-medium text-brand-600 hover:text-brand-700">See all</Link>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {SUBJECTS.map(({ id, label }) => (
            <Link
              key={id}
              href={`/teachers?subject=${id}`}
              className="flex-shrink-0 px-4 py-2 bg-white rounded-xl border border-ink-200 text-xs font-semibold text-ink-700 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-700 transition-all"
            >
              {label}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Top Matched Teachers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display font-semibold text-base text-ink-900">Your AI matches</h2>
            <p className="text-xs text-ink-400 mt-0.5">Ranked by compatibility score</p>
          </div>
          <Link href="/teachers" className="text-xs font-medium text-brand-600 hover:text-brand-700">See all</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x pb-2">
          {featured.map((t, i) => (
            <TeacherCardMini key={t.id} {...t} index={i} />
          ))}
        </div>
      </div>

      {/* Nearby Teachers */}
      <div className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-base text-ink-900">Near you</h2>
          <Link href="/teachers" className="text-xs font-medium text-brand-600 hover:text-brand-700">View map</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x pb-2">
          {nearby.map((t, i) => (
            <TeacherCardMini key={t.id} {...t} index={i} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
