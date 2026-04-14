import Slider from "@react-native-community/slider";
import { StyleSheet, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";

import { ThemedText } from "../themed-text";

interface FormSliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  isRequired?: boolean;
}

export function FormSlider({
  label,
  value,
  onValueChange,
  isRequired = false,
}: FormSliderProps) {
  const theme = Colors[useColorScheme() ?? "light"];

  return (
    <View style={styles.inputGroup}>
      <View style={styles.intensityHeader}>
        <ThemedText style={styles.label}>
          {label}{" "}
          {isRequired && (
            <ThemedText style={styles.requiredAsterisk}>*</ThemedText>
          )}
        </ThemedText>
      </View>
      <Slider
        style={{ width: "100%" }}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor={theme.primary}
        maximumTrackTintColor={theme.surface}
        thumbTintColor={theme.primary}
      />
      <View style={styles.sliderLabels}>
        <ThemedText style={styles.sliderLabelText}>Leicht</ThemedText>
        <ThemedText style={styles.sliderLabelText}>Stark</ThemedText>
      </View>
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
    color: "#E53935",
    fontWeight: "bold",
  },
  intensityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  intensityValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  intensityHighlight: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#188B69",
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -4,
  },
  sliderLabelText: {
    fontSize: 12,
    color: "#555",
  },
});
