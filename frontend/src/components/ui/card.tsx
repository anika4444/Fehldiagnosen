import { StyleProp, StyleSheet, useColorScheme, ViewStyle } from "react-native";

import { Colors } from "@/constants/theme";

import { ThemedView } from "./themed-view";

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: "outlined" | "filled";
}
export function Card({
  children,
  style,
  variant = "outlined",
  ...otherProps
}: CardProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const isFilled = variant === "filled";

  return (
    <ThemedView
      lightColor={isFilled ? theme.surface : theme.background}
      darkColor={isFilled ? theme.surface : theme.background}
      style={[
        styles.baseCard,
        {
          borderColor: isFilled ? "transparent" : theme.surface,
          borderWidth: isFilled ? 0 : 1.5,
          shadowOpacity: isFilled ? 0 : 0.05,
          elevation: isFilled ? 0 : 2,
        },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  baseCard: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
});
