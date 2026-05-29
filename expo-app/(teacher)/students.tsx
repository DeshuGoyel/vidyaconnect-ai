import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AIAlertBox } from "@/components/ui/AIAlertBox";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";

const students = [
  { id: "student-1", name: "Rohan Singh", status: "WATCH", color: colors.warning },
  { id: "student-2", name: "Priya Rao", status: "GREAT", color: colors.success },
  { id: "student-3", name: "Kabir Mehta", status: "URGENT", color: colors.danger }
];

export default function StudentsListScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Students</Text>
      {students.map((student) => (
        <Pressable key={student.id} onPress={() => router.push(`/(teacher)/student/${student.id}`)}>
          <Card>
            <View style={styles.row}>
              <View style={[styles.dot, { backgroundColor: student.color }]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{student.name}</Text>
                <Text style={styles.body}>Class 8 • Mathematics • {student.status}</Text>
              </View>
            </View>
            <AIAlertBox title="Weak topic" body="Fractions accuracy is below target. Assign 10 mixed practice questions." />
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  row: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  name: { color: colors.dark, fontSize: 18, fontWeight: "900" },
  body: { color: colors.muted, marginTop: 4 }
});
