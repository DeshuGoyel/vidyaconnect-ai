import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";
import { timeSlots } from "@/data/mock";

export function TimeSlotGrid({
  value,
  onChange
}: {
  value: string | null;
  onChange: (value: string) => void;
}) {
  return (
    <View style={styles.grid}>
      {timeSlots.map((slot) => {
        const selected = value === slot.label;
        return (
          <Pressable
            key={slot.label}
            disabled={!slot.available}
            onPress={() => onChange(slot.label)}
            style={[
              styles.slot,
              !slot.available && styles.booked,
              slot.available && styles.available,
              selected && styles.selected
            ]}
          >
            <Text style={[styles.text, selected && styles.selectedText, !slot.available && styles.bookedText]}>
              {slot.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  slot: {
    width: "30.8%",
    minHeight: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1
  },
  available: {
    backgroundColor: "rgba(0, 196, 122, 0.12)",
    borderColor: "rgba(0, 196, 122, 0.3)"
  },
  booked: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderColor: "rgba(239, 68, 68, 0.18)"
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  text: {
    color: colors.dark,
    fontWeight: "900",
    fontSize: 12
  },
  bookedText: {
    color: colors.danger
  },
  selectedText: {
    color: "#fff"
  }
});
