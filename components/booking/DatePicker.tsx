import { addDays, format } from "date-fns";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { colors } from "@/constants/colors";
import { availableDates } from "@/data/mock";

export function DatePicker({
  value,
  onChange
}: {
  value: string | null;
  onChange: (value: string) => void;
}) {
  const dates = Array.from({ length: 14 }, (_, index) => format(addDays(new Date(), index + 1), "yyyy-MM-dd"));

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {dates.map((date) => {
        const available = availableDates.includes(date);
        const selected = value === date;
        return (
          <Pressable
            key={date}
            disabled={!available}
            onPress={() => onChange(date)}
            style={[styles.date, !available && styles.unavailable, selected && styles.selected]}
          >
            <Text style={[styles.day, selected && styles.selectedText]}>{format(new Date(date), "EEE")}</Text>
            <Text style={[styles.number, selected && styles.selectedText]}>{format(new Date(date), "d")}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 10
  },
  date: {
    width: 66,
    height: 78,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border
  },
  unavailable: {
    opacity: 0.36
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  day: {
    color: colors.muted,
    fontWeight: "800"
  },
  number: {
    color: colors.dark,
    fontSize: 22,
    fontWeight: "900",
    marginTop: 5
  },
  selectedText: {
    color: "#fff"
  }
});
