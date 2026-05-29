"use client";

import Link from "next/link";
import { AIAlertBox } from "@/components/ai/AIAlertBox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";
import { Users, TrendingUp, BookOpen, ChevronRight, Search, AlertCircle } from "lucide-react";
import { useState } from "react";

const students = [
  {
    id: "1",
    name: "Rohan Singh",
    grade: "Class 8",
    subject: "Mathematics",
    attendance: 78,
    progress: 72,
    level: "watch" as const,
    alert: "Struggling with Trigonometry basics. 3 missed assignments.",
    lastClass: "Yesterday",
  },
  {
    id: "2",
    name: "Amit Verma",
    grade: "Class 9",
    subject: "English",
    attendance: 55,
    progress: 60,
    level: "urgent" as const,
    alert: "Missed 3 consecutive classes. Parent contact needed today.",
    lastClass: "5 days ago",
  },
  {
    id: "3",
    name: "Priya Rao",
    grade: "Class 10",
    subject: "Science",
    attendance: 98,
    progress: 91,
    level: "good" as const,
    alert: "Excellent performance! Olympiad prep recommended.",
    lastClass: "Today",
  },
];

export default function TeacherStudentsPage() {
  const [search, setSearch] = useState("");

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper>
      <TopBar title="My Students" />

      {/* Stats row */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "Total", value: students.length, color: "text-ink-800" },
          { label: "Need Attention", value: students.filter((s) => s.level !== "good").length, color: "text-red-500" },
          { label: "On Track", value: students.filter((s) => s.level === "good").length, color: "text-emerald-500" },
        ].map((stat) => (
          <Card key={stat.label} className="text-center p-3">
            <p className={`font-heading text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
            <p className="mt-1 text-xs font-bold text-ink-400">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="mt-4 flex h-12 items-center gap-3 rounded-2xl border border-ink-100 bg-white px-4 shadow-card">
        <Search className="h-4 w-4 text-ink-300" />
        <input
          className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none text-ink-800 placeholder-ink-300"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Student Cards */}
      <div className="mt-4 grid gap-4">
        {filtered.map((student) => (
          <Link key={student.id} href={`/teacher/students/${student.id}`}>
            <Card className="transition hover:shadow-elevated hover:-translate-y-0.5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-heading text-lg font-extrabold text-ink-800">{student.name}</h2>
                  <p className="mt-0.5 text-sm font-semibold text-ink-400">
                    {student.grade} • {student.subject}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    tone={student.level === "good" ? "saffron" : "dark"}
                    className={`text-xs ${student.level === "urgent" ? "bg-red-100 text-red-600" : student.level === "watch" ? "bg-amber-100 text-amber-600" : ""}`}
                  >
                    {student.level === "good" ? "✅ On Track" : student.level === "watch" ? "⚠️ Monitor" : "🚨 Urgent"}
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-ink-300" />
                </div>
              </div>

              {/* Progress bars */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-ink-500 mb-1">
                    <span>Attendance</span><span>{student.attendance}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-ink-100">
                    <div
                      className={`h-full rounded-full ${student.attendance >= 85 ? "bg-emerald-500" : student.attendance >= 65 ? "bg-amber-500" : "bg-red-500"}`}
                      style={{ width: `${student.attendance}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-ink-500 mb-1">
                    <span>Progress</span><span>{student.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-ink-100">
                    <div
                      className="h-full rounded-full bg-saffron-500"
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <AIAlertBox level={student.level} title="AI Insight" body={student.alert} />
              </div>

              <p className="mt-2 text-xs font-bold text-ink-300">Last class: {student.lastClass}</p>
            </Card>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
