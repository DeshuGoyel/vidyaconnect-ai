"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, ArrowRight, PlayCircle, BookOpen, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const weakAreas = [
  { topic: "Trigonometry Basics", subject: "Maths", severity: "high", reason: "Missed 3 quiz questions recently." },
  { topic: "Chemical Equations", subject: "Science", severity: "medium", reason: "Taking longer than average to solve." },
];

const recommendations = [
  { title: "Review Trig Ratios", type: "Video", duration: "12m", icon: PlayCircle },
  { title: "Practice: Balancing Equations", type: "Exercise", duration: "15m", icon: Target },
  { title: "Read: Carbon Compounds", type: "Notes", duration: "10m", icon: BookOpen },
];

export default function StudyPlanPage() {
  return (
    <PageWrapper>
      <TopBar title="AI Study Plan" />

      {/* Hero Banner */}
      <div className="mt-6 rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-800 p-5 text-white shadow-card relative overflow-hidden">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/20 backdrop-blur-md">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-extrabold text-white">Your Smart Path</h2>
            <p className="mt-1 text-sm font-semibold text-white/80 leading-relaxed">
              Based on your recent tests and homework, I&apos;ve identified 2 areas to focus on this week. Completing these will boost your overall score by an estimated 8%.
            </p>
          </div>
        </div>
      </div>

      {/* Weak Areas Analysis */}
      <section className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <h2 className="font-heading text-lg font-extrabold text-ink-800">Focus Areas</h2>
        </div>
        <div className="grid gap-3">
          {weakAreas.map((area, idx) => (
            <Card key={idx} className="flex flex-col border-l-4" style={{ borderLeftColor: area.severity === 'high' ? '#ef4444' : '#f59e0b' }}>
              <div className="flex items-start justify-between">
                <div>
                  <Badge tone={area.severity === 'high' ? 'red' : 'gold'} className="mb-2 uppercase text-[10px]">
                    {area.severity} Priority
                  </Badge>
                  <p className="font-heading text-lg font-extrabold text-ink-800">{area.topic}</p>
                  <p className="text-xs font-bold text-ink-500 mt-1">{area.subject} • {area.reason}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Recommended Action Plan */}
      <section className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-emerald-500" />
          <h2 className="font-heading text-lg font-extrabold text-ink-800">Your Action Plan</h2>
        </div>
        <div className="grid gap-3">
          {recommendations.map((rec, idx) => {
            const Icon = rec.icon;
            return (
              <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-ink-100 shadow-sm hover:border-blue-300 transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-ink-800 group-hover:text-blue-600 transition-colors">{rec.title}</p>
                    <p className="text-xs font-semibold text-ink-400 mt-0.5">{rec.type} • {rec.duration}</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-ink-300 group-hover:text-blue-600 transition-colors" />
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-6">
        <Link href="/tutors">
          <Button size="lg" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-base font-extrabold shadow-md">
            Find a Tutor for these topics
          </Button>
        </Link>
      </div>

    </PageWrapper>
  );
}
