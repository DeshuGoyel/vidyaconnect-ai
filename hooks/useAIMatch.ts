import { teachers } from "@/data/mock";

export function useAIMatch() {
  return teachers.map((teacher, index) => ({
    ...teacher,
    matchScore: [94, 88, 81][index] ?? 78,
    reason:
      index === 0
        ? "Yeh teacher aapke ghar ke paas hain, budget fit hai, aur Class 8 Maths ka strong record hai."
        : "Subject aur timing match achha hai, saath hi reviews bhi strong hain."
  }));
}
