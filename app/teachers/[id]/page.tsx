"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Star, MapPin, CheckCircle2, Zap, Clock,
  Calendar, Shield, Award, Sparkles, Check, Phone
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BottomNav } from "@/components/layout/BottomNav";
import { TEACHERS } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default function TeacherDetailPage() {
  const params = useParams();
  const router = useRouter();
  const teacherId = params.id as string;
  
  const teacher = TEACHERS.find((t) => t.id === teacherId) || TEACHERS[0];

  const [selectedSlot, setSelectedSlot] = useState<string | null>(teacher.slots?.[0] || "5:00 PM");
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      router.push("/session");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-ink-50 max-w-md mx-auto relative pb-nav">
      {/* Top Header */}
      <div className="bg-white border-b border-ink-100 px-4 pt-12 pb-4 sticky top-0 z-10 flex items-center justify-between shadow-soft">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-xl bg-ink-50 border border-ink-200 flex items-center justify-center text-ink-700 hover:bg-ink-100 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="font-display font-semibold text-sm text-ink-900">Teacher Profile</span>
        <div className="w-9" />
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Profile Card Header */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5 shadow-card">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl ${teacher.avatarBg}`}>
                {teacher.avatar}
              </div>
              {teacher.online && (
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="font-display font-bold text-lg text-ink-900 truncate">{teacher.name}</h1>
                {teacher.verified && <CheckCircle2 size={16} className="text-info flex-shrink-0" />}
              </div>
              <p className="text-xs text-ink-500 mt-0.5">{teacher.subject} • {teacher.experience} exp</p>
              
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <Star size={13} className="text-warning fill-warning" />
                  <span className="text-xs font-bold text-ink-900">{teacher.rating}</span>
                  <span className="text-xs text-ink-400">({teacher.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-ink-400 text-xs">
                  <MapPin size={11} />
                  <span>{teacher.distance}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-ink-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-ink-400">Fee per hour</span>
              <p className="font-display font-bold text-ink-900 text-xl">{formatCurrency(teacher.price)}<span className="text-xs text-ink-400 font-normal">/hr</span></p>
            </div>
            {teacher.matchScore && (
              <div className="bg-brand-50 border border-brand-200 rounded-xl px-3 py-1.5 flex items-center gap-1 text-brand-700">
                <Zap size={13} className="fill-brand-500" />
                <span className="text-xs font-bold">{teacher.matchScore}% Match</span>
              </div>
            )}
          </div>
        </div>

        {/* About / Bio */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5 shadow-card">
          <h2 className="font-display font-bold text-sm text-ink-900 mb-2">About {teacher.name}</h2>
          <p className="text-xs text-ink-600 leading-relaxed">{teacher.bio}</p>
          
          <div className="flex flex-wrap gap-1.5 mt-4">
            {teacher.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-ink-100 text-ink-700 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-ink-100 shadow-card flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Award size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-ink-900">{teacher.sessions}+ Sessions</p>
              <p className="text-[10px] text-ink-400">Completed on VidyaConnect</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-ink-100 shadow-card flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <Shield size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-ink-900">Background Checked</p>
              <p className="text-[10px] text-ink-400">100% Verified Profile</p>
            </div>
          </div>
        </div>

        {/* Select Time Slot */}
        <div className="bg-white rounded-2xl border border-ink-100 p-5 shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-sm text-ink-900">Available Slots Today</h2>
            <span className="text-[11px] font-semibold text-brand-600">Today</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(teacher.slots || ["9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM", "7:00 PM"]).map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                  selectedSlot === slot
                    ? "bg-brand-500 text-white border-brand-500 shadow-brand"
                    : "bg-ink-50 border-ink-200 text-ink-700 hover:border-brand-300"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Book / Action Button */}
        <div className="pt-2">
          {booked ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-success text-white rounded-2xl p-4 text-center flex items-center justify-center gap-2 font-bold text-sm shadow-card"
            >
              <Check size={18} /> Session Booked for {selectedSlot}! Redirecting to AI Copilot...
            </motion.div>
          ) : (
            <Button onClick={handleBook} fullWidth size="lg" className="text-base">
              Book Session for {selectedSlot}
            </Button>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
