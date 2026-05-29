import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { teachers } from "@/data/mock";
import { useBookingStore } from "@/stores/bookingStore";
import { sessionTypeLabel } from "@/utils/formatters";

export default function MyBookingsScreen() {
  const bookings = useBookingStore((state) => state.bookings);

  return (
    <Screen>
      <Text style={styles.title}>My Bookings</Text>
      <View style={styles.tabs}>
        <Text style={styles.activeTab}>Upcoming</Text>
        <Text style={styles.tab}>Past</Text>
        <Text style={styles.tab}>Cancelled</Text>
      </View>
      {bookings.length === 0 ? (
        <Card>
          <Text style={styles.emptyTitle}>No bookings yet</Text>
          <Text style={styles.body}>Find a teacher and book your first free demo class.</Text>
        </Card>
      ) : (
        bookings.map((booking) => {
          const teacher = teachers.find((item) => item.id === booking.teacherId) ?? teachers[0];
          return (
            <Card key={booking.id}>
              <Text style={styles.teacher}>{teacher.name}</Text>
              <Text style={styles.body}>{booking.subject} • {sessionTypeLabel(booking.sessionType)}</Text>
              <Text style={styles.time}>{booking.scheduledAt}</Text>
              <View style={styles.actions}>
                <Button title="Join" icon="videocam" style={{ flex: 1 }} />
                <Button title="Rate" icon="star" variant="secondary" style={{ flex: 1 }} />
              </View>
            </Card>
          );
        })
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  tabs: { flexDirection: "row", gap: 10 },
  activeTab: { color: "#fff", backgroundColor: colors.primary, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999, fontWeight: "900" },
  tab: { color: colors.dark, backgroundColor: colors.card, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999, fontWeight: "900" },
  emptyTitle: { color: colors.dark, fontSize: 20, fontWeight: "900" },
  body: { color: colors.muted, marginTop: 4, lineHeight: 21 },
  teacher: { color: colors.dark, fontSize: 19, fontWeight: "900" },
  time: { color: colors.primary, fontWeight: "900", marginTop: 8 },
  actions: { flexDirection: "row", gap: 10, marginTop: 14 }
});
