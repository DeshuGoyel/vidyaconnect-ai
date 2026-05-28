import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

type BadgeProps = {
  label: string;
  tone?: "primary" | "success" | "info" | "warning" | "dark";
};

export function Badge({ label, tone = "primary" }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[tone]]}>
      <Text style={[styles.text, tone === "warning" ? styles.darkText : null]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start"
  },
  primary: { backgroundColor: colors.primary },
  success: { backgroundColor: colors.success },
  info: { backgroundColor: colors.info },
  warning: { backgroundColor: colors.warning },
  dark: { backgroundColor: colors.dark },
  text: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800"
  },
  darkText: {
    color: colors.dark
  }
});
