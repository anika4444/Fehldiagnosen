import { useCallback, useEffect, useState } from "react";

import { emergencyService } from "@/api/emergencyService";
import {
  EmergencyCategorySetting,
  EmergencyDataCategory,
  EmergencySettingsResponse,
} from "@/types/emergency-type";
import { getApiErrorMessage } from "@/utils/api-error";
import { emergencyCodeStore } from "@/utils/emergency-code-store";

export const useEmergencySettings = (patientId: number | null) => {
  const [settings, setSettings] = useState<EmergencySettingsResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    if (!patientId) return;
    setIsLoading(true);
    setError(null);

    try {
      setSettings(await emergencyService.getSettings(patientId));
      setIsDirty(false);
    } catch (err) {
      setError(
        getApiErrorMessage(err, "Freigaben konnten nicht geladen werden."),
      );
    } finally {
      setIsLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const toggleCategory = (
    category: EmergencyDataCategory,
    column: "emergency" | "treatment",
  ) => {
    setSettings((prev) => {
      if (!prev) return prev;

      const categories = prev.categories.map(
        (row): EmergencyCategorySetting => {
          if (row.category !== category) return row;
          // Extended data is never allowed for the emergency code, the backend enforces the same
          if (column === "emergency" && row.isExtended) return row;
          return { ...row, [column]: !row[column] };
        },
      );

      return { ...prev, categories };
    });
    setIsDirty(true);
  };

  const setTreatmentRequiresApproval = (value: boolean) => {
    setSettings((prev) =>
      prev ? { ...prev, treatmentRequiresApproval: value } : prev,
    );
    setIsDirty(true);
  };

  const saveSettings = async () => {
    if (!patientId || !settings) return;
    setIsSaving(true);

    try {
      const saved = await emergencyService.updateSettings(patientId, {
        treatmentRequiresApproval: settings.treatmentRequiresApproval,
        categories: settings.categories,
      });
      setSettings(saved);
      setIsDirty(false);
    } finally {
      setIsSaving(false);
    }
  };

  // Withdrawing consent deactivates both codes on the server, so the local secrets go too
  const revokeConsent = async () => {
    if (!patientId) return;
    const saved = await emergencyService.setConsent(patientId, false);
    await emergencyCodeStore.clearAll(patientId);
    setSettings(saved);
    setIsDirty(false);
  };

  return {
    settings,
    isLoading,
    isSaving,
    isDirty,
    error,
    toggleCategory,
    setTreatmentRequiresApproval,
    saveSettings,
    revokeConsent,
  };
};
