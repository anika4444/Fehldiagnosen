// @/hooks/use-communication-level.ts
import { useCallback, useEffect, useState } from "react";

import { communicationService } from "@/api/communicationService";

// Tipp: Wenn du die Typen hast, importiere sie hier und ersetze die "any"s
// import { Question, CommunicationLevelResponse } from "@/types/communication-type";

export const useCommunicationLevel = (patientId: number | null) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentLevel, setCurrentLevel] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!patientId) return;

    setIsLoading(true);
    setError(null);
    try {
      const [qData, lData] = await Promise.all([
        communicationService.getQuestions(),
        // catch(() => null) bleibt hier sinnvoll, falls noch kein Level für den Patienten existiert
        communicationService.getByPatientId(patientId).catch(() => null),
      ]);
      setQuestions(qData);
      setCurrentLevel(lData);
    } catch (err: any) {
      setError(err.message || "Fehler beim Laden des Kommunikationslevels.");
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const saveLevel = async (ids: number[]) => {
    if (!patientId) throw new Error("Sitzung abgelaufen.");

    await communicationService.create(patientId, {
      selectedAnswerIds: ids,
    });

    // Nach dem Speichern laden wir die Daten direkt neu
    await fetchData();
  };

  return {
    questions,
    currentLevel,
    isLoading,
    error,
    saveLevel,
  };
};
