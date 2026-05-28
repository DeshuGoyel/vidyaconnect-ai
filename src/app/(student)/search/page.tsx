import { Input } from "@/components/ui/input";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TeacherCard } from "@/components/teacher/TeacherCard";
import { teachers } from "@/data/mock";

export default function SearchPage() {
  return (
    <PageWrapper>
      <h1 className="font-heading text-3xl font-extrabold text-ink-800">Search</h1>
      <Input className="mt-5" placeholder="Subject, class, locality" />
      <div className="mt-5 grid gap-4 md:grid-cols-2">{teachers.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} />)}</div>
    </PageWrapper>
  );
}
