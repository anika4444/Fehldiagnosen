// @/hooks/use-communication-level.ts
import * as signalR from "@microsoft/signalr";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

import { communicationService } from "@/api/communicationService";

import { usePatient } from "./use-patient";

export const useCommunicationLevel = () => {
  const { patientId } = usePatient();
  const [questions, setQuestions] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!patientId) return;
    setIsLoading(true);
    try {
      const [qData, lData] = await Promise.all([
        communicationService.getQuestions(),
        communicationService.getByPatientId(patientId).catch(() => null),
      ]);
      setQuestions(qData);
      setCurrentLevel(lData);
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchData();
    // SignalR Setup
    const backendUrl =
      Platform.OS === "android"
        ? "http://10.0.2.2:5238"
        : "http://localhost:5238";
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${backendUrl}/hubs/communication`)
      .build();

    connection.on("RefreshCommunicationLevel", fetchData);
    connection.start().catch(console.error);
    return () => {
      connection.stop();
    };
  }, [fetchData]);

  const saveLevel = async (ids: number[]) => {
    const result = await communicationService.create(patientId!, {
      selectedAnswerIds: ids,
    });
    setCurrentLevel(result);
  };

  return { questions, currentLevel, isLoading, saveLevel };
};
