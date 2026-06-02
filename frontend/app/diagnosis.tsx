import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";

import { diagnosisService } from "@/api/diagnosisService";
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

  const [isScanning, setIsScanning] = useState(false);

  const handleSave = async (payload: CreateDiagnosisEntryRequest) => {
    try {
      await saveEntry(payload, editingItem?.id);
      closeForm();
      showSuccessAlert("Diagnose wurde gespeichert.");
    } catch (err: any) {
      showErrorAlert(
        err.message || "Diagnose konnte nicht gespeichert werden.",
      );
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

  const handleFileUploadAndScan = async () => {
    try {
      const docResult = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        copyToCacheDirectory: true,
      });

      if (docResult.canceled || !docResult.assets?.[0]) return;

      const file = docResult.assets[0];

      setIsScanning(true);

      await diagnosisService.scanAndCreateDocument(patientId!, {
        uri: file.uri,
        name: file.name,
        type: file.mimeType ?? "image/jpeg",
      });

      showSuccessAlert(
        "Arztbrief erfolgreich analysiert und als Diagnose hinzugefügt! Das Datum müsste nochmals angepasst werden, da es aktuell auf das heutige Datum gesetzt wird.",
      );
    } catch (err: any) {
      console.error(err);
      showErrorAlert("Der Arztbrief konnte nicht verarbeitet werden.");
    } finally {
      setIsScanning(false);
    }
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
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Manuell hinzufügen"
              icon="plus"
              onPress={() => openForm()}
              disabled={isScanning}
            />

            <PrimaryButton
              title={
                isScanning
                  ? "Analysiere Arztbrief..."
                  : "Arztbrief hochladen (Bild / PDF)"
              }
              icon={isScanning ? undefined : "file-document-outline"} // Icon-Namen ggf. an deine Bibliothek anpassen
              onPress={handleFileUploadAndScan}
              disabled={isScanning}
              style={{
                marginTop: 10,
                backgroundColor: "#6c757d",
              }}
            />

            {isScanning && (
              <ActivityIndicator
                size="small"
                color={theme.primary}
                style={{ marginTop: 10 }}
              />
            )}
          </View>
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
              patientId={patientId}
              entry={entry}
              onEdit={openForm}
              onDelete={handleDelete}
              onSave={saveEntry}
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
  buttonContainer: {
    marginBottom: 8,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 12,
  },
});
