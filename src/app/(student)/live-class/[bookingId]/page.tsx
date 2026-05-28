import { MicOff, PhoneOff, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LiveClassPage() {
  return (
    <main className="flex min-h-screen flex-col bg-ink-900 p-4 text-white">
      <div className="grid flex-1 place-items-center rounded-3xl bg-ink-800">
        <p className="font-heading text-2xl font-extrabold">Teacher Video</p>
      </div>
      <div className="mt-4 flex justify-center gap-3">
        <Button variant="dark"><MicOff className="h-5 w-5" /></Button>
        <Button variant="dark"><Video className="h-5 w-5" /></Button>
        <Button><PhoneOff className="h-5 w-5" /> End</Button>
      </div>
    </main>
  );
}
