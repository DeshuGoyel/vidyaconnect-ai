"use client";

import { Home, Monitor, Users } from "lucide-react";
import { SessionType } from "@/types/database";
import { cn } from "@/utils/helpers";
import { formatRupee } from "@/utils/formatters";

const options = [
  { value: "home" as const, label: "Home Visit", icon: Home },
  { value: "online" as const, label: "Online", icon: Monitor },
  { value: "group" as const, label: "Group", icon: Users }
];

export function SessionTypeSelector({
  value,
  onChange,
  prices
}: {
  value: SessionType;
  onChange: (value: SessionType) => void;
  prices: Record<SessionType, number>;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((option) => {
        const Icon = option.icon;
        const active = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-2xl border p-3 text-center transition",
              active ? "border-saffron-500 bg-saffron-500 text-white shadow-card" : "border-ink-100 bg-white text-ink-700"
            )}
          >
            <Icon className="mx-auto h-5 w-5" />
            <span className="mt-2 block text-xs font-extrabold">{option.label}</span>
            <span className="mt-1 block text-[11px] font-bold opacity-80">{formatRupee(prices[option.value])}</span>
          </button>
        );
      })}
    </div>
  );
}
