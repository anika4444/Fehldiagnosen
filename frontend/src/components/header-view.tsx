import { StyleSheet } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface HeaderViewProps {
  title: string;
  subtitle: string;
}

export function HeaderView({ title, subtitle }: HeaderViewProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={[styles.header, { backgroundColor: theme.primary }]}>
      <ThemedText type="title" colorName="textwithbackground">
        {title}
      </ThemedText>
      <ThemedText colorName="textwithbackground">{subtitle}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});
