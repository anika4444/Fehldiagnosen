import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { QrCodeBox } from "@/components/emergency/qr-code-box";
import { StatusPill } from "@/components/emergency/status-pill";
import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import { PrimaryButton } from "@/components/ui/primary-button";
import {
  CODE_TYPE_DESCRIPTIONS,
  CODE_TYPE_LABELS,
  EmergencyColors,
  EmergencyTextColors,
  SESSION_MINUTES,
} from "@/constants/emergency";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { EmergencyCodeView } from "@/hooks/use-emergency-access";

interface CodeCardProps {
  type: "Emergency" | "Treatment";
  view: EmergencyCodeView;
  requiresApproval: boolean;
  isBusy: boolean;
  onRegenerate: () => void;
  onDeactivate: () => void;
}

// "K7QM4XT2" -> "K7QM 4XT2", easier to read out loud
const formatPublicId = (id: string) => `${id.slice(0, 4)} ${id.slice(4)}`;
const formatPin = (pin: string) => `${pin.slice(0, 3)} ${pin.slice(3)}`;

export function CodeCard({
  type,
  view,
  requiresApproval,
  isBusy,
  onRegenerate,
  onDeactivate,
}: CodeCardProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const textColors = EmergencyTextColors[colorScheme];
  const [isPinVisible, setIsPinVisible] = useState(false);

  const isEmergency = type === "Emergency";
  const minutes = SESSION_MINUTES[type];
  const duration = minutes >= 60 ? `${minutes / 60} Std.` : `${minutes} Min.`;
  const { status, local, accessUrl, isMissingOnDevice } = view;

  return (
    <Card style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.pills}>
          <StatusPill
            label={CODE_TYPE_LABELS[type]}
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
          {status && (
            <StatusPill
              label={status.isLocked ? "Gesperrt" : "Aktiv"}
              color={
                status.isLocked
                  ? EmergencyColors.notice
                  : EmergencyColors.success
              }
              backgroundColor={
                status.isLocked
                  ? EmergencyColors.noticeSoft
                  : EmergencyColors.successSoft
              }
            />
          )}
        </View>
        <ThemedText type="smallText">{duration} pro Zugriff</ThemedText>
      </View>

      {!status && (
        <View style={styles.empty}>
          <ThemedText>Noch kein {CODE_TYPE_LABELS[type]} aktiv.</ThemedText>
          <PrimaryButton
            title="Code erstellen"
            icon="qrcode-plus"
            onPress={onRegenerate}
            isLoading={isBusy}
            isLoadingText="Wird erstellt..."
          />
        </View>
      )}

      {status && isMissingOnDevice && (
        <View
          style={[styles.hint, { backgroundColor: EmergencyColors.noticeSoft }]}
        >
          <Text style={[styles.hintText, { color: EmergencyColors.notice }]}>
            Dieser Code wurde auf einem anderen Gerät oder vor einer
            Neuinstallation erstellt. Aus Sicherheitsgründen kann der Server
            QR-Code und PIN nicht erneut anzeigen. Bitte erzeugen Sie einen
            neuen Code.
          </Text>
        </View>
      )}

      {status && local && accessUrl && (
        <>
          <QrCodeBox
            value={accessUrl}
            size={200}
            label={`QR-Code ${CODE_TYPE_LABELS[type]}`}
          />

          <View style={styles.secretRow}>
            <View
              style={[styles.secretBox, { backgroundColor: theme.surface }]}
            >
              <ThemedText type="smallText" style={styles.secretLabel}>
                NOTFALL-ID
              </ThemedText>
              <ThemedText style={styles.secretValue}>
                {formatPublicId(local.publicId)}
              </ThemedText>
            </View>
            <View
              style={[styles.secretBox, { backgroundColor: theme.surface }]}
            >
              <ThemedText type="smallText" style={styles.secretLabel}>
                PIN
              </ThemedText>
              <View style={styles.pinRow}>
                <ThemedText style={styles.secretValue}>
                  {isPinVisible && local.pin ? formatPin(local.pin) : "••• •••"}
                </ThemedText>
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setIsPinVisible((visible) => !visible)}
                  accessibilityRole="button"
                  accessibilityLabel={
                    isPinVisible ? "PIN verbergen" : "PIN anzeigen"
                  }
                >
                  <MaterialCommunityIcons
                    name={isPinVisible ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color={theme.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}

      {status?.isLocked && (
        <ThemedText
          type="smallText"
          style={{ color: textColors.notice, fontWeight: "600" }}
        >
          Nach mehreren falschen PIN-Eingaben ist die PIN-Eingabe vorübergehend
          gesperrt. Der QR-Code funktioniert weiterhin.
        </ThemedText>
      )}

      <ThemedText type="smallText">
        {CODE_TYPE_DESCRIPTIONS[type]}
        {!isEmergency && requiresApproval
          ? " Freigabe in der App ist eingeschaltet."
          : ""}
      </ThemedText>

      {status && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.action, { borderColor: theme.primary }]}
            onPress={onRegenerate}
            disabled={isBusy}
            accessibilityRole="button"
          >
            <Text style={[styles.actionText, { color: theme.primary }]}>
              {isMissingOnDevice ? "Neu erzeugen" : "Neu generieren"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.action, { borderColor: theme.closeBgColor }]}
            onPress={onDeactivate}
            disabled={isBusy}
            accessibilityRole="button"
          >
            <Text style={[styles.actionText, { color: theme.closeIconColor }]}>
              Deaktivieren
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
    paddingVertical: 18,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  pills: {
    flexDirection: "row",
    gap: 8,
  },
  empty: {
    gap: 4,
  },
  hint: {
    borderRadius: 14,
    padding: 12,
  },
  hintText: {
    fontSize: 14,
    lineHeight: 20,
  },
  secretRow: {
    flexDirection: "row",
    gap: 12,
  },
  secretBox: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  secretLabel: {
    fontWeight: "700",
    letterSpacing: 0.6,
    opacity: 0.8,
  },
  secretValue: {
    fontSize: 19,
    fontWeight: "700",
    letterSpacing: 1,
    fontVariant: ["tabular-nums"],
  },
  pinRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eyeButton: {
    width: 44,
    height: 44,
    marginVertical: -10,
    marginRight: -10,
    alignItems: "center",
    justifyContent: "center",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  action: {
    flex: 1,
    minHeight: 46,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    fontSize: 15,
    fontWeight: "700",
  },
});
