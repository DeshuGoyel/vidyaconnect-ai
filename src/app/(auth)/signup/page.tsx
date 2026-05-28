import { RoleSelector } from "@/components/auth/RoleSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  return (
    <div className="mx-auto grid min-h-screen max-w-5xl items-center gap-8 px-4 py-10 md:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p className="font-extrabold text-saffron-500">Create account</p>
        <h1 className="mt-2 font-heading text-4xl font-extrabold text-ink-800">Choose your VidyaConnect role</h1>
        <p className="mt-3 text-sm font-semibold leading-6 text-ink-500">Every role gets a tailored dashboard, navigation, and workflow.</p>
        <div className="mt-8 grid gap-3">
          <Input placeholder="Full name" />
          <Input placeholder="Phone number" inputMode="numeric" />
          <Input placeholder="Locality" defaultValue="Indiranagar" />
          <Button size="lg">Continue</Button>
        </div>
      </div>
      <RoleSelector />
    </div>
  );
}
