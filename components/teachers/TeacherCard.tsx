"use client";

import { motion } from "framer-motion";
import { Star, MapPin, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

interface TeacherCardProps {
  id: string;
  name: string;
  subject: string;
  avatar: string;
  avatarBg: string;
  rating: number;
  reviews: number;
  price: number;
  distance: string;
  experience: string;
  verified: boolean;
  online: boolean;
  tags: string[];
  matchScore?: number;
  index?: number;
}

export function TeacherCard({
  id, name, subject, avatar, avatarBg, rating, reviews,
  price, distance, experience, verified, online, tags, matchScore, index = 0,
}: TeacherCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3, ease: "easeOut" }}
    >
      <Link href={`/teachers/${id}`}>
        <div className="bg-white rounded-2xl border border-ink-100 shadow-card p-5 transition-all duration-200 hover:shadow-elevated hover:border-ink-200 active:scale-[0.98]">
          {/* Header */}
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-semibold text-sm ${avatarBg}`}>
                {avatar}
              </div>
              {online && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-white" />
              )}
            </div>

            {/* Name + badges */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-semibold text-ink-900 text-sm truncate">{name}</h3>
                {verified && (
                  <CheckCircle2 size={14} className="text-info flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-ink-500 mt-0.5">{subject} · {experience} exp</p>
            </div>

            {/* Match score */}
            {matchScore && (
              <div className="flex-shrink-0 flex items-center gap-1 bg-brand-50 text-brand-700 rounded-xl px-2.5 py-1">
                <Zap size={11} className="fill-brand-500" />
                <span className="text-xs font-bold">{matchScore}%</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2 py-0.5 bg-ink-100 text-ink-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-ink-100">
            <div className="flex items-center gap-3">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star size={13} className="text-warning fill-warning" />
                <span className="text-xs font-semibold text-ink-900">{rating}</span>
                <span className="text-xs text-ink-400">({reviews})</span>
              </div>
              {/* Distance */}
              <div className="flex items-center gap-1 text-ink-400">
                <MapPin size={11} />
                <span className="text-xs">{distance}</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <span className="font-display font-bold text-ink-900 text-base">{formatCurrency(price)}</span>
              <span className="text-xs text-ink-400">/hr</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Horizontal mini card for home carousel ── */
export function TeacherCardMini({
  id, name, subject, avatar, avatarBg, rating, price, distance, verified, online, matchScore, index = 0,
}: TeacherCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      className="snap-start flex-shrink-0 w-52"
    >
      <Link href={`/teachers/${id}`}>
        <div className="bg-white rounded-2xl border border-ink-100 shadow-card p-4 transition-all duration-200 hover:shadow-elevated hover:border-ink-200 active:scale-[0.97]">
          <div className="relative w-10 h-10 mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-sm ${avatarBg}`}>
              {avatar}
            </div>
            {online && (
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full border-2 border-white" />
            )}
          </div>
          <div className="flex items-center gap-1 mb-0.5">
            <p className="font-semibold text-ink-900 text-sm truncate">{name}</p>
            {verified && <CheckCircle2 size={12} className="text-info flex-shrink-0" />}
          </div>
          <p className="text-xs text-ink-500 mb-3">{subject}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star size={11} className="text-warning fill-warning" />
              <span className="text-xs font-semibold">{rating}</span>
            </div>
            <div>
              <span className="font-display font-bold text-sm text-ink-900">{formatCurrency(price)}</span>
              <span className="text-[10px] text-ink-400">/hr</span>
            </div>
          </div>
          {matchScore && (
            <div className="mt-2 flex items-center gap-1 text-brand-600">
              <Zap size={10} className="fill-brand-500" />
              <span className="text-[10px] font-bold">{matchScore}% match</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
