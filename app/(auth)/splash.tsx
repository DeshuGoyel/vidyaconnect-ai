import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => router.replace("/(auth)/onboarding"), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Screen scroll={false}>
      <View style={styles.center}>
        <View style={styles.logo}>
          <Ionicons name="school" size={54} color="#fff" />
        </View>
        <Text style={styles.title}>VidyaConnect AI</Text>
        <Text style={styles.tagline}>Apni Gali Ka Best Teacher</Text>
      </View>
      <Button title="Get Started" icon="arrow-forward" onPress={() => router.replace("/(auth)/onboarding")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14
  },
  logo: {
    width: 112,
    height: 112,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.28,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 }
  },
  title: {
    color: colors.dark,
    fontSize: 34,
    fontWeight: "900"
  },
  tagline: {
    color: colors.muted,
    fontSize: 17,
    fontWeight: "800"
  }
});
