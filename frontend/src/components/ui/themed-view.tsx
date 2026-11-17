import { View, type ViewProps } from "react-native";

import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  colorName?: keyof typeof Colors.light;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  colorName = "text",
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorName,
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
