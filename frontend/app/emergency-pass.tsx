import { useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CopyBlock } from "@/components/emergency/copy-block";
import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import { HeaderView } from "@/components/ui/header-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { EmergencyColors } from "@/constants/emergency";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEmergencyAccess } from "@/hooks/use-emergency-access";
import { useEmergencyPreview } from "@/hooks/use-emergency-preview";
import { usePatient } from "@/hooks/use-patient";
import { EmergencyPreviewResponse } from "@/types/emergency-type";
import { showErrorAlert } from "@/utils/alerts";
import { formatDateTime } from "@/utils/emergency-date";
import { goBackOr } from "@/utils/navigation";

type Os = "ios" | "android";

interface PassBlock {
  title: string;
  text: string;
}

interface PassContent {
  blocks: PassBlock[];
  // Why a field has no text, shown instead of a misleading "none"
  hints: string[];
}

const STEPS: Record<Os, string[]> = {
  ios: [
    "Health App öffnen und oben rechts auf Ihr Profilbild tippen.",
    "Notfallpass wählen und Bearbeiten tippen.",
    "Die Texte oben in die passenden Felder einfügen.",
    "Die Anzeige bei gesperrtem Gerät einschalten und sichern.",
  ],
  android: [
    "Einstellungen öffnen und Sicherheit und Notfall wählen.",
    "Notfallinformationen und dann Medizinische Informationen öffnen.",
    "Die Texte oben in die passenden Felder einfügen.",
    "Prüfen, ob die Anzeige auf dem Sperrbildschirm aktiv ist.",
  ],
};

// Builds the texts for the system emergency pass from the data the emergency code shares.
// An empty field must never say "none": a rescuer would read that as "takes no medication".
function buildContent(
  preview: EmergencyPreviewResponse,
  hasEmergencyCode: boolean,
): PassContent {
  const blocks: PassBlock[] = [];
  const hints: string[] = [];

  if (!preview.medications) {
    hints.push(
      "Medikamente sind für den Notfallcode nicht freigegeben. Sie können das unter Freigaben ändern.",
    );
  } else if (preview.medications.length === 0) {
    hints.push(
      "In ADAM sind keine aktuellen Medikamente erfasst. Tragen Sie diese bei Bedarf selbst ein.",
    );
  } else {
    blocks.push({
      title: "Medikamente",
      text: preview.medications
        .map((m) =>
          [m.name, m.dosage, m.intakeFrequency].filter(Boolean).join(" "),
        )
        .join("\n"),
    });
  }

  if (!preview.chronicConditions) {
    hints.push("Erkrankungen sind für den Notfallcode nicht freigegeben.");
  } else if (preview.chronicConditions.length > 0) {
    blocks.push({
      title: "Erkrankungen",
      text: preview.chronicConditions
        .map((c) => (c.icdCode ? `${c.title} (${c.icdCode})` : c.title))
        .join("\n"),
    });
  }

  const notes = [
    ...(preview.redFlags ?? [])
      .filter((flag) => flag.source === "Medication")
      .map((flag) => `${flag.title}: ${flag.text}`),
    hasEmergencyCode ? "Weitere Daten: QR-Code auf dem Sperrbild scannen." : "",
  ].filter(Boolean);

  if (notes.length > 0)
    blocks.push({ title: "Medizinische Hinweise", text: notes.join("\n") });

  return { blocks, hints };
}

export default function EmergencyPass() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const { patientId } = usePatient();
  const { preview, isLoading, error, refresh } = useEmergencyPreview(patientId);
  const { codes, refresh: refreshCodes } = useEmergencyAccess(patientId);
  const [os, setOs] = useState<Os>(
    Platform.OS === "android" ? "android" : "ios",
  );

  useFocusEffect(
    useCallback(() => {
      refreshCodes();
    }, [refreshCodes]),
  );

  const hasEmergencyCode = Boolean(codes?.Emergency.status);
  const content = useMemo(
    () => (preview ? buildContent(preview, hasEmergencyCode) : null),
    [preview, hasEmergencyCode],
  );

  const openSettings = async () => {
    try {
      if (os === "ios") await Linking.openURL("x-apple-health://");
      else await Linking.sendIntent("android.settings.SETTINGS");
    } catch {
      showErrorAlert(
        "Die Einstellungen konnten nicht geöffnet werden. Bitte öffnen Sie sie manuell.",
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <HeaderView
        title="Notfallpass"
        subtitle="Sichtbar ohne Entsperren"
        onBackPress={() => goBackOr("/emergency")}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="smallText">
          Ihr Handy zeigt diese Angaben auch gesperrt, sobald jemand auf Notfall
          tippt. ADAM darf dort nicht selbst schreiben, deshalb kopieren Sie die
          Texte einmal hinein.
        </ThemedText>

        <View
          style={[styles.segment, { backgroundColor: theme.surface }]}
          accessibilityRole="tablist"
        >
          {(["ios", "android"] as const).map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.segmentButton,
                os === value && { backgroundColor: theme.background },
              ]}
              onPress={() => setOs(value)}
              accessibilityRole="tab"
              accessibilityState={{ selected: os === value }}
            >
              <ThemedText
                style={[styles.segmentText, os !== value && { opacity: 0.7 }]}
              >
                {value === "ios" ? "iPhone" : "Android"}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {isLoading && !preview && <ActivityIndicator color={theme.primary} />}

        {error && (
          <Card>
            <ThemedText>{error}</ThemedText>
            <PrimaryButton title="Erneut versuchen" onPress={refresh} />
          </Card>
        )}

        {content?.blocks.map((block) => (
          <CopyBlock key={block.title} title={block.title} text={block.text} />
        ))}

        {content && content.hints.length > 0 && (
          <View
            style={[
              styles.notice,
              { backgroundColor: EmergencyColors.noticeSoft },
            ]}
          >
            {content.hints.map((hint) => (
              <Text
                key={hint}
                style={[styles.noticeText, { color: EmergencyColors.notice }]}
              >
                {hint}
              </Text>
            ))}
          </View>
        )}

        <Card style={styles.gap}>
          <ThemedText type="defaultSemiBold">
            So geht es auf {os === "ios" ? "dem iPhone" : "Android"}
          </ThemedText>
          {STEPS[os].map((step, index) => (
            <ThemedText key={step} type="smallText">
              {index + 1}. {step}
            </ThemedText>
          ))}
          {Platform.OS === os && (
            <PrimaryButton
              title={
                os === "ios" ? "Health App öffnen" : "Einstellungen öffnen"
              }
              icon="open-in-new"
              onPress={openSettings}
            />
          )}
        </Card>

        {preview?.lastUpdatedAt && (
          <View
            style={[
              styles.notice,
              { backgroundColor: EmergencyColors.noticeSoft },
            ]}
          >
            <Text
              style={[styles.noticeText, { color: EmergencyColors.notice }]}
            >
              Stand {formatDateTime(preview.lastUpdatedAt)}. Wenn sich Ihre
              Medikation ändert, tragen Sie die neuen Texte bitte wieder ein.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 48,
    gap: 12,
  },
  gap: {
    gap: 8,
  },
  segment: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 4,
  },
  segmentButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentText: {
    fontWeight: "700",
    fontSize: 15,
  },
  notice: {
    borderRadius: 16,
    padding: 14,
    gap: 6,
  },
  noticeText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
