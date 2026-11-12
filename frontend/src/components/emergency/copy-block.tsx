import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface CopyBlockProps {
  title: string;
  text: string;
}

// One field of the system emergency pass, ready to paste
export function CopyBlock({ title, text }: CopyBlockProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
        <TouchableOpacity
          style={[styles.button, { borderColor: theme.primary }]}
          onPress={handleCopy}
          accessibilityRole="button"
          accessibilityLabel={`${title} kopieren`}
        >
          <MaterialCommunityIcons
            name={isCopied ? "check" : "content-copy"}
            size={16}
            color={theme.primary}
          />
          <Text style={[styles.buttonText, { color: theme.primary }]}>
            {isCopied ? "Kopiert" : "Kopieren"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.textBox, { backgroundColor: theme.surface }]}>
        <ThemedText style={styles.text} selectable>
          {text}
        </ThemedText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minHeight: 44,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
  },
  textBox: {
    borderRadius: 12,
    padding: 12,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
  },
});
