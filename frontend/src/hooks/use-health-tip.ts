import { useCallback, useEffect, useState } from "react";

import { healthTipService } from "@/api/healthTipService";

export const useHealthTip = () => {
  const [tip, setTip] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealthTip = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await healthTipService.getHealthTip();
      setTip(data.tip);
    } catch (error: any) {
      setError(error.message || "Fehler beim Laden des Gesundheitstipps.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealthTip();
  }, [fetchHealthTip]);

  return {
    tip,
    isLoading,
    error,
    refresh: fetchHealthTip,
  };
};
