import { MapPin, Sparkles, WalletCards } from "lucide-react";
import { Card } from "@/components/ui/card";

const slides = [
  { title: "Hyperlocal Teachers", body: "Find trusted teachers near your colony with distance, ratings, and verification.", icon: MapPin },
  { title: "AI Matching", body: "Claude-powered ranking explains why a teacher fits your child in Hindi.", icon: Sparkles },
  { title: "Free Demo First", body: "Every student starts with free classes before subscription or payment.", icon: WalletCards }
];

export function OnboardingSlides() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {slides.map((slide) => {
        const Icon = slide.icon;
        return (
          <Card key={slide.title}>
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-saffron-50 text-saffron-500">
              <Icon className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-heading text-xl font-extrabold text-ink-800">{slide.title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink-500">{slide.body}</p>
          </Card>
        );
      })}
    </div>
  );
}
