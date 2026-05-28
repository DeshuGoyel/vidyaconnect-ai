import { StyleSheet, Text, View } from "react-native";
import { AIAlertBox } from "@/components/ui/AIAlertBox";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { colors } from "@/constants/colors";

export function AIReportCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.score}>82</Text>
      <Text style={styles.label}>Overall Progress Score</Text>
      <ProgressBar value={82} tone={colors.success} />
      <AIAlertBox
        title="AI Weekly Insight"
        body="Rohan ka Maths progress strong hai, lekin Fractions revision ke liye 2 focused sessions helpful rahenge."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 14
  },
  score: {
    color: colors.dark,
    fontSize: 46,
    fontWeight: "900"
  },
  label: {
    color: colors.muted,
    fontWeight: "800"
  }
});
