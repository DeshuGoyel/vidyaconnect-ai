"use client";

import { Input } from "@/components/ui/input";

export function OTPInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <Input
      value={value}
      onChange={(event) => onChange(event.target.value.replace(/\D/g, "").slice(0, 6))}
      inputMode="numeric"
      placeholder="Enter 6 digit OTP"
      className="text-center font-mono text-2xl tracking-[0.4em]"
    />
  );
}
