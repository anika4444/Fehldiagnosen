import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";

import { ThemedText } from "../themed-text";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function PrimaryButton({
  title,
  onPress,
  icon,
  style,
  textStyle,
}: PrimaryButtonProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.button, { backgroundColor: theme.primary }, style]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={theme.textwithbackground}
          style={styles.icon}
        />
      )}
      <ThemedText
        style={[styles.text, { color: theme.textwithbackground }, textStyle]}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 10,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
