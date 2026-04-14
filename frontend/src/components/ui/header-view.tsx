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
}

export function HeaderView({ title, subtitle, onBackPress }: HeaderViewProps) {
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
    alignItems: "center", // Zentriert Pfeil und Titel vertikal
    marginBottom: 4, // Abstand zum Untertitel
  },
  backButton: {
    marginRight: 12, // Abstand zwischen Pfeil und Titel
    marginLeft: -8, // Rückt den Pfeil ganz leicht nach links, damit er bündig wirkt
    padding: 4, // Etwas Touch-Fläche
  },
  titleText: {
    flex: 1, // Sorgt dafür, dass der Text den restlichen Platz einnimmt und ggf. umbricht
  },
  subtitle: {
    opacity: 0.9,
    fontSize: 14,
  },
  subtitleWithBackOffset: {
    // Wenn der Pfeil da ist, rücken wir den Untertitel ein,
    // damit er optisch unter dem Titel startet (ca. Pfeilbreite + Margin + Padding)
    marginLeft: 36,
  },
});
