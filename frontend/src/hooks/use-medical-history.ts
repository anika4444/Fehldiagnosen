import { useCallback, useEffect, useState } from "react";

import { medicalHistoryEntryService } from "@/api/medicalHistoryEntryService";
import { MedicalHistoryEntryResponse } from "@/types/medical-history-entry-type";

export const useMedicalHistory = (patientId: number | null) => {
  const [entries, setEntries] = useState<MedicalHistoryEntryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    if (!patientId) return;

    setIsLoading(true);
    setError(null);
    try {
      const data =
        await medicalHistoryEntryService.getEntriesByPatientId(patientId);
      setEntries(Array.isArray(data) ? data : []);
    } catch {
      setError("Fehler beim Laden der Vorerkrankungen.");
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const saveEntry = async (data: any, entryId?: number) => {
    if (!patientId) throw new Error("Sitzung abgelaufen.");

    if (entryId) {
      await medicalHistoryEntryService.updateEntry(patientId, entryId, data);
    } else {
      await medicalHistoryEntryService.createEntry(patientId, data);
    }
    await fetchEntries();
  };

  const deleteEntry = async (entryId: number) => {
    await medicalHistoryEntryService.deleteEntry(entryId);
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
