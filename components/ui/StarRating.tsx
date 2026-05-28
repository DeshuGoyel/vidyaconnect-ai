import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

export function StarRating({ rating }: { rating: number }) {
  return (
    <View style={styles.row}>
      <Ionicons name="star" color={colors.warning} size={16} />
      <Text style={styles.text}>{rating.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  text: {
    color: colors.dark,
    fontWeight: "800"
  }
});
