import { Card } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function TeacherSchedulePage() {
  return (
    <PageWrapper>
      <h1 className="font-heading text-3xl font-extrabold text-ink-800">Weekly Schedule</h1>
      <div className="mt-5 grid gap-3">
        {["Monday 5-8 PM", "Wednesday 4-7 PM", "Friday 5-9 PM"].map((slot) => (
          <Card key={slot}>
            <p className="font-heading text-xl font-extrabold text-ink-800">{slot}</p>
            <p className="mt-1 text-sm font-semibold text-ink-500">AI suggested optimal slot.</p>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}
