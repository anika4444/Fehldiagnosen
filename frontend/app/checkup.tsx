import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

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

const todayStr = new Date().toISOString().slice(0, 10);

const Checkup = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const { patientId } = usePatient();

  const [fromInput, setFromInput] = useState("2026-01-01");
  const [toInput, setToInput] = useState(todayStr);

  const [summary, setSummary] = useState<CheckupSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCheckup = useCallback(async () => {
    if (!patientId) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(`/checkup/${patientId}`, {
        params: { from: fromInput, to: `${toInput}T23:59:59` },
      });
      setSummary(response.data);
    } catch (err: any) {
      setError(err?.message || "Fehler beim Laden des Checkups.");
    } finally {
      setIsLoading(false);
    }
  }, [patientId, fromInput, toInput]);

  const renderSummary = (text: string) =>
    text.split("\n").map((rawLine, index) => {
      const line = rawLine.replace(/\*\*/g, "").replace(/\*/g, "");
      const trimmed = line.trim();

      if (trimmed === "") {
        return <View key={index} style={{ height: 8 }} />;
      }

      const heading = trimmed.match(/^#{1,6}\s*(.*)$/);
      if (heading) {
        return (
          <ThemedText
            key={index}
            type="defaultSemiBold"
            style={styles.summaryHeading}
          >
            {heading[1]}
          </ThemedText>
        );
      }

      const bullet = trimmed.match(/^[-•]\s+(.*)$/);
      if (bullet) {
        return (
          <ThemedText key={index} style={styles.summaryLine}>
            {"• " + bullet[1]}
          </ThemedText>
        );
      }

      return (
        <ThemedText key={index} style={styles.summaryLine}>
          {trimmed}
        </ThemedText>
      );
    });

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <HeaderView
        title="Digitaler Checkup"
        subtitle="Zusammenfassung Ihrer Gesundheitsdaten"
        onBackPress={() => router.back()}
      />

      <View style={styles.content}>
        <View style={styles.dateRow}>
          <View style={styles.dateField}>
            <ThemedText type="smallText">Von (JJJJ-MM-TT)</ThemedText>
            <TextInput
              value={fromInput}
              onChangeText={setFromInput}
              placeholder="2026-01-01"
              placeholderTextColor={theme.icon}
              autoCapitalize="none"
              style={[
                styles.input,
                {
                  color: theme.text,
                  borderColor: theme.primary,
                  backgroundColor: theme.surface,
                },
              ]}
            />
          </View>
          <View style={styles.dateField}>
            <ThemedText type="smallText">Bis (JJJJ-MM-TT)</ThemedText>
            <TextInput
              value={toInput}
              onChangeText={setToInput}
              placeholder={todayStr}
              placeholderTextColor={theme.icon}
              autoCapitalize="none"
              style={[
                styles.input,
                {
                  color: theme.text,
                  borderColor: theme.primary,
                  backgroundColor: theme.surface,
                },
              ]}
            />
          </View>
        </View>

        <PrimaryButton
          title={isLoading ? "Wird geladen..." : "Checkup erstellen"}
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
              {summary.aiSummary ? (
                renderSummary(summary.aiSummary)
              ) : (
                <ThemedText>Keine Zusammenfassung verfügbar.</ThemedText>
              )}
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
  dateRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  dateField: { flex: 1 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 4,
  },
  sectionTitle: { marginTop: 20, marginBottom: 10 },
  card: { marginBottom: 10, padding: 12 },
  summaryHeading: { marginTop: 10, marginBottom: 2, fontSize: 16 },
  summaryLine: { marginBottom: 4, lineHeight: 22 },
});