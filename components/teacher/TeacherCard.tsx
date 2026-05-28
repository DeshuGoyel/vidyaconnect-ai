import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { colors } from "@/constants/colors";
import { Teacher } from "@/types/domain";
import { formatRupee } from "@/utils/formatters";

export function TeacherCard({ teacher, compact = false }: { teacher: Teacher; compact?: boolean }) {
  return (
    <Card style={compact ? styles.compactCard : undefined}>
      <View style={styles.header}>
        <Avatar uri={teacher.avatarUrl} name={teacher.name} />
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{teacher.name}</Text>
            {teacher.isVerified ? <Ionicons name="checkmark-circle" size={18} color={colors.info} /> : null}
          </View>
          <Text style={styles.meta}>
            {teacher.subject} • {teacher.distanceKm} km
          </Text>
          <View style={styles.row}>
            <StarRating rating={teacher.rating} />
            <Text style={styles.muted}>({teacher.totalReviews})</Text>
          </View>
        </View>
      </View>

      <View style={styles.badges}>
        <Badge label={`${teacher.freeDemos} FREE Classes`} tone="success" />
        <Badge label={`${teacher.experienceYears}+ yrs`} tone="warning" />
      </View>

      {!compact ? <Text style={styles.bio}>{teacher.bio}</Text> : null}

      <View style={styles.footer}>
        <Text style={styles.price}>{formatRupee(teacher.pricePerMonth)}/mo</Text>
        <Button title="View" icon="arrow-forward" onPress={() => router.push(`/(student)/teacher/${teacher.id}`)} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  compactCard: {
    width: 286
  },
  header: {
    flexDirection: "row",
    gap: 12
  },
  info: {
    flex: 1,
    gap: 4
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  name: {
    color: colors.dark,
    fontWeight: "900",
    fontSize: 17
  },
  meta: {
    color: colors.muted,
    fontWeight: "700"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  muted: {
    color: colors.muted
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14
  },
  bio: {
    color: colors.muted,
    lineHeight: 21,
    marginTop: 12
  },
  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12
  },
  price: {
    color: colors.dark,
    fontWeight: "900",
    fontSize: 17
  }
});
