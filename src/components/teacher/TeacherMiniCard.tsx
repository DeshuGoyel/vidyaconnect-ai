import Image from "next/image";
import { StarRating } from "@/components/shared/StarRating";
import { TeacherProfile } from "@/types/database";

export function TeacherMiniCard({ teacher }: { teacher: TeacherProfile }) {
  const user = teacher.user;
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-3">
      <Image
        src={user?.avatar_url ?? "/images/avatar-placeholder.png"}
        alt={user?.name ?? "Teacher"}
        width={48}
        height={48}
        className="h-12 w-12 rounded-full object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-heading font-extrabold text-ink-800">{user?.name}</p>
        <p className="text-sm font-semibold text-ink-400">{teacher.subjects[0]} • {teacher.distance_km} km</p>
      </div>
      <StarRating rating={teacher.rating} />
    </div>
  );
}
