import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StarRating } from "@/components/shared/StarRating";
import { TeacherBadges } from "@/components/teacher/TeacherBadges";
import { TeacherProfile } from "@/types/database";
import { formatRupee, sessionTypeLabel } from "@/utils/formatters";

export function TeacherCard({ teacher, compact = false }: { teacher: TeacherProfile; compact?: boolean }) {
  const user = teacher.user;
  const price = teacher.price_home ?? teacher.price_online ?? teacher.price_group ?? 0;
  return (
    <Card className={compact ? "w-[290px] shrink-0" : ""}>
      <div className="relative -m-4 mb-4 rounded-t-2xl bg-gradient-to-br from-saffron-500 to-navy-800 p-4 text-white">
        {teacher.ai_match_score ? (
          <Badge tone="gold" className="absolute right-3 top-3">{teacher.ai_match_score}% AI</Badge>
        ) : null}
        <div className="flex items-end gap-3 pt-8">
          <Image
            src={user?.avatar_url ?? "/images/avatar-placeholder.png"}
            alt={user?.name ?? "Teacher"}
            width={72}
            height={72}
            className="h-[72px] w-[72px] rounded-2xl border-4 border-white object-cover"
          />
          <div className="min-w-0">
            <h3 className="truncate font-heading text-xl font-extrabold">{user?.name}</h3>
            <p className="text-sm font-bold text-white/80">{teacher.tagline}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <StarRating rating={teacher.rating} />
        <span className="text-sm font-bold text-ink-400">({teacher.total_reviews})</span>
        <span className="inline-flex items-center gap-1 text-sm font-bold text-ink-400">
          <MapPin className="h-4 w-4" /> {teacher.distance_km} km
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold leading-6 text-ink-500">{teacher.subjects.join(", ")} • {teacher.experience_years}+ yrs exp</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {teacher.session_types.map((type) => <Badge key={type} tone="dark">{sessionTypeLabel(type)}</Badge>)}
      </div>
      <div className="mt-3">
        <TeacherBadges teacher={teacher} />
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="font-heading text-xl font-extrabold text-ink-800">{formatRupee(price)}<span className="text-xs text-ink-400">/class</span></p>
        <Button className="px-4">
          <Link href={`/teachers/${teacher.id}`}>Book Now</Link>
        </Button>
      </div>
    </Card>
  );
}
