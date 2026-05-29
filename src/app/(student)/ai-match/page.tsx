"use client";

import { useState, useEffect } from "react";
import { AIMatchCard } from "@/components/ai/AIMatchCard";
import { AIMatchForm } from "@/components/ai/AIMatchForm";
import { AIThinkingSteps } from "@/components/ai/AIThinkingSteps";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { getTeachers } from "@/lib/supabase/queries";
import { TeacherProfile } from "@/types/database";

export default function AIMatchPage() {
  const [submitted, setSubmitted] = useState(false);
  const [tutors, setTutors] = useState<TeacherProfile[]>([]);

  useEffect(() => {
    getTeachers().then((data) => setTutors(data));
  }, []);

  return (
    <PageWrapper>
      <h1 className="mb-5 font-heading text-3xl font-extrabold text-ink-800">AI Teacher Matching</h1>
      {!submitted ? <AIMatchForm onSubmit={() => setSubmitted(true)} /> : <AIThinkingSteps />}
      {submitted ? (
        <section className="mt-6 grid gap-4">
          <h2 className="font-heading text-2xl font-extrabold text-ink-800">AI ne 3 best matches dhunde!</h2>
          {tutors.slice(0, 3).map((teacher, index) => (
            <AIMatchCard
              key={teacher.id}
              teacher={teacher}
              top={index === 0}
              reason="Subject, timing, rating aur location ke basis par yeh aapke liye strong fit hain."
            />
          ))}
        </section>
      ) : null}
    </PageWrapper>
  );
}
