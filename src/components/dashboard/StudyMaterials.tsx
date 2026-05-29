import { FileText, Download, Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const materials = [
  { id: 1, title: "Trigonometry Formulas", type: "PDF", subject: "Maths", size: "2.4 MB" },
  { id: 2, title: "Chemical Reactions Notes", type: "Doc", subject: "Science", size: "1.1 MB" },
  { id: 3, title: "English Grammar Rules", type: "PDF", subject: "English", size: "3.5 MB" },
];

export function StudyMaterials({ role }: { role?: "student" | "teacher" }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-extrabold text-ink-800">
          {role === "teacher" ? "Uploaded Materials" : "Recent Study Materials"}
        </h3>
        {role === "teacher" && (
          <Button size="sm" variant="secondary" className="text-xs">
            <Upload className="h-4 w-4 mr-1" /> Upload
          </Button>
        )}
      </div>
      <div className="mt-2 grid gap-3">
        {materials.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-cream p-3 border border-ink-100">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-100 text-blue-600">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-ink-800 line-clamp-1">{item.title}</p>
                <p className="text-xs font-semibold text-ink-400">
                  {item.subject} • {item.type} • {item.size}
                </p>
              </div>
            </div>
            {role !== "teacher" && (
              <Button size="icon" variant="ghost" className="text-ink-400 hover:text-blue-600">
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
