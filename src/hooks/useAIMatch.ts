"use client";

import { teachers } from "@/data/mock";

export function useAIMatch() {
  return { matches: teachers, isLoading: false };
}
