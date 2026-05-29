import { StyleSheet, Text, View } from "react-native";
import { AIReportCard } from "@/components/ai/AIReportCard";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { currentStudent } from "@/data/mock";

export default function StudentDashboardScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Study Dashboard</Text>
      <View style={styles.grid}>
        <Stat label="Classes" value="12" />
        <Stat label="Hours" value="18" />
        <Stat label="Assignments" value="7" />
        <Stat label="VidyaPoints" value={`${currentStudent.vidyaPoints}`} />
      </View>
      <Card>
        <Text style={styles.sectionTitle}>Subject Progress</Text>
        <Text style={styles.label}>Mathematics</Text>
        <ProgressBar value={82} tone={colors.success} />
        <Text style={styles.label}>Science</Text>
        <ProgressBar value={68} tone={colors.warning} />
      </Card>
      <AIReportCard />
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card style={styles.stat}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  stat: { width: "48%" },
  value: { color: colors.dark, fontSize: 24, fontWeight: "900" },
  statLabel: { color: colors.muted, fontWeight: "800", marginTop: 4 },
  sectionTitle: { color: colors.dark, fontSize: 18, fontWeight: "900", marginBottom: 10 },
  label: { color: colors.muted, fontWeight: "900", marginTop: 10, marginBottom: 8 }
});
