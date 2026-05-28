import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

const steps = ["Location analyze", "Subject match", "Budget fit", "Schedule check", "AI score ready"];

export function AIThinkingAnimation() {
  return (
    <View style={styles.box}>
      {steps.map((step, index) => (
        <View key={step} style={styles.row}>
          <Ionicons name="checkmark-circle" size={18} color={index < 3 ? colors.success : colors.primary} />
          <Text style={styles.text}>{step}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.ai,
    borderRadius: 18,
    padding: 16,
    gap: 10
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  text: {
    color: "#fff",
    fontWeight: "800"
  }
});
