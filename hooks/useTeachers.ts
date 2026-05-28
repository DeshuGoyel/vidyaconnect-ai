import { useMemo } from "react";
import { teachers } from "@/data/mock";

export function useTeachers(subject?: string) {
  return useMemo(() => {
    if (!subject) return teachers;
    return teachers.filter((teacher) =>
      teacher.subjects.some((item) => item.toLowerCase().includes(subject.toLowerCase()))
    );
  }, [subject]);
}
