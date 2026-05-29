"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GraduationCap, MapPin, Brain, Users, Star, ArrowRight, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 0,
    icon: MapPin,
    color: "bg-blue-500",
    title: "Hyperlocal Teacher Discovery",
    subtitle: "Find verified tutors within your colony in minutes",
    stat: "50,000+ teachers",
    statLabel: "across 200+ cities",
  },
  {
    id: 1,
    icon: Brain,
    color: "bg-saffron-500",
    title: "AI-Powered Matching",
    subtitle: "Our AI analyzes learning style, budget & location for a perfect match",
    stat: "94% match accuracy",
    statLabel: "for the right teacher",
  },
  {
    id: 2,
    icon: Star,
    color: "bg-emerald-500",
    title: "Free Demo Classes",
    subtitle: "Try 3 free demo sessions before paying a single rupee",
    stat: "3 FREE classes",
    statLabel: "before you commit",
  },
  {
    id: 3,
    icon: Users,
    color: "bg-purple-500",
    title: "Colony Group Bookings",
    subtitle: "Split tuition costs with neighbours. ₹260/head instead of ₹1,200",
    stat: "Save up to 78%",
    statLabel: "with group bookings",
  },
];

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white">
      {/* Gradient accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-saffron-400 via-saffron-500 to-amber-400" />

      {/* Top nav */}
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-saffron-500 text-white shadow-card">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-heading text-base font-extrabold text-ink-800">VidyaConnect AI</span>
        </div>
        <Link href="/login" className="text-sm font-extrabold text-ink-400 hover:text-ink-700">
          Skip
        </Link>
      </div>

      {/* Slide area */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <div className={`grid h-24 w-24 place-items-center rounded-3xl ${slide.color} shadow-xl`}>
              <Icon className="h-12 w-12 text-white" />
            </div>

            <div className="mt-6 rounded-2xl bg-ink-50 px-6 py-3">
              <p className="font-heading text-3xl font-extrabold text-ink-800">{slide.stat}</p>
              <p className="mt-1 text-sm font-bold text-ink-400">{slide.statLabel}</p>
            </div>

            <h2 className="mt-6 font-heading text-2xl font-extrabold leading-snug text-ink-800">
              {slide.title}
            </h2>
            <p className="mt-3 text-base font-semibold leading-7 text-ink-500 max-w-xs">
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="mt-8 flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-saffron-500" : "w-2 bg-ink-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-10 pt-4">
        <div className="mx-auto max-w-sm space-y-3">
          <Button size="lg" className="h-14 w-full text-base font-extrabold">
            <Link href="/signup" className="flex items-center">
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="secondary" className="h-14 w-full text-base font-extrabold">
            <Link href="/login">Login to your account</Link>
          </Button>
        </div>
        <p className="mt-5 text-center text-xs font-semibold text-ink-300">
          Trusted by 2 lakh+ families across India
        </p>
      </div>
    </div>
  );
}
