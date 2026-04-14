import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { MedicationCard } from "@/components/medication/medication-card";
import { MedicationForm } from "@/components/medication/medication-form";
import { DataList } from "@/components/ui/data-list";
import { HeaderView } from "@/components/ui/header-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ThemedText } from "@/components/ui/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useFormState } from "@/hooks/use-form-state";
import { useMedications } from "@/hooks/use-medications";
import { usePatient } from "@/hooks/use-patient";
import {
  CreateMedicationRequest,
  MedicationResponse,
} from "@/types/medication-type";
import {
  confirmDeleteDialog,
  showErrorAlert,
  showSuccessAlert,
} from "@/utils/alerts";
import { MedicationAutocomplete } from "@/components/medication/medication-autocomplete";
import { KnownMedicationResult } from "@/api/knownMedicationService";

export default function Medications() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  // Hooks erledigen die ganze Arbeit
  const { patientId } = usePatient();
  const { medications, isLoading, error, saveMedication, deleteMedication } =
    useMedications(patientId);
  const { isFormVisible, editingItem, openForm, closeForm } =
    useFormState<MedicationResponse>();

  const handleSave = async (payload: CreateMedicationRequest) => {
    try {
      await saveMedication(payload, editingItem?.id);
      closeForm();
      showSuccessAlert("Medikament wurde gespeichert.");
    } catch (err) {
      showErrorAlert("Medikament konnte nicht gespeichert werden.");
    }
  };

  const handleDelete = (medicationId: number) => {
    confirmDeleteDialog(async () => {
      try {
        await deleteMedication(medicationId);
      } catch {
        showErrorAlert("Löschen fehlgeschlagen.");
      }
    });
  };

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      <HeaderView
        title="Aktuelle Medikamente"
        subtitle="Verwalten Sie Ihre medizinischen Daten"
        onBackPress={() => router.back()}
      />

      <View style={styles.content}>
        {!isFormVisible ? (
          <PrimaryButton
            title="Eintrag hinzufügen"
            icon="plus"
            onPress={() => openForm()}
          />
        ) : (
          <MedicationForm
            initialData={editingItem}
            onSave={handleSave}
            onCancel={closeForm}
          />
        )}

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Einträge
        </ThemedText>

        <DataList
          data={medications}
          isLoading={isLoading}
          error={error}
          themeColor={theme.primary}
          emptyMessage="Keine Medikamente vorhanden."
          renderItem={(medication) => (
            <MedicationCard
              key={medication.id}
              medication={medication}
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
  content: { padding: 20 },
  sectionTitle: { marginTop: 16, marginBottom: 12 },
});
