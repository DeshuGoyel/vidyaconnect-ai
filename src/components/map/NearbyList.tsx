import { TeacherMiniCard } from "@/components/teacher/TeacherMiniCard";
import { teachers } from "@/data/mock";

export function NearbyList() {
  return (
    <div className="grid gap-3">
      <p className="font-heading text-lg font-extrabold text-ink-800">28 teachers nearby</p>
      {teachers.map((teacher) => <TeacherMiniCard key={teacher.id} teacher={teacher} />)}
    </div>
  );
}
