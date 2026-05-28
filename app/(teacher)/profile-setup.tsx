import { StyleSheet, Text, TextInput } from "react-native";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";

export default function TeacherProfileSetupScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Profile Setup</Text>
      {["Bio", "Qualifications", "Subjects", "Classes taught", "Price per month"].map((field) => (
        <TextInput key={field} placeholder={field} style={styles.input} />
      ))}
      <Button title="Save Profile" icon="save" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  input: { minHeight: 54, borderRadius: 16, backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, paddingHorizontal: 14 }
});
