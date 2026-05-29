import { StyleSheet, Text } from "react-native";
import { AIAlertBox } from "@/components/ui/AIAlertBox";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";

export default function StudentDetailScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Rohan Singh</Text>
      <Card>
        <Text style={styles.section}>Subject Progress</Text>
        <Text style={styles.label}>Algebra</Text>
        <ProgressBar value={78} tone={colors.success} />
        <Text style={styles.label}>Fractions</Text>
        <ProgressBar value={48} tone={colors.danger} />
      </Card>
      <AIAlertBox title="Recommended action" body="Use visual fraction models and short timed drills for 7 days." />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  section: { color: colors.dark, fontSize: 18, fontWeight: "900", marginBottom: 10 },
  label: { color: colors.muted, fontWeight: "900", marginTop: 10, marginBottom: 8 }
});
