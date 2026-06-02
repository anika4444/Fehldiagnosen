import { useState } from "react";

import axiosConfig from "@/api/axiosConfig";
import {
  DiagnosisEntryRequest,
  DiagnosisEntryResponse,
} from "@/types/diagnosis-type";

export const useExplainMedicalHistory = (
  patientId: number | null,
  entry: DiagnosisEntryResponse, // TODO: entfernen
  onSave: (payload: DiagnosisEntryRequest, id?: number) => Promise<void>,
) => {
  const [isExplaining, setIsExplaining] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(
    entry.aiExplanation || null,
  );
  const [aiDisclaimer, setAiDisclaimer] = useState<string | null>(
    entry.disclaimer || null,
  );

  const explain = async () => {
    if (!patientId) return;

    setIsExplaining(true);
    try {
      const response = await axiosConfig.get<any>(
        `ai/${patientId}/explain-diagnosis/${entry.id}`,
      );

      const explanationText =
        response.data.data?.text || response.data.text || response.data;

      const disclaimer =
        response.data.data?.disclaimer || response.data.disclaimer || null;

      const payload: DiagnosisEntryRequest = {
        title: entry.title,
        description: entry.description,
        icdCode: entry.icdCode,
        severity: entry.severity,
        sideLocalization: entry.sideLocalization,
        status: entry.status,
        medicationText: entry.medicationText,
        symptoms: entry.symptoms,
        findings: entry.findings,
        therapeuticMeasures: entry.therapeuticMeasures,
        note: entry.note,
        diagnosisDate: entry.diagnosisDate,
        aiExplanation: explanationText,
      };

      await onSave(payload, entry.id);
      setAiExplanation(explanationText);
      setAiDisclaimer(disclaimer);
    } catch (error) {
      console.error("Fehler beim Laden oder Speichern der Erklärung:", error);
    } finally {
      setIsExplaining(false);
    }
  };

  return {
    aiExplanation,
    aiDisclaimer,
    isExplaining,
    explain,
    setAiExplanation,
    setAiDisclaimer,
  };
};
