"use client";

import { motion } from "framer-motion";
import {
  GraduationCap, BookOpen, Zap, Users, Star, Shield,
  ArrowRight, ChevronRight, Sparkles
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const FEATURES = [
  {
    icon: Zap,
    title: "AI-Powered Matching",
    desc: "5-question diagnostic → GPT finds your perfect teacher in seconds, not hours.",
    color: "bg-brand-50 text-brand-600",
  },
  {
    icon: BookOpen,
    title: "Live Session Co-Pilot",
    desc: "AI generates practice problems, explanations & quizzes during your session — in Hindi or English.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Sparkles,
    title: "Learning DNA Report",
    desc: "Post-session AI analysis: what you mastered, what needs work, and your next steps.",
    color: "bg-purple-50 text-purple-600",
  },
];

const STATS = [
  { value: "50K+", label: "Students" },
  { value: "8K+",  label: "Teachers" },
  { value: "120+", label: "Cities" },
  { value: "4.9",  label: "Rating" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ink-950 text-white overflow-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center">
            <GraduationCap size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-white text-lg">VidyaConnect</span>
          <span className="text-brand-400 font-bold text-xs bg-brand-500/20 px-1.5 py-0.5 rounded-md">AI</span>
        </div>
        <Link href="/login" className="text-sm text-ink-300 hover:text-white transition-colors">
          Log in
        </Link>
      </nav>

      {/* Hero */}
      <div className="px-6 pt-8 pb-12 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles size={14} className="text-brand-400" />
            <span className="text-xs font-semibold text-brand-300">Powered by GPT-5.6</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold text-4xl leading-[1.05] tracking-tight mb-4">
            Find your perfect
            <span className="block gradient-text">tutor with AI</span>
          </h1>

          <p className="text-ink-400 text-base leading-relaxed mb-8">
            India's first AI-powered tutoring marketplace. Get matched in 60 seconds. 
            Learn better with an AI co-pilot in every session.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <Link href="/signup" className="block">
              <Button size="lg" fullWidth className="text-base">
                Get matched with a tutor
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/teachers" className="block">
              <Button variant="secondary" size="lg" fullWidth className="text-base bg-white/10 border-white/20 text-white hover:bg-white/20">
                Browse teachers
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="grid grid-cols-4 gap-3 mt-10 pt-8 border-t border-ink-800"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display font-bold text-xl text-white">{value}</p>
              <p className="text-xs text-ink-500 mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Features */}
      <div className="px-6 pb-12 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="space-y-4"
        >
          <h2 className="font-display font-semibold text-xl text-white mb-5">
            Why VidyaConnect is different
          </h2>
          {FEATURES.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="flex gap-4 bg-ink-900 rounded-2xl p-4 border border-ink-800"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
                <p className="text-xs text-ink-400 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Trust */}
      <div className="px-6 pb-16 max-w-md mx-auto">
        <div className="bg-ink-900 rounded-2xl border border-ink-800 p-5 text-center">
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-warning fill-warning" />
            ))}
          </div>
          <p className="text-sm text-ink-300 italic mb-3">
            "VidyaConnect's AI matched me with exactly the right Maths teacher. My JEE score improved from 85 to 132 in 3 months!"
          </p>
          <p className="text-xs text-ink-500 font-medium">— Aryan K., JEE 2026 Aspirant</p>
        </div>

        {/* Bottom shield */}
        <div className="flex items-center justify-center gap-2 mt-6 text-ink-500">
          <Shield size={14} />
          <span className="text-xs">Verified teachers · Secure payments · 100% satisfaction</span>
        </div>
      </div>
    </div>
  );
}
