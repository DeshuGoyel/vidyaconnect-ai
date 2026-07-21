"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Loader2, AlertCircle, Printer,
  ChevronDown, ChevronUp, Lightbulb, BookOpen, ClipboardList,
  Zap, RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BottomNav } from "@/components/layout/BottomNav";

// ─── Pre-filled demo examples ─────────────────────────────────────────────────
const EXAMPLES = [
  { label: "Class 7 Photosynthesis",        topic: "Photosynthesis",        grade: "Class 7" },
  { label: "Class 10 Quadratic Equations",  topic: "Quadratic Equations",   grade: "Class 10" },
  { label: "Class 5 Fractions",             topic: "Fractions",             grade: "Class 5" },
  { label: "Class 9 Newton's Laws",         topic: "Newton's Laws of Motion", grade: "Class 9" },
];

const LANGUAGES = ["English", "Hindi", "Hinglish"] as const;
type Language = (typeof LANGUAGES)[number];

// ─── Parse markdown content into 3 sections ──────────────────────────────────
function parseSections(content: string) {
  const explanationMatch = content.match(/## 📖 Explanation([\s\S]*?)(?=## ✏️|$)/);
  const practiceMatch    = content.match(/## ✏️ Practice Questions([\s\S]*?)(?=## 📋|$)/);
  const worksheetMatch   = content.match(/## 📋 Worksheet([\s\S]*?)$/);

  return {
    explanation: explanationMatch?.[1]?.trim() ?? content,
    practice:    practiceMatch?.[1]?.trim()    ?? "",
    worksheet:   worksheetMatch?.[1]?.trim()   ?? "",
  };
}

// ─── Simple markdown renderer ─────────────────────────────────────────────────
function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        if (line.startsWith("### "))
          return <h4 key={i} className="font-display font-semibold text-ink-900 text-sm mt-3">{line.replace(/^### /, "")}</h4>;
        if (line.startsWith("## "))
          return <h3 key={i} className="font-display font-bold text-ink-900 text-base mt-4">{line.replace(/^## /, "")}</h3>;
        if (line.startsWith("**Q") && line.includes("**"))
          return (
            <div key={i} className="bg-ink-50 rounded-xl p-3 border border-ink-100">
              <p className="text-sm font-semibold text-ink-800" dangerouslySetInnerHTML={{ __html: renderInline(line) }} />
            </div>
          );
        if (line.startsWith("> "))
          return (
            <div key={i} className="border-l-2 border-brand-300 pl-3 py-1">
              <p className="text-xs text-ink-600 italic" dangerouslySetInnerHTML={{ __html: renderInline(line.replace(/^> /, "")) }} />
            </div>
          );
        if (line.startsWith("| ")) {
          const cells = line.split("|").filter((c) => c.trim() && c.trim() !== "-");
          if (cells.length === 0) return null;
          const isHeader = lines[i + 1]?.includes("---");
          const Tag = isHeader ? "th" : "td";
          return (
            <div key={i} className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <tr>
                  {cells.map((cell, j) => (
                    <Tag key={j} className="border border-ink-200 px-3 py-2 text-left text-ink-700 font-medium bg-ink-50">
                      {cell.trim()}
                    </Tag>
                  ))}
                </tr>
              </table>
            </div>
          );
        }
        if (line.startsWith("- "))
          return <li key={i} className="text-sm text-ink-700 ml-4 list-disc" dangerouslySetInnerHTML={{ __html: renderInline(line.replace(/^- /, "")) }} />;
        if (line.startsWith("---"))
          return <hr key={i} className="border-ink-100 my-2" />;
        return <p key={i} className="text-sm text-ink-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderInline(line) }} />;
      })}
    </div>
  );
}

function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code class='bg-ink-100 rounded px-1 text-xs font-mono'>$1</code>");
}

// ─── Collapsible section card ─────────────────────────────────────────────────
function SectionCard({
  icon: Icon, title, color, children, defaultOpen = true,
}: {
  icon: React.ElementType; title: string; color: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-ink-100 shadow-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-ink-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
            <Icon size={18} />
          </div>
          <span className="font-semibold text-ink-900 text-sm">{title}</span>
        </div>
        {open ? <ChevronUp size={16} className="text-ink-400" /> : <ChevronDown size={16} className="text-ink-400" />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-ink-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function SessionPage() {
  const [topic, setTopic]               = useState("");
  const [grade, setGrade]               = useState("Class 7");
  const [language, setLanguage]         = useState<Language>("English");
  const [misconception, setMisconception] = useState("");
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const [result, setResult]             = useState<{ explanation: string; practice: string; worksheet: string } | null>(null);
  const [isMock, setIsMock]             = useState(false);

  // ── Fill example ──
  const fillExample = (ex: (typeof EXAMPLES)[0]) => {
    setTopic(ex.topic);
    setGrade(ex.grade);
    setResult(null);
    setError(null);
  };

  // ── Generate ──
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
        body: JSON.stringify({ topic: topic.trim(), grade, language, misconception: misconception.trim() }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const data = await res.json();
      setIsMock(!!data.mock);

      if (data.content) {
        setResult(parseSections(data.content));
      } else {
        throw new Error("Empty response");
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        setError("Request timed out. Demo mode mein dekho — network issue ho sakti hai.");
      } else {
        setError("AI abhi busy hai. Thodi der baad try karo ya example buttons use karo.");
      }
      // Auto-fallback: show mock data for demo resilience
      const mockResult = {
        explanation: `## 📖 Explanation\n\n**${topic}** is an important concept for ${grade} students.\n\n[Demo mode — Add OPENAI_API_KEY for live GPT-5.6 output]\n\nThe core idea is to break this topic down step by step using real-world examples that students can relate to.`,
        practice: `## ✏️ Practice Questions\n\n**Q1 (Easy)** Basic application of ${topic}\n> **Answer:** Step-by-step solution here\n\n**Q2 (Medium)** Applied problem\n> **Answer:** Working shown clearly\n\n**Q3 (Medium)** Word problem\n> **Answer:** Equation → Solution\n\n**Q4 (Hard)** Multi-step challenge\n> **Answer:** Careful analysis needed\n\n**Q5 (Challenge)** Expert level\n> **Answer:** Combines multiple concepts`,
        worksheet: `## 📋 Worksheet\n\n| # | Problem | My Working | Answer |\n|---|---------|-----------|--------|\n| 1 | Basic | | |\n| 2 | Medium | | |\n| 3 | Word | | |\n| 4 | Advanced | | |\n| 5 | Challenge | | |\n\n**Name:** _________________ **Date:** _________________`,
      };
      setResult(mockResult);
      setIsMock(true);
    } finally {
      setLoading(false);
    }
  };

  // ── Print / Download ──
  const handlePrint = () => {
    if (!result) return;
    const printContent = `
      <html>
        <head>
          <title>VidyaConnect Worksheet — ${topic} (${grade})</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; max-width: 700px; margin: 40px auto; color: #1C1917; line-height: 1.6; }
            h1 { color: #F97316; border-bottom: 2px solid #F97316; padding-bottom: 8px; }
            h2 { color: #292524; margin-top: 28px; }
            h3 { color: #44403C; }
            blockquote { border-left: 3px solid #F97316; padding-left: 12px; color: #57534E; margin: 8px 0; }
            table { width: 100%; border-collapse: collapse; margin: 12px 0; }
            td, th { border: 1px solid #D6D3D1; padding: 10px 14px; text-align: left; }
            th { background: #FFF7ED; font-weight: 600; }
            strong { color: #1C1917; }
            .badge { display: inline-block; background: #FFF7ED; color: #C2410C; border-radius: 20px; padding: 2px 10px; font-size: 12px; font-weight: 600; margin-bottom: 16px; }
            .footer { margin-top: 40px; font-size: 12px; color: #A8A29E; border-top: 1px solid #E7E5E4; padding-top: 12px; }
          </style>
        </head>
        <body>
          <div class="badge">VidyaConnect AI Co-Pilot · GPT-5.6</div>
          <h1>${topic}</h1>
          <p><strong>Class/Grade:</strong> ${grade} &nbsp;|&nbsp; <strong>Language:</strong> ${language}${misconception ? ` &nbsp;|&nbsp; <strong>Misconception addressed:</strong> ${misconception}` : ""}</p>
          ${result.explanation.replace(/\n/g, "<br>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/## /g, "<h2>").replace(/### /g, "<h3>")}
          ${result.practice.replace(/\n/g, "<br>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/> /g, "<blockquote>").replace(/## /g, "<h2>")}
          ${result.worksheet.replace(/\n/g, "<br>").replace(/## /g, "<h2>")}
          <div class="footer">Generated by VidyaConnect AI Co-Pilot powered by GPT-5.6 · vidyaconnect.ai</div>
        </body>
      </html>
    `;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(printContent);
      win.document.close();
      win.focus();
      setTimeout(() => win.print(), 500);
    }
  };

  const canGenerate = topic.trim().length > 0 && !loading;

  return (
    <div className="min-h-screen bg-ink-50 max-w-md mx-auto relative">
      <div className="pb-nav">
        {/* ── Header ── */}
        <div className="bg-white border-b border-ink-100 px-4 pt-12 pb-4 sticky top-0 z-10 shadow-soft">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-brand">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-ink-900 leading-tight">
                AI Session Co-Pilot
              </h1>
              <p className="text-xs text-ink-400">Powered by GPT-5.6</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-5 space-y-5">

          {/* ── Quick Examples ── */}
          <div>
            <p className="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-2.5">
              Quick Examples
            </p>
            <div className="grid grid-cols-2 gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => fillExample(ex)}
                  className={`text-left p-3 rounded-xl border text-xs font-medium transition-all duration-150 active:scale-[0.97] ${
                    topic === ex.topic && grade === ex.grade
                      ? "bg-brand-50 border-brand-300 text-brand-700"
                      : "bg-white border-ink-200 text-ink-700 hover:border-brand-300 hover:bg-brand-50"
                  }`}
                >
                  <Zap size={11} className="inline mr-1 text-brand-400" />
                  {ex.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Topic Input ── */}
          <div>
            <label className="block text-sm font-semibold text-ink-700 mb-2">
              Topic / Chapter
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Photosynthesis, Fractions, Newton's Laws"
              className="w-full border border-ink-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-4 py-3 text-sm text-ink-900 placeholder-ink-400 bg-white transition-all outline-none"
            />
          </div>

          {/* ── Grade + Language row ── */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-2">Grade / Class</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full border border-ink-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3 py-3 text-sm text-ink-900 bg-white transition-all outline-none appearance-none"
              >
                {["Class 1","Class 2","Class 3","Class 4","Class 5","Class 6","Class 7","Class 8","Class 9","Class 10","Class 11","Class 12","JEE / NEET"].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* ── Language Toggle ── */}
            <div>
              <label className="block text-xs font-semibold text-ink-700 mb-2">Language</label>
              <div className="flex rounded-xl border border-ink-200 overflow-hidden bg-white h-[46px]">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`flex-1 text-[10px] font-bold transition-all duration-150 ${
                      language === lang
                        ? "bg-brand-500 text-white"
                        : "text-ink-500 hover:text-ink-900 hover:bg-ink-50"
                    }`}
                  >
                    {lang === "Hinglish" ? "HG" : lang.slice(0, 2)}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-ink-400 mt-1 text-center">{language}</p>
            </div>
          </div>

          {/* ── Misconception Field ── */}
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb size={15} className="text-brand-600" />
              <label className="text-xs font-bold text-brand-700 uppercase tracking-wide">
                Misconception Diagnosis (optional — powerful!)
              </label>
            </div>
            <textarea
              value={misconception}
              onChange={(e) => setMisconception(e.target.value)}
              placeholder={`Student ka galat jawab ya galat soch likhо...\n\nExample: "Student ne socha ki x² − 5x + 6 = 0 ka jawab x = 5, 6 hoga"`}
              rows={3}
              className="w-full border border-brand-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl px-3 py-2.5 text-sm text-ink-900 placeholder-ink-400 bg-white transition-all outline-none resize-none"
            />
            <p className="text-[10px] text-brand-600 mt-1.5">
              ✨ GPT-5.6 will diagnose WHY the student made that mistake — not just give the right answer.
            </p>
          </div>

          {/* ── Generate Button ── */}
          <Button
            onClick={generate}
            disabled={!canGenerate}
            fullWidth
            size="lg"
            className="text-base"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                AI teaching material bana raha hai...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate with GPT-5.6
              </>
            )}
          </Button>

          {/* ── Error State ── */}
          <AnimatePresence>
            {error && !result && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4"
              >
                <AlertCircle size={18} className="text-danger flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-danger">Connection issue</p>
                  <p className="text-xs text-red-600 mt-0.5">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Results ── */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {/* Result header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-xs font-semibold text-ink-700">
                      {isMock ? "Demo Output" : "GPT-5.6 Output"}
                    </span>
                    {isMock && (
                      <span className="text-[10px] bg-ink-100 text-ink-500 px-2 py-0.5 rounded-full">
                        Add API key for live output
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => { setResult(null); setError(null); }}
                    className="flex items-center gap-1 text-xs text-ink-400 hover:text-ink-700 transition-colors"
                  >
                    <RotateCcw size={12} /> Reset
                  </button>
                </div>

                {/* Section 1: Explanation */}
                <SectionCard
                  icon={BookOpen}
                  title={misconception ? "🔍 Misconception Diagnosis + Explanation" : "📖 Explanation"}
                  color="bg-blue-50 text-blue-600"
                  defaultOpen={true}
                >
                  <Markdown text={result.explanation} />
                </SectionCard>

                {/* Section 2: Practice */}
                <SectionCard
                  icon={Lightbulb}
                  title="✏️ Practice Questions (5)"
                  color="bg-brand-50 text-brand-600"
                  defaultOpen={true}
                >
                  <Markdown text={result.practice} />
                </SectionCard>

                {/* Section 3: Worksheet */}
                <SectionCard
                  icon={ClipboardList}
                  title="📋 Printable Worksheet"
                  color="bg-green-50 text-green-600"
                  defaultOpen={false}
                >
                  <Markdown text={result.worksheet} />
                </SectionCard>

                {/* Print / Download */}
                <button
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-2 bg-ink-900 text-white rounded-xl px-6 py-3.5 text-sm font-semibold hover:bg-ink-800 transition-all duration-200 active:scale-95 shadow-elevated"
                >
                  <Printer size={17} />
                  Download / Print Worksheet
                </button>

                {/* AI badge */}
                <div className="flex items-center justify-center gap-2 py-2">
                  <Sparkles size={12} className="text-brand-400" />
                  <p className="text-[10px] text-ink-400 text-center">
                    Generated by VidyaConnect AI Co-Pilot · GPT-5.6
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Empty state ── */}
          {!result && !loading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
                <Sparkles size={28} className="text-brand-400" />
              </div>
              <p className="text-sm font-semibold text-ink-700 mb-1">
                AI Teaching Material Generator
              </p>
              <p className="text-xs text-ink-400 leading-relaxed max-w-xs mx-auto">
                Pick an example above or enter any topic. GPT-5.6 will generate an explanation, 5 practice questions, and a printable worksheet — in Hindi, English, or Hinglish.
              </p>
            </motion.div>
          )}

        </div>
      </div>
      <BottomNav />
    </div>
  );
}
