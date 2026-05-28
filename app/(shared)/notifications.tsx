import { StyleSheet, Text } from "react-native";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";

export default function NotificationsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Notifications</Text>
      {["Class reminder: Maths at 5 PM", "AI alert: Weekly report ready", "Payment receipt generated"].map((item) => (
        <Card key={item}><Text style={styles.item}>{item}</Text></Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  item: { color: colors.dark, fontWeight: "800" }
});
