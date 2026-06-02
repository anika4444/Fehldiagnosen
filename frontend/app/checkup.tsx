import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";

import api from "@/api/axiosConfig";
import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import { HeaderView } from "@/components/ui/header-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { usePatient } from "@/hooks/use-patient";

interface CheckupDiagnosis {
  id: number;
  iCD10Code?: string;
  diagnosis?: string;
  year?: number;
  status?: string;
  comment?: string;
}
interface CheckupMedication {
  id: number;
  name?: string;
  dosage?: string;
  intakeFrequency?: string;
  indication?: string;
}
interface CheckupSymptom {
  id: number;
  symptomName?: string;
  occurrenceTime?: string;
  intensity?: number;
  duration?: string;
  notes?: string;
}
interface CheckupSummary {
  from: string;
  to: string;
  diagnoses: CheckupDiagnosis[];
  medications: CheckupMedication[];
  symptoms: CheckupSymptom[];
  aiSummary?: string;
}

const DEFAULT_FROM = "2000-01-01";

const Checkup = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const { patientId } = usePatient();

  const [summary, setSummary] = useState<CheckupSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  const loadCheckup = useCallback(async () => {
    if (!patientId) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(`/checkup/${patientId}`, {
        params: { from: DEFAULT_FROM, to: today },
      });
      setSummary(response.data);
    } catch (err: any) {
      setError(err?.message || "Fehler beim Laden des Checkups.");
    } finally {
      setIsLoading(false);
    }
  }, [patientId, today]);

  useEffect(() => {
    loadCheckup();
  }, [loadCheckup]);

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <HeaderView
        title="Digitaler Checkup"
        subtitle="Zusammenfassung Ihrer Gesundheitsdaten"
        onBackPress={() => router.back()}
      />

      <View style={styles.content}>
        <PrimaryButton
          title={isLoading ? "Wird geladen..." : "Checkup aktualisieren"}
          icon="refresh"
          onPress={loadCheckup}
          disabled={isLoading || !patientId}
        />

        {isLoading && (
          <ActivityIndicator
            size="large"
            color={theme.primary}
            style={{ marginTop: 24 }}
          />
        )}

        {error && !isLoading && (
          <ThemedText style={{ marginTop: 16 }}>{error}</ThemedText>
        )}

        {summary && !isLoading && (
          <>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              KI-Zusammenfassung
            </ThemedText>
            <Card style={styles.card}>
              <ThemedText>
                {summary.aiSummary || "Keine Zusammenfassung verfügbar."}
              </ThemedText>
            </Card>

            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Diagnosen ({summary.diagnoses.length})
            </ThemedText>
            {summary.diagnoses.length === 0 ? (
              <ThemedText type="smallText">
                Keine Diagnosen im Zeitraum.
              </ThemedText>
            ) : (
              summary.diagnoses.map((d) => (
                <Card key={d.id} style={styles.card}>
                  <ThemedText type="defaultSemiBold">{d.diagnosis}</ThemedText>
                  <ThemedText type="smallText">
                    {[d.iCD10Code, d.year ? String(d.year) : null, d.status]
                      .filter(Boolean)
                      .join(" · ")}
                  </ThemedText>
                  {d.comment ? <ThemedText>{d.comment}</ThemedText> : null}
                </Card>
              ))
            )}

            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Medikamente ({summary.medications.length})
            </ThemedText>
            {summary.medications.length === 0 ? (
              <ThemedText type="smallText">
                Keine Medikamente im Zeitraum.
              </ThemedText>
            ) : (
              summary.medications.map((m) => (
                <Card key={m.id} style={styles.card}>
                  <ThemedText type="defaultSemiBold">{m.name}</ThemedText>
                  <ThemedText type="smallText">
                    {[m.dosage, m.intakeFrequency, m.indication]
                      .filter(Boolean)
                      .join(" · ")}
                  </ThemedText>
                </Card>
              ))
            )}

            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Symptome ({summary.symptoms.length})
            </ThemedText>
            {summary.symptoms.length === 0 ? (
              <ThemedText type="smallText">
                Keine Symptome im Zeitraum.
              </ThemedText>
            ) : (
              summary.symptoms.map((s) => (
                <Card key={s.id} style={styles.card}>
                  <ThemedText type="defaultSemiBold">{s.symptomName}</ThemedText>
                  <ThemedText type="smallText">
                    {[
                      s.occurrenceTime ? s.occurrenceTime.slice(0, 10) : null,
                      s.intensity != null ? `Intensität ${s.intensity}/10` : null,
                      s.duration,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </ThemedText>
                  {s.notes ? <ThemedText>{s.notes}</ThemedText> : null}
                </Card>
              ))
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Checkup;

const styles = StyleSheet.create({
  content: { padding: 20 },
  sectionTitle: { marginTop: 20, marginBottom: 10 },
  card: { marginBottom: 10, padding: 12 },
});