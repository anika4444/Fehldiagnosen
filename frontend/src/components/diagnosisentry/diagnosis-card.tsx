import { useEffect } from "react";

import { useExplainMedicalHistory } from "@/hooks/use-explain-medical-history";
import { useFormattedDate } from "@/hooks/use-formatted-date";
import { DiagnosisEntryResponse } from "@/types/diagnosis-type";

import { DetailField } from "../ui/detail-field";
import { ModalCard } from "../ui/modal-card";
import { PrimaryButton } from "../ui/primary-button";

interface DiagnosisCardProps {
  patientId: number | null;
  entry: DiagnosisEntryResponse;
  onEdit: (entry: DiagnosisEntryResponse) => void;
  onDelete: (entryId: number) => void;
}

export const DiagnosisCard = ({
  patientId,
  entry,
  onEdit,
  onDelete,
}: DiagnosisCardProps) => {
  const {
    aiExplanation,
    aiDisclaimer,
    isExplaining,
    explain,
    setAiExplanation,
    setAiDisclaimer,
  } = useExplainMedicalHistory(patientId, entry);

  const formattedDiagnosisDate = useFormattedDate(entry.diagnosisDate);

  useEffect(() => {
    setAiExplanation(entry.aiExplanation || null);
    setAiDisclaimer(entry.disclaimer || null);
  }, [entry.aiExplanation, entry.disclaimer, setAiExplanation, setAiDisclaimer]);

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
      <DetailField
        label="Therapiemaßnahmen"
        value={entry.therapeuticMeasures}
      />
      <DetailField label="Medikamente" value={entry.medicationText} />
      <DetailField label="Notiz" value={entry.note} />
      <DetailField label="Datum" value={formattedDiagnosisDate} />
      {aiExplanation && (
        <DetailField label="KI-Erklärung" value={aiExplanation} />
      )}
      {aiExplanation && <DetailField label="Hinweis" value={aiDisclaimer} />}
      <PrimaryButton
        title="Mit KI erklären lassen"
        icon="chat-processing"
        onPress={explain}
        isLoading={isExplaining}
        isLoadingText="Wird generiert..."
      />
    </ModalCard>
  );
};
