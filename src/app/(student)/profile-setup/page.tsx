"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";
import { Check, BookOpen, GraduationCap, Target } from "lucide-react";

const CLASSES = ["Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "JEE/NEET"];
const SUBJECTS = ["Mathematics", "Science", "English", "Physics", "Chemistry", "Biology", "Social Studies", "Hindi", "Computer Science"];

export default function StudentProfileSetupPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);

  const toggleSubject = (sub: string) => {
    setSubjects(subjects.includes(sub) ? subjects.filter((s) => s !== sub) : [...subjects, sub]);
  };

  const handleSave = () => {
    setSaved(true);
    // In production, save to Supabase here
    setTimeout(() => router.push("/home"), 1500);
  };

  const isFormComplete = selectedClass !== "" && subjects.length > 0;

  return (
    <PageWrapper>
      <TopBar title="Setup Your Profile" />

      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-blue-50 border border-blue-200 px-4 py-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500 text-white">
          <Target className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-extrabold text-ink-800">Tell us what you want to learn</p>
          <p className="text-xs font-semibold text-ink-400">We'll show you the best teachers nearby</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5">
        {/* Class Selection */}
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-500" />
            <h2 className="font-heading text-lg font-extrabold text-ink-800">Select Your Class</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CLASSES.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedClass(c)}
                className={`rounded-full border-2 px-4 py-2 text-sm font-extrabold transition-all ${
                  selectedClass === c
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-ink-200 bg-white text-ink-600 hover:border-blue-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Card>

        {/* Subjects Selection */}
        <Card>
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-saffron-500" />
            <h2 className="font-heading text-lg font-extrabold text-ink-800">Select Subjects</h2>
          </div>
          <p className="mb-4 text-xs font-semibold text-ink-400">Choose all the subjects you need help with.</p>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                onClick={() => toggleSubject(s)}
                className={`rounded-full border-2 px-3 py-1.5 text-xs font-extrabold transition-all ${
                  subjects.includes(s)
                    ? "border-saffron-500 bg-saffron-500 text-white"
                    : "border-ink-200 bg-white text-ink-600 hover:border-saffron-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Card>

        <Button
          size="lg"
          onClick={handleSave}
          className="h-14 text-base font-extrabold bg-blue-600 hover:bg-blue-700 mt-4"
          disabled={saved || !isFormComplete}
        >
          {saved ? (
            <span className="flex items-center gap-2">
              <Check className="h-5 w-5" /> Profile Saved! Redirecting...
            </span>
          ) : (
            "Complete Setup"
          )}
        </Button>
      </div>
    </PageWrapper>
  );
}
