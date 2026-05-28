import { StyleSheet, Text, View } from "react-native";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TeacherMiniCard } from "@/components/teacher/TeacherMiniCard";
import { colors } from "@/constants/colors";
import { Teacher } from "@/types/domain";

export function AIMatchCard({
  teacher,
  matchScore,
  reason,
  onBook
}: {
  teacher: Teacher;
  matchScore: number;
  reason: string;
  onBook: () => void;
}) {
  return (
    <Card>
      <View style={styles.top}>
        <Badge label={`${matchScore}% AI Match`} tone={matchScore > 90 ? "primary" : "info"} />
      </View>
      <TeacherMiniCard teacher={teacher} />
      <Text style={styles.title}>Why This Teacher?</Text>
      <Text style={styles.reason}>{reason}</Text>
      <Button title="Book Now" icon="calendar" onPress={onBook} />
    </Card>
  );
}

const styles = StyleSheet.create({
  top: {
    marginBottom: 12
  },
  title: {
    color: colors.dark,
    fontWeight: "900",
    marginTop: 14,
    marginBottom: 4
  },
  reason: {
    color: colors.muted,
    lineHeight: 21,
    marginBottom: 14
  }
});
