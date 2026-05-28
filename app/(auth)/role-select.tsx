import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/stores/authStore";
import { UserRole } from "@/types/domain";

const roles: Array<{ role: UserRole; title: string; body: string; icon: keyof typeof Ionicons.glyphMap }> = [
  { role: "student", title: "Student", body: "Find teachers and book free demos.", icon: "book" },
  { role: "teacher", title: "Teacher", body: "Create profile and manage classes.", icon: "school" },
  { role: "parent", title: "Parent", body: "Track child progress and payments.", icon: "people" }
];

export default function RoleSelectScreen() {
  const setRole = useAuthStore((state) => state.setRole);

  return (
    <Screen>
      <Text style={styles.title}>Aap VidyaConnect AI kaise use karenge?</Text>
      {roles.map((item) => (
        <Pressable
          key={item.role}
          onPress={() => {
            setRole(item.role);
            router.push("/(auth)/login");
          }}
          style={styles.role}
        >
          <View style={styles.icon}>
            <Ionicons name={item.icon} size={26} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.roleTitle}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={colors.muted} />
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 30, lineHeight: 36, fontWeight: "900" },
  role: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border
  },
  icon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "rgba(255, 107, 0, 0.12)",
    alignItems: "center",
    justifyContent: "center"
  },
  roleTitle: { color: colors.dark, fontSize: 19, fontWeight: "900" },
  body: { color: colors.muted, marginTop: 4 }
});
