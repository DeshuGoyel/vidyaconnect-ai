import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function TeacherProfileSetupPage() {
  return (
    <PageWrapper>
      <h1 className="font-heading text-3xl font-extrabold text-ink-800">Teacher Profile Setup</h1>
      <div className="mt-5 grid gap-3">
        {["Bio", "Qualification", "Subjects", "Classes taught", "Price per class", "Service radius"].map((field) => <Input key={field} placeholder={field} />)}
        <Button size="lg">Save Profile</Button>
      </div>
    </PageWrapper>
  );
}
