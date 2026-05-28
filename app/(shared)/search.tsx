import { StyleSheet, Text, TextInput } from "react-native";
import { Screen } from "@/components/ui/Screen";
import { TeacherCard } from "@/components/teacher/TeacherCard";
import { colors } from "@/constants/colors";
import { teachers } from "@/data/mock";

export default function SearchScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Search</Text>
      <TextInput placeholder="Subject, class, locality" style={styles.input} />
      {teachers.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} />)}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.dark, fontSize: 28, fontWeight: "900" },
  input: { minHeight: 54, borderRadius: 16, backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, paddingHorizontal: 14 }
});
