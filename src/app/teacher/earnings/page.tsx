"use client";

import { useState } from "react";
import { Loader2, Check, TrendingUp, IndianRupee, Download, Calendar } from "lucide-react";
import { EarningsChart } from "@/components/dashboard/EarningsChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";
import { formatRupee } from "@/utils/formatters";

const transactions = [
  { id: "t1", label: "Rohan Singh — May Fee", amount: 3200, date: "28 May", status: "cleared" },
  { id: "t2", label: "Priya Rao — May Fee", amount: 2800, date: "25 May", status: "cleared" },
  { id: "t3", label: "Amit Verma — May Fee", amount: 2400, date: "22 May", status: "cleared" },
  { id: "t4", label: "Group Class (5 students)", amount: 5200, date: "20 May", status: "cleared" },
  { id: "t5", label: "Kavya Patel — Apr Pending", amount: 4200, date: "15 May", status: "pending" },
];

export default function TeacherEarningsPage() {
  const [withdrawStatus, setWithdrawStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleWithdraw = () => {
    setWithdrawStatus("loading");
    setTimeout(() => {
      setWithdrawStatus("success");
      setTimeout(() => setWithdrawStatus("idle"), 4000);
    }, 1500);
  };

  const cleared = transactions.filter((t) => t.status === "cleared").reduce((s, t) => s + t.amount, 0);
  const pending = transactions.filter((t) => t.status === "pending").reduce((s, t) => s + t.amount, 0);

  return (
    <PageWrapper>
      <TopBar title="Earnings" />

      {/* Hero */}
      <section className="mt-6 relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 to-ink-800 p-6 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-saffron-500/15 blur-2xl" />
        <p className="text-sm font-bold text-white/60">Total Earnings · May 2025</p>
        <h2 className="mt-1 font-heading text-5xl font-extrabold">{formatRupee(cleared + pending)}</h2>
        <div className="mt-1 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-emerald-400" />
          <p className="text-sm font-bold text-emerald-400">+18% from last month</p>
        </div>

        <div className="mt-5 flex gap-4">
          <div className="rounded-xl bg-white/15 px-4 py-3">
            <p className="font-heading text-xl font-extrabold">{formatRupee(cleared)}</p>
            <p className="text-xs font-bold text-white/60">Cleared</p>
          </div>
          <div className="rounded-xl bg-amber-500/30 px-4 py-3">
            <p className="font-heading text-xl font-extrabold text-amber-300">{formatRupee(pending)}</p>
            <p className="text-xs font-bold text-amber-300/70">Pending</p>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Button
            onClick={handleWithdraw}
            disabled={withdrawStatus !== "idle"}
            className={`transition-all duration-300 ${
              withdrawStatus === "success"
                ? "bg-emerald-500 hover:bg-emerald-500 text-white"
                : "bg-white text-ink-900 hover:bg-white/90"
            }`}
          >
            {withdrawStatus === "idle" && <><IndianRupee className="mr-1.5 h-4 w-4" />Withdraw {formatRupee(cleared)}</>}
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
          <Button variant="secondary" className="bg-white/10 border-0 text-white hover:bg-white/20">
            <Download className="mr-1.5 h-4 w-4" /> Invoice
          </Button>
        </div>

        {withdrawStatus === "success" && (
          <p className="mt-3 text-xs font-bold text-emerald-400 animate-pulse">
            ₹{cleared.toLocaleString("en-IN")} deposited to your bank account!
          </p>
        )}
      </section>

      {/* Chart */}
      <Card className="mt-5">
        <h2 className="mb-4 font-heading text-xl font-extrabold text-ink-800">Monthly Trend</h2>
        <EarningsChart />
      </Card>

      {/* Transactions */}
      <Card className="mt-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl font-extrabold text-ink-800">Transactions</h2>
          <Badge tone="dark" className="text-xs">{transactions.length} total</Badge>
        </div>
        <div className="grid gap-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between rounded-xl border border-ink-100 p-3">
              <div className="flex items-center gap-3">
                <span className={`grid h-9 w-9 place-items-center rounded-xl text-white text-xs ${
                  tx.status === "cleared" ? "bg-emerald-500" : "bg-amber-500"
                }`}>
                  <IndianRupee className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-ink-800">{tx.label}</p>
                  <p className="text-xs font-bold text-ink-400">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-extrabold text-ink-800">{formatRupee(tx.amount)}</p>
                <Badge tone={tx.status === "cleared" ? "saffron" : "dark"} className="text-xs mt-0.5">
                  {tx.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageWrapper>
  );
}
