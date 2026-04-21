import { useState } from "react";

import axiosConfig from "@/api/axiosConfig";
import { MedicalHistoryEntryResponse } from "@/types/medical-history-entry-type";

export const useExplainMedicalHistory = (
  patientId: number | null,
  entry: MedicalHistoryEntryResponse,
  onSave: (payload: any, id?: number) => Promise<void>,
) => {
  const [isExplaining, setIsExplaining] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(
    entry.aiExplanation || null,
  );

  const explain = async () => {
    if (!patientId) return;

    setIsExplaining(true);
    try {
      const response = await axiosConfig.get<any>(
        `ai/${patientId}/explain-medical-history/${entry.id}`,
      );

      const explanationText =
        response.data.data?.text || response.data.text || response.data;

      const payload = {
        diagnosis: entry.diagnosis,
        icd10Code: entry.icd10Code,
        year: entry.year,
        status: entry.status,
        comment: entry.comment,
        aiExplanation: explanationText,
      };

      await onSave(payload, entry.id);
      setAiExplanation(explanationText);
    } catch (error) {
      console.error("Fehler beim Laden oder Speichern der Erklärung:", error);
    } finally {
      setIsExplaining(false);
    }
  };

  return {
    aiExplanation,
    isExplaining,
    explain,
    setAiExplanation,
  };
};
