import React from "react";
import { StyleSheet, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { MedicalHistoryEntryResponse } from "@/types/medical-history-entry-type";

import { DetailField } from "../ui/detail-field";
import { ModalCard } from "../ui/modal-card";
import { ThemedText } from "../ui/themed-text";

interface MedicalHistoryEntryCardProps {
  entry: MedicalHistoryEntryResponse;
  onDelete: (id: number) => void;
  onEdit: (entry: MedicalHistoryEntryResponse) => void;
}

const getStatusInfo = (status: any) => {
  const s = String(status).toLowerCase();
  if (s === "0" || s === "active") return { label: "Aktiv", color: "#4CAF50" };
  if (s === "1" || s === "chronical")
    return { label: "Chronisch", color: "#FF9800" };
  if (s === "2" || s === "inremission")
    return { label: "Remission", color: "#2196F3" };
  return { label: "Aktiv", color: "#4CAF50" };
};

export const MedicalHistoryEntryCard: React.FC<
  MedicalHistoryEntryCardProps
> = ({ entry, onDelete, onEdit }) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const id = entry.id;
  const title = entry.diagnosis;
  const icd10 = entry.icd10Code || "—";
  const year = entry.year;
  const comment = entry.comment;
  const statusInfo = getStatusInfo(entry.status);

  return (
    <ModalCard
      title={title}
      types="secondary"
      onClose={() => onDelete(id)}
      onEdit={() => onEdit(entry)}
    >
      <DetailField label="ICD-10 Code" value={icd10} />
      <DetailField label="Diagnosejahr" value={year} />

      <View style={styles.detailContainer}>
        <ThemedText style={styles.detailLabel}>Status:</ThemedText>
        <ThemedText
          style={[
            styles.detailValue,
            { color: statusInfo.color, fontWeight: "700" },
          ]}
        >
          {statusInfo.label}
        </ThemedText>
      </View>

      <DetailField label="Anmerkungen" value={comment} />
    </ModalCard>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    marginTop: 12,
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.8,
  },
  detailValue: {
    fontSize: 16,
  },
});
