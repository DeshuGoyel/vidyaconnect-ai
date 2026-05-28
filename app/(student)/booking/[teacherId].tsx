import { format } from "date-fns";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { DatePicker } from "@/components/booking/DatePicker";
import { SessionTypeSelector } from "@/components/booking/SessionTypeSelector";
import { TimeSlotGrid } from "@/components/booking/TimeSlotGrid";
import { TeacherMiniCard } from "@/components/teacher/TeacherMiniCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { currentStudent, teachers } from "@/data/mock";
import { useBookingStore } from "@/stores/bookingStore";
import { SessionType } from "@/types/domain";
import { formatIndianDate, formatRupee } from "@/utils/formatters";

export default function BookingScreen() {
  const { teacherId } = useLocalSearchParams<{ teacherId: string }>();
  const teacher = teachers.find((item) => item.id === teacherId) ?? teachers[0];
  const addBooking = useBookingStore((state) => state.addBooking);
  const [sessionType, setSessionType] = useState<SessionType>("home");
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const isFreeTrial = currentStudent.freeDemosRemaining > 0;

  const confirm = async () => {
    if (!date || !time) {
      Toast.show({ type: "error", text1: "Select date and time", text2: "Booking confirm karne ke liye slot choose karein." });
      return;
    }

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addBooking({
      id: `booking-${Date.now()}`,
      teacherId: teacher.id,
      subject: teacher.subject,
      sessionType,
      scheduledAt: `${date} ${time}`,
      status: "confirmed",
      isFreeTrial,
      amount: isFreeTrial ? 0 : teacher.pricePerMonth
    });
    Toast.show({ type: "success", text1: "Booking Confirmed", text2: `${formatIndianDate(date)} at ${time}` });
    router.replace("/(student)/bookings");
  };

  return (
    <Screen>
      <Text style={styles.title}>Book Class</Text>
      <TeacherMiniCard teacher={teacher} />

      <Card style={styles.freeBanner}>
        <Badge label="FREE TRIAL" tone="success" />
        <Text style={styles.freeText}>{currentStudent.freeDemosRemaining} of 3 Free Classes Remaining</Text>
      </Card>

      <View>
        <Text style={styles.sectionTitle}>Session Type</Text>
        <SessionTypeSelector value={sessionType} onChange={setSessionType} />
      </View>

      <View>
        <Text style={styles.sectionTitle}>Pick Date</Text>
        <DatePicker value={date} onChange={setDate} />
      </View>

      <View>
        <Text style={styles.sectionTitle}>Pick Time</Text>
        <TimeSlotGrid value={time} onChange={setTime} />
      </View>

      <Card>
        <Text style={styles.sectionTitle}>Price Summary</Text>
        <View style={styles.priceRow}>
          <Text style={styles.body}>Selected slot</Text>
          <Text style={styles.strong}>{date ? format(new Date(date), "d MMM") : "--"} {time ?? ""}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.body}>Class fee</Text>
          <Text style={styles.price}>{isFreeTrial ? "₹0 FREE" : formatRupee(teacher.pricePerMonth)}</Text>
        </View>
      </Card>

      <Button title="Confirm Booking" icon="checkmark-circle" onPress={confirm} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  freeBanner: { backgroundColor: "rgba(0, 196, 122, 0.1)" },
  freeText: { color: colors.dark, fontSize: 18, fontWeight: "900", marginTop: 8 },
  sectionTitle: { color: colors.dark, fontSize: 18, fontWeight: "900", marginBottom: 10 },
  body: { color: colors.muted, fontWeight: "700" },
  strong: { color: colors.dark, fontWeight: "900" },
  priceRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  price: { color: colors.success, fontSize: 18, fontWeight: "900" }
});
