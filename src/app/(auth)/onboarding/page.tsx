import Link from "next/link";
import { OnboardingSlides } from "@/components/auth/OnboardingSlides";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-10">
      <div className="max-w-3xl">
        <p className="font-extrabold text-saffron-500">VidyaConnect AI</p>
        <h1 className="mt-3 font-heading text-5xl font-extrabold leading-tight text-ink-800">Apni Gali Ka Best Teacher</h1>
        <p className="mt-4 text-lg font-semibold leading-8 text-ink-500">
          Pan-India hyperlocal tuition discovery with AI matching, free demos, parent reports, and verified teachers.
        </p>
      </div>
      <div className="mt-10">
        <OnboardingSlides />
      </div>
      <div className="mt-8 flex gap-3">
        <Button size="lg">
          <Link href="/signup">Get Started</Link>
        </Button>
        <Button size="lg" variant="secondary">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}
