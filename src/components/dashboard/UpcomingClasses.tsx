import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bookings, teachers } from "@/data/mock";
import Link from "next/link";

export function UpcomingClasses() {
  return (
    <Card>
      <h3 className="font-heading text-lg font-extrabold text-ink-800">Today’s Classes</h3>
      <div className="mt-4 grid gap-3">
        {bookings.map((booking) => {
          const teacher = teachers.find((item) => item.id === booking.teacher_id);
          return (
            <div key={booking.id} className="flex items-center justify-between gap-3 rounded-2xl bg-cream p-3">
              <div>
                <p className="font-extrabold text-ink-800">{booking.subject}</p>
                <p className="text-sm font-semibold text-ink-400">{teacher?.user?.name} • 5:00 PM</p>
              </div>
              <Link href={`/live-class/${booking.id}`}>
                <Button size="sm">Join</Button>
              </Link>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
