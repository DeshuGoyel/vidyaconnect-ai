import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { TeacherProfile } from "@/components/teacher/TeacherProfile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { StarRating } from "@/components/shared/StarRating";
import { teachers } from "@/data/mock";
import { formatRupee, sessionTypeLabel } from "@/utils/formatters";

interface Props {
  params: { id: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const teacher = teachers.find((item) => item.id === params.id);
  return {
    title: teacher ? `${teacher.user?.name} — ${teacher.subjects[0]} Teacher in ${teacher.user?.city}` : "Teacher",
    description: teacher?.bio ?? "Verified VidyaConnect teacher profile"
  };
}

export default function TeacherPage({ params }: Props) {
  const teacher = teachers.find((item) => item.id === params.id);
  if (!teacher) notFound();

  return (
    <PageWrapper>
      <TeacherProfile teacher={teacher} />
      <div className="mt-5 grid grid-cols-4 gap-2">
        {[
          ["Experience", `${teacher.experience_years}y`],
          ["Students", `${teacher.total_students}`],
          ["Classes", `${teacher.total_classes}`],
          ["Reviews", `${teacher.total_reviews}`]
        ].map(([label, value]) => (
          <Card key={label} className="p-3 text-center">
            <p className="font-heading text-xl font-extrabold text-ink-800">{value}</p>
            <p className="text-xs font-bold text-ink-400">{label}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-5 bg-success/10">
        <p className="font-heading text-2xl font-extrabold text-ink-800">{teacher.free_demo_count} FREE Classes</p>
        <p className="mt-1 text-sm font-semibold text-ink-500">Try before you subscribe.</p>
      </Card>
      <Card className="mt-5">
        <h2 className="font-heading text-xl font-extrabold text-ink-800">Session Types</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {teacher.session_types.map((type) => (
            <div key={type} className="rounded-2xl bg-cream p-4">
              <p className="font-extrabold text-ink-800">{sessionTypeLabel(type)}</p>
              <p className="mt-1 text-sm font-bold text-saffron-500">
                {formatRupee(type === "home" ? teacher.price_home ?? 0 : type === "online" ? teacher.price_online ?? 0 : teacher.price_group ?? 0)}
              </p>
            </div>
          ))}
        </div>
      </Card>
      <Card className="mt-5">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-extrabold text-ink-800">Student Reviews</h2>
          <StarRating rating={teacher.rating} />
        </div>
        <p className="mt-3 text-sm font-semibold leading-6 text-ink-500">“Concepts bahut clearly samjhate hain. Weekly tests se marks improve hue.”</p>
      </Card>
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white p-4 md:static md:mt-5 md:rounded-2xl md:border">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <Button variant="secondary" className="h-12 w-12 px-0"><MessageCircle className="h-5 w-5" /></Button>
          <Button className="flex-1" size="lg"><Link href={`/booking/${teacher.id}`}>Book Now</Link></Button>
        </div>
      </div>
    </PageWrapper>
  );
}
