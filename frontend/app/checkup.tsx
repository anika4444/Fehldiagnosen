import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { checkupService } from "@/api/checkupService";
import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import { HeaderView } from "@/components/ui/header-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { usePatient } from "@/hooks/use-patient";
import { CheckupSummaryResponse } from "@/types/checkup-type";
import { showErrorAlert } from "@/utils/alerts";

export default function Checkup() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const { patientId } = usePatient();

  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const [from, setFrom] = useState<Date>(oneYearAgo);
  const [to, setTo] = useState<Date>(today);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CheckupSummaryResponse | null>(null);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  const handleStart = async () => {
    if (!patientId) {
      showErrorAlert("Patient-ID nicht gefunden.");
      return;
    }

    if (from > to) {
      showErrorAlert("Das Startdatum darf nicht nach dem Enddatum liegen.");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const data = await checkupService.getCheckupSummary(patientId, from, to);
      setResult(data);
    } catch (error: any) {
      showErrorAlert(
        error?.response?.data?.message ||
          error?.message ||
          "Checkup konnte nicht erstellt werden.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <HeaderView
        title="Digitaler Checkup"
        subtitle="Lassen Sie Ihre Gesundheitsdaten zusammenfassen"
      />

      <Card style={styles.section}>
        <ThemedText type="defaultSemiBold">Zeitraum auswählen</ThemedText>

        <View style={styles.dateRow}>
          <View style={styles.dateField}>
            <ThemedText type="smallText">Von</ThemedText>
            <TouchableOpacity
              style={[styles.dateButton, { borderColor: theme.surface }]}
              onPress={() => setShowFromPicker(true)}
            >
              <ThemedText>{formatDate(from)}</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.dateField}>
            <ThemedText type="smallText">Bis</ThemedText>
            <TouchableOpacity
              style={[styles.dateButton, { borderColor: theme.surface }]}
              onPress={() => setShowToPicker(true)}
            >
              <ThemedText>{formatDate(to)}</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {showFromPicker && (
          <DateTimePicker
            value={from}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(_, selectedDate) => {
              setShowFromPicker(Platform.OS === "ios");
              if (selectedDate) setFrom(selectedDate);
            }}
          />
        )}

        {showToPicker && (
          <DateTimePicker
            value={to}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(_, selectedDate) => {
              setShowToPicker(Platform.OS === "ios");
              if (selectedDate) setTo(selectedDate);
            }}
          />
        )}

        <PrimaryButton
          title="Checkup starten"
          icon="clipboard-pulse-outline"
          onPress={handleStart}
          isLoading={isLoading}
          isLoadingText="KI analysiert..."
        />
      </Card>

      {isLoading && (
        <Card style={styles.section}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
            <ThemedText style={styles.loadingText}>
              Daten werden ausgewertet, einen Moment bitte.
            </ThemedText>
          </View>
        </Card>
      )}

      {result && (
        <>
          <Card style={styles.section}>
            <ThemedText type="defaultSemiBold">KI-Zusammenfassung</ThemedText>
            <ThemedText style={styles.summaryText}>
              {result.aiSummary || "Keine Zusammenfassung verfügbar."}
            </ThemedText>
          </Card>

          <Card style={styles.section}>
            <ThemedText type="defaultSemiBold">
              Diagnosen ({result.diagnoses.length})
            </ThemedText>
            {result.diagnoses.length === 0 ? (
              <ThemedText type="smallText">
                Keine Diagnosen im Zeitraum.
              </ThemedText>
            ) : (
              result.diagnoses.map((d) => (
                <View key={d.id} style={styles.listItem}>
                  <ThemedText type="defaultSemiBold">{d.diagnosis}</ThemedText>
                  <ThemedText type="smallText">
                    ICD-10: {d.icD10Code || "-"} | Jahr: {d.year} | Status:{" "}
                    {d.status}
                  </ThemedText>
                  {d.comment ? (
                    <ThemedText type="smallText">{d.comment}</ThemedText>
                  ) : null}
                </View>
              ))
            )}
          </Card>

          <Card style={styles.section}>
            <ThemedText type="defaultSemiBold">
              Medikamente ({result.medications.length})
            </ThemedText>
            {result.medications.length === 0 ? (
              <ThemedText type="smallText">
                Keine Medikamente im Zeitraum.
              </ThemedText>
            ) : (
              result.medications.map((m) => (
                <View key={m.id} style={styles.listItem}>
                  <ThemedText type="defaultSemiBold">{m.name}</ThemedText>
                  <ThemedText type="smallText">
                    {m.dosage} | {m.intakeFrequency}
                  </ThemedText>
                  {m.indication ? (
                    <ThemedText type="smallText">
                      Grund: {m.indication}
                    </ThemedText>
                  ) : null}
                </View>
              ))
            )}
          </Card>

          <Card style={styles.section}>
            <ThemedText type="defaultSemiBold">
              Symptome ({result.symptoms.length})
            </ThemedText>
            {result.symptoms.length === 0 ? (
              <ThemedText type="smallText">
                Keine Symptome im Zeitraum.
              </ThemedText>
            ) : (
              result.symptoms.map((s) => (
                <View key={s.id} style={styles.listItem}>
                  <ThemedText type="defaultSemiBold">
                    {s.symptomName || "Unbenanntes Symptom"}
                  </ThemedText>
                  <ThemedText type="smallText">
                    {new Date(s.occurrenceTime).toLocaleString("de-DE")} |
                    Intensität: {s.intensity}/10
                  </ThemedText>
                  {s.notes ? (
                    <ThemedText type="smallText">{s.notes}</ThemedText>
                  ) : null}
                </View>
              ))
            )}
          </Card>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    padding: 16,
    marginBottom: 12,
  },
  dateRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
    marginBottom: 16,
  },
  dateField: {
    flex: 1,
  },
  dateButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 4,
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 12,
  },
  summaryText: {
    marginTop: 8,
    lineHeight: 22,
  },
  listItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(150,150,150,0.2)",
  },
});