"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TeacherCard } from "@/components/teacher/TeacherCard";
import { AIMatchCard } from "@/components/ai/AIMatchCard";
import { teachers as mockTeachers } from "@/data/mock";
import { timeGreeting } from "@/utils/formatters";
import { VoiceSearchButton } from "@/components/shared/VoiceSearchButton";
import { getTeachers } from "@/lib/supabase/queries";
import { TeacherProfile } from "@/types/database";

export default function StudentHomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tutors, setTutors] = useState<TeacherProfile[]>(mockTeachers);

  useEffect(() => {
    getTeachers().then(data => setTutors(data));
  }, []);

  const handleVoiceSearchResult = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <PageWrapper>
      <TopBar />
      <section className="mt-8">
        <p className="font-extrabold text-saffron-500">{timeGreeting()}, Rohan</p>
        <h1 className="mt-1 font-heading text-4xl font-extrabold text-ink-800">Find your perfect teacher today.</h1>
      </section>
      <div className="mt-6 flex h-14 items-center gap-3 rounded-2xl border border-ink-100 bg-white px-4 shadow-card">
        <Search className="h-5 w-5 text-ink-300" />
        <input 
          className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none text-ink-800 placeholder-ink-300" 
          placeholder="Subject, teacher, colony..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <VoiceSearchButton onResult={handleVoiceSearchResult} />
      </div>
      <section className="mt-6 rounded-3xl bg-gradient-to-r from-success to-emerald-500 p-5 text-white shadow-card">
        <Badge tone="dark">3 FREE Classes Remaining</Badge>
        <h2 className="mt-3 font-heading text-2xl font-extrabold">Book a free demo before paying</h2>
        <Button className="mt-4" variant="dark">
          <Link href="/ai-match">Find Best Teacher</Link>
        </Button>
      </section>
      <div className="mt-6 flex gap-2 overflow-x-auto">
        {["Math", "Science", "English", "Physics", "Chemistry", "Hindi", "SST", "Computer"].map((item) => <Badge key={item} tone="dark" className="shrink-0">{item}</Badge>)}
      </div>
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-extrabold text-ink-800">Nearby Teachers</h2>
          <Link href="/map" className="text-sm font-extrabold text-saffron-500">See All on Map</Link>
        </div>
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2">
          {tutors.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} compact />)}
        </div>
      </section>
      <section className="mt-8 grid gap-4">
        <h2 className="font-heading text-2xl font-extrabold text-ink-800">AI Recommended For You</h2>
        {tutors.slice(0, 2).map((teacher, index) => (
          <AIMatchCard
            key={teacher.id}
            teacher={teacher}
            top={index === 0}
            reason="Yeh teacher aapke ghar ke paas hain, budget fit hai, aur Class 8 Maths ka strong record hai."
          />
        ))}
      </section>
      <Card className="mt-8">
        <h2 className="font-heading text-xl font-extrabold text-ink-800">Colony Groups Near You</h2>
        <p className="mt-2 text-sm font-semibold text-ink-500">Class 8 Maths group forming in Indiranagar. 4 students joined. ₹260/head.</p>
      </Card>
    </PageWrapper>
  );
}
