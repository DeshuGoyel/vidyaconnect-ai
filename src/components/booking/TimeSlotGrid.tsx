"use client";

import { cn } from "@/utils/helpers";

const slots = [
  { label: "07:00 AM", booked: false },
  { label: "08:00 AM", booked: true },
  { label: "04:00 PM", booked: false },
  { label: "05:00 PM", booked: false },
  { label: "06:00 PM", booked: true },
  { label: "07:00 PM", booked: false }
];

export function TimeSlotGrid({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((slot) => {
        const selected = value === slot.label;
        return (
          <button
            key={slot.label}
            disabled={slot.booked}
            onClick={() => onChange(slot.label)}
            className={cn(
              "h-12 rounded-xl border text-sm font-extrabold transition",
              slot.booked && "border-danger/20 bg-danger/10 text-danger line-through",
              !slot.booked && !selected && "border-ink-100 bg-white text-ink-700 hover:border-saffron-500",
              selected && "border-saffron-500 bg-saffron-500 text-white"
            )}
          >
            {slot.label}
          </button>
        );
      })}
    </div>
  );
}
