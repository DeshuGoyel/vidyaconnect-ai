"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/utils/helpers";

const steps = [
  "Aapke area mein teachers dhunde...",
  "Subject expertise check kar rahe hain...",
  "Schedule compatibility dekh rahe hain...",
  "Budget match kar rahe hain...",
  "AI score calculate ho raha hai..."
];

export function AIThinkingSteps() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => Math.min(value + 1, steps.length)), 600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="rounded-3xl bg-ink-900 p-5 text-white shadow-ai">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-saffron-500/15 px-3 py-1 text-xs font-extrabold text-saffron-300">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-saffron-400" />
        </span>
        VidyaConnect AI Thinking
      </div>
      <div className="grid gap-3">
        {steps.map((step, index) => {
          const done = index < active;
          const current = index === active;
          return (
            <div key={step} className={cn("flex items-center gap-3 rounded-2xl p-3 transition", current && "bg-white/8")}>
              {done ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Loader2 className={cn("h-5 w-5 text-saffron-400", current && "animate-spin")} />}
              <span className={cn("text-sm font-bold", done ? "text-white" : "text-white/60")}>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
