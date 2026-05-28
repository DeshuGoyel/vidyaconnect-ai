import { AttendanceHeatmap } from "@/components/dashboard/AttendanceHeatmap";
import { ProgressBars } from "@/components/dashboard/ProgressBars";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { UpcomingClasses } from "@/components/dashboard/UpcomingClasses";
import { Card } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function StudentDashboardPage() {
  return (
    <PageWrapper>
      <h1 className="font-heading text-3xl font-extrabold text-ink-800">Study Dashboard</h1>
      <div className="mt-5"><StatsGrid /></div>
      <Card className="mt-5">
        <h2 className="mb-4 font-heading text-xl font-extrabold text-ink-800">Subject Progress</h2>
        <ProgressBars scores={{ Mathematics: 82, Science: 68, English: 76 }} />
      </Card>
      <div className="mt-5"><UpcomingClasses /></div>
      <Card className="mt-5">
        <h2 className="mb-4 font-heading text-xl font-extrabold text-ink-800">Attendance Heatmap</h2>
        <AttendanceHeatmap />
      </Card>
    </PageWrapper>
  );
}
