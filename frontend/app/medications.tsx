import { router } from "expo-router";
import React from "react";
import { Alert, Platform, ScrollView, StyleSheet, View } from "react-native";

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
      const isEditing = !!editingItem?.id; // Prüfen, ob es ein Update oder ein neuer Eintrag ist

      const savedMedication: MedicationResponse = await saveMedication(
        payload,
        editingItem?.id,
      );

      // Falls Wechselwirkungen vorhanden sind (passiert laut deinem Backend nur beim Erstellen)
      if (
        !isEditing && // WICHTIG: Nur beim Erstellen prüfen, wie von dir gewünscht
        savedMedication.interactionWarnings &&
        savedMedication.interactionWarnings.length > 0
      ) {
        const warnings = savedMedication.interactionWarnings.join("\n\n");
        const alertTitle = "⚠️ Achtung: Wechselwirkung erkannt!";
        const alertMessage = `Das Medikament wurde gespeichert, aber es gibt potenzielle Wechselwirkungen mit Ihrer bestehenden Medikation:\n\n${warnings}`;

        if (Platform.OS === "web") {
          alert(`${alertTitle}\n\n${alertMessage}`);
          closeForm(); // Erst danach schließen
        } else {
          // Auf iOS/Android: Zeige den Alert DIREKT. Das Formular schließt sich,
          // sobald der Patient auf den Button drückt. Das verhindert das "Verschlucken" auf iOS.
          Alert.alert(
            alertTitle,
            alertMessage,
            [
              {
                text: "Verstanden",
                style: "default",
                onPress: () => {
                  closeForm(); // Schließt das Formular erst, wenn "Verstanden" geklickt wurde
                },
              },
            ],
            { cancelable: false },
          );
        }
      } else {
        // Keine Wechselwirkungen oder es war ein Editier-Vorgang
        closeForm();
        // Kurzer Puffer für die normale Erfolgsmeldung
        setTimeout(() => {
          showSuccessAlert("Medikament erfolgreich gespeichert.");
        }, 150);
      }
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
