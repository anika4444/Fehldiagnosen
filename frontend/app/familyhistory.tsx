import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { FamilyHistoryCard } from "@/components/familyhistoryentry/family-history-card";
import { FamilyHistoryForm } from "@/components/familyhistoryentry/family-history-form";
import { DataList } from "@/components/ui/data-list";
import { HeaderView } from "@/components/ui/header-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useFamilyHistory } from "@/hooks/use-family-history";
import { useFormState } from "@/hooks/use-form-state";
import { usePatient } from "@/hooks/use-patient";
import {
  CreateFamilyHistoryEntryRequest,
  FamilyHistoryEntryResponse,
} from "@/types/family-history-type";
import {
  confirmDeleteDialog,
  showErrorAlert,
  showSuccessAlert,
} from "@/utils/alerts";

const FamilyHistory = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const { patientId } = usePatient();
  const { entries, isLoading, error, saveEntry, deleteEntry } =
    useFamilyHistory(patientId);

  const { isFormVisible, editingItem, openForm, closeForm } =
    useFormState<FamilyHistoryEntryResponse>();

  const handleSave = async (payload: CreateFamilyHistoryEntryRequest) => {
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
      } catch {
        showErrorAlert("Löschen fehlgeschlagen.");
      }
    });
  };

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <HeaderView
        title="Familienanamnese"
        subtitle="Erbliche Erkrankungen in Ihrer Familie"
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
          <FamilyHistoryForm
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
          emptyMessage="Keine Einträge vorhanden."
          renderItem={(entry) => (
            <FamilyHistoryCard
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

export default FamilyHistory;

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 12,
  },
});
