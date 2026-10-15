import * as Clipboard from "expo-clipboard";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CodeCard } from "@/components/emergency/code-card";
import { MenuRow } from "@/components/emergency/menu-row";
import { QrCodeBox } from "@/components/emergency/qr-code-box";
import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import { HeaderView } from "@/components/ui/header-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { EmergencyColors } from "@/constants/emergency";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEmergencyAccess } from "@/hooks/use-emergency-access";
import { usePatient } from "@/hooks/use-patient";
import {
  confirmActionDialog,
  showErrorAlert,
  showSuccessAlert,
} from "@/utils/alerts";
import { getApiErrorMessage } from "@/utils/api-error";
import { formatDateTime } from "@/utils/emergency-date";
import { goBackOr } from "@/utils/navigation";

type CodeTab = "Emergency" | "Treatment";

export default function Emergency() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const { patientId } = usePatient();
  const {
    overview,
    codes,
    isLoading,
    error,
    refresh,
    giveConsent,
    regenerateCode,
    deactivateCode,
    createOneTimeLink,
    revokeAllSessions,
  } = useEmergencyAccess(patientId);

  const [tab, setTab] = useState<CodeTab>("Emergency");
  const [isBusy, setIsBusy] = useState(false);

  // Reload when coming back from settings or the log
  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const run = async (action: () => Promise<unknown>, errorMessage: string) => {
    setIsBusy(true);
    try {
      await action();
    } catch (err) {
      showErrorAlert(getApiErrorMessage(err, errorMessage));
    } finally {
      setIsBusy(false);
    }
  };

  const handleRegenerate = (type: CodeTab) => {
    const hasCode = Boolean(codes?.[type].status);
    const create = () =>
      run(() => regenerateCode(type), "Code konnte nicht erstellt werden.");

    if (!hasCode) {
      create();
      return;
    }

    const lockScreenHint =
      type === "Emergency"
        ? " Sperrbild und Notfallpass müssen Sie danach neu erstellen."
        : "";

    confirmActionDialog(
      "Neuen Code erzeugen?",
      `Der bisherige QR-Code und die PIN funktionieren danach sofort nicht mehr. Laufende Zugriffe mit diesem Code werden beendet.${lockScreenHint}`,
      "Neu erzeugen",
      create,
    );
  };

  const handleDeactivate = (type: CodeTab) => {
    confirmActionDialog(
      "Code deaktivieren?",
      "Niemand kann diesen Code danach noch verwenden. Sie können jederzeit einen neuen erstellen.",
      "Deaktivieren",
      () =>
        run(
          () => deactivateCode(type),
          "Code konnte nicht deaktiviert werden.",
        ),
    );
  };

  // Browsers often cannot share, then the link goes to the clipboard instead
  const shareLink = async (url: string) => {
    try {
      if (Platform.OS === "web")
        throw new Error("Sharing is not available in the browser");
      await Share.share({ message: url });
    } catch {
      await Clipboard.setStringAsync(url);
      showSuccessAlert("Der Link wurde in die Zwischenablage kopiert.");
    }
  };

  const handleOneTimeLink = () =>
    run(async () => {
      await createOneTimeLink();
    }, "Einmal-Link konnte nicht erstellt werden.");

  const handleRevokeAll = () => {
    confirmActionDialog(
      "Alle Zugriffe beenden?",
      "Alle laufenden Sitzungen im Notfallportal enden sofort, auch bereits geöffnete Seiten innerhalb von 30 Sekunden. Ihre Codes bleiben gültig.",
      "Beenden",
      () =>
        run(async () => {
          const count = await revokeAllSessions();
          showSuccessAlert(
            count === 1
              ? "1 Zugriff wurde beendet."
              : `${count} Zugriffe wurden beendet.`,
          );
        }, "Zugriffe konnten nicht beendet werden."),
    );
  };

  const hasConsent = Boolean(overview?.consentGivenAt);
  const oneTime = codes?.OneTime;

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <HeaderView
        title="Notfallzugang"
        subtitle="QR-Code und PIN für Helfer"
        onBackPress={() => goBackOr("/(tabs)/data")}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {isLoading && !overview && (
          <ActivityIndicator color={theme.primary} style={{ marginTop: 24 }} />
        )}

        {error && overview && (
          <View
            style={[
              styles.notice,
              { backgroundColor: EmergencyColors.noticeSoft, marginBottom: 12 },
            ]}
          >
            <Text
              style={[styles.noticeText, { color: EmergencyColors.notice }]}
            >
              {error} Die Anzeige ist eventuell nicht aktuell.
            </Text>
          </View>
        )}

        {error && !overview && (
          <Card>
            <ThemedText>{error}</ThemedText>
            <PrimaryButton title="Erneut versuchen" onPress={refresh} />
          </Card>
        )}

        {overview && !hasConsent && (
          <Card style={styles.gap}>
            <ThemedText type="subtitle">Notfallzugang einrichten</ThemedText>
            <ThemedText>
              Rettungskräfte und Ärzte können Ihre wichtigsten Gesundheitsdaten
              über einen QR-Code oder eine PIN im Browser sehen. Ohne Login und
              nur lesend. Jeder Zugriff wird protokolliert. Solange ADAM
              geöffnet ist, werden Sie zusätzlich sofort benachrichtigt. Eine
              KI-Kurzzusammenfassung Ihrer freigegebenen Daten wird dafür von
              einem externen KI-Dienst erstellt. Sie können sie in den Freigaben
              abschalten.
            </ThemedText>
            <View
              style={[
                styles.notice,
                { backgroundColor: EmergencyColors.noticeSoft },
              ]}
            >
              <Text
                style={[styles.noticeText, { color: EmergencyColors.notice }]}
              >
                Wichtig: Jede Person, die Ihren Code kennt, kann die
                freigegebenen Daten sehen. Sie können die Einwilligung jederzeit
                in den Freigaben widerrufen.
              </Text>
            </View>
            <PrimaryButton
              title="Zustimmen und einrichten"
              icon="shield-check-outline"
              onPress={() =>
                run(
                  giveConsent,
                  "Einwilligung konnte nicht gespeichert werden.",
                )
              }
              isLoading={isBusy}
            />
          </Card>
        )}

        {overview && hasConsent && codes && (
          <>
            <View
              style={[styles.segment, { backgroundColor: theme.surface }]}
              accessibilityRole="tablist"
            >
              {(["Emergency", "Treatment"] as const).map((type) => {
                const isActive = tab === type;
                return (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.segmentButton,
                      isActive && { backgroundColor: theme.background },
                    ]}
                    onPress={() => setTab(type)}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: isActive }}
                  >
                    <ThemedText
                      style={[
                        styles.segmentText,
                        !isActive && { opacity: 0.7 },
                      ]}
                    >
                      {type === "Emergency" ? "Notfallcode" : "Behandlungscode"}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>

            <CodeCard
              type={tab}
              view={codes[tab]}
              requiresApproval={overview.treatmentRequiresApproval}
              isBusy={isBusy}
              onRegenerate={() => handleRegenerate(tab)}
              onDeactivate={() => handleDeactivate(tab)}
            />

            {tab === "Treatment" && (
              <Card style={styles.gap}>
                <ThemedText type="defaultSemiBold">
                  Einmal-Link für einen Termin
                </ThemedText>
                <ThemedText type="smallText">
                  Gilt {overview.oneTimeLinkHours} Stunden und nur für einen
                  Zugriff, ohne Bestätigung in der App. Praktisch, wenn Sie den
                  Code nicht vorzeigen möchten.
                </ThemedText>
                {oneTime?.accessUrl && oneTime.status ? (
                  <>
                    <QrCodeBox
                      value={oneTime.accessUrl}
                      size={150}
                      label="QR-Code Einmal-Link"
                    />
                    {oneTime.status.expiresAt && (
                      <ThemedText type="smallText">
                        Gültig bis {formatDateTime(oneTime.status.expiresAt)}{" "}
                        Uhr
                      </ThemedText>
                    )}
                    <View style={styles.row}>
                      <PrimaryButton
                        style={styles.flex}
                        title="Teilen"
                        icon="share-variant"
                        onPress={() => shareLink(oneTime.accessUrl!)}
                      />
                      <TouchableOpacity
                        style={[
                          styles.outline,
                          { borderColor: theme.closeBgColor },
                        ]}
                        onPress={() =>
                          run(
                            () => deactivateCode("OneTime"),
                            "Link konnte nicht zurückgezogen werden.",
                          )
                        }
                        accessibilityRole="button"
                      >
                        <Text
                          style={{
                            color: theme.closeIconColor,
                            fontWeight: "700",
                          }}
                        >
                          Zurückziehen
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <PrimaryButton
                    title="Einmal-Link erstellen"
                    icon="link-variant"
                    onPress={handleOneTimeLink}
                    isLoading={isBusy}
                    isLoadingText="Wird erstellt..."
                  />
                )}
              </Card>
            )}

            <ThemedText type="smallText" style={styles.sectionTitle}>
              BEI GESPERRTEM HANDY
            </ThemedText>
            <MenuRow
              icon="cellphone-lock"
              title="Sperrbild erstellen"
              subtitle={
                codes.Emergency.local
                  ? "QR-Code und Notfall-ID als Hintergrundbild"
                  : "Zuerst einen Notfallcode erstellen"
              }
              onPress={() => router.push("/emergency-lockscreen")}
            />
            <MenuRow
              icon="medical-bag"
              title="Notfallpass ausfüllen"
              subtitle="Medikation für den Notfallknopf"
              iconColor={EmergencyColors.emergency}
              iconBackground={EmergencyColors.emergencySoft}
              onPress={() => router.push("/emergency-pass")}
            />

            <ThemedText type="smallText" style={styles.sectionTitle}>
              KONTROLLE
            </ThemedText>
            <MenuRow
              icon="tune-variant"
              title="Freigaben"
              subtitle="Welche Daten welcher Code zeigt"
              onPress={() => router.push("/emergency-settings")}
            />
            <MenuRow
              icon="history"
              title="Zugriffsprotokoll"
              subtitle={
                overview.openSessionCount > 0
                  ? `${overview.openSessionCount} laufende Zugriffe`
                  : "Wer wann zugegriffen hat"
              }
              badge={overview.openSessionCount}
              onPress={() => router.push("/emergency-log")}
            />

            <PrimaryButton
              title="Alle Zugriffe beenden"
              icon="hand-back-left-outline"
              style={{
                backgroundColor: EmergencyColors.emergency,
                marginTop: 16,
              }}
              onPress={handleRevokeAll}
              disabled={isBusy}
            />
            <ThemedText type="smallText" style={styles.centered}>
              Beendet laufende Sitzungen sofort. Ihre Codes bleiben gültig.
            </ThemedText>
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
  gap: {
    gap: 12,
  },
  notice: {
    borderRadius: 14,
    padding: 12,
  },
  noticeText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  segment: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 4,
    marginBottom: 12,
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
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: "700",
    letterSpacing: 0.7,
    opacity: 0.8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flex: {
    flex: 1,
  },
  outline: {
    minHeight: 50,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  centered: {
    textAlign: "center",
    opacity: 0.8,
  },
});
