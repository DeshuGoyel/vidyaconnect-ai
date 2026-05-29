"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { OTPInput } from "@/components/auth/OTPInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/helpers";
import { createClient } from "@/lib/supabase/client";
import { GraduationCap, ArrowLeft, Phone, ShieldCheck } from "lucide-react";

const ROLES = [
  { value: "student" as const, label: "Student", emoji: "📚" },
  { value: "teacher" as const, label: "Teacher", emoji: "🎓" },
  { value: "parent" as const, label: "Parent", emoji: "👨‍👩‍👧" },
];

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState<"student" | "teacher" | "parent">("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async () => {
    setError("");
    if (!phone || phone.replace(/\D/g, "").length !== 10) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    setLoading(true);
    const fullPhone = `+91${phone.replace(/\D/g, "")}`;
    const { error: signInError } = await supabase.auth.signInWithOtp({
      phone: fullPhone,
    });
    setLoading(false);
    if (signInError) {
      // Supabase phone auth may not be enabled — allow demo bypass
      console.warn("OTP send error (demo mode):", signInError.message);
    }
    setStep("otp");
    navigator.vibrate?.(6);
  };

  const handleVerifyOTP = async () => {
    setError("");
    if (otp.length < 4) {
      setError("Enter the 4 or 6-digit OTP");
      return;
    }
    setLoading(true);
    const fullPhone = `+91${phone.replace(/\D/g, "")}`;

    const { error: verifyError } = await supabase.auth.verifyOtp({
      phone: fullPhone,
      token: otp,
      type: "sms",
    });
    setLoading(false);

    if (verifyError) {
      // Demo mode: if OTP fails, allow bypass with 0000 or 123456
      if (otp === "000000" || otp === "0000" || otp === "123456") {
        console.warn("Demo OTP bypass used");
      } else {
        setError("Invalid OTP. Try 000000 for demo access.");
        return;
      }
    }

    navigator.vibrate?.(10);
    if (role === "student") router.push("/home");
    else if (role === "teacher") router.push("/teacher/dashboard");
    else router.push("/parent/dashboard");
  };

  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col bg-white">
      {/* Gradient top bar */}
      <div className="h-2 w-full bg-gradient-to-r from-saffron-400 via-saffron-500 to-amber-400" />

      <div className="flex flex-1 flex-col px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link href="/onboarding" className="grid h-9 w-9 place-items-center rounded-full border border-ink-100 text-ink-600 hover:bg-ink-50 transition">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-saffron-500 text-white">
              <GraduationCap className="h-4 w-4" />
            </span>
            <span className="font-heading text-base font-extrabold text-ink-800">VidyaConnect AI</span>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-sm font-extrabold uppercase tracking-wider text-saffron-500">Welcome Back</p>
          <h1 className="mt-2 font-heading text-3xl font-extrabold leading-tight text-ink-800">
            {step === "phone" ? "Login with your mobile" : "Enter the OTP sent to you"}
          </h1>
          <p className="mt-2 text-sm font-semibold text-ink-400">
            {step === "phone"
              ? "We'll send a one-time password to your registered number"
              : `OTP sent to +91-${phone} • Use 000000 for demo`}
          </p>
        </div>

        {/* Role picker */}
        <div className="mt-8">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wider text-ink-400">I am a</p>
          <div className="flex gap-2">
            {ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => { setRole(r.value); navigator.vibrate?.(4); }}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 rounded-2xl border-2 py-3 text-xs font-extrabold transition-all",
                  role === r.value
                    ? "border-saffron-500 bg-saffron-50 text-saffron-700 shadow-md scale-105"
                    : "border-ink-100 bg-white text-ink-500 hover:border-ink-200"
                )}
              >
                <span className="text-xl">{r.emoji}</span>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="mt-8 grid gap-4">
          {step === "phone" ? (
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <span className="flex items-center gap-1 text-sm font-bold text-ink-500">
                  <Phone className="h-4 w-4" />
                  +91
                </span>
              </div>
              <Input
                placeholder="9876543210"
                inputMode="numeric"
                required
                pattern="[0-9]{10}"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="pl-16"
              />
            </div>
          ) : (
            <div>
              <OTPInput value={otp} onChange={setOtp} />
              <button
                type="button"
                onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
                className="mt-3 text-xs font-bold text-saffron-500 hover:underline"
              >
                ← Change number
              </button>
            </div>
          )}

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-bold text-red-600">
              {error}
            </div>
          )}

          <Button
            size="lg"
            onClick={step === "phone" ? handleSendOTP : handleVerifyOTP}
            disabled={loading || (step === "phone" ? phone.replace(/\D/g, "").length !== 10 : otp.length < 4)}
            className="h-14 text-base font-extrabold"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {step === "phone" ? "Sending OTP..." : "Verifying..."}
              </span>
            ) : step === "phone" ? (
              "Send OTP →"
            ) : (
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" /> Verify & Login
              </span>
            )}
          </Button>
        </div>

        <p className="mt-8 text-center text-sm font-semibold text-ink-400">
          Don't have an account?{" "}
          <Link href="/signup" className="font-extrabold text-saffron-500 hover:underline">
            Sign up free
          </Link>
        </p>

        <div className="mt-auto pt-10 text-center text-xs font-semibold text-ink-300">
          By continuing, you agree to our Terms of Service & Privacy Policy
        </div>
      </div>
    </div>
  );
}
