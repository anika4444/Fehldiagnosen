import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { StatusPill } from "@/components/emergency/status-pill";
import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import {
  CODE_TYPE_LABELS,
  EmergencyColors,
  EmergencyTextColors,
  METHOD_LABELS,
  OUTCOME_LABELS,
} from "@/constants/emergency";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { EmergencyAccessLogResponse } from "@/types/emergency-type";
import { formatDateTime, formatTime } from "@/utils/emergency-date";

interface AccessLogCardProps {
  log: EmergencyAccessLogResponse;
  onEndSession: (sessionId: number) => void;
}

export function AccessLogCard({ log, onEndSession }: AccessLogCardProps) {
  const colorScheme = useColorScheme() ?? "light";
  const textColors = EmergencyTextColors[colorScheme];
  const isRunning = Boolean(log.runningSessionId);
  const isEmergency = log.codeType === "Emergency";
  const who =
    [log.accessorName, log.accessorInstitution].filter(Boolean).join(", ") ||
    "Keine Angabe";
  const meta = [
    METHOD_LABELS[log.method],
    log.deviceType,
    log.ipAddress && `IP ${log.ipAddress}`,
  ]
    .filter(Boolean)
    .join(", ");

  const outcomeColors =
    log.outcome === "Granted"
      ? {
          color: EmergencyColors.success,
          backgroundColor: EmergencyColors.successSoft,
        }
      : log.outcome === "PendingApproval"
        ? {
            color: EmergencyColors.treatmentText,
            backgroundColor: EmergencyColors.treatmentSoft,
          }
        : log.outcome === "Expired"
          ? {
              color: EmergencyColors.neutral,
              backgroundColor: EmergencyColors.neutralSoft,
            }
          : {
              color: EmergencyColors.notice,
              backgroundColor: EmergencyColors.noticeSoft,
            };

  return (
    <Card style={[styles.card, isRunning && styles.running]}>
      <View style={styles.row}>
        <View style={styles.pills}>
          <StatusPill
            label={CODE_TYPE_LABELS[log.codeType]}
            color={
              isEmergency
                ? EmergencyColors.emergencyText
                : EmergencyColors.treatmentText
            }
            backgroundColor={
              isEmergency
                ? EmergencyColors.emergencySoft
                : EmergencyColors.treatmentSoft
            }
          />
          <StatusPill
            label={isRunning ? "läuft" : OUTCOME_LABELS[log.outcome]}
            {...outcomeColors}
          />
        </View>
        <ThemedText type="smallText">
          {formatDateTime(log.accessedAt)}
        </ThemedText>
      </View>

      <ThemedText type="defaultSemiBold">{who}</ThemedText>
      <ThemedText type="smallText">{meta}</ThemedText>

      {isRunning && log.runningUntil && (
        <>
          <ThemedText
            type="smallText"
            style={[styles.runningText, { color: textColors.emergency }]}
          >
            Sitzung endet automatisch um {formatTime(log.runningUntil)} Uhr.
          </ThemedText>
          <TouchableOpacity
            style={styles.endButton}
            onPress={() => onEndSession(log.runningSessionId!)}
            accessibilityRole="button"
          >
            <Text style={styles.endButtonText}>Diesen Zugriff beenden</Text>
          </TouchableOpacity>
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 6,
  },
  running: {
    borderColor: "#FCA5A5",
    borderWidth: 1.5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  pills: {
    flexDirection: "row",
    gap: 6,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  runningText: {
    fontWeight: "600",
  },
  endButton: {
    marginTop: 6,
    minHeight: 46,
    borderRadius: 14,
    backgroundColor: EmergencyColors.emergency,
    alignItems: "center",
    justifyContent: "center",
  },
  endButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
