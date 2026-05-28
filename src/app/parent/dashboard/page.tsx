import { AIReportCard } from "@/components/ai/AIReportCard";
import { Card } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { latestReport } from "@/data/mock";

export default function ParentDashboardPage() {
  return (
    <PageWrapper>
      <h1 className="font-heading text-3xl font-extrabold text-ink-800">Parent Dashboard</h1>
      <Card className="mt-5">
        <p className="font-heading text-xl font-extrabold text-ink-800">Rohan Singh</p>
        <p className="mt-2 text-sm font-semibold text-ink-500">Attendance 92% • Progress Score 82 • Active Teachers 2</p>
      </Card>
      <div className="mt-5"><AIReportCard report={latestReport} /></div>
    </PageWrapper>
  );
}
