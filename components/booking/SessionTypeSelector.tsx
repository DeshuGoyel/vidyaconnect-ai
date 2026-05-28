import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";
import { SessionType } from "@/types/domain";

const options: Array<{ value: SessionType; label: string; icon: keyof typeof Ionicons.glyphMap }> = [
  { value: "home", label: "Home Visit", icon: "home" },
  { value: "online", label: "Online", icon: "videocam" },
  { value: "group", label: "Group", icon: "people" }
];

export function SessionTypeSelector({
  value,
  onChange
}: {
  value: SessionType;
  onChange: (value: SessionType) => void;
}) {
  return (
    <View style={styles.row}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.option, selected && styles.selected]}
          >
            <Ionicons name={option.icon} size={18} color={selected ? "#fff" : colors.dark} />
            <Text style={[styles.label, selected && styles.selectedLabel]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8
  },
  option: {
    flex: 1,
    minHeight: 74,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  label: {
    color: colors.dark,
    fontWeight: "800",
    fontSize: 12
  },
  selectedLabel: {
    color: "#fff"
  }
});
