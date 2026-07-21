"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TeacherCard } from "@/components/teachers/TeacherCard";
import { TEACHERS, SUBJECTS } from "@/lib/data";

const SORT_OPTIONS = ["Best Match", "Lowest Price", "Highest Rated", "Nearest"];

export default function TeachersPage() {
  const [query, setQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("Best Match");
  const [loading, _] = useState(false);

  const filtered = TEACHERS.filter((t) => {
    const matchQuery =
      !query ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.subject.toLowerCase().includes(query.toLowerCase());
    const matchSubject = !activeSubject || t.subjectId === activeSubject;
    return matchQuery && matchSubject;
  });

  return (
    <PageWrapper className="pt-6">
      {/* Header */}
      <div className="mb-5">
        <h1 className="font-display font-bold text-2xl text-ink-900">Find a teacher</h1>
        <p className="text-sm text-ink-500 mt-1">{filtered.length} teachers available near you</p>
      </div>

      {/* Search bar */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 flex items-center gap-2 bg-white rounded-xl border border-ink-200 shadow-soft px-4 py-3 focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
          <Search size={16} className="text-ink-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or subject…"
            className="flex-1 text-sm text-ink-900 placeholder-ink-400 outline-none bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-ink-400 hover:text-ink-700">
              <X size={15} />
            </button>
          )}
        </div>
        <button className="w-12 h-12 rounded-xl bg-white border border-ink-200 shadow-soft flex items-center justify-center text-ink-500 hover:text-brand-600 hover:border-brand-300 transition-all flex-shrink-0">
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Subject chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-1">
        <button
          onClick={() => setActiveSubject(null)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            !activeSubject
              ? "bg-brand-500 text-white shadow-brand"
              : "bg-white border border-ink-200 text-ink-600 hover:border-brand-300"
          }`}
        >
          All
        </button>
        {SUBJECTS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveSubject(activeSubject === id ? null : id)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeSubject === id
                ? "bg-brand-500 text-white shadow-brand"
                : "bg-white border border-ink-200 text-ink-600 hover:border-brand-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-2">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => setSortBy(opt)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
              sortBy === opt ? "bg-ink-900 text-white" : "text-ink-500 hover:text-ink-900"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="w-16 h-16 rounded-2xl bg-ink-100 flex items-center justify-center mx-auto mb-4">
            <Search size={28} className="text-ink-400" />
          </div>
          <h3 className="font-semibold text-ink-900 mb-1">No teachers found</h3>
          <p className="text-sm text-ink-500">Try a different subject or search term</p>
        </motion.div>
      ) : (
        <div className="space-y-3 pb-4">
          {filtered.map((t, i) => (
            <TeacherCard key={t.id} {...t} index={i} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
