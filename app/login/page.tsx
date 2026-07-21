"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, ArrowRight, Eye, EyeOff, User, HeartHandshake,
  Sparkles, CheckCircle2, DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Role = "student" | "parent" | "teacher";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("student");
  const [email, setEmail] = useState("aryan.k@gmail.com");
  const [password, setPassword] = useState("••••••••");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    if (newRole === "student") setEmail("aryan.k@gmail.com");
    else if (newRole === "parent") setEmail("ramesh.parent@gmail.com");
    else if (newRole === "teacher") setEmail("priya.tutor@vidyaconnect.ai");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", role);
    }

    if (role === "teacher") {
      router.push("/profile?role=teacher");
    } else if (role === "parent") {
      router.push("/profile?role=parent");
    } else {
      router.push("/profile?role=student");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto font-sans">
      {/* Top Header */}
      <div className="px-6 pt-12 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 mb-6"
        >
          <div className="w-10 h-10 rounded-[12px] bg-indigo-600 flex items-center justify-center text-white shadow-brand">
            <GraduationCap size={22} />
          </div>
          <div>
            <span className="font-medium text-slate-900 text-xl block leading-tight">VidyaConnect AI</span>
            <span className="text-[11px] text-slate-400 font-normal">India's AI Tutoring Platform</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="font-medium text-2xl text-slate-900 mb-1">Sign in to VidyaConnect</h1>
          <p className="text-slate-500 text-xs font-normal">Select your role to access your personalized portal</p>
        </motion.div>
      </div>

      {/* Role Selection Tabs */}
      <div className="px-6 mb-5">
        <div className="bg-slate-200/70 p-1 rounded-[12px] grid grid-cols-3 gap-1">
          <button
            type="button"
            onClick={() => handleRoleChange("student")}
            className={`py-2 text-xs font-medium rounded-[8px] transition-all flex items-center justify-center gap-1 ${
              role === "student"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <User size={14} /> Student
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("parent")}
            className={`py-2 text-xs font-medium rounded-[8px] transition-all flex items-center justify-center gap-1 ${
              role === "parent"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <HeartHandshake size={14} /> Parent
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("teacher")}
            className={`py-2 text-xs font-medium rounded-[8px] transition-all flex items-center justify-center gap-1 ${
              role === "teacher"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <GraduationCap size={14} /> Teacher
          </button>
        </div>
      </div>

      {/* Form Area */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex-1 px-6 pb-8 space-y-5"
      >
        <form onSubmit={handleLogin} className="space-y-4 bg-white border border-slate-200 rounded-[12px] p-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-medium text-slate-500">Signing in as:</span>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-[6px] border border-indigo-100">
              {role === "student" ? "👨‍🎓 Student Account" : role === "parent" ? "👨‍👩‍👦 Parent Portal" : "👩‍🏫 Verified Tutor"}
            </span>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full min-h-[44px] border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-[12px] px-3.5 text-sm text-slate-900 bg-white transition-colors outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-slate-500">Password</label>
              <button type="button" className="text-xs text-indigo-600 font-medium hover:underline">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full min-h-[44px] border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-[12px] px-3.5 pr-10 text-sm text-slate-900 bg-white transition-colors outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button type="submit" fullWidth loading={loading} size="lg" className="min-h-[48px] text-sm font-medium bg-indigo-600 hover:bg-indigo-700">
            {role === "teacher" ? "Sign in to Teacher Dashboard" : role === "parent" ? "Sign in to Parent Portal" : "Sign in as Student"}
            {!loading && <ArrowRight size={16} />}
          </Button>
        </form>

        {/* Earn as a Teacher Callout Banner */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-[12px] p-4 space-y-2">
          <div className="flex items-center gap-2 text-indigo-900 font-medium text-sm">
            <DollarSign size={18} className="text-indigo-600 flex-shrink-0" />
            <span>Earn as a VidyaConnect Tutor</span>
          </div>
          <p className="text-xs text-indigo-800 font-normal leading-relaxed">
            Are you a teacher or subject expert? Teach 1-on-1 online and earn ₹40,000+/month with AI Session Co-Pilot assistance.
          </p>
          <button
            onClick={() => handleRoleChange("teacher")}
            className="w-full min-h-[38px] bg-white border border-indigo-300 hover:bg-indigo-100 text-indigo-700 font-medium text-xs rounded-[8px] transition-colors flex items-center justify-center gap-1 mt-1"
          >
            <Sparkles size={14} /> Register / Sign in as Tutor
          </button>
        </div>

        {/* Sign up link */}
        <p className="text-center text-xs text-slate-500 font-normal pt-2">
          New to VidyaConnect?{" "}
          <Link href="/signup" className="text-indigo-600 font-medium hover:underline">
            Create account & get AI matched
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
