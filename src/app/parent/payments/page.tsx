"use client";

import { useState } from "react";
import { IndianRupee, Plus, TrendingUp, CreditCard, History, ChevronRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";
import { formatRupee } from "@/utils/formatters";

const transactions = [
  { id: "1", label: "Math Tuition — May", teacher: "Rajesh Kumar", amount: -3200, date: "28 May", status: "paid" },
  { id: "2", label: "Science Tuition — May", teacher: "Sunita Sharma", amount: -2800, date: "25 May", status: "paid" },
  { id: "3", label: "Wallet Top-up", teacher: "UPI Transfer", amount: +5000, date: "20 May", status: "credit" },
  { id: "4", label: "English Group Class", teacher: "Amit Singh", amount: -260, date: "15 May", status: "paid" },
  { id: "5", label: "Demo Class — Free", teacher: "Priya Nair", amount: 0, date: "12 May", status: "free" },
];

const topupAmounts = [500, 1000, 2000, 5000];

export default function ParentPaymentsPage() {
  const [showTopup, setShowTopup] = useState(false);
  const [selected, setSelected] = useState(1000);

  const balance = 1740;

  return (
    <PageWrapper>
      <TopBar title="Payments" />

      {/* Wallet Card */}
      <section className="mt-6 relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 to-indigo-800 p-6 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="flex items-center gap-2 text-white/70">
          <Wallet className="h-4 w-4" />
          <span className="text-sm font-bold">VidyaWallet Balance</span>
        </div>
        <h2 className="mt-2 font-heading text-5xl font-extrabold">{formatRupee(balance)}</h2>
        <p className="mt-1 text-sm font-semibold text-white/60">Auto-deducted for each class session</p>

        <div className="mt-5 flex gap-3">
          <Button
            onClick={() => setShowTopup(!showTopup)}
            className="bg-white text-ink-900 hover:bg-white/90"
          >
            <Plus className="mr-1.5 h-4 w-4" /> Add Money
          </Button>
          <Button className="bg-white/15 border-0 text-white hover:bg-white/25">
            <History className="mr-1.5 h-4 w-4" /> History
          </Button>
        </div>
      </section>

      {/* Top-up panel */}
      {showTopup && (
        <Card className="mt-4 border-2 border-saffron-200 bg-saffron-50/30">
          <h3 className="font-heading text-lg font-extrabold text-ink-800">Choose Amount</h3>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {topupAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setSelected(amt)}
                className={`rounded-xl border-2 py-3 text-sm font-extrabold transition-all ${
                  selected === amt
                    ? "border-saffron-500 bg-saffron-500 text-white"
                    : "border-ink-200 bg-white text-ink-700 hover:border-saffron-300"
                }`}
              >
                ₹{amt}
              </button>
            ))}
          </div>
          <Button className="mt-4 w-full" size="lg">
            Pay {formatRupee(selected)} via UPI
          </Button>
        </Card>
      )}

      {/* Due */}
      <Card className="mt-4 border-2 border-amber-200 bg-amber-50/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-amber-700">Next Payment Due</p>
            <p className="mt-1 font-heading text-2xl font-extrabold text-ink-800">{formatRupee(6000)}</p>
            <p className="mt-0.5 text-xs font-semibold text-ink-400">Maths + Science · June 2025</p>
          </div>
          <Button size="sm" className="bg-amber-500 text-white hover:bg-amber-600">Pay Now</Button>
        </div>
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
                <span className={`grid h-9 w-9 place-items-center rounded-xl text-white text-sm ${
                  tx.status === "credit" ? "bg-emerald-500" : tx.status === "free" ? "bg-blue-500" : "bg-ink-300"
                }`}>
                  <IndianRupee className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-ink-800">{tx.label}</p>
                  <p className="text-xs font-semibold text-ink-400">{tx.teacher} · {tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-extrabold ${tx.amount > 0 ? "text-emerald-600" : tx.amount === 0 ? "text-blue-600" : "text-ink-800"}`}>
                  {tx.amount > 0 ? "+" : ""}{tx.amount === 0 ? "FREE" : formatRupee(Math.abs(tx.amount))}
                </p>
                <Badge tone={tx.status === "credit" ? "saffron" : "dark"} className="text-xs mt-0.5">
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
