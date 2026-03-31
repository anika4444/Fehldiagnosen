import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { medicalHistoryEntryService } from "@/api/medicalHistoryEntryService";
import { Card } from "@/components/card";
import { HeaderView } from "@/components/header-view";
import { MedicalHistoryEntryForm } from "@/components/medicalhistoryentry/medical-history-entry-form";
import { ModalCard } from "@/components/modal-card";
import { PrimaryButton } from "@/components/primary-button";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { usePatientId } from "@/hooks/use-patient-id";
import { MedicalHistoryEntryResponse } from "@/types/medical-history-entry-type";

export default function MedicalHistory() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const { patientId } = usePatientId();
  const [entries, setEntries] = useState<MedicalHistoryEntryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any>(null);

  const fetchEntries = async () => {
    if (!patientId) return;
    setIsLoading(true);
    try {
      const data =
        await medicalHistoryEntryService.getEntriesByPatientId(patientId);
      setEntries(Array.isArray(data) ? data : []);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchEntries();
    }
  }, [patientId]);

  const getStatusInfo = (status: any) => {
    const s = String(status).toLowerCase();
    if (s === "0" || s === "active") {
      return {
        label: "Aktiv",
        color: "#4CAF50",
      };
    }
    if (s === "1" || s === "chronical") {
      return {
        label: "Chronisch",
        color: "#FF9800",
      };
    }
    if (s === "2" || s === "inremission") {
      return {
        label: "Remission",
        color: "#2196F3",
      };
    }
    return {
      label: "Aktiv",
      color: "#4CAF50",
    };
  };

  const handleDelete = async (entryId: number) => {
    const doDelete = async () => {
      try {
        await medicalHistoryEntryService.deleteEntry(entryId);
        fetchEntries();
      } catch {
        Alert.alert("Fehler", "Löschen fehlgeschlagen.");
      }
    };

    if (Platform.OS === "web") {
      if (confirm("Möchten Sie diesen Eintrag wirklich löschen?")) {
        doDelete();
      }
    } else {
      Alert.alert("Löschen", "Möchten Sie diesen Eintrag wirklich entfernen?", [
        {
          text: "Abbrechen",
          style: "cancel",
        },
        {
          text: "Löschen",
          style: "destructive",
          onPress: doDelete,
        },
      ]);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: theme.background,
      }}
    >
      <HeaderView
        title="Vorerkrankungen"
        subtitle="Historie verwalten"
        onBackPress={() => router.back()}
      />
      <View style={styles.content}>
        {!isFormVisible ? (
          <PrimaryButton
            title="Neuen Eintrag hinzufügen"
            icon="plus"
            onPress={() => setIsFormVisible(true)}
          />
        ) : (
          <MedicalHistoryEntryForm
            initialData={editingEntry}
            onCancel={() => {
              setIsFormVisible(false);
              setEditingEntry(null);
            }}
            onSave={async (data) => {
              if (!patientId) return;
              try {
                if (editingEntry) {
                  await medicalHistoryEntryService.updateEntry(
                    patientId,
                    editingEntry.id || editingEntry.Id,
                    data,
                  );
                } else {
                  await medicalHistoryEntryService.createEntry(patientId, data);
                }
                setIsFormVisible(false);
                setEditingEntry(null);
                fetchEntries();
              } catch (e) {
                Alert.alert("Fehler", "Speichern fehlgeschlagen.");
              }
            }}
          />
        )}

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Einträge
        </ThemedText>

        {isLoading ? (
          <ActivityIndicator color={theme.primary} />
        ) : (
          entries.map((entry: any) => {
            const statusInfo = getStatusInfo(entry.status ?? entry.Status);
            return (
              <ModalCard
                key={entry.id ?? entry.Id}
                title={entry.diagnosis ?? entry.Diagnosis}
                types="secondary"
                onClose={() => handleDelete(entry.id ?? entry.Id)}
                onEdit={() => {
                  setEditingEntry(entry);
                  setIsFormVisible(true);
                }}
              >
                <Card variant="filled" style={styles.detailCard}>
                  <ThemedText style={styles.fieldLabel}>ICD-10 Code</ThemedText>
                  <ThemedText style={styles.fieldValue}>
                    {entry.icD10Code ||
                      entry.ICD10Code ||
                      entry.icd10Code ||
                      "—"}
                  </ThemedText>
                </Card>

                <Card variant="filled" style={styles.detailCard}>
                  <ThemedText style={styles.fieldLabel}>
                    Diagnosejahr
                  </ThemedText>
                  <ThemedText style={styles.fieldValue}>
                    {entry.year ?? entry.Year}
                  </ThemedText>
                </Card>

                <Card variant="filled" style={styles.detailCard}>
                  <ThemedText style={styles.fieldLabel}>Status</ThemedText>
                  <ThemedText
                    style={[
                      styles.fieldValue,
                      {
                        color: statusInfo.color,
                        fontWeight: "700",
                      },
                    ]}
                  >
                    {statusInfo.label}
                  </ThemedText>
                </Card>

                {entry.comment || entry.Comment ? (
                  <Card variant="filled" style={styles.detailCard}>
                    <ThemedText style={styles.fieldLabel}>
                      Anmerkungen
                    </ThemedText>
                    <ThemedText style={styles.fieldValue}>
                      {entry.comment ?? entry.Comment}
                    </ThemedText>
                  </Card>
                ) : null}
              </ModalCard>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 12,
  },
  detailCard: {
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "600",
    opacity: 0.6,
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 15,
  },
});
