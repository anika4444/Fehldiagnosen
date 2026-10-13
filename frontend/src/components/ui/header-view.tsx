import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

import { ThemedText } from "../themed-text";
import { ThemedView } from "./themed-view";

interface HeaderViewProps {
  title: string;
  subtitle: string;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
}

export function HeaderView({
  title,
  subtitle,
  onBackPress,
  rightElement,
}: HeaderViewProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const insets = useSafeAreaInsets();

  return (
    <ThemedView
      style={[
        styles.header,
        {
          backgroundColor: theme.primary,
          paddingTop: insets.top > 0 ? insets.top + 16 : 40,
        },
      ]}
    >
      <View style={styles.titleRow}>
        {onBackPress && (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color={theme.textwithbackground}
            />
          </TouchableOpacity>
        )}

        <ThemedText
          type="title"
          colorName="textwithbackground"
          style={styles.titleText}
        >
          {title}
        </ThemedText>

        {rightElement && (
          <View style={styles.rightElement}>{rightElement}</View>
        )}
      </View>
      <ThemedText
        colorName="textwithbackground"
        style={[styles.subtitle, onBackPress && styles.subtitleWithBackOffset]}
      >
        {subtitle}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  backButton: {
    marginRight: 12,
    marginLeft: -8,
    padding: 4,
  },
  titleText: {
    flex: 1,
  },
  rightElement: {
    marginLeft: 12,
  },
  subtitle: {
    opacity: 0.9,
    fontSize: 14,
  },
  subtitleWithBackOffset: {
    marginLeft: 36,
  },
});