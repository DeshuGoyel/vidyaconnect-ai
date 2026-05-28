import { StyleSheet, Text } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { formatRupee } from "@/utils/formatters";

export default function TeacherEarningsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Earnings</Text>
      <Card>
        <Text style={styles.label}>This month total</Text>
        <Text style={styles.amount}>{formatRupee(28600)}</Text>
        <Text style={styles.body}>Pending: {formatRupee(4200)} • Cleared: {formatRupee(24400)}</Text>
      </Card>
      <Button title="Withdraw" icon="wallet" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  label: { color: colors.muted, fontWeight: "800" },
  amount: { color: colors.dark, fontSize: 42, fontWeight: "900", marginTop: 8 },
  body: { color: colors.muted, marginTop: 8 }
});
