import React from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { AccessLogCard } from "@/components/emergency/access-log-card";
import { ThemedText } from "@/components/themed-text";
import { HeaderView } from "@/components/ui/header-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEmergencyLog } from "@/hooks/use-emergency-log";
import { usePatient } from "@/hooks/use-patient";
import { confirmActionDialog, showErrorAlert } from "@/utils/alerts";
import { getApiErrorMessage } from "@/utils/api-error";
import { goBackOr } from "@/utils/navigation";

export default function EmergencyLog() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const { patientId } = usePatient();
  const { logs, isLoading, error, refresh, revokeSession } =
    useEmergencyLog(patientId);

  const handleEndSession = (sessionId: number) => {
    confirmActionDialog(
      "Zugriff beenden?",
      "Die Person im Portal sieht Ihre Daten danach nicht mehr.",
      "Beenden",
      async () => {
        try {
          await revokeSession(sessionId);
        } catch (err) {
          showErrorAlert(
            getApiErrorMessage(err, "Zugriff konnte nicht beendet werden."),
          );
        }
      },
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <HeaderView
        title="Zugriffsprotokoll"
        subtitle="Wer wann auf Ihre Daten zugegriffen hat"
        onBackPress={() => goBackOr("/emergency")}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refresh}
            tintColor={theme.primary}
          />
        }
      >
        {error && <ThemedText>{error}</ThemedText>}

        {!isLoading && !error && logs.length === 0 && (
          <ThemedText style={styles.empty}>
            Bisher hat niemand Ihren Notfallzugang verwendet.
          </ThemedText>
        )}

        {logs.map((log) => (
          <AccessLogCard
            key={log.id}
            log={log}
            onEndSession={handleEndSession}
          />
        ))}

        <ThemedText type="smallText" style={styles.footnote}>
          Name und Einrichtung sind freiwillige Angaben der zugreifenden Person
          und werden nicht überprüft.
        </ThemedText>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 48,
  },
  empty: {
    textAlign: "center",
    marginVertical: 24,
    opacity: 0.8,
  },
  footnote: {
    marginTop: 8,
    opacity: 0.8,
  },
});
