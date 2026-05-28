"use client";

import { addDays, format } from "date-fns";
import { cn } from "@/utils/helpers";

const availableDates = new Set(["2026-05-26", "2026-05-27", "2026-05-29", "2026-05-30", "2026-06-01"]);

export function BookingCalendar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const dates = Array.from({ length: 14 }, (_, index) => format(addDays(new Date("2026-05-25"), index + 1), "yyyy-MM-dd"));
  return (
    <div className="-mx-4 overflow-x-auto px-4">
      <div className="flex gap-2">
        {dates.map((date) => {
          const available = availableDates.has(date);
          const selected = value === date;
          return (
            <button
              key={date}
              disabled={!available}
              onClick={() => onChange(date)}
              className={cn(
                "h-20 w-16 shrink-0 rounded-2xl border text-center transition",
                available && !selected && "border-ink-100 bg-white text-ink-700",
                !available && "border-ink-100 bg-ink-100 text-ink-300 line-through",
                selected && "border-saffron-500 bg-saffron-500 text-white shadow-card"
              )}
            >
              <span className="block text-xs font-bold">{format(new Date(date), "EEE")}</span>
              <span className="mt-1 block font-heading text-2xl font-extrabold">{format(new Date(date), "d")}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
