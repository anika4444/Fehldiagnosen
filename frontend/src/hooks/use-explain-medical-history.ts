import { useState } from "react";

import axiosConfig from "@/api/axiosConfig";
import { DiagnosisEntryResponse } from "@/types/diagnosis-type";

export const useExplainMedicalHistory = (
  patientId: number | null,
  entry: DiagnosisEntryResponse,
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

      setAiExplanation(explanationText);
      setAiDisclaimer(disclaimer);
    } catch (error) {
      console.error("Fehler beim Laden der Erklärung:", error);
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
