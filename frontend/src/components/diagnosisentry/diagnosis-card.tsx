import { DiagnosisEntryResponse } from "@/types/diagnosis-type";

import { DetailField } from "../ui/detail-field";
import { ModalCard } from "../ui/modal-card";

interface DiagnosisCardProps {
  entry: DiagnosisEntryResponse;
  onEdit: (entry: DiagnosisEntryResponse) => void;
  onDelete: (entryId: number) => void;
}

export const DiagnosisCard = ({
  entry,
  onEdit,
  onDelete,
}: DiagnosisCardProps) => {
  return (
    <ModalCard
      title={entry.title}
      types="secondary"
      onClose={() => onDelete(entry.id)}
      onEdit={() => onEdit(entry)}
    >
      <DetailField label="Beschreibung" value={entry.description} />
      <DetailField label="ICD-Code" value={entry.icdCode} />
      <DetailField label="Schweregrad" value={entry.severity} />
      <DetailField label="Seite" value={entry.sideLocalization} />
      <DetailField label="Status" value={entry.status} />
      <DetailField label="Symptome" value={entry.symptoms} />
      <DetailField label="Befunde" value={entry.findings} />
      <DetailField label="Therapiemaßnahmen" value={entry.therapeuticMeasures} />
      <DetailField label="Medikamente" value={entry.medicationText} />
      <DetailField label="Notiz" value={entry.note} />
      <DetailField label="Datum" value={entry.diagnosisDate} />
    </ModalCard>
  );
};