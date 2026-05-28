import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";

const slides = [
  { icon: "search", title: "Find Nearby Teachers", body: "Subject, locality, budget aur timing ke hisaab se trusted teachers." },
  { icon: "sparkles", title: "AI Recommended", body: "VidyaConnect AI best-fit teachers ko smart score ke saath rank karta hai." },
  { icon: "wallet", title: "Free Demo First", body: "Students ko 3 free demo classes milti hain, phir payment ya subscription." }
] as const;

export default function OnboardingScreen() {
  return (
    <Screen>
      <View>
        <Text style={styles.kicker}>Welcome</Text>
        <Text style={styles.title}>Tuition discovery that feels local, smart, and simple.</Text>
      </View>

      {slides.map((slide) => (
        <Card key={slide.title}>
          <View style={styles.slide}>
            <View style={styles.icon}>
              <Ionicons name={slide.icon} size={24} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.slideTitle}>{slide.title}</Text>
              <Text style={styles.body}>{slide.body}</Text>
            </View>
          </View>
        </Card>
      ))}

      <Button title="Choose Role" icon="people" onPress={() => router.push("/(auth)/role-select")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  kicker: { color: colors.primary, fontWeight: "900", marginBottom: 8 },
  title: { color: colors.dark, fontSize: 30, lineHeight: 36, fontWeight: "900" },
  slide: { flexDirection: "row", gap: 14 },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255, 107, 0, 0.12)",
    alignItems: "center",
    justifyContent: "center"
  },
  slideTitle: { color: colors.dark, fontWeight: "900", fontSize: 17 },
  body: { color: colors.muted, lineHeight: 21, marginTop: 4 }
});
