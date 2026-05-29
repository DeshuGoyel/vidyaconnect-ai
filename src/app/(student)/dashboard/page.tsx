"use client";

import { AttendanceHeatmap } from "@/components/dashboard/AttendanceHeatmap";
import { ProgressBars } from "@/components/dashboard/ProgressBars";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { UpcomingClasses } from "@/components/dashboard/UpcomingClasses";
import { StudyMaterials } from "@/components/dashboard/StudyMaterials";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";
import { TrendingUp, Target, Flame, Brain } from "lucide-react";
import Link from "next/link";

const achievements = [
  { label: "7-Day Streak 🔥", color: "bg-orange-100 text-orange-600" },
  { label: "Top Performer ⭐", color: "bg-yellow-100 text-yellow-700" },
  { label: "Demo King 🎓", color: "bg-purple-100 text-purple-600" },
];

export default function StudentDashboardPage() {
  return (
    <PageWrapper>
      <TopBar />

      {/* AI Study Plan Banner */}
      <Link href="/study-plan" className="mt-6 block rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 p-4 text-white shadow-card hover:scale-[1.02] transition-transform">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur-md">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-extrabold">Smart Study Plan</h3>
              <p className="text-xs font-semibold text-white/80 mt-0.5">2 focus areas identified. View plan.</p>
            </div>
          </div>
          <Target className="h-6 w-6 text-white/50" />
        </div>
      </Link>

      {/* Free Trial Banner */}
      <div className="mt-6 mb-2 rounded-2xl bg-gradient-to-r from-saffron-500 to-orange-500 p-4 text-white shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-extrabold">3 Free Demos Remaining</h3>
            <p className="text-xs font-semibold text-white/80 mt-1">Book a trial before subscribing.</p>
          </div>
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur-md">
            <span className="font-heading text-xl font-extrabold text-white">3</span>
          </div>
        </div>
      </div>

      {/* Hero progress */}
      <section className="mt-4 relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-purple-700 p-5 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <p className="text-sm font-bold text-white/70">Your Progress · May 2025</p>
        <h2 className="mt-1 font-heading text-3xl font-extrabold">Rohan Singh</h2>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-bold text-white/70 mb-1">
              <span>Overall Score</span>
              <span>82%</span>
            </div>
            <div className="h-2.5 rounded-full bg-white/20">
              <div className="h-full w-[82%] rounded-full bg-white shadow-sm" />
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <div className="rounded-xl bg-white/15 px-4 py-2 text-center">
            <p className="font-heading text-xl font-extrabold">92%</p>
            <p className="text-xs font-bold text-white/70">Attendance</p>
          </div>
          <div className="rounded-xl bg-white/15 px-4 py-2 text-center">
            <p className="font-heading text-xl font-extrabold">24</p>
            <p className="text-xs font-bold text-white/70">Classes Done</p>
          </div>
          <div className="rounded-xl bg-white/15 px-4 py-2 text-center">
            <p className="font-heading text-xl font-extrabold">7🔥</p>
            <p className="text-xs font-bold text-white/70">Day Streak</p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <div className="mt-4 flex gap-2 flex-wrap">
        {achievements.map((a) => (
          <span key={a.label} className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${a.color}`}>
            {a.label}
          </span>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="mt-5"><StatsGrid /></div>

      {/* Subject Progress */}
      <Card className="mt-5">
        <h2 className="mb-4 font-heading text-xl font-extrabold text-ink-800">Subject Progress</h2>
        <ProgressBars scores={{ Mathematics: 82, Science: 68, English: 76, "Social Studies": 88 }} />
      </Card>

      {/* Upcoming Classes */}
      <div className="mt-5"><UpcomingClasses /></div>

      {/* Study Materials */}
      <div className="mt-5"><StudyMaterials role="student" /></div>

      {/* Attendance Heatmap */}
      <Card className="mt-5">
        <h2 className="mb-4 font-heading text-xl font-extrabold text-ink-800">Attendance Heatmap</h2>
        <AttendanceHeatmap />
      </Card>
    </PageWrapper>
  );
}
