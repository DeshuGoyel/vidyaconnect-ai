import { StyleSheet, Text } from "react-native";
import { AIReportCard } from "@/components/ai/AIReportCard";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";

export default function ParentReportScreen() {
  return (
    <Screen>
      <Text style={styles.title}>AI Weekly Report</Text>
      <AIReportCard />
      <Text style={styles.body}>Rohan ne iss week Maths mein achha progress dikhaya. Fractions aur word problems par extra practice recommended hai.</Text>
      <Button title="Share on WhatsApp" icon="logo-whatsapp" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  body: { color: colors.muted, lineHeight: 22, fontWeight: "700" }
});
