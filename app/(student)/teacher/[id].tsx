import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Screen } from "@/components/ui/Screen";
import { StarRating } from "@/components/ui/StarRating";
import { colors } from "@/constants/colors";
import { teachers } from "@/data/mock";
import { formatRupee, sessionTypeLabel } from "@/utils/formatters";

export default function TeacherProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const teacher = teachers.find((item) => item.id === id) ?? teachers[0];

  return (
    <Screen>
      <Card style={styles.hero}>
        <Avatar uri={teacher.avatarUrl} name={teacher.name} size={86} />
        <Text style={styles.name}>{teacher.name}</Text>
        <Text style={styles.subject}>{teacher.subject} • {teacher.locality}</Text>
        <View style={styles.badges}>
          <Badge label="Verified" tone="info" />
          <Badge label="Top Rated" tone="warning" />
          <Badge label={`${teacher.freeDemos} FREE Classes`} tone="success" />
        </View>
      </Card>

      <View style={styles.stats}>
        <Stat label="Rating" value={teacher.rating.toFixed(1)} />
        <Stat label="Reviews" value={`${teacher.totalReviews}`} />
        <Stat label="Students" value={`${teacher.totalStudents}`} />
        <Stat label="Exp." value={`${teacher.experienceYears}y`} />
      </View>

      <Card>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.body}>{teacher.bio}</Text>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Subjects & Sessions</Text>
        <View style={styles.wrap}>
          {teacher.subjects.map((subject) => <Badge key={subject} label={subject} tone="dark" />)}
          {teacher.sessionTypes.map((type) => <Badge key={type} label={sessionTypeLabel(type)} tone="primary" />)}
        </View>
      </Card>

      <Card>
        <View style={styles.reviewHeader}>
          <Text style={styles.sectionTitle}>Student Reviews</Text>
          <StarRating rating={teacher.rating} />
        </View>
        <Text style={styles.body}>“Concepts bahut clearly samjhate hain. Weekly tests se marks improve hue.”</Text>
        <ProgressBar value={92} tone={colors.success} />
      </Card>

      <Card style={styles.priceCard}>
        <View>
          <Text style={styles.price}>{formatRupee(teacher.pricePerMonth)}/mo</Text>
          <Text style={styles.body}>First {teacher.freeDemos} classes free</Text>
        </View>
        <Ionicons name="gift" size={26} color={colors.success} />
      </Card>

      <Button title="Book Now" icon="calendar" onPress={() => router.push(`/(student)/booking/${teacher.id}`)} />
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: "center", gap: 8 },
  name: { color: colors.dark, fontSize: 27, fontWeight: "900" },
  subject: { color: colors.muted, fontWeight: "800" },
  badges: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 8 },
  stats: { flexDirection: "row", gap: 8 },
  stat: { flex: 1, backgroundColor: colors.card, borderRadius: 16, padding: 12, alignItems: "center", borderWidth: 1, borderColor: colors.border },
  statValue: { color: colors.dark, fontSize: 19, fontWeight: "900" },
  statLabel: { color: colors.muted, fontSize: 12, fontWeight: "800", marginTop: 3 },
  sectionTitle: { color: colors.dark, fontSize: 18, fontWeight: "900", marginBottom: 8 },
  body: { color: colors.muted, lineHeight: 21 },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  reviewHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  priceCard: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "rgba(0, 196, 122, 0.08)" },
  price: { color: colors.dark, fontSize: 23, fontWeight: "900" }
});
