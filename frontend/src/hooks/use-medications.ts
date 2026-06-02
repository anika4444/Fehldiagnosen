import * as signalR from "@microsoft/signalr";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

import { medicationService } from "@/api/medicationService";
import {
  CreateMedicationRequest,
  MedicationResponse,
} from "@/types/medication-type";

export const useMedications = (patientId: number | null) => {
  const [medications, setMedications] = useState<MedicationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMedications = useCallback(async () => {
    if (!patientId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await medicationService.getMedicationsByPatientId(patientId);
      setMedications(data);
    } catch {
      setError("Fehler beim Laden der Medikamente.");
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  // Initiales Laden & SignalR Setup
  useEffect(() => {
    if (!patientId) return;

    fetchMedications();

    const backendUrl =
      Platform.OS === "android"
        ? "http://10.0.2.2:5238"
        : "http://localhost:5238";

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${backendUrl}/hubs/medication`)
      .build();

    connection.on("RefreshMedications", () => {
      fetchMedications();
    });

    connection.start().catch((err) => console.log("SignalR Error:", err));

    return () => {
      connection.stop();
    };
  }, [patientId, fetchMedications]);

  const saveMedication = async (
    payload: CreateMedicationRequest,
    medicationId?: number,
  ) => {
    if (!patientId) throw new Error("Sitzung abgelaufen.");
    if (medicationId) {
      await medicationService.updateMedication(
        patientId,
        medicationId,
        payload,
      );
    } else {
      await medicationService.createMedication(patientId, payload);
    }
    await fetchMedications();
  };

  const deleteMedication = async (medicationId: number) => {
    await medicationService.deleteMedication(medicationId);
    await fetchMedications();
  };
// use-medications.ts
  return { medications, isLoading, error, saveMedication, deleteMedication, refetch: fetchMedications };
};
