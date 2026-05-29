import { StyleSheet, Text, View } from "react-native";
import { AIAlertBox } from "@/components/ui/AIAlertBox";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { formatRupee } from "@/utils/formatters";

export default function TeacherHomeScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Teacher Dashboard</Text>
      <Card style={styles.earnings}>
        <Text style={styles.label}>Earnings this month</Text>
        <Text style={styles.amount}>{formatRupee(28600)}</Text>
      </Card>
      <View style={styles.actions}>
        <Button title="Availability" icon="time" style={{ flex: 1 }} />
        <Button title="Withdraw" icon="wallet" variant="secondary" style={{ flex: 1 }} />
      </View>
      <Card>
        <Text style={styles.sectionTitle}>Today’s Schedule</Text>
        <Text style={styles.body}>5:00 PM • Rohan • Class 8 Maths</Text>
        <Text style={styles.body}>7:00 PM • Priya • Class 10 Science</Text>
      </Card>
      <AIAlertBox title="AI Alert" body="Rohan needs focused practice on Fractions before the next unit test." />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  earnings: { backgroundColor: colors.dark },
  label: { color: "#D8D8E2", fontWeight: "800" },
  amount: { color: "#fff", fontSize: 42, fontWeight: "900", marginTop: 8 },
  actions: { flexDirection: "row", gap: 10 },
  sectionTitle: { color: colors.dark, fontSize: 18, fontWeight: "900", marginBottom: 10 },
  body: { color: colors.muted, lineHeight: 24, fontWeight: "700" }
});
