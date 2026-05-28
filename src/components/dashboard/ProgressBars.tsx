import { ProgressBar } from "@/components/dashboard/ProgressBar";

export function ProgressBars({ scores }: { scores: Record<string, number> }) {
  return (
    <div className="grid gap-4">
      {Object.entries(scores).map(([label, value]) => <ProgressBar key={label} label={label} value={value} />)}
    </div>
  );
}
