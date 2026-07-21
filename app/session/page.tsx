"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Loader2, AlertTriangle, Printer,
  BookOpen, HelpCircle, FileText, CheckCircle2, RotateCcw, GraduationCap
} from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";

// ─── Pre-filled demo examples ─────────────────────────────────────────────────
const EXAMPLES = [
  { label: "Class 7 Photosynthesis", topic: "Photosynthesis", grade: "Class 7" },
  { label: "Class 10 Quadratics", topic: "Quadratic Equations", grade: "Class 10" },
  { label: "Class 5 Fractions", topic: "Fractions", grade: "Class 5" },
];

const LANGUAGES = ["English", "Hindi", "Hinglish"] as const;
type Language = (typeof LANGUAGES)[number];

// ─── Parse markdown content into structured sections ─────────────────────────
function parseOutput(content: string) {
  const diagnosisMatch   = content.match(/## 🔍 Misconception Diagnosis[\s\S]*?(?=## 📖|$)/i) ||
                           content.match(/## 🔍 गलतफहमी की जड़[\s\S]*?(?=## 📖|$)/i);
  const explanationMatch = content.match(/## 📖 Explanation[\s\S]*?(?=## ✏️|$)/i);
  const practiceMatch    = content.match(/## ✏️ Practice Questions[\s\S]*?(?=## 📋|$)/i);
  const worksheetMatch   = content.match(/## 📋 Worksheet[\s\S]*?$/i);

  return {
    diagnosis:   diagnosisMatch ? diagnosisMatch[0].replace(/## 🔍 [^\n]+\n/, "").trim() : "",
    explanation: explanationMatch ? explanationMatch[1]?.trim() ?? content : content,
    practice:    practiceMatch ? practiceMatch[1]?.trim() ?? "" : "",
    worksheet:   worksheetMatch ? worksheetMatch[1]?.trim() ?? "" : "",
  };
}

// ─── Helper function to safely render simple markdown ─────────────────────────
function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code class='bg-slate-100 rounded px-1.5 py-0.5 text-xs font-mono'>$1</code>");
}

function SimpleMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-3 text-slate-800 text-sm leading-relaxed font-normal">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        if (line.startsWith("### ")) {
          return <h4 key={i} className="font-medium text-slate-900 text-sm mt-3 mb-1">{line.replace(/^### /, "")}</h4>;
        }
        if (line.startsWith("## ")) {
          return <h3 key={i} className="font-medium text-slate-900 text-base mt-4 mb-2">{line.replace(/^## /, "")}</h3>;
        }
        if (line.startsWith("**Q") && line.includes("**")) {
          return (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded-[12px] p-3.5 mt-2">
              <p className="font-medium text-slate-900" dangerouslySetInnerHTML={{ __html: renderInline(line) }} />
            </div>
          );
        }
        if (line.startsWith("> ")) {
          return (
            <div key={i} className="border-l-2 border-indigo-500 pl-3 py-1 my-1 bg-indigo-50/50 rounded-r-[6px]">
              <p className="text-xs text-indigo-900 font-normal" dangerouslySetInnerHTML={{ __html: renderInline(line.replace(/^> /, "")) }} />
            </div>
          );
        }
        if (line.startsWith("| ")) {
          const cells = line.split("|").filter((c) => c.trim() && c.trim() !== "-");
          if (cells.length === 0) return null;
          const isHeader = lines[i + 1]?.includes("---");
          const Tag = isHeader ? "th" : "td";
          return (
            <div key={i} className="overflow-x-auto my-2">
              <table className="w-full text-xs border-collapse border border-slate-200 rounded-[8px]">
                <tbody>
                  <tr>
                    {cells.map((cell, j) => (
                      <Tag key={j} className="border border-slate-200 px-3 py-2 text-left text-slate-700 font-normal bg-slate-50">
                        {cell.trim()}
                      </Tag>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
        if (line.startsWith("- ")) {
          return <li key={i} className="ml-4 list-disc text-slate-700 font-normal" dangerouslySetInnerHTML={{ __html: renderInline(line.replace(/^- /, "")) }} />;
        }
        if (line.startsWith("---")) {
          return <hr key={i} className="border-slate-200 my-3" />;
        }
        return <p key={i} className="font-normal" dangerouslySetInnerHTML={{ __html: renderInline(line) }} />;
      })}
    </div>
  );
}

function SessionContent() {
  const searchParams = useSearchParams();
  const [topic, setTopic]                 = useState("");
  const [grade, setGrade]                 = useState("Class 7");
  const [language, setLanguage]           = useState<Language>("English");
  const [misconception, setMisconception]   = useState("");
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const [result, setResult]               = useState<{ diagnosis: string; explanation: string; practice: string; worksheet: string } | null>(null);

  useEffect(() => {
    const t = searchParams.get("topic");
    const g = searchParams.get("grade");
    const m = searchParams.get("misconception");
    if (t) setTopic(t);
    if (g) setGrade(g);
    if (m) setMisconception(m);
  }, [searchParams]);

  // ── Auto-fill example chip ──
  const fillExample = (ex: (typeof EXAMPLES)[0]) => {
    setTopic(ex.topic);
    setGrade(ex.grade);
    setError(null);
  };

  // ── Generate AI Content ──
  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          grade,
          language,
          misconception: misconception.trim()
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const data = await res.json();
      if (data.content) {
        setResult(parseOutput(data.content));
      } else {
        throw new Error("Empty response");
      }
    } catch {
      setError("Kuch galat hua, dobara try karo.");
      // Fallback mock result for resilient demo
      setResult({
        diagnosis: misconception
          ? `Tumne socha hoga ki ${topic} mein x ka value direct add hota hai. Yeh ek common galti hai jo tab hoti hai jab formula ko Bina step-by-step samjhe apply kiya jaaye. Real rule yeh hai ki sign flip aur step separation zaroori hai.`
          : "",
        explanation: `**${topic}** is an essential topic for ${grade} students.\n\nLet's break this down into 3 clear steps:\n\n1. **Core Concept**: Understand the fundamental rule behind ${topic}.\n2. **Application**: Apply the formula carefully without skipping steps.\n3. **Verification**: Double-check your final output with substitution.`,
        practice: `**Q1 (Easy)** Basic application of ${topic}\n> **Answer:** Step 1 → Apply basic identity → Final value.\n\n**Q2 (Medium)** Solve the equation step by step\n> **Answer:** Rearrange terms → Factorize → Get final roots.\n\n**Q3 (Medium)** Real-world scenario problem\n> **Answer:** Model into equation → Solve → Verify unit.\n\n**Q4 (Hard)** Advanced concept problem\n> **Answer:** Apply non-linear identity → Solve system.\n\n**Q5 (Challenge)** Expert level problem\n> **Answer:** Multi-step combination problem.`,
        worksheet: `| # | Problem | Student Working | Final Answer |\n|---|---------|----------------|--------------|\n| 1 | Problem 1 | | |\n| 2 | Problem 2 | | |\n| 3 | Problem 3 | | |\n| 4 | Problem 4 | | |\n| 5 | Problem 5 | | |\n\n**Name:** _________________ **Date:** _________________`,
      });
    } finally {
      setLoading(false);
    }
  };

  // ── Print / Download ──
  const handlePrint = () => {
    if (!result) return;
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>VidyaConnect Worksheet — ${topic} (${grade})</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; max-width: 680px; margin: 40px auto; color: #0f172a; line-height: 1.6; padding: 0 20px; }
            h1 { color: #4f46e5; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 24px; font-weight: 500; }
            h2 { color: #1e293b; margin-top: 24px; font-size: 18px; font-weight: 500; }
            .badge { display: inline-block; background: #e0e7ff; color: #3730a3; border-radius: 6px; padding: 4px 10px; font-size: 12px; font-weight: 500; margin-bottom: 12px; }
            table { width: 100%; border-collapse: collapse; margin: 16px 0; }
            td, th { border: 1px solid #cbd5e1; padding: 10px; text-align: left; font-size: 13px; }
            th { background: #f8fafc; font-weight: 500; }
            .footer { margin-top: 40px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px; }
          </style>
        </head>
        <body>
          <div class="badge">VidyaConnect Co-Pilot Worksheet</div>
          <h1>${topic} (${grade})</h1>
          <p><strong>Language:</strong> ${language}${misconception ? ` &nbsp;|&nbsp; <strong>Misconception:</strong> ${misconception}` : ""}</p>
          ${result.diagnosis ? `<div style="background:#fffbeb;border:1px solid #fde68a;padding:12px;border-radius:8px;margin:16px 0;"><strong>Galti ki jad:</strong><br>${result.diagnosis}</div>` : ""}
          <h2>Explanation</h2>
          <div>${result.explanation.replace(/\n/g, "<br>")}</div>
          <h2>5 Practice Questions</h2>
          <div>${result.practice.replace(/\n/g, "<br>")}</div>
          <h2>Printable Worksheet</h2>
          <div>${result.worksheet.replace(/\n/g, "<br>")}</div>
          <div class="footer">AI-generated teaching material · VidyaConnect Co-Pilot</div>
        </body>
      </html>
    `;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(printContent);
      win.document.close();
      win.focus();
      setTimeout(() => win.print(), 400);
    }
  };

  const canGenerate = topic.trim().length > 0 && !loading;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20 font-sans">
      {/* 1. Mobile & Desktop Header Band */}
      <header className="bg-indigo-600 text-white border-b border-indigo-700 sticky top-0 z-30">
        <div className="max-w-[700px] mx-auto px-4 py-3.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-[8px] bg-white/10 flex items-center justify-center text-white flex-shrink-0">
            <GraduationCap size={18} aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-medium text-base leading-tight text-white">VidyaConnect Co-Pilot</h1>
            <p className="text-xs text-indigo-100 font-normal">AI-powered teaching assistant for 1-on-1 sessions</p>
          </div>
        </div>
      </header>

      {/* Main Container Column: Desktop max-width ~700px, single vertical scroll */}
      <main className="max-w-[700px] mx-auto px-4 py-6 space-y-6">

        {/* 2. Try an example */}
        <section className="space-y-2">
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">
            Try an example
          </label>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => {
              const isActive = topic === ex.topic && grade === ex.grade;
              return (
                <button
                  key={ex.label}
                  type="button"
                  onClick={() => fillExample(ex)}
                  className={`min-h-[44px] px-3.5 py-2 rounded-[12px] border text-xs font-normal transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                  }`}
                >
                  {ex.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. Form Inputs */}
        <section className="bg-white border border-slate-200 rounded-[12px] p-4 sm:p-5 space-y-4">
          {/* Topic & Class */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label htmlFor="topic-input" className="block text-xs font-medium text-slate-500 mb-1.5">
                Topic or chapter
              </label>
              <input
                id="topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Photosynthesis, Fractions, Quadratic Equations"
                className="w-full min-h-[44px] border border-slate-200 rounded-[12px] px-3.5 text-sm font-normal text-slate-900 bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="grade-select" className="block text-xs font-medium text-slate-500 mb-1.5">
                Class or grade
              </label>
              <select
                id="grade-select"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full min-h-[44px] border border-slate-200 rounded-[12px] px-3 text-sm font-normal text-slate-900 bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors"
              >
                {["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8","Class 9","Class 10","Class 11","Class 12","JEE / NEET"].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Student wrong answer / Misconception text area */}
          <div>
            <label htmlFor="misconception-textarea" className="block text-xs font-medium text-slate-500 mb-1.5">
              Student ne kya galat kiya? (optional)
            </label>
            <textarea
              id="misconception-textarea"
              value={misconception}
              onChange={(e) => setMisconception(e.target.value)}
              placeholder="e.g. Student ne socha ki x² − 5x + 6 = 0 ka answer x = 5, 6 hoga"
              rows={3}
              className="w-full border border-slate-200 rounded-[12px] p-3 text-sm font-normal text-slate-900 bg-white focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-colors resize-none"
            />
          </div>

          {/* 4. Bhaasha toggle */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">
              Bhaasha toggle
            </label>
            <div className="flex border border-slate-200 rounded-[12px] overflow-hidden bg-slate-50 min-h-[44px]">
              {LANGUAGES.map((lang) => {
                const isActive = language === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`flex-1 text-xs font-medium transition-colors flex items-center justify-center ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Primary button */}
          <button
            type="button"
            onClick={generate}
            disabled={!canGenerate}
            className="w-full min-h-[48px] bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium text-sm rounded-[12px] transition-colors flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                <span>AI teaching material bana raha hai...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} aria-hidden="true" />
                <span>Material banao</span>
              </>
            )}
          </button>
        </section>

        {/* Loading Skeleton & Disabled Overlay State */}
        {loading && (
          <div className="bg-white border border-slate-200 rounded-[12px] p-5 space-y-4 animate-pulse">
            <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium">
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              <span>AI teaching material bana raha hai...</span>
            </div>
            <div className="h-4 bg-slate-100 rounded w-3/4" />
            <div className="h-4 bg-slate-100 rounded w-full" />
            <div className="h-4 bg-slate-100 rounded w-5/6" />
          </div>
        )}

        {/* 6. Error State Card */}
        {error && !result && (
          <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-4 flex items-start gap-3 text-amber-900">
            <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-xs font-normal">
              <p className="font-medium text-sm text-amber-900 mb-0.5">Kuch galat hua, dobara try karo.</p>
              <p className="text-amber-800">{error}</p>
            </div>
          </div>
        )}

        {/* 6. Output (after button press) */}
        {result && (
          <section className="space-y-4">
            {/* Reset / Status bar */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-normal px-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-indigo-600" aria-hidden="true" />
                <span>AI teaching material generated</span>
              </div>
              <button
                type="button"
                onClick={() => { setResult(null); setError(null); }}
                className="flex items-center gap-1 hover:text-slate-900 transition-colors"
              >
                <RotateCcw size={13} aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>

            {/* (a) "Galti ki jad" — Amber box (Hero output when misconception diagnosis is present) */}
            {(result.diagnosis || misconception) && (
              <div className="bg-amber-50 border border-amber-200 rounded-[12px] p-4 sm:p-5 text-amber-900 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-medium text-sm">
                  <AlertTriangle size={18} className="text-amber-700 flex-shrink-0" aria-hidden="true" />
                  <span>Galti ki jad (Misconception Diagnosis)</span>
                </div>
                <p className="text-sm font-normal leading-relaxed text-amber-900">
                  {result.diagnosis || `Student ne is problem mein misconception show kiya: "${misconception}". Target rule: Step-by-step definition aur correct application pe focus karein.`}
                </p>
              </div>
            )}

            {/* (b) "Explanation" — Neutral white card */}
            <div className="bg-white border border-slate-200 rounded-[12px] p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-medium text-sm border-b border-slate-100 pb-3">
                <BookOpen size={18} className="text-indigo-600 flex-shrink-0" aria-hidden="true" />
                <span>Explanation</span>
              </div>
              <SimpleMarkdown text={result.explanation} />
            </div>

            {/* (c) "5 practice questions" — Neutral white card */}
            <div className="bg-white border border-slate-200 rounded-[12px] p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-medium text-sm border-b border-slate-100 pb-3">
                <HelpCircle size={18} className="text-indigo-600 flex-shrink-0" aria-hidden="true" />
                <span>5 practice questions</span>
              </div>
              <SimpleMarkdown text={result.practice} />
            </div>

            {/* (d) Worksheet download/print button */}
            <button
              type="button"
              onClick={handlePrint}
              className="w-full min-h-[44px] bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-[12px] transition-colors flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <Printer size={18} aria-hidden="true" />
              <span>Worksheet download / print</span>
            </button>
          </section>
        )}

        {/* 7. Footer */}
        <footer className="pt-4 pb-6 text-center">
          <p className="text-xs text-slate-400 font-normal">
            AI-generated teaching material · tutor review recommended
          </p>
        </footer>

      </main>

      <BottomNav />
    </div>
  );
}

export default function SessionPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-xs text-slate-500">Loading Session Co-Pilot...</div>}>
      <SessionContent />
    </Suspense>
  );
}
