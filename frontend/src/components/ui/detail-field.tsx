import React from "react";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ui/themed-text";

interface DetailFieldProps {
  label: string;
  value?: string | null | number;
}

export const DetailField = ({ label, value }: DetailFieldProps) => {
  if (!value && value !== 0) return null; // Versteckt das Feld, wenn kein Wert da ist

  return (
    <View style={styles.detailContainer}>
      <ThemedText style={styles.detailLabel}>{label}:</ThemedText>
      <ThemedText style={styles.detailValue}>{value}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    marginTop: 12,
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.8, // Macht das Label leicht transparent, wie in deinem Original
  },
  detailValue: {
    fontSize: 16,
  },
});
