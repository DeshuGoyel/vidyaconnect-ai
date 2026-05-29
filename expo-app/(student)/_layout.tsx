import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "@/constants/colors";

const icons = {
  home: "home",
  map: "map",
  bookings: "calendar",
  dashboard: "analytics"
} as const;

export default function StudentLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
          backgroundColor: colors.card,
          borderTopColor: colors.border
        },
        tabBarIcon: ({ color, size }) => {
          const name = icons[route.name as keyof typeof icons] ?? "ellipse";
          return <Ionicons name={name} color={color} size={size} />;
        }
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="map" options={{ title: "Map" }} />
      <Tabs.Screen name="bookings" options={{ title: "Bookings" }} />
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="ai-match" options={{ href: null }} />
      <Tabs.Screen name="teacher/[id]" options={{ href: null }} />
      <Tabs.Screen name="booking/[teacherId]" options={{ href: null }} />
      <Tabs.Screen name="live-class/[bookingId]" options={{ href: null }} />
    </Tabs>
  );
}
