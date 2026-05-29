import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/stores/authStore";
import { phoneSchema } from "@/utils/validators";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const setStorePhone = useAuthStore((state) => state.setPhone);

  const continueToSignup = () => {
    const parsed = phoneSchema.safeParse(phone);
    if (!parsed.success) {
      Toast.show({ type: "error", text1: "Invalid number", text2: parsed.error.issues[0]?.message });
      return;
    }
    setStorePhone(phone);
    router.push("/(auth)/signup");
  };

  return (
    <Screen>
      <View>
        <Text style={styles.title}>Login with phone OTP</Text>
        <Text style={styles.body}>Supabase phone auth ke liye yeh screen ready hai. Demo mode mein signup continue karein.</Text>
      </View>
      <View style={styles.inputWrap}>
        <Text style={styles.prefix}>+91</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="9876543210"
          keyboardType="phone-pad"
          maxLength={10}
          style={styles.input}
          placeholderTextColor={colors.muted}
        />
      </View>
      <Button title="Send OTP" icon="chatbubble-ellipses" onPress={continueToSignup} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 30, fontWeight: "900" },
  body: { color: colors.muted, lineHeight: 22, marginTop: 8 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: 16
  },
  prefix: { color: colors.dark, fontWeight: "900", fontSize: 16, marginRight: 10 },
  input: { flex: 1, color: colors.dark, fontSize: 18, fontWeight: "800" }
});
