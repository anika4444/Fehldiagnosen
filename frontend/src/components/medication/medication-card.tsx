import React from "react";

import { DetailField } from "@/components/ui/detail-field";
import { ModalCard } from "@/components/ui/modal-card";
import { MedicationResponse } from "@/types/medication-type";

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
