import React from "react";
import { StyleSheet, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";

import { ThemedText } from "../themed-text";
import { BaseInlinePicker } from "./base-inline-picker";

interface FormPickerProps {
  label: string;
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  options: (string | null)[];
  isRequired?: boolean;
  errorText?: string | boolean;
}

export function FormPicker({
  label,
  selectedValue,
  onValueChange,
  options,
  isRequired,
  errorText,
}: FormPickerProps) {
  const theme = Colors[useColorScheme() ?? "light"];
  const hasError = !!errorText;

  const validOptions = options.filter((o): o is string => !!o);

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

      <View style={styles.pickerFlexWrapper}>
        <BaseInlinePicker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          options={validOptions}
          placeholder="Bitte wählen..."
          hasError={hasError}
        />
      </View>

      {typeof errorText === "string" && (
        <ThemedText style={[styles.errorText, { color: theme.closeIconColor }]}>
          {errorText}
        </ThemedText>
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
  pickerFlexWrapper: {
    flexDirection: "row",
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});
