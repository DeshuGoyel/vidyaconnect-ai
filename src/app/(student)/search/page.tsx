"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TeacherCard } from "@/components/teacher/TeacherCard";
import { getTeachers } from "@/lib/supabase/queries";
import { TeacherProfile } from "@/types/database";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tutors, setTutors] = useState<TeacherProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeachers().then((data) => {
      setTutors(data);
      setLoading(false);
    });
  }, []);

  const filteredTutors = tutors.filter((t) => {
    const q = searchQuery.toLowerCase();
    if (!q) return true;

    const name = t.user?.name?.toLowerCase() || "";
    const locality = t.user?.locality?.toLowerCase() || "";
    const subjects = t.subjects.map((s) => s.toLowerCase());
    const classes = t.classes_taught.map((c) => c.toLowerCase());

    return (
      name.includes(q) ||
      locality.includes(q) ||
      subjects.some((s) => s.includes(q)) ||
      classes.some((c) => c.includes(q))
    );
  });

  return (
    <PageWrapper>
      <h1 className="font-heading text-3xl font-extrabold text-ink-800">Search</h1>
      <Input
        className="mt-5"
        placeholder="Subject, class, locality"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {loading ? (
          <p className="col-span-full text-center font-bold text-ink-400 mt-8">Loading teachers...</p>
        ) : filteredTutors.length === 0 ? (
          <p className="col-span-full text-center font-bold text-ink-400 mt-8">
            No teachers found matching your search.
          </p>
        ) : (
          filteredTutors.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))
        )}
      </div>
    </PageWrapper>
  );
}
