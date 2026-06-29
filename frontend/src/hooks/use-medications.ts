import * as signalR from "@microsoft/signalr";
import { useCallback, useEffect, useRef, useState } from "react";
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

  const isSavingRef = useRef(false);

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

  // Initiales Laden
  useEffect(() => {
    if (!patientId) return;

    fetchMedications();
  }, [patientId]);

  const saveMedication = async (
    payload: CreateMedicationRequest,
    medicationId?: number,
  ): Promise<MedicationResponse> => {
    if (!patientId) throw new Error("Sitzung abgelaufen.");

    let response: MedicationResponse;

    try {
      // 1. Sperre aktivieren (SignalR wird ignoriert)
      isSavingRef.current = true;

      if (medicationId) {
        response = await medicationService.updateMedication(
          patientId,
          medicationId,
          payload,
        );
      } else {
        response = await medicationService.createMedication(patientId, payload);
      }

      // 2. Wir aktualisieren den State manuell mit der direkten Antwort des Backends!
      // Dadurch sind die Wechselwirkungen sofort in der UI, ohne dass ein zweiter API-Call läuft.
      if (medicationId) {
        setMedications((prev) =>
          prev.map((m) => (m.id === medicationId ? response : m)),
        );
      } else {
        setMedications((prev) => [response, ...prev]);
      }

      return response;
    } finally {
      requestAnimationFrame(() => {
        isSavingRef.current = false;
      });
    }
  };

  const deleteMedication = async (medicationId: number) => {
    await medicationService.deleteMedication(medicationId);
    await fetchMedications();
  };

  return { medications, isLoading, error, saveMedication, deleteMedication };
};
