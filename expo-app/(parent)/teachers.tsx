import { router } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { TeacherCard } from "@/components/teacher/TeacherCard";
import { colors } from "@/constants/colors";
import { teachers } from "@/data/mock";

export default function ParentTeachersScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Child’s Teachers</Text>
      {teachers.slice(0, 2).map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} />)}
      <Button title="Add New Teacher" icon="sparkles" onPress={() => router.push("/(student)/ai-match")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" }
});
