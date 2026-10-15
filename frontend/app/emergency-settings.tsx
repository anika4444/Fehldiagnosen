import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CategoryMatrix } from "@/components/emergency/category-matrix";
import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import { HeaderView } from "@/components/ui/header-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { EmergencyColors } from "@/constants/emergency";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEmergencySettings } from "@/hooks/use-emergency-settings";
import { usePatient } from "@/hooks/use-patient";
import {
  confirmActionDialog,
  showErrorAlert,
  showSuccessAlert,
} from "@/utils/alerts";
import { getApiErrorMessage } from "@/utils/api-error";
import { formatDate } from "@/utils/emergency-date";
import { goBackOr } from "@/utils/navigation";

export default function EmergencySettings() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const { patientId } = usePatient();
  const {
    settings,
    isLoading,
    isSaving,
    isDirty,
    error,
    toggleCategory,
    setTreatmentRequiresApproval,
    saveSettings,
    revokeConsent,
  } = useEmergencySettings(patientId);

  const handleSave = async () => {
    try {
      await saveSettings();
      showSuccessAlert("Freigaben gespeichert.");
    } catch (err) {
      showErrorAlert(
        getApiErrorMessage(err, "Freigaben konnten nicht gespeichert werden."),
      );
    }
  };

  const handleRevokeConsent = () => {
    confirmActionDialog(
      "Einwilligung widerrufen?",
      "Beide Codes werden sofort deaktiviert und alle laufenden Zugriffe beendet. Ein Sperrbild mit QR-Code funktioniert danach nicht mehr.",
      "Widerrufen",
      async () => {
        try {
          await revokeConsent();
          goBackOr("/emergency");
        } catch (err) {
          showErrorAlert(getApiErrorMessage(err, "Widerruf fehlgeschlagen."));
        }
      },
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <HeaderView
        title="Freigaben"
        subtitle="Was jeder Code zeigt"
        onBackPress={() => goBackOr("/emergency")}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {isLoading && !settings && (
          <ActivityIndicator color={theme.primary} style={{ marginTop: 24 }} />
        )}
        {error && <ThemedText>{error}</ThemedText>}

        {settings && (
          <>
            <ThemedText type="smallText" style={styles.intro}>
              Die Voreinstellung trennt Notfall und Behandlung. Name, Alter,
              Geschlecht und Foto werden nie angezeigt.
            </ThemedText>

            <CategoryMatrix
              categories={settings.categories}
              onToggle={toggleCategory}
            />

            <Card style={styles.switchCard}>
              <View style={styles.switchRow}>
                <ThemedText type="defaultSemiBold" style={styles.flex}>
                  Behandlungscode nur nach Bestätigung in der App
                </ThemedText>
                <Switch
                  value={settings.treatmentRequiresApproval}
                  onValueChange={setTreatmentRequiresApproval}
                  trackColor={{ true: theme.primary, false: "#9CA3AF" }}
                  thumbColor="#FFFFFF"
                  accessibilityLabel="Behandlungscode nur nach Bestätigung in der App"
                />
              </View>
              <ThemedText type="smallText">
                Die Ärztin oder der Arzt gibt den Code ein, Sie erlauben den
                Zugriff auf Ihrem Handy. Dafür muss ADAM geöffnet sein. Ein
                Einmal-Link braucht keine Bestätigung, weil Sie ihn selbst für
                einen Termin erstellen.
              </ThemedText>
            </Card>

            <PrimaryButton
              title="Speichern"
              icon="content-save-outline"
              onPress={handleSave}
              isLoading={isSaving}
              disabled={!isDirty}
            />

            {settings.consentGivenAt && (
              <View
                style={[
                  styles.consent,
                  { backgroundColor: EmergencyColors.noticeSoft },
                ]}
              >
                <Text
                  style={[
                    styles.consentTitle,
                    { color: EmergencyColors.notice },
                  ]}
                >
                  Einwilligung erteilt am {formatDate(settings.consentGivenAt)}
                </Text>
                <Text
                  style={[
                    styles.consentText,
                    { color: EmergencyColors.notice },
                  ]}
                >
                  Jede Person, die Ihren Code kennt, kann die freigegebenen
                  Daten sehen. Sie können die Einwilligung jederzeit widerrufen,
                  dann werden beide Codes deaktiviert.
                </Text>
                <TouchableOpacity
                  style={styles.consentButton}
                  onPress={handleRevokeConsent}
                  accessibilityRole="button"
                >
                  <Text
                    style={[
                      styles.consentLink,
                      { color: EmergencyColors.notice },
                    ]}
                  >
                    Einwilligung widerrufen
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 48,
  },
  intro: {
    marginBottom: 12,
  },
  switchCard: {
    gap: 8,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  flex: {
    flex: 1,
  },
  consent: {
    marginTop: 12,
    borderRadius: 18,
    padding: 16,
    gap: 6,
  },
  consentTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  consentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  consentButton: {
    alignSelf: "flex-start",
    minHeight: 44,
    justifyContent: "center",
  },
  consentLink: {
    fontSize: 14,
    fontWeight: "700",
    textDecorationLine: "underline",
    marginTop: 4,
  },
});
