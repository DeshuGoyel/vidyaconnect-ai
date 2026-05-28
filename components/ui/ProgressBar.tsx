import { StyleSheet, View } from "react-native";
import { colors } from "@/constants/colors";

export function ProgressBar({ value, tone = colors.primary }: { value: number; tone?: string }) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.min(Math.max(value, 0), 100)}%`, backgroundColor: tone }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 9,
    borderRadius: 999,
    backgroundColor: colors.creamDark,
    overflow: "hidden"
  },
  fill: {
    height: "100%",
    borderRadius: 999
  }
});
