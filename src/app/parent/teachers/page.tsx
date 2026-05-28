import { TeacherCard } from "@/components/teacher/TeacherCard";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { teachers } from "@/data/mock";

export default function ParentTeachersPage() {
  return (
    <PageWrapper>
      <h1 className="font-heading text-3xl font-extrabold text-ink-800">Child’s Teachers</h1>
      <div className="mt-5 grid gap-4 md:grid-cols-2">{teachers.slice(0, 2).map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} />)}</div>
      <Button className="mt-5">Add New Teacher</Button>
    </PageWrapper>
  );
}
