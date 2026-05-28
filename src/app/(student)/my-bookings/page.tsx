import { EmptyState } from "@/components/shared/EmptyState";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { bookings, teachers } from "@/data/mock";
import { formatIndianDate, sessionTypeLabel } from "@/utils/formatters";

export default function MyBookingsPage() {
  return (
    <PageWrapper>
      <h1 className="font-heading text-3xl font-extrabold text-ink-800">My Bookings</h1>
      <div className="mt-4 flex gap-2">
        {["Upcoming", "Past", "Cancelled"].map((tab, index) => <span key={tab} className={`rounded-full px-4 py-2 text-sm font-extrabold ${index === 0 ? "bg-saffron-500 text-white" : "bg-white text-ink-700"}`}>{tab}</span>)}
      </div>
      <div className="mt-5 grid gap-4">
        {bookings.length === 0 ? <EmptyState title="No bookings yet" body="Book your first free demo class." /> : bookings.map((booking) => {
          const teacher = teachers.find((item) => item.id === booking.teacher_id);
          return (
            <Card key={booking.id}>
              <h2 className="font-heading text-xl font-extrabold text-ink-800">{teacher?.user?.name}</h2>
              <p className="mt-1 text-sm font-semibold text-ink-500">{booking.subject} • {sessionTypeLabel(booking.session_type)}</p>
              <p className="mt-2 text-sm font-extrabold text-saffron-500">{formatIndianDate(booking.scheduled_at)}</p>
              <div className="mt-4 flex gap-2"><Button>Join</Button><Button variant="secondary">Rate</Button></div>
            </Card>
          );
        })}
      </div>
    </PageWrapper>
  );
}
