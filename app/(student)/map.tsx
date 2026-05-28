import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { TeacherMiniCard } from "@/components/teacher/TeacherMiniCard";
import { TeacherMapPin } from "@/components/teacher/TeacherMapPin";
import { Badge } from "@/components/ui/Badge";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { teachers } from "@/data/mock";

export default function TeacherMapScreen() {
  return (
    <Screen scroll={false}>
      <Text style={styles.title}>Nearby Teacher Map</Text>
      <View style={styles.filters}>
        <Badge label="500m" tone="primary" />
        <Badge label="Subject" tone="dark" />
        <Badge label="Price" tone="dark" />
        <Badge label="Rating" tone="dark" />
      </View>
      <View style={styles.mapMock}>
        <View style={styles.you}>
          <Ionicons name="radio-button-on" size={34} color={colors.info} />
          <Text style={styles.youText}>You are here</Text>
        </View>
        <View style={[styles.pin, { left: "24%", top: "28%" }]}><TeacherMapPin /></View>
        <View style={[styles.pin, { left: "66%", top: "38%" }]}><TeacherMapPin /></View>
        <View style={[styles.pin, { left: "48%", top: "62%" }]}><TeacherMapPin /></View>
      </View>
      <View style={styles.sheet}>
        <Text style={styles.sheetTitle}>Teachers near you</Text>
        {teachers.map((teacher) => <TeacherMiniCard key={teacher.id} teacher={teacher} />)}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 26, fontWeight: "900" },
  filters: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  mapMock: { flex: 1, minHeight: 320, borderRadius: 24, backgroundColor: "#EAF2E6", overflow: "hidden", borderWidth: 1, borderColor: colors.border },
  you: { position: "absolute", left: "38%", top: "45%", alignItems: "center" },
  youText: { color: colors.info, fontWeight: "900", marginTop: 2 },
  pin: { position: "absolute" },
  sheet: { gap: 10, paddingTop: 4 },
  sheetTitle: { color: colors.dark, fontSize: 19, fontWeight: "900" }
});
