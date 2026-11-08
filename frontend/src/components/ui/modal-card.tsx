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

import { PrimaryButton } from "./primary-button";
import { ThemedText } from "../themed-text";
import { ThemedView } from "./themed-view";

interface ModalCardProps {
  title: string;
  onClose: () => void;
  onSave?: () => void;
  onEdit?: () => void;
  saveButtonText?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  types?: "primary" | "secondary";
}

export function ModalCard({
  title,
  onClose,
  onSave,
  onEdit,
  saveButtonText = "Speichern",
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
        <View style={styles.headerButtons}>
          {onEdit && (
            <TouchableOpacity
              onPress={onEdit}
              activeOpacity={0.7}
              style={[styles.actionButton, { marginRight: 8 }]}
            >
              <MaterialCommunityIcons
                name="pencil-outline"
                size={20}
                color={theme.primary}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.7}
            style={[
              styles.closeButton,
              { backgroundColor: theme.closeBgColor },
            ]}
          >
            <MaterialCommunityIcons
              name="close"
              size={20}
              color={theme.closeIconColor}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        {children}

        {onSave && (
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={onSave} title={saveButtonText} />
          </View>
        )}
      </View>
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
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1, // Titel nimmt Platz ein, schiebt Buttons nach rechts
    marginRight: 10,
  },
  actionButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
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
  buttonContainer: {
    marginTop: 20,
  },
});
