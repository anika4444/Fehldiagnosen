import { useCallback, useEffect, useState } from "react";

import { communicationService } from "@/api/communicationService";
import {
  CommunicationLevelResponse,
  CommunicationQuestionResponse,
} from "@/types/communication-type";

export const useCommunicationLevel = (patientId: number | null) => {
  const [questions, setQuestions] = useState<CommunicationQuestionResponse[]>(
    [],
  );
  const [currentLevel, setCurrentLevel] =
    useState<CommunicationLevelResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!patientId) return;

    setIsLoading(true);
    setError(null);
    try {
      const [qData, lData] = await Promise.all([
        communicationService.getQuestions(),
        communicationService
          .getByPatientId(patientId)
          .catch((_error: unknown) => null),
      ]);
      setQuestions(qData);
      setCurrentLevel(lData);
    } catch (err: unknown) {
      setError(
        (err as Error).message || "Fehler beim Laden des Kommunikationslevels.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const saveLevel = async (ids: number[]) => {
    if (!patientId) throw new Error("Sitzung abgelaufen.");

    const createdLevel = await communicationService.create(patientId, {
      selectedAnswerIds: ids,
    });

    if (createdLevel) {
      setCurrentLevel(createdLevel);
      return;
    }

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
