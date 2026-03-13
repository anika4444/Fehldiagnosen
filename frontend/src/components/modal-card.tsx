import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";

import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface ModalCardProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  types?: "primary" | "secondary";
}

export function ModalCard({
  title,
  onClose,
  children,
  style,
  types = "primary",
}: ModalCardProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const cardBorderColor = types === "primary" ? theme.primary : theme.surface;

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderColor: cardBorderColor,
        },
        style,
      ]}
    >
      <View style={styles.header}>
        <ThemedText style={[styles.title, { color: theme.text }]}>
          {title}
        </ThemedText>
        <TouchableOpacity
          onPress={onClose}
          activeOpacity={0.7}
          style={[styles.closeButton, { backgroundColor: theme.closeBgColor }]}
        >
          <MaterialCommunityIcons
            name="close"
            size={20}
            color={theme.closeIconColor}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>{children}</View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    borderWidth: 1.5,
    marginVertical: 12,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
