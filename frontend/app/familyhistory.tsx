import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { familyHistoryService } from "@/api/familyHistoryService";
import { Card } from "@/components/card";
import { FormInput } from "@/components/form-input";
import { HeaderView } from "@/components/header-view";
import { ModalCard } from "@/components/modal-card";
import { PrimaryButton } from "@/components/primary-button";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import {
  CreateFamilyHistoryEntryRequest,
  FamilyHistoryEntryResponse,
} from "@/types/family-history-type";

interface FormData {
  relative: string;
  diagnosis: string;
  comment: string;
}

interface FormErrors {
  relative?: string;
  diagnosis?: string;
}

const emptyForm: FormData = {
  relative: "",
  diagnosis: "",
  comment: "",
};

export default function FamilyHistory() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const [patientId, setPatientId] = useState<number | null>(null);
  const [entries, setEntries] = useState<FamilyHistoryEntryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingEntry, setEditingEntry] =
    useState<FamilyHistoryEntryResponse | null>(null);
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    const loadPatientId = async () => {
      const storedId =
        Platform.OS === "web"
          ? localStorage.getItem("patientId")
          : await SecureStore.getItemAsync("patientId");

      if (storedId) {
        setPatientId(parseInt(storedId));
      }
    };
    loadPatientId();
  }, []);

  const fetchEntries = async () => {
    if (!patientId) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await familyHistoryService.getEntriesByPatientId(patientId);
      setEntries(data);
    } catch {
      setError("Fehler beim Laden der Familienanamnese.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [patientId]);

  const openCreateForm = () => {
    setEditingEntry(null);
    setFormData(emptyForm);
    setFormErrors({});
    setIsFormVisible(true);
  };

  const openEditForm = (entry: FamilyHistoryEntryResponse) => {
    setEditingEntry(entry);
    setFormData({
      relative: entry.relative,
      diagnosis: entry.diagnosis,
      comment: entry.comment ?? "",
    });
    setFormErrors({});
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setEditingEntry(null);
    setFormData(emptyForm);
    setFormErrors({});
  };

  const validate = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.relative.trim()) {
      errors.relative = "Bitte geben Sie den Verwandten an.";
    }
    if (!formData.diagnosis.trim()) {
      errors.diagnosis = "Bitte geben Sie die Diagnose an.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validate() || patientId === null) return;

    const payload: CreateFamilyHistoryEntryRequest = {
      relative: formData.relative.trim(),
      diagnosis: formData.diagnosis.trim(),
      comment: formData.comment.trim() || undefined,
    };

    try {
      if (editingEntry) {
        await familyHistoryService.updateEntry(
          patientId,
          editingEntry.id,
          payload,
        );
      } else {
        await familyHistoryService.createEntry(patientId, payload);
      }
      closeForm();
      fetchEntries();

      if (Platform.OS !== "web") {
        Alert.alert("Erfolg", "Eintrag wurde gespeichert.");
      }
    } catch {
      Alert.alert("Fehler", "Eintrag konnte nicht gespeichert werden.");
    }
  };

  const handleDelete = async (entryId: number) => {
    const doDelete = async () => {
      try {
        await familyHistoryService.deleteEntry(entryId);
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
      Alert.alert(
        "Löschen",
        "Möchten Sie diesen Eintrag wirklich entfernen?",
        [
          { text: "Abbrechen", style: "cancel" },
          { text: "Löschen", style: "destructive", onPress: doDelete },
        ],
      );
    }
  };

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <HeaderView
        title="Familienanamnese"
        subtitle="Erbliche Erkrankungen in Ihrer Familie"
      />

      <View style={styles.content}>
        {!isFormVisible ? (
          <PrimaryButton
            title="Neuen Eintrag hinzufügen"
            icon="plus-circle-outline"
            onPress={openCreateForm}
          />
        ) : (
          <ModalCard
            title={editingEntry ? "Eintrag bearbeiten" : "Neuer Eintrag"}
            onClose={closeForm}
            onSave={handleSave}
            saveButtonText={editingEntry ? "Aktualisieren" : "Speichern"}
          >
            <FormInput
              label="Verwandter"
              isRequired
              placeholder="z. B. Vater, Mutter, Großvater"
              value={formData.relative}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, relative: text }))
              }
              errorText={formErrors.relative}
            />
            <FormInput
              label="Diagnose"
              isRequired
              placeholder="z. B. Diabetes Typ 2"
              value={formData.diagnosis}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, diagnosis: text }))
              }
              errorText={formErrors.diagnosis}
            />
            <FormInput
              label="Kommentar"
              placeholder="Optionale Anmerkungen"
              value={formData.comment}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, comment: text }))
              }
              multiline
              numberOfLines={3}
              style={styles.multilineInput}
            />
          </ModalCard>
        )}

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Einträge
        </ThemedText>

        {isLoading && (
          <ActivityIndicator size="large" color={theme.primary} />
        )}

        {error && (
          <ThemedText style={{ color: theme.closeIconColor }}>
            {error}
          </ThemedText>
        )}

        {!isLoading && !error && entries.length === 0 && (
          <ThemedText style={styles.emptyText}>
            Keine Einträge vorhanden.
          </ThemedText>
        )}

        {!isLoading &&
          entries.map((entry) => (
            <ModalCard
              key={entry.id}
              title={entry.relative}
              types="secondary"
              onClose={() => handleDelete(entry.id)}
              onEdit={() => openEditForm(entry)}
            >
              <Card variant="filled" style={styles.detailCard}>
                <ThemedText style={styles.fieldLabel}>Diagnose</ThemedText>
                <ThemedText style={styles.fieldValue}>
                  {entry.diagnosis}
                </ThemedText>
              </Card>

              {entry.comment ? (
                <Card variant="filled" style={styles.detailCard}>
                  <ThemedText style={styles.fieldLabel}>Kommentar</ThemedText>
                  <ThemedText style={styles.fieldValue}>
                    {entry.comment}
                  </ThemedText>
                </Card>
              ) : null}
            </ModalCard>
          ))}
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
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    opacity: 0.6,
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
  multilineInput: {
    height: 80,
    textAlignVertical: "top",
    paddingTop: 12,
  },
});