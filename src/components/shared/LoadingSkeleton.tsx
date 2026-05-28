import { cn } from "@/utils/helpers";

export function LoadingSkeleton({ className }: { className?: string }) {
  return <div className={cn("relative overflow-hidden rounded-xl bg-ink-100 before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent", className)} />;
}
