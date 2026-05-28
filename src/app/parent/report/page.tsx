import { AIReportCard } from "@/components/ai/AIReportCard";
import { LearningDNACard } from "@/components/ai/LearningDNACard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { latestReport } from "@/data/mock";

export default function ParentReportPage() {
  return (
    <PageWrapper>
      <h1 className="font-heading text-3xl font-extrabold text-ink-800">AI Weekly Report</h1>
      <div className="mt-5"><AIReportCard report={latestReport} /></div>
      <div className="mt-5"><LearningDNACard dna={latestReport.learning_dna} /></div>
      <Card className="mt-5">
        <h2 className="font-heading text-xl font-extrabold text-ink-800">Recommendations</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm font-semibold text-ink-500">
          {latestReport.recommendations.map((item) => <li key={item.title}><strong>{item.title}:</strong> {item.body}</li>)}
        </ol>
      </Card>
      <div className="mt-5 flex gap-3"><Button>Share on WhatsApp</Button><Button variant="secondary">Download PDF</Button></div>
    </PageWrapper>
  );
}
