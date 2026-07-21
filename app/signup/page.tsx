"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, ArrowRight, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { QUIZ_QUESTIONS } from "@/lib/data";
import { useRouter } from "next/navigation";

type Step = "form" | "quiz" | "matching" | "result";

interface MatchResult {
  topMatch: { teacherId: string; score: number; reason: string };
  insights: string[];
  mock?: boolean;
}

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("quiz");
  };

  const handleAnswer = async (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // All answered — call AI match
      setStep("matching");
      try {
        const res = await fetch("/api/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: newAnswers }),
        });
        const data = await res.json();
        setMatchResult(data);
        setStep("result");
      } catch {
        setStep("result");
        setMatchResult({
          topMatch: { teacherId: "t1", score: 97, reason: "Based on your preferences, Priya Sharma is a perfect match for your JEE Maths goals." },
          insights: ["Evening sessions preferred", "Visual learner — great for our top teachers", "Concept gaps identified: focus on foundations"],
          mock: true,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col max-w-md mx-auto">
      {/* Logo */}
      <div className="px-6 pt-12 pb-6 flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-brand">
          <GraduationCap size={18} className="text-white" />
        </div>
        <span className="font-display font-bold text-ink-900 text-lg">VidyaConnect AI</span>
      </div>

      <AnimatePresence mode="wait">
        {/* ── Step 1: Form ── */}
        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            className="flex-1 px-6 pb-8"
          >
            <h1 className="font-display font-bold text-3xl text-ink-900 mb-2">Create account</h1>
            <p className="text-ink-500 text-sm mb-8">Join 50,000+ students learning smarter</p>
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-2">Full name</label>
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Aryan Kumar" required
                  className="w-full border border-ink-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder-ink-400 bg-white transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-2">Email address</label>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" required
                  className="w-full border border-ink-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder-ink-400 bg-white transition-all outline-none"
                />
              </div>
              <Button type="submit" fullWidth size="lg">
                Continue to AI matching
                <Sparkles size={16} />
              </Button>
            </form>
          </motion.div>
        )}

        {/* ── Step 2: Quiz ── */}
        {step === "quiz" && (
          <motion.div
            key={`quiz-${quizStep}`}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.25 }}
            className="flex-1 px-6 pb-8"
          >
            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {QUIZ_QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    i < quizStep ? "bg-brand-500" : i === quizStep ? "bg-brand-300" : "bg-ink-200"
                  }`}
                />
              ))}
            </div>

            <div className="mb-2 text-xs font-medium text-brand-600">
              Question {quizStep + 1} of {QUIZ_QUESTIONS.length}
            </div>
            <h2 className="font-display font-bold text-2xl text-ink-900 mb-8 leading-snug">
              {QUIZ_QUESTIONS[quizStep].question}
            </h2>

            <div className="space-y-3">
              {QUIZ_QUESTIONS[quizStep].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="w-full text-left p-4 bg-white rounded-2xl border border-ink-200 text-sm font-medium text-ink-800 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 transition-all duration-200 active:scale-[0.98]"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Step 3: Matching ── */}
        {step === "matching" && (
          <motion.div
            key="matching"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center px-6 pb-16 text-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-brand-50 flex items-center justify-center mb-6">
              <Loader2 size={36} className="text-brand-500 animate-spin" />
            </div>
            <h2 className="font-display font-bold text-2xl text-ink-900 mb-2">Finding your match</h2>
            <p className="text-ink-500 text-sm">
              GPT-5.6 is analysing your learning profile and matching you with the best teacher…
            </p>
          </motion.div>
        )}

        {/* ── Step 4: Result ── */}
        {step === "result" && matchResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 px-6 pb-8"
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle2 size={36} className="text-success" />
              </motion.div>
              <h2 className="font-display font-bold text-2xl text-ink-900">Your AI match is ready!</h2>
              <p className="text-ink-500 text-sm mt-1">Based on your learning profile</p>
            </div>

            {/* Match card */}
            <div className="bg-white rounded-2xl border border-brand-200 shadow-brand p-5 mb-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-brand-50 text-brand-700 rounded-xl px-3 py-1 text-xs font-bold">
                  {matchResult.topMatch.score}% Match
                </div>
                <Sparkles size={14} className="text-brand-500" />
              </div>
              <p className="text-sm text-ink-700 leading-relaxed">{matchResult.topMatch.reason}</p>
            </div>

            {/* Insights */}
            <div className="space-y-2 mb-8">
              {matchResult.insights.map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex gap-2.5 items-start"
                >
                  <CheckCircle2 size={15} className="text-brand-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-ink-600">{insight}</span>
                </motion.div>
              ))}
            </div>

            <Button fullWidth size="lg" onClick={() => router.push("/home")}>
              View my matched teacher
              <ArrowRight size={18} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
