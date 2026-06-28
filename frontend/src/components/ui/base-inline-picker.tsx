import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";

import { ThemedText } from "../themed-text";

interface BaseInlinePickerProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  hasError?: boolean;
}

export function BaseInlinePicker({
  selectedValue,
  onValueChange,
  options,
  placeholder = "Bitte wählen...",
  hasError,
}: BaseInlinePickerProps) {
  const theme = Colors[useColorScheme() ?? "light"];
  const [isOpen, setIsOpen] = useState(false);

  const handleValueChange = (itemValue: string | number) => {
    if (itemValue !== undefined && itemValue !== null) {
      onValueChange(itemValue.toString());
    }
  };

  const hasValidPlaceholder =
    typeof placeholder === "string" && placeholder.trim() !== "";

  return Platform.OS === "ios" ? (
    <View
      style={[
        styles.iosWrapper,
        { backgroundColor: theme.background },
        hasError && { borderColor: theme.closeIconColor, borderWidth: 1.5 },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setIsOpen(!isOpen)}
        style={styles.iosTrigger}
      >
        <ThemedText
          style={[
            styles.text,
            { color: selectedValue ? theme.text : theme.tabIconDefault },
          ]}
        >
          {selectedValue || placeholder}
        </ThemedText>
        <ThemedText
          style={{
            color: theme.tabIconDefault,
            fontSize: 12,
            transform: [{ rotate: isOpen ? "180deg" : "0deg" }],
          }}
        >
          ▼
        </ThemedText>
      </TouchableOpacity>

      {isOpen && (
        <View
          style={[
            styles.iosPickerWrapper,
            { borderTopWidth: 1, borderTopColor: theme.surface + "30" },
          ]}
        >
          <Picker
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
            style={{ color: theme.text, backgroundColor: "transparent" }}
            itemStyle={{ color: theme.text, fontSize: 18, height: 150 }}
          >
            {hasValidPlaceholder && (
              <Picker.Item
                label={placeholder}
                value=""
                color={theme.tabIconDefault}
              />
            )}
            {options.length > 0 ? (
              options.map((option, index) => (
                <Picker.Item
                  key={index}
                  label={option}
                  value={option}
                  color={theme.text}
                />
              ))
            ) : (
              <Picker.Item
                label="Keine Optionen"
                value=""
                color={theme.tabIconDefault}
              />
            )}
          </Picker>
        </View>
      )}
    </View>
  ) : (
    <View
      style={[
        styles.pickerContainer,
        { borderColor: theme.surface, backgroundColor: theme.background },
        hasError && { borderColor: theme.closeIconColor, borderWidth: 1.5 },
      ]}
    >
      <Picker
        selectedValue={selectedValue}
        onValueChange={handleValueChange}
        mode="dropdown"
        style={[
          styles.picker,
          { color: theme.text, backgroundColor: theme.background },
          Platform.OS === "web" && { borderWidth: 0, outline: "none" },
        ]}
        dropdownIconColor={theme.text}
      >
        {hasValidPlaceholder && (
          <Picker.Item
            label={placeholder}
            value=""
            color={theme.tabIconDefault}
          />
        )}
        {options.map((option, index) => (
          <Picker.Item
            key={index}
            label={option}
            value={option}
            color={theme.text}
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  iosWrapper: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    flex: 1,
  },
  iosTrigger: {
    height: 50,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
  },
  iosPickerWrapper: {
    height: 150,
    justifyContent: "center",
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    height: 50,
    flex: 1,
  },
  picker: {
    width: "100%",
    height: 50,
  },
});
