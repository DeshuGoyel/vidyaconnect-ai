import { AIAlertBox } from "@/components/ai/AIAlertBox";
import { ProgressBars } from "@/components/dashboard/ProgressBars";
import { AIReport } from "@/types/database";

export function AIReportCard({ report }: { report: AIReport }) {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-ink-900 to-navy-900 p-5 text-white shadow-ai">
      <span className="rounded-full bg-saffron-500 px-3 py-1 text-xs font-extrabold">AI Weekly Report</span>
      <div className="mt-5 flex items-center gap-5">
        <div className="grid h-28 w-28 place-items-center rounded-full border-8 border-saffron-500">
          <span className="font-heading text-4xl font-extrabold">{report.overall_score}</span>
        </div>
        <p className="flex-1 text-sm font-semibold leading-6 text-white/75">{report.summary_text}</p>
      </div>
      <div className="mt-5 rounded-2xl bg-white p-4">
        <ProgressBars scores={report.subject_scores} />
      </div>
      <div className="mt-4 grid gap-3">
        {report.alerts.map((alert) => <AIAlertBox key={alert.title} level={alert.level} title={alert.title} body={alert.body} />)}
      </div>
    </section>
  );
}
