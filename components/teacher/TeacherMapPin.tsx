import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { colors } from "@/constants/colors";

export function TeacherMapPin() {
  return (
    <View style={styles.pin}>
      <Ionicons name="school" size={18} color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  pin: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderColor: "#fff",
    borderWidth: 3
  }
});
