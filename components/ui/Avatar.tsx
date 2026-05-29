import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

export function Avatar({ uri, name, size = 56 }: { uri?: string; name: string; size?: number }) {
  if (uri) {
    return <Image source={{ uri }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} alt={name} />;
  }

  return (
    <View style={[styles.fallback, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={styles.initial}>{name.slice(0, 1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.creamDark
  },
  fallback: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  initial: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 20
  }
});
