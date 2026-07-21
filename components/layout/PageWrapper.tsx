"use client";

import { BottomNav } from "@/components/layout/BottomNav";
import { motion } from "framer-motion";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-ink-50 max-w-md mx-auto relative">
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={`pb-nav px-4 ${className}`}
      >
        {children}
      </motion.main>
      <BottomNav />
    </div>
  );
}
