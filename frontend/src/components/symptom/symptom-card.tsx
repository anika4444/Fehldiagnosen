import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

import { Colors } from "@/constants/theme";
import { PatientSymptomResponse } from "@/types/symptom-type";

import { DetailField } from "../ui/detail-field";
import { ModalCard } from "../ui/modal-card";
import { ThemedText } from "../themed-text";

interface SymptomCardProps {
  symptom: PatientSymptomResponse;
  onDelete: (symptomId: number) => void;
  onEdit: (symptom: PatientSymptomResponse) => void;
}

const formatTime = (isoString?: string | null) => {
  if (!isoString) return "--:-- Uhr";

  const date = new Date(isoString);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes} Uhr`;
};

const getIntensityLabel = (intensity: number) => {
  if (intensity <= 3) return "Leicht";
  if (intensity <= 7) return "Mäßig";
  return "Stark";
};
export const SymptomCard: React.FC<SymptomCardProps> = ({
  symptom,
  onDelete,
  onEdit,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const title = symptom.definedSymptomName || symptom.symptomName || "Symptom";
  const intensityLabel = getIntensityLabel(symptom.intensity);

  const intensityPercentage = (symptom.intensity / 10) * 100;

  return (
    <ModalCard
      title={title}
      types="secondary"
      onClose={() => onDelete(symptom.id)}
      onEdit={() => onEdit(symptom)}
    >
      <View style={styles.timeRow}>
        <Ionicons
          name="time-outline"
          size={16}
          color={theme.icon}
          style={styles.timeIcon}
        />
        <ThemedText style={styles.timeText}>
          {formatTime(symptom.occurrenceTime)}
        </ThemedText>
      </View>
      <View style={styles.intensitySection}>
        <View style={styles.intensityTextRow}>
          <ThemedText style={{ fontSize: 14, opacity: 0.8 }}>
            Intensität:
          </ThemedText>
          <ThemedText style={{ fontSize: 16 }}>
            {symptom.intensity}/10-{intensityLabel}
          </ThemedText>
        </View>
        <View
          style={[
            styles.progressBarBackground,
            { backgroundColor: theme.surface },
          ]}
        >
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${intensityPercentage}%`,
                backgroundColor: theme.accent,
              },
            ]}
          />
        </View>
      </View>
      {symptom.details &&
        Object.entries(symptom.details).map(([key, value]) => (
          <DetailField key={key} label={key} value={value} />
        ))}
      <DetailField label="Dauer" value={symptom.duration} />
      <DetailField label="Auslöser" value={symptom.possibleTrigger} />
      <DetailField label="Notizen" value={symptom.notes} />
    </ModalCard>
  );
};

const styles = StyleSheet.create({
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: -5,
  },
  timeIcon: {
    marginRight: 6,
  },
  timeText: {
    fontSize: 16,
  },
  intensitySection: {
    marginBottom: 16,
  },
  intensityTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
});
