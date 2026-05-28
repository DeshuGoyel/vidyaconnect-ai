import { HTMLAttributes } from "react";
import { cn } from "@/utils/helpers";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-ink-100 bg-white p-4 shadow-card", className)} {...props} />;
}
