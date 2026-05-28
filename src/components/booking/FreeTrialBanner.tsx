import { Badge } from "@/components/ui/badge";

export function FreeTrialBanner({ remaining }: { remaining: number }) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-success to-emerald-500 p-4 text-white shadow-card">
      <Badge tone="dark">FREE TRIAL</Badge>
      <p className="mt-3 font-heading text-2xl font-extrabold">Aapke paas {remaining} Free Classes baaki hain</p>
      <p className="mt-1 text-sm font-semibold text-white/85">Book now. Payment starts only after free demos are over.</p>
    </div>
  );
}
