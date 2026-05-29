"use client";

import { useState, useEffect } from "react";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { BookingConfirmModal } from "@/components/booking/BookingConfirmModal";
import { FreeTrialBanner } from "@/components/booking/FreeTrialBanner";
import { SessionTypeSelector } from "@/components/booking/SessionTypeSelector";
import { TimeSlotGrid } from "@/components/booking/TimeSlotGrid";
import { TeacherMiniCard } from "@/components/teacher/TeacherMiniCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { teachers as mockTeachers } from "@/data/mock";
import { SessionType, TeacherProfile } from "@/types/database";
import { formatRupee } from "@/utils/formatters";
import { getTeacherById } from "@/lib/supabase/queries";

export default function BookingPage({ params }: { params: { teacherId: string } }) {
  const [teacher, setTeacher] = useState<TeacherProfile>(mockTeachers[0]);
  const [sessionType, setSessionType] = useState<SessionType>("home");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getTeacherById(params.teacherId).then((data) => {
      if (data) setTeacher(data);
    });
  }, [params.teacherId]);

  const prices = { home: teacher.price_home ?? 0, online: teacher.price_online ?? 0, group: teacher.price_group ?? 0 };

  return (
    <PageWrapper>
      <h1 className="font-heading text-3xl font-extrabold text-ink-800">Book Class</h1>
      <div className="mt-5"><TeacherMiniCard teacher={teacher} /></div>
      <div className="mt-5"><SessionTypeSelector value={sessionType} onChange={setSessionType} prices={prices} /></div>
      <div className="mt-5"><FreeTrialBanner remaining={2} /></div>
      <section className="mt-6">
        <h2 className="mb-3 font-heading text-xl font-extrabold text-ink-800">Pick Date</h2>
        <BookingCalendar value={date} onChange={setDate} />
      </section>
      <section className="mt-6">
        <h2 className="mb-3 font-heading text-xl font-extrabold text-ink-800">Pick Time</h2>
        <TimeSlotGrid value={slot} onChange={setSlot} />
      </section>
      <Card className="mt-6">
        <h2 className="font-heading text-xl font-extrabold text-ink-800">Price Summary</h2>
        <div className="mt-4 flex justify-between text-sm font-bold text-ink-500"><span>Session</span><span>FREE trial</span></div>
        <div className="mt-2 flex justify-between text-sm font-bold text-ink-500"><span>Platform fee</span><span>₹0</span></div>
        <div className="mt-4 flex justify-between font-heading text-2xl font-extrabold text-ink-800"><span>Total</span><span>{formatRupee(0)}</span></div>
      </Card>
      <Button className="mt-6 w-full" size="lg" disabled={!date || !slot} onClick={() => setOpen(true)}>Confirm Booking</Button>
      <BookingConfirmModal open={open} onClose={() => setOpen(false)} />
    </PageWrapper>
  );
}
