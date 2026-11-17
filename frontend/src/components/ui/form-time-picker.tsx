import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Button,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";

import { ThemedText } from "../themed-text";

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
  const [tempTime, setTempTime] = useState<Date>(time);

  const handleChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
      if (selectedTime) {
        onTimeChange(event, selectedTime);
      }
    } else {
      if (selectedTime) {
        setTempTime(selectedTime);
      }
    }
  };

  const handleIosConfirm = () => {
    setShowPicker(false);
    onTimeChange({}, tempTime);
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
        onPress={() => {
          setTempTime(time);
          setShowPicker(true);
        }}
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
        <View style={Platform.OS === "ios" ? styles.iosPickerContainer : null}>
          {Platform.OS === "ios" && (
            <View style={styles.iosHeader}>
              <Button
                title="Fertig"
                onPress={handleIosConfirm}
                color={theme.primary}
              />
            </View>
          )}
          <DateTimePicker
            value={Platform.OS === "ios" ? tempTime : time}
            mode="time"
            is24Hour={true}
            onChange={handleChange}
            display={Platform.OS === "ios" ? "spinner" : "default"}
          />
        </View>
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
  iosPickerContainer: {
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 12,
    marginTop: 8,
    paddingBottom: 8,
  },
  iosHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 12,
    paddingTop: 8,
  },
});
