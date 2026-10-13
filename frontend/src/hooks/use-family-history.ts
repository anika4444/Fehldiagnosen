import { useCallback, useEffect, useState } from "react";

import { familyHistoryService } from "@/api/familyHistoryService";
import {
  CreateFamilyHistoryEntryRequest,
  FamilyHistoryEntryResponse,
} from "@/types/family-history-type";

export const useFamilyHistory = (patientId: number | null) => {
  const [entries, setEntries] = useState<FamilyHistoryEntryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    if (!patientId) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await familyHistoryService.getEntriesByPatientId(patientId);
      setEntries(data);
    } catch (err: any) {
      setError(err.message || "Fehler beim Laden der Familienanamnese.");
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const saveEntry = async (
    payload: CreateFamilyHistoryEntryRequest,
    entryId?: number,
  ) => {
    if (!patientId) throw new Error("Sitzung abgelaufen.");

    if (entryId) {
      await familyHistoryService.updateEntry(patientId, entryId, payload);
    } else {
      await familyHistoryService.createEntry(patientId, payload);
    }
    await fetchEntries();
  };

  const deleteEntry = async (entryId: number) => {
    await familyHistoryService.deleteEntry(entryId);
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
