import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { DiagnosisCard } from "@/components/diagnosisentry/diagnosis-card";
import { DiagnosisForm } from "@/components/diagnosisentry/diagnosis-form";
import { ThemedText } from "@/components/themed-text";
import { DataList } from "@/components/ui/data-list";
import { HeaderView } from "@/components/ui/header-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useDiagnosis } from "@/hooks/use-diagnosis";
import { useFormState } from "@/hooks/use-form-state";
import { usePatient } from "@/hooks/use-patient";
import {
  CreateDiagnosisEntryRequest,
  DiagnosisEntryResponse,
} from "@/types/diagnosis-type";
import {
  confirmDeleteDialog,
  showErrorAlert,
  showSuccessAlert,
} from "@/utils/alerts";

const Diagnosis = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const { patientId } = usePatient();
  const { entries, isLoading, error, saveEntry, deleteEntry } =
    useDiagnosis(patientId);

  const { isFormVisible, editingItem, openForm, closeForm } =
    useFormState<DiagnosisEntryResponse>();

  const handleSave = async (payload: CreateDiagnosisEntryRequest) => {
    try {
      await saveEntry(payload, editingItem?.id);
      closeForm();
      showSuccessAlert("Diagnose wurde gespeichert.");
    } catch (err: any) {
      showErrorAlert(err.message || "Diagnose konnte nicht gespeichert werden.");
    }
  };

  const handleDelete = (entryId: number) => {
    confirmDeleteDialog(async () => {
      try {
        await deleteEntry(entryId);
      } catch {
        showErrorAlert("Löschen fehlgeschlagen.");
      }
    });
  };

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <HeaderView
        title="Diagnosen"
        subtitle="Ihre eingetragenen Diagnosen"
        onBackPress={() => router.back()}
      />

      <View style={styles.content}>
        {!isFormVisible ? (
          <PrimaryButton
            title="Neue Diagnose hinzufügen"
            icon="plus"
            onPress={() => openForm()}
          />
        ) : (
          <DiagnosisForm
            initialData={editingItem}
            onSave={handleSave}
            onCancel={closeForm}
          />
        )}

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Diagnosen
        </ThemedText>

        <DataList
          data={entries}
          isLoading={isLoading}
          error={error}
          themeColor={theme.primary}
          emptyMessage="Keine Diagnosen vorhanden."
          renderItem={(entry) => (
            <DiagnosisCard
              key={entry.id}
              entry={entry}
              onEdit={openForm}
              onDelete={handleDelete}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Diagnosis;

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 12,
  },
});