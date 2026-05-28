"use client";

import { useState } from "react";
import Link from "next/link";
import { OTPInput } from "@/components/auth/OTPInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <p className="font-extrabold text-saffron-500">Welcome back</p>
      <h1 className="mt-2 font-heading text-4xl font-extrabold text-ink-800">Login with phone OTP</h1>
      <div className="mt-8 grid gap-4">
        <Input placeholder="9876543210" inputMode="numeric" />
        {otpSent ? <OTPInput value={otp} onChange={setOtp} /> : null}
        <Button size="lg" onClick={() => setOtpSent(true)}>{otpSent ? <Link href="/home">Verify OTP</Link> : "Send OTP"}</Button>
      </div>
    </div>
  );
}
