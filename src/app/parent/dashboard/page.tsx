"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { AIReportCard } from "@/components/ai/AIReportCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getLatestReport } from "@/lib/supabase/queries";
import { AIReport } from "@/types/database";
import { latestReport as mockReport } from "@/data/mock";
import { Users, BookOpen, IndianRupee, Bell, TrendingUp, ChevronRight, Star } from "lucide-react";
import { formatRupee } from "@/utils/formatters";

const quickStats = [
  { label: "Attendance", value: "92%", icon: TrendingUp, color: "bg-emerald-500", change: "+3%" },
  { label: "Progress Score", value: "82/100", icon: Star, color: "bg-saffron-500", change: "+5" },
  { label: "Teachers", value: "2 Active", icon: Users, color: "bg-blue-500", change: "" },
  { label: "Due Payment", value: formatRupee(3200), icon: IndianRupee, color: "bg-purple-500", change: "due" },
];

const recentActivity = [
  { text: "Maths class completed • Rohan", time: "Today 5 PM", dot: "bg-emerald-500" },
  { text: "AI Weekly Report generated", time: "Yesterday", dot: "bg-saffron-500" },
  { text: "New teacher booked for Science", time: "2 days ago", dot: "bg-blue-500" },
];

export default function ParentDashboardPage() {
  const [report, setReport] = useState<AIReport | null>(null);

  useEffect(() => {
    getLatestReport().then((data) => setReport(data ?? mockReport));
  }, []);

  return (
    <PageWrapper>
      <TopBar title="Parent Dashboard" />

      {/* Child Summary Hero */}
      <section className="mt-6 relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-6 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <p className="text-sm font-bold text-white/70">Monitoring</p>
        <h2 className="mt-1 font-heading text-3xl font-extrabold">Rohan Singh</h2>
        <p className="mt-1 text-sm font-semibold text-white/70">Class 8 • Indiranagar, Bengaluru</p>

        <div className="mt-5 flex gap-4">
          <div className="rounded-xl bg-white/15 px-4 py-3 text-center">
            <p className="font-heading text-2xl font-extrabold">{report?.attendance_percentage ?? 92}%</p>
            <p className="mt-0.5 text-xs font-bold text-white/70">Attendance</p>
          </div>
          <div className="rounded-xl bg-white/15 px-4 py-3 text-center">
            <p className="font-heading text-2xl font-extrabold">{report?.overall_score ?? 82}</p>
            <p className="mt-0.5 text-xs font-bold text-white/70">Progress Score</p>
          </div>
          <div className="rounded-xl bg-white/15 px-4 py-3 text-center">
            <p className="font-heading text-2xl font-extrabold">2</p>
            <p className="mt-0.5 text-xs font-bold text-white/70">Teachers</p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="flex items-center gap-3 p-4">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${stat.color} text-white`}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading text-lg font-extrabold text-ink-800">{stat.value}</p>
                <p className="text-xs font-bold text-ink-400">{stat.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* AI Report teaser */}
      {report && (
        <Card className="mt-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-xl font-extrabold text-ink-800">AI Weekly Report</h2>
            <Link href="/parent/report" className="text-sm font-extrabold text-saffron-500">
              Full Report →
            </Link>
          </div>
          <AIReportCard report={report} />
        </Card>
      )}

      {/* Quick Actions */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link href="/parent/teachers">
          <Card className="flex items-center justify-between p-4 hover:shadow-elevated transition-shadow">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-100 text-blue-600">
                <Users className="h-5 w-5" />
              </span>
              <span className="text-sm font-extrabold text-ink-700">My Teachers</span>
            </div>
            <ChevronRight className="h-4 w-4 text-ink-300" />
          </Card>
        </Link>
        <Link href="/parent/payments">
          <Card className="flex items-center justify-between p-4 hover:shadow-elevated transition-shadow">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-purple-100 text-purple-600">
                <IndianRupee className="h-5 w-5" />
              </span>
              <span className="text-sm font-extrabold text-ink-700">Payments</span>
            </div>
            <ChevronRight className="h-4 w-4 text-ink-300" />
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <Card className="mt-5">
        <h2 className="mb-4 font-heading text-xl font-extrabold text-ink-800">Recent Activity</h2>
        <div className="grid gap-3">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${item.dot}`} />
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink-700">{item.text}</p>
                <p className="text-xs font-bold text-ink-300">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageWrapper>
  );
}
