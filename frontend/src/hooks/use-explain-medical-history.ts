import { useState } from "react";

import { aiService } from "@/api/aiService";
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
      const { text, disclaimer } = await aiService.explainDiagnosisById(
        patientId,
        entry.id,
      );

      setAiExplanation(text);
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
