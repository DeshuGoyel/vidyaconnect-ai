import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AIAlertBox } from "@/components/ui/AIAlertBox";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { TeacherCard } from "@/components/teacher/TeacherCard";
import { colors } from "@/constants/colors";
import { categories, currentStudent, teachers } from "@/data/mock";

export default function StudentHomeScreen() {
  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Namaste, {currentStudent.name}</Text>
          <Text style={styles.location}>{currentStudent.locality}, {currentStudent.city}</Text>
        </View>
        <Pressable style={styles.bell} onPress={() => router.push("/(shared)/notifications")}>
          <Ionicons name="notifications" size={21} color={colors.dark} />
        </Pressable>
      </View>

      <View style={styles.search}>
        <Ionicons name="search" size={20} color={colors.muted} />
        <TextInput placeholder="Search subject or teacher" placeholderTextColor={colors.muted} style={styles.input} />
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pills}
        renderItem={({ item }) => <Badge label={item} tone={item === "Math" ? "primary" : "dark"} />}
      />

      <Card style={styles.freeCard}>
        <Badge label="FREE DEMO AVAILABLE" tone="success" />
        <Text style={styles.freeTitle}>3 classes free before you pay</Text>
        <Text style={styles.freeBody}>Book a verified teacher today and try the first class without payment.</Text>
        <Button title="Find Best Teacher" icon="sparkles" variant="dark" onPress={() => router.push("/(student)/ai-match")} />
      </Card>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nearby Teachers</Text>
        <Text style={styles.link} onPress={() => router.push("/(student)/map")}>View map</Text>
      </View>
      <FlatList
        horizontal
        data={teachers}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.teacherList}
        renderItem={({ item }) => <TeacherCard teacher={item} compact />}
      />

      <AIAlertBox
        title="AI Recommended For You"
        body="Ananya Sharma is 94% match for Class 8 Maths based on distance, budget, rating, and evening availability."
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  greeting: { color: colors.dark, fontSize: 26, fontWeight: "900" },
  location: { color: colors.muted, marginTop: 4, fontWeight: "700" },
  bell: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.card, alignItems: "center", justifyContent: "center" },
  search: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: colors.card, borderRadius: 18, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, minHeight: 56 },
  input: { flex: 1, color: colors.dark, fontWeight: "700" },
  pills: { gap: 8 },
  freeCard: { backgroundColor: "#0A0A0F" },
  freeTitle: { color: "#fff", fontSize: 24, lineHeight: 30, fontWeight: "900", marginTop: 12 },
  freeBody: { color: "#D8D8E2", lineHeight: 21, marginTop: 6, marginBottom: 16 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  sectionTitle: { color: colors.dark, fontSize: 21, fontWeight: "900" },
  link: { color: colors.primary, fontWeight: "900" },
  teacherList: { gap: 12, paddingRight: 20 }
});
