import { StyleSheet, Text, TextInput } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";

export default function ChatScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Chat</Text>
      <Card><Text style={styles.message}>Namaste, next class ke liye homework bhej diya hai.</Text></Card>
      <TextInput placeholder="Type message" style={styles.input} />
      <Button title="Send" icon="send" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  message: { color: colors.dark, fontWeight: "700" },
  input: { minHeight: 54, borderRadius: 16, backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, paddingHorizontal: 14 }
});
