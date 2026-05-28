import { StyleSheet, Text } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { formatRupee } from "@/utils/formatters";

export default function PaymentsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Payments</Text>
      <Card>
        <Text style={styles.label}>VidyaWallet Balance</Text>
        <Text style={styles.amount}>{formatRupee(1200)}</Text>
      </Card>
      <Button title="Add Money" icon="add-circle" />
      <Card>
        <Text style={styles.item}>Math tuition invoice • {formatRupee(3200)}</Text>
        <Text style={styles.item}>Wallet topup • {formatRupee(1000)}</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  label: { color: colors.muted, fontWeight: "800" },
  amount: { color: colors.dark, fontSize: 42, fontWeight: "900", marginTop: 8 },
  item: { color: colors.muted, lineHeight: 26, fontWeight: "700" }
});
