import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";
import {
  ConditionStatus,
  EntryBy,
  MedicalHistoryEntryResponse,
} from "@/types/medical-history-entry-type";

import { ModalCard } from "../modal-card";
import { ThemedText } from "../themed-text";

interface MedicalHistoryEntryCardProps {
  entry: MedicalHistoryEntryResponse;
  onDelete: (id: number) => void;
  onEdit: (entry: MedicalHistoryEntryResponse) => void;
}

export const MedicalHistoryEntryCard: React.FC<
  MedicalHistoryEntryCardProps
> = ({ entry, onDelete, onEdit }) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const isChronic = entry.status === ConditionStatus.Chronical;
  const isInRemission = entry.status === ConditionStatus.InRemission;

  const statusLabel = isChronic
    ? "Chronisch"
    : isInRemission
      ? "In Remission"
      : "Aktiv";

  const statusBadgeBackground = isChronic
    ? "#E6F4EA"
    : isInRemission
      ? "#E8F0FE"
      : "#FFF4E5";

  const statusTextColor = isChronic
    ? "#1E8E3E"
    : isInRemission
      ? "#1A73E8"
      : "#D97706";

  return (
    <ModalCard
      title={entry.diagnosis}
      types="secondary"
      onClose={() => onDelete(entry.id)}
      onEdit={() => onEdit(entry)}
    >
      <View style={styles.statusRow}>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: statusBadgeBackground,
            },
          ]}
        >
          <ThemedText style={[styles.statusText, { color: statusTextColor }]}>
            {statusLabel}
          </ThemedText>
        </View>
      </View>

      {/* Diagnosedatum */}
      <View style={styles.infoRow}>
        <Ionicons name="calendar-outline" size={18} color={theme.icon} />
        <ThemedText style={styles.infoText}>
          Diagnostiziert: {entry.year}
        </ThemedText>
      </View>

      {/* Kommentar / Anmerkungen */}
      {entry.comment && (
        <View style={[styles.commentBox, { backgroundColor: "#F8F9FA" }]}>
          <ThemedText style={styles.commentText}>{entry.comment}</ThemedText>
        </View>
      )}

      {/* KI Button - Basierend auf Design */}
      <TouchableOpacity
        style={[styles.aiButton, { backgroundColor: "#00966A" }]}
        onPress={() => {
          /* KI Logik hier */
        }}
      >
        <ThemedText style={styles.aiButtonText}>
          Vorerkrankung mit KI erklären lassen
        </ThemedText>
      </TouchableOpacity>

      {/* Erstellt von Info */}
      <View style={[styles.entryByBadge, { backgroundColor: "#E6F4EA" }]}>
        <Ionicons name="people-outline" size={14} color="#1E8E3E" />
        <ThemedText style={[styles.entryByText, { color: "#1E8E3E" }]}>
          Eingetragen von:{" "}
          {entry.entryBy === EntryBy.Doctor
            ? "Arzt (Dr. Wagner)"
            : `Patient (${entry.entryBy})`}
        </ThemedText>
      </View>
    </ModalCard>
  );
};

const styles = StyleSheet.create({
  statusRow: {
    alignItems: "flex-start",
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  infoText: {
    fontSize: 16,
    opacity: 0.9,
  },
  commentBox: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  aiButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  aiButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  entryByBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: "flex-start",
    gap: 6,
  },
  entryByText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
