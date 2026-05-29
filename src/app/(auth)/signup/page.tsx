"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, GraduationCap, Users, ArrowLeft, ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OTPInput } from "@/components/auth/OTPInput";
import { cn } from "@/utils/helpers";
import { createClient } from "@/lib/supabase/client";

const roles = [
  {
    value: "student" as const,
    title: "Student",
    body: "Find nearby teachers, book free demo classes, and track your progress.",
    icon: BookOpen,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    value: "teacher" as const,
    title: "Teacher",
    body: "Build your profile, manage students, and grow your tuition income.",
    icon: GraduationCap,
    color: "bg-saffron-500",
    lightColor: "bg-saffron-50",
    textColor: "text-saffron-600",
  },
  {
    value: "parent" as const,
    title: "Parent",
    body: "Monitor your child's progress, view AI reports, and manage payments.",
    icon: Users,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
];

type RoleType = (typeof roles)[number]["value"];
type Step = "role" | "details" | "otp";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<RoleType>("student");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async () => {
    setError("");
    if (!name.trim()) { setError("Please enter your full name"); return; }
    if (phone.replace(/\D/g, "").length !== 10) { setError("Enter a valid 10-digit mobile number"); return; }
    setLoading(true);
    const fullPhone = `+91${phone.replace(/\D/g, "")}`;
    const { error: signInError } = await supabase.auth.signInWithOtp({ phone: fullPhone });
    setLoading(false);
    if (signInError) {
      console.warn("OTP error (demo mode):", signInError.message);
    }
    setStep("otp");
    navigator.vibrate?.(6);
  };

  const handleVerifyOTP = async () => {
    setError("");
    if (otp.length < 4) { setError("Enter the 4 or 6-digit OTP"); return; }
    setLoading(true);
    const fullPhone = `+91${phone.replace(/\D/g, "")}`;
    const { error: verifyError } = await supabase.auth.verifyOtp({
      phone: fullPhone,
      token: otp,
      type: "sms",
    });
    setLoading(false);

    if (verifyError) {
      if (otp === "000000" || otp === "0000" || otp === "123456") {
        console.warn("Demo OTP bypass");
      } else {
        setError("Invalid OTP. Use 000000 for demo access.");
        return;
      }
    }

    navigator.vibrate?.(10);
    if (role === "student") router.push("/home");
    else if (role === "teacher") router.push("/teacher/dashboard");
    else router.push("/parent/dashboard");
  };

  return (
    <div className="relative mx-auto min-h-screen max-w-md bg-white">
      {/* Gradient top bar */}
      <div className="h-2 w-full bg-gradient-to-r from-saffron-400 via-saffron-500 to-amber-400" />

      <div className="flex flex-col px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          {step !== "role" ? (
            <button
              onClick={() => { setStep(step === "otp" ? "details" : "role"); setError(""); }}
              className="grid h-9 w-9 place-items-center rounded-full border border-ink-100 text-ink-600 hover:bg-ink-50 transition"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          ) : (
            <Link href="/onboarding" className="grid h-9 w-9 place-items-center rounded-full border border-ink-100 text-ink-600 hover:bg-ink-50 transition">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          )}
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-saffron-500 text-white">
              <GraduationCap className="h-4 w-4" />
            </span>
            <span className="font-heading text-base font-extrabold text-ink-800">VidyaConnect AI</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 flex gap-1.5">
          {(["role", "details", "otp"] as Step[]).map((s, i) => (
            <div
              key={s}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all",
                step === s ? "bg-saffron-500" :
                  (step === "details" && i === 0) || (step === "otp" && i < 2) ? "bg-saffron-300" : "bg-ink-100"
              )}
            />
          ))}
        </div>

        {/* Step: Role Selection */}
        {step === "role" && (
          <>
            <div className="mt-8">
              <p className="text-sm font-extrabold uppercase tracking-wider text-saffron-500">Step 1 of 3</p>
              <h1 className="mt-2 font-heading text-3xl font-extrabold leading-tight text-ink-800">
                Who are you?
              </h1>
              <p className="mt-2 text-sm font-semibold text-ink-400">
                Choose your role to get a personalized experience
              </p>
            </div>

            <div className="mt-8 grid gap-3">
              {roles.map((item) => {
                const Icon = item.icon;
                const isSelected = role === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => { setRole(item.value); navigator.vibrate?.(4); }}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all",
                      isSelected
                        ? "border-saffron-500 bg-saffron-50/30 shadow-lg scale-[1.01]"
                        : "border-ink-100 bg-white hover:border-ink-200 hover:shadow-sm"
                    )}
                  >
                    <span className={cn(
                      "grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition",
                      isSelected ? `${item.color} text-white` : `${item.lightColor} ${item.textColor}`
                    )}>
                      <Icon className="h-7 w-7" />
                    </span>
                    <div>
                      <p className="font-heading text-lg font-extrabold text-ink-800">{item.title}</p>
                      <p className="mt-0.5 text-sm font-semibold leading-5 text-ink-400">{item.body}</p>
                    </div>
                    {isSelected && (
                      <span className="ml-auto shrink-0 text-saffron-500">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <Button
              size="lg"
              className="mt-8 h-14 text-base font-extrabold"
              onClick={() => { setStep("details"); navigator.vibrate?.(6); }}
            >
              Continue as {roles.find((r) => r.value === role)?.title} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </>
        )}

        {/* Step: Details */}
        {step === "details" && (
          <>
            <div className="mt-8">
              <p className="text-sm font-extrabold uppercase tracking-wider text-saffron-500">Step 2 of 3</p>
              <h1 className="mt-2 font-heading text-3xl font-extrabold leading-tight text-ink-800">
                Your details
              </h1>
              <p className="mt-2 text-sm font-semibold text-ink-400">
                We&apos;ll use this to personalise your experience
              </p>
            </div>

            <div className="mt-8 grid gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-ink-600">Full Name</label>
                <Input
                  placeholder="Rohan Kumar"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-ink-600">Mobile Number</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                    <span className="flex items-center gap-1 text-sm font-bold text-ink-500">
                      <Phone className="h-4 w-4" /> +91
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
                    className="h-12 pl-16"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-ink-600">Locality</label>
                <Input placeholder="Indiranagar, Bengaluru" defaultValue="Indiranagar" className="h-12" />
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-bold text-red-600">
                  {error}
                </div>
              )}

              <Button
                size="lg"
                className="h-14 text-base font-extrabold"
                onClick={handleSendOTP}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending OTP...
                  </span>
                ) : (
                  <>Send OTP <ArrowRight className="ml-2 h-5 w-5" /></>
                )}
              </Button>
            </div>
          </>
        )}

        {/* Step: OTP */}
        {step === "otp" && (
          <>
            <div className="mt-8">
              <p className="text-sm font-extrabold uppercase tracking-wider text-saffron-500">Step 3 of 3</p>
              <h1 className="mt-2 font-heading text-3xl font-extrabold leading-tight text-ink-800">
                Verify your number
              </h1>
              <p className="mt-2 text-sm font-semibold text-ink-400">
                Enter the OTP sent to +91-{phone} • Use <strong>000000</strong> for demo
              </p>
            </div>

            <div className="mt-8 grid gap-4">
              <OTPInput value={otp} onChange={setOtp} />

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-bold text-red-600">
                  {error}
                </div>
              )}

              <Button
                size="lg"
                className="h-14 text-base font-extrabold"
                onClick={handleVerifyOTP}
                disabled={loading || otp.length < 4}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" /> Create Account
                  </span>
                )}
              </Button>

              <button
                type="button"
                onClick={handleSendOTP}
                className="text-center text-sm font-bold text-saffron-500 hover:underline"
              >
                Didn&apos;t receive OTP? Resend
              </button>
            </div>
          </>
        )}

        <p className="mt-8 text-center text-sm font-semibold text-ink-400">
          Already have an account?{" "}
          <Link href="/login" className="font-extrabold text-saffron-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
