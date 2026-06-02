import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { ThemedText } from "../themed-text";

interface DurationInputProps {
  label: string;
  isRequired?: boolean;
  value: string;
  onChangeText: (value: string) => void;
  errorText?: string | boolean;
}

const UNITS = ["Sekunden", "Minuten", "Stunden", "Tage"];

export function DurationInput({
  label,
  isRequired,
  value,
  onChangeText,
  errorText,
}: DurationInputProps) {
  const theme = Colors[useColorScheme() ?? "light"];
  const hasError = !!errorText;

  // Wert aufsplitten falls schon gesetzt z.B. "2 Stunden" → ["2", "Stunden"]
  const parts = value.split(" ");
  const initialAmount = parts[0] ?? "";
  const initialUnit = UNITS.includes(parts[1]) ? parts[1] : "Minuten";

  const [amount, setAmount] = useState(initialAmount);
  const [unit, setUnit] = useState(initialUnit);

  const handleAmountChange = (text: string) => {
    // Nur Zahlen erlauben
    const cleaned = text.replace(/[^0-9]/g, "");
    setAmount(cleaned);
    if (cleaned) {
      onChangeText(`${cleaned} ${unit}`); // z.B. "30 Minuten"
    } else {
      onChangeText("");
    }
  };

  const handleUnitChange = (selectedUnit: string) => {
    setUnit(selectedUnit);
    if (amount) {
      onChangeText(`${amount} ${selectedUnit}`); // z.B. "2 Stunden"
    }
  };

  return (
    <View style={styles.inputGroup}>
      <ThemedText style={styles.label}>
        {label}{" "}
        {isRequired && (
          <ThemedText style={{ color: theme.closeIconColor, fontWeight: "bold" }}>
            *
          </ThemedText>
        )}
      </ThemedText>

      <View style={styles.row}>
        {/* Zahlenfeld */}
        <TextInput
          style={[
            styles.numberInput,
            {
              color: theme.text,
              backgroundColor: theme.background,
            },
            hasError && { borderColor: theme.closeIconColor, borderWidth: 1.5 },
          ]}
          value={amount}
          onChangeText={handleAmountChange}
          keyboardType="numeric"
          placeholder="z.B. 30"
          placeholderTextColor={theme.tabIconDefault}
        />

        {/* Einheit Picker */}
        <View
          style={[
            styles.pickerContainer,
            { backgroundColor: theme.background },
            hasError && { borderColor: theme.closeIconColor, borderWidth: 1.5 },
          ]}
        >
          <Picker
            selectedValue={unit}
            onValueChange={handleUnitChange}
            style={[
              styles.picker,
              { color: theme.text, backgroundColor: theme.background },
              Platform.OS === "web" && { borderWidth: 0, outline: "none" },
            ]}
            dropdownIconColor={theme.text}
          >
            {UNITS.map((u) => (
              <Picker.Item key={u} label={u} value={u} />
            ))}
          </Picker>
        </View>
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
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 8 },
  row: { flexDirection: "row", gap: 8 },
  numberInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  pickerContainer: {
    flex: 2,
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
  },
  picker: { height: 50, width: "100%" },
  errorText: { fontSize: 12, marginTop: 4 },
});