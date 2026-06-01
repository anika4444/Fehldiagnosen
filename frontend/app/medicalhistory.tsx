import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { MedicalHistoryEntryCard } from "@/components/medicalhistoryentry/medical-history-entry-card";
import { MedicalHistoryEntryForm } from "@/components/medicalhistoryentry/medical-history-entry-form";
import { ThemedText } from "@/components/themed-text";
import { DataList } from "@/components/ui/data-list";
import { HeaderView } from "@/components/ui/header-view";
import { PrimaryButton } from "@/components/ui/primary-button";
import { aiService } from "@/api/aiService";
import { diagnosisService } from "@/api/diagnosisService";
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

  const [isInterpreting, setIsInterpreting] = useState(false);

  const handleInterpret = async () => {
    if (!patientId && patientId !== 0) {
      showErrorAlert("Keine Patient:innen-ID vorhanden.");
      return;
    }

    setIsInterpreting(true);
    try {
      const medicalLetter =
        //"Sehr geehrte Kolleginnen und Kollegen,\n\nwir berichten über unseren Patienten Max Mustermann, geb. 01.01.1975,\nder sich seit 2018 in unserer kardiologischen Behandlung befindet.\n\nDiagnose: Essentielle Hypertonie (Bluthochdruck), ICD-10: I10\nDer Bluthochdruck besteht seit 2018 und wird medikamentös gut kontrolliert.\nAktuell ist der Zustand als chronisch-stabil einzustufen.\n\nAnmerkung: Patient nimmt täglich Ramipril 5mg ein. Regelmäßige Blutdruckkontrollen\nwerden empfohlen. Keine akuten Komplikationen bekannt.\n\nMit freundlichen kollegialen Grüßen,\nDr. med. Anna Bauer\nFachärztin für Kardiologie";
        "Klinikum [KLINIKUM]\nKlinik für Innere Medizin\n\nArztbrief\n\nPatient: [PATIENT]\nGeburtsdatum: [GEBURTSDATUM]\nAnschrift: Musterweg 12, 12345 Musterstadt\nVersicherungsnummer: A123456789\n\nAufnahmedatum: 12.05.2026\nEntlassungsdatum: 15.05.2026\n\nSehr geehrte Frau Kollegin, sehr geehrter Herr Kollege,\n\nwir berichten über den stationären Aufenthalt des oben genannten Patienten.\n\nAufnahmediagnosen:\n- Thorakale Schmerzen unklarer Genese\n- Arterielle Hypertonie\n- Hyperlipidämie\n\nEntlassungsdiagnosen:\n- Muskuläre Thoraxschmerzen\n- Arterielle Hypertonie, medikamentös behandelt\n- Hyperlipidämie\n\nAnamnese:\nDer 48-jährige Patient stellte sich aufgrund seit etwa drei Tagen bestehender intermittierender Schmerzen im Bereich der linken Thoraxwand vor. Die Beschwerden traten insbesondere bei bestimmten Bewegungen auf und waren nicht belastungsabhängig. Dyspnoe, Synkopen sowie neurologische Ausfälle wurden verneint. Kardiovaskuläre Risikofaktoren bestanden in Form einer bekannten arteriellen Hypertonie und Hyperlipidämie.\n\nKlinischer Befund bei Aufnahme:\nBlutdruck 148/92 mmHg, Herzfrequenz 82/min, Temperatur 36,8 °C, Sauerstoffsättigung 98 % unter Raumluft. Herz- und Lungenauskultation ohne pathologischen Befund. Druckschmerzhaftigkeit im Bereich der linken vorderen Thoraxwand reproduzierbar.\n\nDiagnostik:\nLabor: Leukozyten 7,2 G/l, Hämoglobin 14,8 g/dl, CRP < 5 mg/l, Kreatinin 0,92 mg/dl, Troponin I negativ in seriellen Kontrollen.\nEKG: Sinusrhythmus, Herzfrequenz 80/min, keine Ischämiezeichen.\nRöntgen Thorax: Kein Hinweis auf pneumonische Infiltrate, Pleuraergüsse oder Pneumothorax.\nEchokardiographie: Normale linksventrikuläre Funktion, keine relevanten Klappenvitien.\n\nVerlauf:\nUnter konservativer Therapie mit Analgetika zeigte sich eine rasche Beschwerdebesserung. Hinweise auf ein akutes Koronarsyndrom ergaben sich weder laborchemisch noch elektrokardiographisch. Die Beschwerden wurden insgesamt als muskuloskelettal bedingt bewertet.\n\nTherapie:\nIbuprofen 400 mg bei Bedarf, maximal dreimal täglich. Fortführung der antihypertensiven Medikation. Physiotherapeutische Anleitung zur Mobilisation.\n\nMedikation bei Entlassung:\nRamipril 5 mg 1-0-0. Atorvastatin 20 mg 0-0-1. Ibuprofen 400 mg bei Bedarf.\n\nEmpfehlungen:\nVorstellung beim Hausarzt innerhalb von 7–10 Tagen. Regelmäßige Blutdruckselbstkontrollen. Körperliche Schonung für wenige Tage. Wiedervorstellung bei Zunahme der Beschwerden oder neu auftretender Dyspnoe.\n\nMit freundlichen kollegialen Grüßen\n\n[ARZT]\nOberärztin Innere Medizin\n\nMusterstadt, den 15.05.2026"

      const resp = await aiService.interpretMedicalLetter(patientId, medicalLetter);

      if (resp?.saved) {
        // Backend already persisted a Diagnosis; inform user
        showSuccessAlert("Diagnose wurde erstellt.");
      } else if (resp?.extracted) {
        // Create diagnosis via diagnosisService (persist under diagnoses)
        try {
          const payload = {
            title: resp.extracted.title || "Unbekannte Diagnose",
            description: resp.extracted.description || "",
            icdCode: resp.extracted.icdCode || "",
            severity: resp.extracted.severity || "",
            sideLocalization: resp.extracted.sideLocalization || "",
            status: resp.extracted.status || "",
            medicationText: resp.extracted.medicationText || "",
            symptoms: resp.extracted.symptoms || "",
            findings: resp.extracted.findings || "",
            therapeuticMeasures: resp.extracted.therapeuticMeasures || "",
            note: resp.extracted.note || "",
            diagnosisDate: resp.extracted.diagnosisDate || new Date().toISOString(),
          };

          await diagnosisService.createEntry(patientId, payload);
          showSuccessAlert("Diagnose wurde erstellt.");
        } catch (e: any) {
          showErrorAlert(e?.message || "Fehler beim Erstellen der Diagnose.");
        }
      } else {
        showErrorAlert("KI konnte keinen Eintrag erzeugen.");
      }
    } catch (err: any) {
      showErrorAlert(err?.message || "Interpretation fehlgeschlagen.");
    } finally {
      setIsInterpreting(false);
    }
  };

  const handleSave = async (payload: any) => {
    try {
      const updatedPayload = editingItem
        ? { ...editingItem, ...payload }
        : payload;

      await saveEntry(updatedPayload, editingItem?.id);
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
          <>
            <PrimaryButton
              title="Neuen Eintrag hinzufügen"
              icon="plus"
              onPress={() => openForm()}
            />
            <PrimaryButton
              title="Diagnose scannen"
              icon="chat-processing"
              onPress={handleInterpret}
              isLoading={isInterpreting}
              isLoadingText="Diagnose wird erstellt..."
            />
          </>
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
