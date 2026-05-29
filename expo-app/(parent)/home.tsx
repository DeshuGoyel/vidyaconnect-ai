import { StyleSheet, Text, View } from "react-native";
import { AIReportCard } from "@/components/ai/AIReportCard";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";

export default function ParentHomeScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Parent Home</Text>
      <Card>
        <Text style={styles.child}>Rohan Singh</Text>
        <View style={styles.stats}>
          <Text style={styles.stat}>Attendance 92%</Text>
          <Text style={styles.stat}>Progress 82</Text>
        </View>
      </Card>
      <AIReportCard />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  child: { color: colors.dark, fontSize: 20, fontWeight: "900" },
  stats: { flexDirection: "row", gap: 10, marginTop: 12 },
  stat: { color: colors.muted, fontWeight: "900" }
});
