import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { colors } from "@/constants/colors";

export default function RootLayout() {
  return (
    <PaperProvider
      settings={{ icon: (props) => <Ionicons {...props} /> }}
      theme={{
        dark: false,
        colors: {
          primary: colors.primary,
          background: colors.background,
          surface: colors.card,
          onSurface: colors.dark,
          outline: colors.border
        }
      }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(student)" />
        <Stack.Screen name="(teacher)" />
        <Stack.Screen name="(parent)" />
        <Stack.Screen name="(shared)" />
      </Stack>
      <Toast />
    </PaperProvider>
  );
}
