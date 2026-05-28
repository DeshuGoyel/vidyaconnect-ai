"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BookingConfirmModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink-900/60 p-4">
      <div className="animate-bounce-in rounded-3xl bg-white p-6 text-center shadow-elevated">
        <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
        <h2 className="mt-4 font-heading text-2xl font-extrabold text-ink-800">Class Booked!</h2>
        <p className="mt-2 text-sm font-semibold text-ink-500">Teacher ko notification gaya.</p>
        <Button className="mt-5 w-full" onClick={onClose}>Done</Button>
      </div>
    </div>
  );
}
