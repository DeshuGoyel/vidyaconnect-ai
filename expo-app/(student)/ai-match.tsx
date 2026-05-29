import { router } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { AIMatchCard } from "@/components/ai/AIMatchCard";
import { AIThinkingAnimation } from "@/components/ai/AIThinkingAnimation";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useAIMatch } from "@/hooks/useAIMatch";

export default function AIMatchingScreen() {
  const matches = useAIMatch();

  return (
    <Screen>
      <Text style={styles.title}>AI Teacher Matching</Text>
      <View style={styles.form}>
        {["Subject: Mathematics", "Class: 8", "Budget: ₹3,500", "Timing: Evening", "Location: Indiranagar", "Session: Home"].map((field) => (
          <TextInput key={field} value={field} editable={false} style={styles.input} />
        ))}
      </View>
      <Button title="Find My Best Teacher" icon="sparkles" />
      <AIThinkingAnimation />
      {matches.map((match) => (
        <AIMatchCard
          key={match.id}
          teacher={match}
          matchScore={match.matchScore}
          reason={match.reason}
          onBook={() => router.push(`/(student)/booking/${match.id}`)}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  form: { gap: 10 },
  input: {
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    color: colors.dark,
    fontWeight: "800"
  }
});
