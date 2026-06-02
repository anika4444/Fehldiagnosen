import { useCallback, useEffect, useState } from "react";

import { diagnosisService } from "@/api/diagnosisService";
import {
  CreateDiagnosisEntryRequest,
  DiagnosisEntryResponse,
} from "@/types/diagnosis-type";

export const useDiagnosis = (patientId: number | null) => {
  const [entries, setEntries] = useState<DiagnosisEntryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    if (!patientId) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await diagnosisService.getEntriesByPatientId(patientId);
      setEntries(data);
    } catch (err: any) {
      setError(err.message || "Fehler beim Laden der Diagnosen.");
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const saveEntry = async (
    payload: CreateDiagnosisEntryRequest,
    entryId?: number,
  ) => {
    if (!patientId) throw new Error("Sitzung abgelaufen.");

    if (entryId) {
      await diagnosisService.updateEntry(patientId, entryId, payload);
    } else {
      await diagnosisService.createEntry(patientId, payload);
    }
    await fetchEntries();
  };

  const deleteEntry = async (entryId: number) => {
    await diagnosisService.deleteEntry(entryId);
    await fetchEntries();
  };

  return {
    entries,
    isLoading,
    error,
    saveEntry,
    deleteEntry,
  };
};