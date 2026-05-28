import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AlertLevel } from "@/types/database";
import { cn } from "@/utils/helpers";

const config = {
  good: { icon: CheckCircle2, className: "border-success/20 bg-success/10 text-success" },
  watch: { icon: TriangleAlert, className: "border-warning/30 bg-warning/10 text-ink-800" },
  urgent: { icon: AlertCircle, className: "border-danger/20 bg-danger/10 text-danger" },
  info: { icon: Info, className: "border-navy-200 bg-navy-50 text-navy-700" }
};

export function AIAlertBox({
  level = "info",
  title,
  body
}: {
  level?: AlertLevel | "info";
  title: string;
  body: string;
}) {
  const current = config[level];
  const Icon = current.icon;
  return (
    <div className={cn("rounded-2xl border p-4", current.className)}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-extrabold">{title}</h3>
            <Badge tone="dark">AI</Badge>
          </div>
          <p className="mt-1 text-sm font-semibold leading-6 opacity-80">{body}</p>
        </div>
      </div>
    </div>
  );
}
