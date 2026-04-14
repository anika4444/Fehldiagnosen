import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";

import { ThemedText } from "../themed-text";

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

      <View
        style={[
          styles.pickerContainer,
          hasError && { borderColor: theme.surface, borderWidth: 1.5 },
        ]}
      >
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={[
            styles.picker,
            {
              color: theme.text,
              backgroundColor: theme.background,
              borderColor: theme.surface,
            },
            Platform.OS === "web" && { borderWidth: 0, outline: "none" },
          ]}
          dropdownIconColor={theme.text}
        >
          <Picker.Item
            label="Bitte wählen..."
            value=""
            color={theme.tabIconDefault}
          />

          {options.map((option, index) => {
            if (!option) return null;
            return <Picker.Item key={index} label={option} value={option} />;
          })}
        </Picker>
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
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  inputError: {
    borderWidth: 1.5,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});
