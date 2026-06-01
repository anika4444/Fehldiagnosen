import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { useExplainMedicalHistory } from "@/hooks/use-explain-medical-history";
import { MedicalHistoryEntryResponse } from "@/types/medical-history-entry-type";

import { ThemedText } from "../themed-text";
import { DetailField } from "../ui/detail-field";
import { ModalCard } from "../ui/modal-card";
import { PrimaryButton } from "../ui/primary-button";

interface MedicalHistoryEntryCardProps {
  patientId: number | null;
  entry: MedicalHistoryEntryResponse;
  onDelete: (id: number) => void;
  onEdit: (entry: MedicalHistoryEntryResponse) => void;
  onSave: (payload: any, id?: number) => Promise<void>;
}

const getStatusInfo = (status: any) => {
  const s = String(status).toLowerCase();
  // Backend enum order: Chronical = 0, Active = 1, InRemission = 2
  if (s === "0" || s === "chronical")
    return { label: "Chronisch", color: "#FF9800" };
  if (s === "1" || s === "active") return { label: "Aktiv", color: "#4CAF50" };
  if (s === "2" || s === "inremission") return { label: "In Remission", color: "#2196F3" };
  return { label: "Aktiv", color: "#4CAF50" };
};

export const MedicalHistoryEntryCard: React.FC<
  MedicalHistoryEntryCardProps
> = ({ patientId, entry, onDelete, onEdit, onSave }) => {
  const { aiExplanation, isExplaining, explain, setAiExplanation } =
    useExplainMedicalHistory(patientId, entry, onSave);

  useEffect(() => {
    setAiExplanation(entry.aiExplanation || null);
  }, [entry.aiExplanation, setAiExplanation]);

  const statusInfo = getStatusInfo(entry.status);

  return (
    <ModalCard
      title={entry.diagnosis}
      types="secondary"
      onClose={() => onDelete(entry.id)}
      onEdit={() => onEdit(entry)}
    >
      <DetailField label="ICD-10 Code" value={entry.icd10Code || "—"} />
      <DetailField label="Diagnosejahr" value={entry.year} />
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
      <DetailField label="Anmerkungen" value={entry.comment} />
      {aiExplanation && (
        <DetailField label="KI-Erklärung" value={aiExplanation} />
      )}
      <PrimaryButton
        title="Mit KI erklären lassen"
        icon="chat-processing"
        onPress={explain}
        isLoading={isExplaining}
        isLoadingText="Wird generiert..."
      />
    </ModalCard>
  );
};

const styles = StyleSheet.create({
  detailContainer: { marginTop: 12 },
  detailLabel: { fontSize: 14, marginBottom: 4, opacity: 0.8 },
  detailValue: { fontSize: 16 },
});
