import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import { colors } from "@/constants/colors";
import { Teacher } from "@/types/domain";

export function TeacherMiniCard({ teacher }: { teacher: Teacher }) {
  return (
    <View style={styles.card}>
      <Avatar uri={teacher.avatarUrl} name={teacher.name} size={44} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{teacher.name}</Text>
        <Text style={styles.meta}>{teacher.subject}</Text>
      </View>
      <StarRating rating={teacher.rating} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 16,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border
  },
  name: {
    fontWeight: "900",
    color: colors.dark
  },
  meta: {
    color: colors.muted,
    marginTop: 2
  }
});
