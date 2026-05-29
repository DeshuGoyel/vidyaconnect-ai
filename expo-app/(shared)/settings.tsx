import { StyleSheet, Text } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";

export default function SettingsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Settings</Text>
      <Card><Text style={styles.item}>Language: Hindi + English</Text></Card>
      <Card><Text style={styles.item}>Notifications: Enabled</Text></Card>
      <Button title="Save" icon="save" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  item: { color: colors.dark, fontWeight: "800" }
});
