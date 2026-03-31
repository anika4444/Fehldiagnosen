import React from "react";
import { ActivityIndicator } from "react-native";

import { SymptomCard } from "@/components/symptom/symptom-card";
import { ThemedText } from "@/components/themed-text";
import { PatientSymptomResponse } from "@/types/symptom-type";

interface SymptomListSectionProps {
  formattedDate: string;
  isLoading: boolean;
  error: string | null;
  symptoms: PatientSymptomResponse[];
  primaryColor: string;
  onDelete: (id: number) => void;
  onEdit: (symptom: PatientSymptomResponse) => void;
}

export function SymptomListSection({
  formattedDate,
  isLoading,
  error,
  symptoms,
  primaryColor,
  onDelete,
  onEdit,
}: SymptomListSectionProps) {
  return (
    <>
      <ThemedText type="subtitle">Symptome am {formattedDate}</ThemedText>

      {isLoading && <ActivityIndicator size="large" color={primaryColor} />}
      {error && <ThemedText style={{ color: "red" }}>{error}</ThemedText>}

      {!isLoading && !error && symptoms.length === 0 && (
        <ThemedText>Keine Symptome für dieses Datum gefunden.</ThemedText>
      )}

      {!isLoading &&
        symptoms.map((symptom) => (
          <SymptomCard
            key={symptom.id}
            symptom={symptom}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
    </>
  );
}
