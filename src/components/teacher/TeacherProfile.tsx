import { TeacherBadges } from "@/components/teacher/TeacherBadges";
import { TeacherProfile as TeacherProfileType } from "@/types/database";

export function TeacherProfile({ teacher }: { teacher: TeacherProfileType }) {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-saffron-500 to-navy-900 p-6 text-white shadow-ai">
      <p className="text-sm font-extrabold uppercase tracking-wide text-white/70">Teacher Profile</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold">{teacher.user?.name}</h1>
      <p className="mt-2 max-w-xl text-white/80">{teacher.bio}</p>
      <div className="mt-5">
        <TeacherBadges teacher={teacher} />
      </div>
    </section>
  );
}
