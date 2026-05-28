import { AIAlertBox } from "@/components/ai/AIAlertBox";
import { EarningsChart } from "@/components/dashboard/EarningsChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { formatRupee } from "@/utils/formatters";

export default function TeacherDashboardPage() {
  return (
    <PageWrapper>
      <section className="rounded-3xl bg-ink-900 p-5 text-white shadow-ai">
        <p className="text-sm font-bold text-white/60">Earnings this month</p>
        <h1 className="mt-2 font-heading text-5xl font-extrabold">{formatRupee(28600)}</h1>
        <Button className="mt-5">Withdraw</Button>
      </section>
      <Card className="mt-5">
        <h2 className="font-heading text-xl font-extrabold text-ink-800">Today’s Schedule</h2>
        <p className="mt-3 text-sm font-semibold text-ink-500">5:00 PM • Rohan • Class 8 Maths</p>
        <p className="mt-2 text-sm font-semibold text-ink-500">7:00 PM • Priya • Class 10 Science</p>
      </Card>
      <section className="mt-5 grid gap-3">
        <AIAlertBox level="urgent" title="Amit missed 3 classes" body="Call parent today and offer a catch-up slot." />
        <AIAlertBox level="watch" title="Rohan is struggling" body="Trigonometry basics need visual examples and practice." />
        <AIAlertBox level="good" title="Priya is top performer" body="Send praise note to parent and suggest Olympiad prep." />
      </section>
      <Card className="mt-5">
        <h2 className="font-heading text-xl font-extrabold text-ink-800">Earnings Chart</h2>
        <EarningsChart />
      </Card>
    </PageWrapper>
  );
}
