"use client";

import { AttendanceHeatmap } from "@/components/dashboard/AttendanceHeatmap";
import { ProgressBars } from "@/components/dashboard/ProgressBars";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { UpcomingClasses } from "@/components/dashboard/UpcomingClasses";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";
import { TrendingUp, Target, Flame } from "lucide-react";

const achievements = [
  { label: "7-Day Streak 🔥", color: "bg-orange-100 text-orange-600" },
  { label: "Top Performer ⭐", color: "bg-yellow-100 text-yellow-700" },
  { label: "Demo King 🎓", color: "bg-purple-100 text-purple-600" },
];

export default function StudentDashboardPage() {
  return (
    <PageWrapper>
      <TopBar />

      {/* Hero progress */}
      <section className="mt-6 relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-purple-700 p-5 text-white shadow-xl">
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

      {/* Attendance Heatmap */}
      <Card className="mt-5">
        <h2 className="mb-4 font-heading text-xl font-extrabold text-ink-800">Attendance Heatmap</h2>
        <AttendanceHeatmap />
      </Card>
    </PageWrapper>
  );
}
