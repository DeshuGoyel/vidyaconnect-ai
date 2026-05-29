"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, Star, MapPin, Video, CheckCircle2 } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTeachers } from "@/lib/supabase/queries";
import { TeacherProfile } from "@/types/database";
import { teachers as mockTeachers } from "@/data/mock";

const categories = ["All", "Maths", "Science", "English", "Physics", "Chemistry"];

export default function TutorsPage() {
  const [tutors, setTutors] = useState<TeacherProfile[]>(mockTeachers);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    getTeachers().then((data) => {
      if (data.length > 0) setTutors(data);
    });
  }, []);

  const filteredTutors = activeCategory === "All" 
    ? tutors 
    : tutors.filter(t => t.subjects.includes(activeCategory));

  return (
    <PageWrapper>
      <TopBar title="Find Tutors" />

      {/* Free Trial Banner */}
      <div className="mt-6 mb-4 rounded-2xl bg-gradient-to-r from-saffron-500 to-orange-500 p-4 text-white shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-extrabold">3 Free Demos Remaining</h3>
            <p className="text-xs font-semibold text-white/80 mt-1">Book a free trial with any tutor below.</p>
          </div>
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur-md">
            <span className="font-heading text-xl font-extrabold text-white">3</span>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="sticky top-[72px] z-20 bg-ink-50/80 backdrop-blur-xl pb-4 pt-2 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input 
              type="text" 
              placeholder="Search subjects or teachers..." 
              className="h-11 w-full rounded-xl border border-ink-200 bg-white pl-9 pr-4 text-sm font-semibold outline-none focus:border-saffron-500 focus:ring-2 focus:ring-saffron-500/20"
            />
          </div>
          <Button variant="secondary" className="w-11 px-0 shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Categories Scroll */}
        <div className="mt-3 flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-extrabold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-ink-900 text-white shadow-md"
                  : "bg-white text-ink-600 border border-ink-200 hover:border-ink-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tutors Feed */}
      <div className="mt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTutors.map((tutor) => (
          <Link key={tutor.id} href={`/tutors/${tutor.id}`}>
            <Card className="overflow-hidden hover:shadow-elevated transition-shadow duration-300 group">
              <div className="relative h-40 bg-ink-100 w-full overflow-hidden">
                {/* Fallback image if no avatar, or video thumbnail placeholder */}
                {tutor.user?.avatar_url ? (
                  <img src={tutor.user?.avatar_url} alt={tutor.user?.name || "Teacher"} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-saffron-200 to-orange-100 flex items-center justify-center">
                    <Video className="h-10 w-10 text-saffron-400/50" />
                  </div>
                )}
                <div className="absolute top-2 left-2 flex gap-1">
                  <Badge tone="saffron" className="shadow-sm backdrop-blur-md bg-saffron-500/90 text-white border-0">
                    <Star className="mr-1 h-3 w-3 fill-white" /> {tutor.rating}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-extrabold text-ink-900 flex items-center gap-1">
                      {tutor.user?.name || "Teacher"}
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    </h3>
                    <p className="text-xs font-bold text-ink-500 line-clamp-1">{tutor.experience_years} years exp • {tutor.qualification}</p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {tutor.subjects.slice(0,3).map(sub => (
                    <span key={sub} className="rounded-md bg-ink-50 px-2 py-1 text-[10px] font-extrabold text-ink-600 border border-ink-100">
                      {sub}
                    </span>
                  ))}
                  {tutor.subjects.length > 3 && (
                    <span className="rounded-md bg-ink-50 px-2 py-1 text-[10px] font-extrabold text-ink-600 border border-ink-100">
                      +{tutor.subjects.length - 3}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3">
                  <div className="text-sm">
                    <span className="font-extrabold text-ink-900">₹{tutor.price_home || tutor.price_online}</span>
                    <span className="text-ink-400 font-semibold text-xs">/hr</span>
                  </div>
                  <Button size="sm" className="bg-saffron-500 hover:bg-saffron-600 text-white rounded-xl">
                    Book Demo
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
