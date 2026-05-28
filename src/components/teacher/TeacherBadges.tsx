import { Badge } from "@/components/ui/badge";
import { TeacherProfile } from "@/types/database";

export function TeacherBadges({ teacher }: { teacher: TeacherProfile }) {
  return (
    <div className="flex flex-wrap gap-2">
      {teacher.is_verified ? <Badge tone="blue">Verified</Badge> : null}
      {teacher.aadhaar_verified ? <Badge tone="green">Aadhaar Verified</Badge> : null}
      {teacher.background_checked ? <Badge tone="gold">Background Checked</Badge> : null}
      <Badge tone="green">{teacher.free_demo_count} Free Classes</Badge>
    </div>
  );
}
