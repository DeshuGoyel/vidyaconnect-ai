"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";
import { Check, BookOpen, MapPin, IndianRupee, Clock, User, GraduationCap } from "lucide-react";

const SUBJECTS = ["Mathematics", "Science", "English", "Physics", "Chemistry", "Biology", "Hindi", "Social Studies", "Computer"];
const CLASSES = ["Class 1-5", "Class 6-8", "Class 9-10", "Class 11-12", "Competitive Exams"];
const MODES = ["Home Visit", "Online", "Student's Home", "All Modes"];

export default function TeacherProfileSetupPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const [bio, setBio] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [modes, setModes] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [radius, setRadius] = useState("2");

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => router.push("/teacher/dashboard"), 1500);
  };

  return (
    <PageWrapper>
      <TopBar title="Profile Setup" />

      <div className="mt-6 flex items-center gap-3 rounded-2xl bg-saffron-50 border border-saffron-200 px-4 py-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-saffron-500 text-white">
          <GraduationCap className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-extrabold text-ink-800">Complete your profile to start getting bookings</p>
          <p className="text-xs font-semibold text-ink-400">A complete profile gets 3x more bookings</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5">
        {/* About */}
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-saffron-500" />
            <h2 className="font-heading text-lg font-extrabold text-ink-800">About You</h2>
          </div>
          <div className="grid gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-ink-500">Your Bio</label>
              <textarea
                rows={3}
                placeholder="I am a passionate Mathematics teacher with 8+ years of experience..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm font-semibold text-ink-800 placeholder-ink-300 focus:border-saffron-500 focus:outline-none resize-none"
              />
            </div>
            <Input placeholder="Highest Qualification (e.g. B.Ed, M.Sc.)" value={qualification} onChange={(e) => setQualification(e.target.value)} />
            <Input placeholder="Years of Experience" value={experience} onChange={(e) => setExperience(e.target.value)} inputMode="numeric" />
          </div>
        </Card>

        {/* Subjects */}
        <Card>
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-saffron-500" />
            <h2 className="font-heading text-lg font-extrabold text-ink-800">Subjects You Teach</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((s) => (
              <button
                key={s}
                onClick={() => toggle(subjects, setSubjects, s)}
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

          <div className="mt-4">
            <h3 className="mb-2 text-sm font-extrabold text-ink-700">Classes You Teach</h3>
            <div className="flex flex-wrap gap-2">
              {CLASSES.map((c) => (
                <button
                  key={c}
                  onClick={() => toggle(classes, setClasses, c)}
                  className={`rounded-full border-2 px-3 py-1.5 text-xs font-extrabold transition-all ${
                    classes.includes(c)
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-ink-200 bg-white text-ink-600 hover:border-blue-300"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Pricing & Mode */}
        <Card>
          <div className="mb-3 flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-saffron-500" />
            <h2 className="font-heading text-lg font-extrabold text-ink-800">Pricing & Mode</h2>
          </div>
          <Input
            placeholder="Price per class (₹)"
            inputMode="numeric"
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
          />
          {price && (
            <p className="mt-1.5 text-xs font-bold text-emerald-600">
              ✓ AI estimates ₹{Math.round(Number(price) * 0.7)}–₹{price}/class for this area
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button
                key={m}
                onClick={() => toggle(modes, setModes, m)}
                className={`rounded-full border-2 px-3 py-1.5 text-xs font-extrabold transition-all ${
                  modes.includes(m)
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-ink-200 bg-white text-ink-600 hover:border-emerald-300"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </Card>

        {/* Radius */}
        <Card>
          <div className="mb-3 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-saffron-500" />
            <h2 className="font-heading text-lg font-extrabold text-ink-800">Service Area</h2>
          </div>
          <label className="text-sm font-bold text-ink-600">Travel radius: {radius} km</label>
          <input
            type="range"
            min={1}
            max={10}
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="mt-2 w-full accent-saffron-500"
          />
          <p className="mt-1 text-xs font-semibold text-ink-400">You&apos;ll receive booking requests within {radius} km of your location</p>
        </Card>

        <Button
          size="lg"
          onClick={handleSave}
          className="h-14 text-base font-extrabold"
          disabled={saved}
        >
          {saved ? (
            <span className="flex items-center gap-2">
              <Check className="h-5 w-5" /> Profile Saved! Redirecting...
            </span>
          ) : (
            "Save Profile & Start Getting Bookings"
          )}
        </Button>
      </div>
    </PageWrapper>
  );
}
