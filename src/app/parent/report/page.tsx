"use client";

import { useState, useEffect } from "react";
import { AIReportCard } from "@/components/ai/AIReportCard";
import { LearningDNACard } from "@/components/ai/LearningDNACard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { TopBar } from "@/components/layout/TopBar";
import { latestReport as mockReport } from "@/data/mock";
import { getLatestReport } from "@/lib/supabase/queries";
import { AIReport } from "@/types/database";

export default function ParentReportPage() {
  const [report, setReport] = useState<AIReport>(mockReport);

  useEffect(() => {
    getLatestReport().then(data => setReport(data));
  }, []);

  const handleShareWhatsApp = () => {
    const text = `🤖 *VidyaConnect AI Weekly Report Summary* 🤖\n\n` +
      `📈 *Overall Score:* ${report.overall_score}%\n` +
      `🔄 *Attendance:* ${report.attendance_percentage}%\n` +
      `🧬 *Learning DNA:* ${report.learning_dna?.style ?? "Visual + Practice-led"}\n\n` +
      `📝 *AI Summary:*\n_"${report.summary_text}"_\n\n` +
      `🎯 *Recommendations:*\n` +
      report.recommendations.map((r, idx) => `${idx + 1}. ${r.title}: ${r.body}`).join("\n") +
      `\n\nExplore details on: vidyaconnect.in`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleDownloadPDF = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <PageWrapper>
      <TopBar title="AI Weekly Report" />
      <div className="mt-5"><AIReportCard report={report} /></div>
      <div className="mt-5"><LearningDNACard dna={report.learning_dna} /></div>
      <Card className="mt-5">
        <h2 className="font-heading text-xl font-extrabold text-ink-800">Recommendations</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm font-semibold text-ink-500">
          {report.recommendations.map((item) => <li key={item.title}><strong>{item.title}:</strong> {item.body}</li>)}
        </ol>
      </Card>
      <div className="mt-5 flex gap-3 print:hidden">
        <Button onClick={handleShareWhatsApp}>Share on WhatsApp</Button>
        <Button variant="secondary" onClick={handleDownloadPDF}>Download PDF</Button>
      </div>
    </PageWrapper>
  );
}

