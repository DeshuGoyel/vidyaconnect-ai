import { StyleSheet, Text } from "react-native";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";

export default function TeacherScheduleScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Weekly Schedule</Text>
      {["Mon 5-8 PM", "Wed 4-7 PM", "Fri 5-9 PM"].map((slot) => (
        <Card key={slot}>
          <Text style={styles.slot}>{slot}</Text>
          <Text style={styles.body}>AI suggested slot based on booking demand.</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  slot: { color: colors.dark, fontSize: 18, fontWeight: "900" },
  body: { color: colors.muted, marginTop: 4 }
});
