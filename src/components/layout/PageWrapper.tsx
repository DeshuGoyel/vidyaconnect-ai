import { ReactNode } from "react";
import { cn } from "@/utils/helpers";

export function PageWrapper({ children, className }: { children: ReactNode; className?: string }) {
  return <main className={cn("mx-auto min-h-screen w-full max-w-6xl px-4 pb-28 pt-5 sm:px-6 lg:px-8", className)}>{children}</main>;
}
