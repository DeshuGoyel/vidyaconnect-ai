import { AIAlertBox } from "@/components/ai/AIAlertBox";
import { ProgressBars } from "@/components/dashboard/ProgressBars";
import { Card } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function TeacherStudentDetailPage() {
  return (
    <PageWrapper>
      <h1 className="font-heading text-3xl font-extrabold text-ink-800">Rohan Singh</h1>
      <Card className="mt-5">
        <h2 className="mb-4 font-heading text-xl font-extrabold text-ink-800">Progress Breakdown</h2>
        <ProgressBars scores={{ Algebra: 78, Fractions: 48, Geometry: 71 }} />
      </Card>
      <div className="mt-5">
        <AIAlertBox level="watch" title="Recommended action" body="Use visual fraction models and short timed drills for 7 days." />
      </div>
    </PageWrapper>
  );
}
