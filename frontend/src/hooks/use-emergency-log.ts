import { useCallback, useEffect, useState } from "react";

import { emergencyService } from "@/api/emergencyService";
import { EmergencyAccessLogResponse } from "@/types/emergency-type";
import { getApiErrorMessage } from "@/utils/api-error";

export const useEmergencyLog = (patientId: number | null) => {
  const [logs, setLogs] = useState<EmergencyAccessLogResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    if (!patientId) return;
    setIsLoading(true);
    setError(null);

    try {
      setLogs(await emergencyService.getLogs(patientId));
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Protokoll konnte nicht geladen werden."),
      );
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const revokeSession = async (sessionId: number) => {
    if (!patientId) return;
    await emergencyService.revokeSession(patientId, sessionId);
    await fetchLogs();
  };

  return { logs, isLoading, error, refresh: fetchLogs, revokeSession };
};
