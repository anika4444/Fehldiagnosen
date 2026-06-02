import React, { useState } from "react";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

import { DetailField } from "@/components/ui/detail-field";
import { ModalCard } from "@/components/ui/modal-card";
import { MedicationResponse } from "@/types/medication-type";
import { PrimaryButton } from "@/components/ui/primary-button";
import { aiService } from "@/api/aiService";
import { showSuccessAlert, showErrorAlert } from "@/utils/alerts";

interface MedicationCardProps {
  medication: MedicationResponse;
  onEdit: (medication: MedicationResponse) => void;
  onDelete: (id: number) => void;
}

export const MedicationCard = ({
  medication,
  onEdit,
  onDelete,
}: MedicationCardProps) => {
  /*const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeImage = async () => {
    try {
      setIsAnalyzing(true);
      // require the test asset (place frontend/assets/test.jpg)
      const assetModule = require("../medication.jpeg");
      const asset = Asset.fromModule(assetModule);
      await asset.downloadAsync();
      const localUri = asset.localUri || asset.uri;

      if (!localUri) throw new Error("Asset URI not available");

      const base64 = await FileSystem.readAsStringAsync(localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const resp = await aiService.interpretMedicationImage(base64, "image/jpeg");
      if (resp?.extracted) {
        showSuccessAlert("Medikamentendaten erkannt.");
      } else {
        showErrorAlert("Keine Daten erkannt.");
      }
    } catch (err: any) {
      console.error("Medication image analyze error:", err);
      showErrorAlert(err?.message || "Fehler bei der Analyse des Bildes.");
    } finally {
      setIsAnalyzing(false);
    }
  };*/
  return (
    <ModalCard
      title={medication.name}
      types="secondary"
      onClose={() => onDelete(medication.id)}
      onEdit={() => onEdit(medication)}
    >
      {/* DetailField blendet sich automatisch aus, wenn "value" leer ist! */}
      <DetailField label="Wirkung/Dosierung" value={medication.dosage} />
      <DetailField
        label="Einnahmehäufigkeit"
        value={medication.intakeFrequency}
      />

      {/* Bei der Dauer fügen wir manuell " Tage" hinzu, wenn es eine Zahl gibt */}
      <DetailField
        label="Dauer"
        value={
          medication.durationInDays
            ? `${medication.durationInDays} Tage`
            : undefined
        }
      />

      <DetailField
        label="Einnahme seit"
        value={medication.intakeStartDate?.split("T")[0]}
      />
      <DetailField
        label="Einnahme bis"
        value={medication.endDate?.split("T")[0]}
      />
      <DetailField label="Indikation" value={medication.indication} />
      <DetailField label="Verschrieben von" value={medication.doctorName} />
      <DetailField label="Anmerkungen" value={medication.notes} />
    </ModalCard>
  );
};
