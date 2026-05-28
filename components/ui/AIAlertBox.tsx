import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

export function AIAlertBox({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.box}>
      <View style={styles.icon}>
        <Ionicons name="sparkles" size={18} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.ai,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    gap: 12
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 107, 0, 0.14)"
  },
  title: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 15
  },
  body: {
    color: "#D8D8E2",
    lineHeight: 20,
    marginTop: 4
  }
});
