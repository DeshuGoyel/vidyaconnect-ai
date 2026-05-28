"use client";

import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AIMatchForm({ onSubmit }: { onSubmit: () => void }) {
  const [budget, setBudget] = useState(3500);
  return (
    <div className="rounded-3xl bg-gradient-to-br from-ink-900 to-navy-900 p-5 text-white shadow-ai">
      <span className="inline-flex items-center gap-2 rounded-full bg-saffron-500/15 px-3 py-1 text-xs font-extrabold text-saffron-300">
        <Sparkles className="h-3.5 w-3.5" />
        AI-Powered Teacher Matching
      </span>
      <div className="mt-5 grid gap-3">
        <Input defaultValue="Mathematics" />
        <Input defaultValue="Class 8" />
        <label className="text-sm font-bold text-white/80">
          Budget: ₹{budget}
          <input className="mt-2 w-full accent-saffron-500" type="range" min={1000} max={8000} step={500} value={budget} onChange={(event) => setBudget(Number(event.target.value))} />
        </label>
        <Input defaultValue="Evening" />
        <Input defaultValue="Indiranagar, Bengaluru" />
        <Input defaultValue="Home Visit" />
      </div>
      <Button className="mt-5 w-full" size="lg" onClick={onSubmit}>
        <Search className="h-5 w-5" /> Find My Best Teacher
      </Button>
    </div>
  );
}
