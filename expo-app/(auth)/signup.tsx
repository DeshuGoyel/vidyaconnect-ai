import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/stores/authStore";
import { signupSchema } from "@/utils/validators";

export default function SignupScreen() {
  const role = useAuthStore((state) => state.role);
  const setName = useAuthStore((state) => state.setName);
  const [name, setLocalName] = useState("");
  const [locality, setLocality] = useState("Indiranagar");
  const [classOrSubject, setClassOrSubject] = useState(role === "teacher" ? "Mathematics" : "Class 8");

  const submit = () => {
    const parsed = signupSchema.safeParse({ name, locality, classOrSubject });
    if (!parsed.success) {
      Toast.show({ type: "error", text1: "Missing details", text2: parsed.error.issues[0]?.message });
      return;
    }
    setName(name);
    if (role === "teacher") router.replace("/(teacher)/home");
    else if (role === "parent") router.replace("/(parent)/home");
    else router.replace("/(student)/home");
  };

  return (
    <Screen>
      <View>
        <Text style={styles.title}>Complete your profile</Text>
        <Text style={styles.body}>Name, location aur class/subject add karke VidyaConnect shuru karein.</Text>
      </View>
      <TextInput value={name} onChangeText={setLocalName} placeholder="Full name" style={styles.input} />
      <TextInput value={locality} onChangeText={setLocality} placeholder="Locality" style={styles.input} />
      <TextInput
        value={classOrSubject}
        onChangeText={setClassOrSubject}
        placeholder={role === "teacher" ? "Primary subject" : "Class"}
        style={styles.input}
      />
      <Button title="Enter App" icon="checkmark-circle" onPress={submit} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 30, fontWeight: "900" },
  body: { color: colors.muted, lineHeight: 22, marginTop: 8 },
  input: {
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: 16,
    color: colors.dark,
    fontSize: 16,
    fontWeight: "700"
  }
});
