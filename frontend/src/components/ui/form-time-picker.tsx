import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";

import { ThemedText } from "./themed-text";

interface FormTimePickerProps {
  label: string;
  time: Date;
  onTimeChange: (event: any, selectedTime?: Date) => void;
  isRequired?: boolean;
}

export function FormTimePicker({
  label,
  time,
  onTimeChange,
  isRequired = false,
}: FormTimePickerProps) {
  const theme = Colors[useColorScheme() ?? "light"];
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: any, selectedTime?: Date) => {
    setShowPicker(Platform.OS === "ios");
    onTimeChange(event, selectedTime);
  };

  return (
    <View style={styles.inputGroup}>
      <ThemedText style={styles.label}>
        {label}{" "}
        {isRequired && (
          <ThemedText
            style={[styles.requiredAsterisk, { color: theme.closeIconColor }]}
          >
            *
          </ThemedText>
        )}
      </ThemedText>
      <TouchableOpacity
        style={[
          styles.input,
          styles.rowInput,
          { backgroundColor: theme.background },
        ]}
        onPress={() => setShowPicker(true)}
      >
        <MaterialCommunityIcons
          name="clock-outline"
          size={20}
          color={theme.text}
        />
        <ThemedText>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </ThemedText>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          onChange={handleChange}
          display={Platform.OS === "ios" ? "spinner" : "default"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  requiredAsterisk: {
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  rowInput: {
    flexDirection: "row",
    alignItems: "center",
  },
});
