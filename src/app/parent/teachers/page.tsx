"use client";

import { useState, useEffect } from "react";
import { TeacherCard } from "@/components/teacher/TeacherCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";
import { getTeachers } from "@/lib/supabase/queries";
import { TeacherProfile } from "@/types/database";
import { teachers as mockTeachers } from "@/data/mock";
import { Plus, Star, MessageCircle, Calendar } from "lucide-react";

export default function ParentTeachersPage() {
  const [tutors, setTutors] = useState<TeacherProfile[]>(mockTeachers);

  useEffect(() => {
    getTeachers().then((data) => { if (data.length > 0) setTutors(data); });
  }, []);

  const activeTeachers = tutors.slice(0, 2);

  return (
    <PageWrapper>
      <TopBar title="Rohan's Teachers" />

      {/* Summary */}
      <section className="mt-6 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white shadow-xl">
        <p className="text-sm font-bold text-white/70">Currently learning from</p>
        <h2 className="mt-1 font-heading text-3xl font-extrabold">{activeTeachers.length} Teachers</h2>
        <div className="mt-3 flex gap-3">
          <div className="rounded-xl bg-white/15 px-4 py-2 text-center">
            <p className="font-heading text-xl font-extrabold">2</p>
            <p className="text-xs font-bold text-white/70">Subjects</p>
          </div>
          <div className="rounded-xl bg-white/15 px-4 py-2 text-center">
            <p className="font-heading text-xl font-extrabold">8</p>
            <p className="text-xs font-bold text-white/70">Classes/Week</p>
          </div>
          <div className="rounded-xl bg-white/15 px-4 py-2 text-center">
            <p className="font-heading text-xl font-extrabold">4.7 ★</p>
            <p className="text-xs font-bold text-white/70">Avg Rating</p>
          </div>
        </div>
      </section>

      {/* Teacher Cards */}
      <div className="mt-5 grid gap-4">
        {activeTeachers.map((teacher) => (
          <div key={teacher.id}>
            <TeacherCard teacher={teacher} />
            <div className="mt-2 flex gap-2">
              <Button size="sm" variant="secondary" className="flex-1 gap-1.5">
                <MessageCircle className="h-4 w-4" /> Message
              </Button>
              <Button size="sm" className="flex-1 gap-1.5">
                <Calendar className="h-4 w-4" /> Book Class
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add teacher CTA */}
      <Card className="mt-5 border-2 border-dashed border-ink-200 bg-ink-50/50 text-center py-8">
        <div className="grid h-12 w-12 mx-auto place-items-center rounded-2xl bg-saffron-50 text-saffron-500">
          <Plus className="h-6 w-6" />
        </div>
        <h3 className="mt-3 font-heading text-lg font-extrabold text-ink-800">Add Another Teacher</h3>
        <p className="mt-1 text-sm font-semibold text-ink-400">Browse verified tutors nearby</p>
        <Button className="mt-4">Find Teachers</Button>
      </Card>
    </PageWrapper>
  );
}
