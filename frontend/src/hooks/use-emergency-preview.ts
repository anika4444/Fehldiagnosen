import { useCallback, useEffect, useState } from "react";

import { emergencyService } from "@/api/emergencyService";
import { EmergencyPreviewResponse } from "@/types/emergency-type";
import { getApiErrorMessage } from "@/utils/api-error";

// The data a helper would see with the emergency code, used for the lock screen pass
export const useEmergencyPreview = (patientId: number | null) => {
  const [preview, setPreview] = useState<EmergencyPreviewResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPreview = useCallback(async () => {
    if (!patientId) return;
    setIsLoading(true);
    setError(null);

    try {
      setPreview(await emergencyService.getPreview(patientId, "emergency"));
    } catch (err) {
      setError(getApiErrorMessage(err, "Daten konnten nicht geladen werden."));
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchPreview();
  }, [fetchPreview]);

  return { preview, isLoading, error, refresh: fetchPreview };
};
