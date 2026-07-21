"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="px-6 pt-14 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-8"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center shadow-brand">
            <GraduationCap size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-ink-900 text-xl">VidyaConnect AI</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="font-display font-bold text-3xl text-ink-900 mb-2">Welcome back</h1>
          <p className="text-ink-500 text-sm">Sign in to continue learning</p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex-1 px-6 pb-8"
      >
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-ink-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder-ink-400 bg-white transition-all outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-ink-700">Password</label>
              <button type="button" className="text-xs text-brand-600 font-medium hover:text-brand-700">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-ink-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-3 pr-12 text-sm text-ink-900 placeholder-ink-400 bg-white transition-all outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 transition-colors"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" fullWidth loading={loading} size="lg">
            Sign in
            {!loading && <ArrowRight size={18} />}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-ink-200" />
            <span className="text-xs text-ink-400 font-medium">or continue with</span>
            <div className="flex-1 border-t border-ink-200" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={() => router.push("/home")}
            className="w-full flex items-center justify-center gap-3 bg-white border border-ink-200 rounded-xl px-6 py-3 text-sm font-semibold text-ink-700 hover:bg-ink-50 transition-all duration-200 shadow-soft active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-ink-500 mt-8">
          New to VidyaConnect?{" "}
          <Link href="/signup" className="text-brand-600 font-semibold hover:text-brand-700">
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
