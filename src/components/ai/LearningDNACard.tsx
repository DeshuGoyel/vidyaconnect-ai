import { Badge } from "@/components/ui/badge";

export function LearningDNACard({ dna }: { dna: Record<string, string> }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-4">
      <h3 className="font-heading text-lg font-extrabold text-ink-800">Learning DNA</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {Object.entries(dna).map(([key, value]) => <Badge key={key} tone="blue">{key}: {value}</Badge>)}
      </div>
    </div>
  );
}
