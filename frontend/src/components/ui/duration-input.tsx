import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";

import { ThemedText } from "../themed-text";
import { BaseInlinePicker } from "./base-inline-picker";

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

  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("Minuten");

  useEffect(() => {
    if (value && typeof value === "string" && value.trim() !== "") {
      const parts = value.trim().split(" ");
      setAmount(parts[0] ?? "");

      if (parts[1] && UNITS.includes(parts[1])) {
        setUnit(parts[1]);
      }
    } else {
      setAmount("");
    }
  }, [value]);

  const handleAmountChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    setAmount(cleaned);
    if (cleaned) {
      onChangeText(`${cleaned} ${unit}`);
    } else {
      onChangeText("");
    }
  };

  const handleUnitChange = (selectedUnit: string) => {
    if (!selectedUnit || typeof selectedUnit !== "string") return;

    setUnit(selectedUnit);
    if (amount) {
      onChangeText(`${amount} ${selectedUnit}`);
    }
  };

  return (
    <View style={styles.inputGroup}>
      <ThemedText style={styles.label}>
        {label}{" "}
        {isRequired && (
          <ThemedText
            style={{ color: theme.closeIconColor, fontWeight: "bold" }}
          >
            *
          </ThemedText>
        )}
      </ThemedText>

      <View style={styles.row}>
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

        <View style={styles.unitPickerFlex}>
          <BaseInlinePicker
            selectedValue={unit}
            onValueChange={handleUnitChange}
            options={UNITS}
            placeholder=""
            hasError={hasError}
          />
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
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
  },
  numberInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    height: 50,
  },
  unitPickerFlex: {
    flex: 2,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});
