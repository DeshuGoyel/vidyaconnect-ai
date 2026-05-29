"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Plus, ChevronRight, Video, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = ["3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM"];

const schedule = [
  { day: "Mon", start: "5 PM", end: "8 PM", subject: "Maths", students: 3 },
  { day: "Wed", start: "4 PM", end: "7 PM", subject: "Science", students: 2 },
  { day: "Fri", start: "5 PM", end: "9 PM", subject: "Maths + English", students: 5 },
  { day: "Sat", start: "10 AM", end: "1 PM", subject: "Group Class", students: 8 },
];

const upcoming = [
  { time: "Today 5:00 PM", label: "Rohan Singh — Class 8 Maths", mode: "home", mins: 35 },
  { time: "Today 7:00 PM", label: "Priya Rao — Class 10 Science", mode: "online", mins: 155 },
  { time: "Wed 4:00 PM", label: "Amit Verma — Class 9 English", mode: "home", mins: null },
];

export default function TeacherSchedulePage() {
  const [view, setView] = useState<"upcoming" | "weekly">("upcoming");

  return (
    <PageWrapper>
      <TopBar title="My Schedule" />

      {/* Toggle */}
      <div className="mt-6 flex gap-1.5 rounded-2xl bg-ink-100 p-1">
        {(["upcoming", "weekly"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`flex-1 rounded-xl py-2.5 text-sm font-extrabold capitalize transition-all ${
              view === v ? "bg-white text-saffron-500 shadow-sm" : "text-ink-400"
            }`}
          >
            {v === "upcoming" ? "Upcoming" : "Weekly View"}
          </button>
        ))}
      </div>

      {view === "upcoming" && (
        <div className="mt-5 grid gap-3">
          {upcoming.map((cls) => (
            <Card key={cls.label} className="flex items-start gap-4">
              <div className="mt-0.5 flex flex-col items-center gap-1">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-saffron-500 text-white">
                  <Clock className="h-5 w-5" />
                </span>
                {cls.mins && (
                  <span className="text-[10px] font-bold text-saffron-500">in {cls.mins}m</span>
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs font-extrabold uppercase tracking-wider text-ink-400">{cls.time}</p>
                <p className="mt-1 font-heading text-base font-extrabold text-ink-800">{cls.label}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge tone={cls.mode === "online" ? "saffron" : "dark"} className="text-xs">
                    {cls.mode === "online" ? "🎥 Online" : "🏠 Home Visit"}
                  </Badge>
                </div>
              </div>
              {cls.mins && (
                <Link href={`/teacher/live-class/1`}>
                  <Button size="sm" className="shrink-0">
                    <Video className="mr-1.5 h-4 w-4" /> Join
                  </Button>
                </Link>
              )}
            </Card>
          ))}
        </div>
      )}

      {view === "weekly" && (
        <div className="mt-5">
          <div className="grid gap-3">
            {schedule.map((slot) => (
              <Card key={`${slot.day}-${slot.start}`} className="flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-saffron-500 text-center text-white">
                  <span className="text-xs font-extrabold">{slot.day}</span>
                </div>
                <div className="flex-1">
                  <p className="font-heading text-base font-extrabold text-ink-800">{slot.subject}</p>
                  <p className="mt-0.5 text-sm font-semibold text-ink-400">
                    {slot.start} – {slot.end} • {slot.students} students
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-ink-300" />
              </Card>
            ))}
          </div>
        </div>
      )}

      <Button className="mt-6 w-full" variant="secondary">
        <Plus className="mr-2 h-4 w-4" /> Add Slot
      </Button>
    </PageWrapper>
  );
}
