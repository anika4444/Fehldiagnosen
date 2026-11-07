import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "../themed-text";

interface DatePickerFieldProps {
  label: string;
  value: string;
  onPress: () => void;
  primaryColor: string;
  backgroundColor: string;
}
export const DatePickerField = ({
  label,
  value,
  onPress,
  primaryColor,
  backgroundColor,
}: DatePickerFieldProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.container}
    >
      <View style={[styles.iconBadge, { backgroundColor: backgroundColor }]}>
        <MaterialCommunityIcons
          name="calendar-edit"
          size={22}
          color={primaryColor}
        />
      </View>
      <View style={styles.textColumn}>
        <ThemedText type="smallText" style={styles.label}>
          {label}
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.value}>
          {value}
        </ThemedText>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color={primaryColor}
        style={{ opacity: 0.4 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  iconBadge: { padding: 10, borderRadius: 12, marginRight: 16 },
  textColumn: { flex: 1 },
  label: { opacity: 0.5, marginBottom: 2 },
  value: { fontSize: 16 },
});
