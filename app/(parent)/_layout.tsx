import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "@/constants/colors";

export default function ParentLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { height: 70, paddingBottom: 10, paddingTop: 8, backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarIcon: ({ color, size }) => {
          const icon = route.name === "home" ? "home" : route.name === "report" ? "analytics" : route.name === "teachers" ? "school" : "card";
          return <Ionicons name={icon} color={color} size={size} />;
        }
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="report" options={{ title: "Report" }} />
      <Tabs.Screen name="teachers" options={{ title: "Teachers" }} />
      <Tabs.Screen name="payments" options={{ title: "Payments" }} />
    </Tabs>
  );
}
