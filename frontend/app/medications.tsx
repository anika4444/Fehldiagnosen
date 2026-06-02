import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { MedicationCard } from "@/components/medication/medication-card";
import { MedicationForm } from "@/components/medication/medication-form";
import { ThemedText } from "@/components/themed-text";
import { DataList } from "@/components/ui/data-list";
import { HeaderView } from "@/components/ui/header-view";
import { PrimaryButton } from "@/components/ui/primary-button";
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

export default function Medications() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

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

const handleScan = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") {
    showErrorAlert("Kamera-Berechtigung wurde verweigert.");
    return;
  }
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ["images"],
    quality: 0.85,
  });

  if (!result.canceled && result.assets?.[0]) {
    console.log("Bild URI:", result.assets[0].uri);
    showSuccessAlert("Bild ausgewählt — URI in der Konsole.");
  }
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
          <View style={styles.buttonRow}>
            <View style={styles.buttonFlex}>
              <PrimaryButton
                title="Eintrag hinzufügen"
                icon="plus"
                onPress={() => openForm()}
              />
            </View>
            <View style={styles.buttonFlex}>
              <PrimaryButton
                title="Scannen"
                icon="camera"
                onPress={handleScan}
              />
            </View>
          </View>
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
  buttonRow: { flexDirection: "row", gap: 10 },
  buttonFlex: { flex: 1 },
});