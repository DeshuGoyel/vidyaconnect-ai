"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star, Video, CheckCircle2, Clock, MapPin, GraduationCap, Play, Calendar } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTeachers } from "@/lib/supabase/queries";
import { TeacherProfile } from "@/types/database";
import { teachers as mockTeachers } from "@/data/mock";

export default function TutorProfilePage() {
  const { id } = useParams();
  const [tutor, setTutor] = useState<TeacherProfile | null>(null);

  useEffect(() => {
    // For demo purposes, we will fetch all and find the one.
    // In production, we'd have a getTeacherById(id)
    getTeachers().then((data) => {
      const found = data.find(t => t.id === id) || mockTeachers.find(t => t.id === id);
      if (found) setTutor(found);
    });
  }, [id]);

  if (!tutor) {
    return (
      <PageWrapper>
        <TopBar title="Loading Profile..." />
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-saffron-500 border-t-transparent" />
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="pb-24">
      <TopBar title={tutor.full_name} showBack />

      {/* Intro Video / Hero Section */}
      <div className="relative -mx-4 -mt-2 h-64 bg-ink-900 md:mx-0 md:mt-4 md:rounded-3xl overflow-hidden shadow-elevated">
        {/* Placeholder for video player */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent z-10" />
        <img 
          src={tutor.avatar_url || "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600"} 
          alt="Video Thumbnail" 
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <button className="grid h-16 w-16 place-items-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 transition hover:bg-white/30 hover:scale-105">
            <Play className="h-6 w-6 fill-white text-white ml-1" />
          </button>
        </div>
        
        {/* Tutor info over video */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-heading text-2xl font-extrabold text-white flex items-center gap-2">
                {tutor.full_name}
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </h1>
              <p className="text-sm font-semibold text-white/80">{tutor.qualification}</p>
            </div>
            <Badge tone="saffron" className="bg-saffron-500 text-white border-0 shadow-lg px-3 py-1 text-sm">
              <Star className="mr-1 h-4 w-4 fill-white" /> {tutor.rating}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {/* Left Column: Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4 text-center border-ink-100 bg-ink-50/50">
              <Clock className="h-5 w-5 mx-auto text-ink-400 mb-2" />
              <p className="font-heading text-lg font-extrabold text-ink-900">{tutor.experience_years} Yrs</p>
              <p className="text-[10px] font-bold text-ink-400 uppercase tracking-wider">Experience</p>
            </Card>
            <Card className="p-4 text-center border-ink-100 bg-ink-50/50">
              <GraduationCap className="h-5 w-5 mx-auto text-ink-400 mb-2" />
              <p className="font-heading text-lg font-extrabold text-ink-900">{tutor.subjects.length}</p>
              <p className="text-[10px] font-bold text-ink-400 uppercase tracking-wider">Subjects</p>
            </Card>
            <Card className="p-4 text-center border-ink-100 bg-ink-50/50">
              <MapPin className="h-5 w-5 mx-auto text-ink-400 mb-2" />
              <p className="font-heading text-lg font-extrabold text-ink-900">Online</p>
              <p className="text-[10px] font-bold text-ink-400 uppercase tracking-wider">Mode</p>
            </Card>
          </div>

          {/* About */}
          <section>
            <h2 className="font-heading text-xl font-extrabold text-ink-900 mb-3">About {tutor.full_name.split(' ')[0]}</h2>
            <p className="text-sm font-semibold text-ink-600 leading-relaxed">
              {tutor.bio || "An experienced educator passionate about making complex concepts simple to understand. Specializes in interactive learning and conceptual clarity. Book a demo class to experience the teaching style!"}
            </p>
          </section>

          {/* Subjects */}
          <section>
            <h2 className="font-heading text-xl font-extrabold text-ink-900 mb-3">Subjects Taught</h2>
            <div className="flex flex-wrap gap-2">
              {tutor.subjects.map(sub => (
                <span key={sub} className="rounded-xl border border-ink-200 bg-white px-4 py-2 text-sm font-bold text-ink-700 shadow-sm">
                  {sub}
                </span>
              ))}
            </div>
          </section>
          
          {/* Reviews Preview */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading text-xl font-extrabold text-ink-900">Recent Reviews</h2>
              <span className="text-sm font-extrabold text-saffron-500">See All</span>
            </div>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-ink-100 flex items-center justify-center font-bold text-ink-500">
                  A
                </div>
                <div>
                  <p className="text-sm font-extrabold text-ink-900">Aarav M.</p>
                  <div className="flex text-saffron-500">
                    <Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" /><Star className="h-3 w-3 fill-current" />
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-ink-600">
                "Excellent teacher! Explains math concepts very clearly. I finally understand Algebra thanks to him."
              </p>
            </Card>
          </section>
        </div>

        {/* Right Column: Booking Widget (Desktop sticky, Mobile fixed bottom) */}
        <div className="md:col-span-1">
          <Card className="sticky top-24 p-5 shadow-elevated border-ink-100 border-2">
            <div className="text-center mb-5 border-b border-ink-100 pb-5">
              <p className="text-sm font-bold text-ink-500 uppercase tracking-widest mb-1">Session Rate</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-heading text-4xl font-extrabold text-ink-900">₹{tutor.hourly_rate}</span>
                <span className="text-ink-500 font-semibold">/hr</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button size="lg" className="w-full bg-saffron-500 hover:bg-saffron-600 text-white shadow-md group">
                <Video className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Book Free Demo
              </Button>
              <Button size="lg" variant="secondary" className="w-full bg-ink-50 hover:bg-ink-100 text-ink-700">
                <Calendar className="mr-2 h-5 w-5" />
                View Schedule
              </Button>
            </div>
            
            <p className="mt-4 text-center text-[11px] font-bold text-ink-400">
              You have 3 free demo classes remaining. No credit card required.
            </p>
          </Card>
        </div>
      </div>
      
      {/* Mobile Sticky Booking Bar (only visible on mobile, duplicates widget CTA) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/90 backdrop-blur-xl border-t border-ink-100 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] md:hidden">
        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
          <div>
            <p className="text-xs font-bold text-ink-400 uppercase">Rate</p>
            <p className="font-heading text-lg font-extrabold text-ink-900">₹{tutor.hourly_rate}<span className="text-xs">/hr</span></p>
          </div>
          <Button size="lg" className="flex-1 bg-saffron-500 text-white shadow-md">
            Book Free Demo
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
