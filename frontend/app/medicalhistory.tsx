import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { MedicalHistoryEntryCard } from "@/components/medicalhistoryentry/medical-history-entry-card";
import { MedicalHistoryEntryForm } from "@/components/medicalhistoryentry/medical-history-entry-form";
import { DataList } from "@/components/ui/data-list";
import { HeaderView } from "@/components/ui/header-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ThemedText } from "@/components/ui/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useFormState } from "@/hooks/use-form-state";
import { useMedicalHistory } from "@/hooks/use-medical-history";
import { usePatient } from "@/hooks/use-patient";
import { MedicalHistoryEntryResponse } from "@/types/medical-history-entry-type";
import {
  confirmDeleteDialog,
  showErrorAlert,
  showSuccessAlert,
} from "@/utils/alerts";

export default function MedicalHistory() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const { patientId } = usePatient();
  const { entries, isLoading, error, saveEntry, deleteEntry } =
    useMedicalHistory(patientId);

  const { isFormVisible, editingItem, openForm, closeForm } =
    useFormState<MedicalHistoryEntryResponse>();

  const handleSave = async (payload: any) => {
    try {
      await saveEntry(payload, editingItem?.id);
      closeForm();
      showSuccessAlert("Eintrag wurde gespeichert.");
    } catch (err: any) {
      showErrorAlert(err.message || "Eintrag konnte nicht gespeichert werden.");
    }
  };

  const handleDelete = (entryId: number) => {
    confirmDeleteDialog(async () => {
      try {
        await deleteEntry(entryId);
        showSuccessAlert("Eintrag wurde gelöscht.");
      } catch {
        showErrorAlert("Löschen fehlgeschlagen.");
      }
    });
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
            onPress={() => openForm()}
          />
        ) : (
          <MedicalHistoryEntryForm
            initialData={editingItem}
            onSave={handleSave}
            onCancel={closeForm}
          />
        )}

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Einträge
        </ThemedText>

        <DataList
          data={entries}
          isLoading={isLoading}
          error={error}
          themeColor={theme.primary}
          emptyMessage="Keine Vorerkrankungen erfasst."
          renderItem={(entry) => (
            <MedicalHistoryEntryCard
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
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 12,
  },
});
