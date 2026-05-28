import Link from "next/link";
import { AIAlertBox } from "@/components/ai/AIAlertBox";
import { Card } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";

const students = [
  { id: "1", name: "Rohan Singh", level: "watch" as const },
  { id: "2", name: "Amit Verma", level: "urgent" as const },
  { id: "3", name: "Priya Rao", level: "good" as const }
];

export default function TeacherStudentsPage() {
  return (
    <PageWrapper>
      <h1 className="font-heading text-3xl font-extrabold text-ink-800">Students</h1>
      <div className="mt-5 grid gap-4">
        {students.map((student) => (
          <Link key={student.id} href={`/teacher/students/${student.id}`}>
            <Card>
              <h2 className="font-heading text-xl font-extrabold text-ink-800">{student.name}</h2>
              <p className="mt-1 text-sm font-semibold text-ink-500">Class 8 • Mathematics</p>
              <div className="mt-3">
                <AIAlertBox level={student.level} title="AI Alert" body="Weak topic detected with recommended action." />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
