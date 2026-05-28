import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { colors } from "@/constants/colors";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "dark" | "ghost";
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  style?: ViewStyle;
};

export function Button({ title, onPress, variant = "primary", icon, disabled, style }: ButtonProps) {
  const handlePress = () => {
    Haptics.selectionAsync();
    onPress?.();
  };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style
      ]}
    >
      {icon ? <Ionicons name={icon} size={18} color={variant === "secondary" ? colors.dark : "#fff"} /> : null}
      <Text style={[styles.text, variant === "secondary" || variant === "ghost" ? styles.darkText : null]}>
        {title}
      </Text>
    </Pressable>
  );
}

export function IconCircle({
  children,
  style
}: {
  children: ReactNode;
  style?: ViewStyle;
}) {
  return <Pressable style={[styles.iconCircle, style]}>{children}</Pressable>;
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 18
  },
  primary: {
    backgroundColor: colors.primary
  },
  secondary: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1
  },
  dark: {
    backgroundColor: colors.dark
  },
  ghost: {
    backgroundColor: "transparent"
  },
  disabled: {
    opacity: 0.45
  },
  pressed: {
    transform: [{ scale: 0.98 }]
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800"
  },
  darkText: {
    color: colors.dark
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1
  }
});
