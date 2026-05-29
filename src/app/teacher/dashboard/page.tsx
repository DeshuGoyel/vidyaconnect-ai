"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Check, TrendingUp, Users, Calendar, Star, IndianRupee, Bell, ChevronRight } from "lucide-react";
import { AIAlertBox } from "@/components/ai/AIAlertBox";
import { EarningsChart } from "@/components/dashboard/EarningsChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";
import { Badge } from "@/components/ui/badge";
import { formatRupee } from "@/utils/formatters";

const stats = [
  { label: "This Month", value: formatRupee(28600), icon: IndianRupee, color: "bg-saffron-500" },
  { label: "Active Students", value: "12", icon: Users, color: "bg-blue-500" },
  { label: "Classes Today", value: "3", icon: Calendar, color: "bg-emerald-500" },
  { label: "Avg Rating", value: "4.8 ★", icon: Star, color: "bg-purple-500" },
];

const upcomingClasses = [
  { time: "5:00 PM", student: "Rohan Singh", subject: "Class 8 Maths", status: "confirmed" },
  { time: "7:00 PM", student: "Priya Rao", subject: "Class 10 Science", status: "confirmed" },
  { time: "8:30 PM", student: "Amit Verma", subject: "Class 9 English", status: "pending" },
];

export default function TeacherDashboardPage() {
  const [withdrawStatus, setWithdrawStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleWithdraw = () => {
    setWithdrawStatus("loading");
    setTimeout(() => {
      setWithdrawStatus("success");
      setTimeout(() => setWithdrawStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <PageWrapper>
      <TopBar title="Teacher Dashboard" />

      {/* Earnings Hero */}
      <section className="mt-6 relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 p-6 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-saffron-500/10 blur-2xl" />
        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-blue-500/10 blur-xl" />
        <p className="text-sm font-bold text-white/60">Total Earnings · May 2025</p>
        <h2 className="mt-2 font-heading text-5xl font-extrabold">{formatRupee(28600)}</h2>
        <div className="mt-2 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          <p className="text-sm font-bold text-emerald-400">+18% from last month</p>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <Button
            onClick={handleWithdraw}
            disabled={withdrawStatus !== "idle"}
            className={`w-fit min-w-[130px] transition-all duration-300 ${
              withdrawStatus === "success" ? "bg-emerald-500 hover:bg-emerald-500 text-white" : "bg-white text-ink-900 hover:bg-white/90"
            }`}
          >
            {withdrawStatus === "idle" && <><IndianRupee className="mr-1.5 h-4 w-4" /> Withdraw</>}
            {withdrawStatus === "loading" && (
              <span className="flex items-center gap-1.5">
                <Loader2 className="h-4 w-4 animate-spin" /> Processing...
              </span>
            )}
            {withdrawStatus === "success" && (
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4" /> Transferred! 🎉
              </span>
            )}
          </Button>

          {withdrawStatus === "success" && (
            <p className="text-xs font-bold text-emerald-400 animate-pulse">
              ₹28,600 deposited to your bank account
            </p>
          )}
        </div>
      </section>

      {/* Stats Grid */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="flex items-center gap-3 p-4">
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${stat.color} text-white`}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading text-xl font-extrabold text-ink-800">{stat.value}</p>
                <p className="text-xs font-bold text-ink-400">{stat.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Today's Schedule */}
      <Card className="mt-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl font-extrabold text-ink-800">Today&apos;s Classes</h2>
          <Link href="/teacher/schedule" className="text-sm font-extrabold text-saffron-500">
            View Schedule →
          </Link>
        </div>
        <div className="grid gap-3">
          {upcomingClasses.map((cls) => (
            <div key={cls.time} className="flex items-center justify-between rounded-xl border border-ink-100 bg-ink-50/50 p-3">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <p className="text-xs font-extrabold text-saffron-500">{cls.time}</p>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-ink-800">{cls.student}</p>
                  <p className="text-xs font-semibold text-ink-400">{cls.subject}</p>
                </div>
              </div>
              <Badge tone={cls.status === "confirmed" ? "saffron" : "dark"} className="text-xs">
                {cls.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Alerts */}
      <section className="mt-5 grid gap-3">
        <h2 className="font-heading text-xl font-extrabold text-ink-800">AI Student Alerts</h2>
        <AIAlertBox level="urgent" title="Amit missed 3 classes" body="Call parent today and offer a catch-up slot." />
        <AIAlertBox level="watch" title="Rohan struggling in Trigonometry" body="Visual examples and practice worksheets recommended." />
        <AIAlertBox level="good" title="Priya is top performer 🎉" body="Send praise note to parent and suggest Olympiad prep." />
      </section>

      {/* Earnings Chart */}
      <Card className="mt-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl font-extrabold text-ink-800">Earnings Trend</h2>
          <Link href="/teacher/earnings" className="text-sm font-extrabold text-saffron-500">
            Full Report →
          </Link>
        </div>
        <EarningsChart />
      </Card>
    </PageWrapper>
  );
}
