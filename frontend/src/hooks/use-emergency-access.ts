import { useCallback, useRef, useState } from "react";

import { emergencyService, PermanentCodeType } from "@/api/emergencyService";
import {
  EmergencyCodeStatus,
  EmergencyCodeType,
  EmergencyOverviewResponse,
  GeneratedEmergencyCode,
} from "@/types/emergency-type";
import { getApiErrorMessage } from "@/utils/api-error";
import {
  buildAccessUrl,
  emergencyCodeStore,
} from "@/utils/emergency-code-store";

// What the screens need per code type: server state plus the secret stored on this device
export interface EmergencyCodeView {
  status: EmergencyCodeStatus | null;
  // Only set when it belongs to the code that is active on the server right now
  local: GeneratedEmergencyCode | null;
  accessUrl: string | null;
  // Code is active on the server but was created on another device or before a reinstall
  isMissingOnDevice: boolean;
}

const CODE_TYPES: EmergencyCodeType[] = ["Emergency", "Treatment", "OneTime"];

const toPath = (type: EmergencyCodeType): PermanentCodeType =>
  type === "Treatment" ? "treatment" : "emergency";

// Loading is triggered by the screen on focus, so changes made in sub screens show up right away.
// Lock screen and emergency pass use this hook too, so they never show an outdated code.
export const useEmergencyAccess = (patientId: number | null) => {
  const [overview, setOverview] = useState<EmergencyOverviewResponse | null>(
    null,
  );
  const [codes, setCodes] = useState<Record<
    EmergencyCodeType,
    EmergencyCodeView
  > | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Every load gets a new number, and code changes in progress are counted. A load that is
  // outdated or overlaps a code change must not delete a secret that is being saved right now.
  const requestRef = useRef(0);
  const pendingChangesRef = useRef(0);

  const fetchOverview = useCallback(async () => {
    if (!patientId) return;
    const requestId = ++requestRef.current;
    const isOutdated = () =>
      requestId !== requestRef.current || pendingChangesRef.current > 0;
    setIsLoading(true);
    setError(null);

    try {
      const data = await emergencyService.getOverview(patientId);
      if (isOutdated()) return;
      const views = {} as Record<EmergencyCodeType, EmergencyCodeView>;

      for (const type of CODE_TYPES) {
        const status =
          data.activeCodes.find((code) => code.type === type) ?? null;
        let local = await emergencyCodeStore.get(patientId, type);

        // A secret of a code that is no longer active can never work again, so it is deleted
        if (local && (!status || status.publicId !== local.publicId)) {
          if (isOutdated()) return;
          await emergencyCodeStore.clear(patientId, type);
          local = null;
        }

        views[type] = {
          status,
          local,
          accessUrl: local
            ? buildAccessUrl(data.portalBaseUrl, local.token)
            : null,
          isMissingOnDevice: Boolean(status && !local),
        };
      }

      if (isOutdated()) return;
      setOverview(data);
      setCodes(views);
    } catch (err) {
      if (isOutdated()) return;
      setError(
        getApiErrorMessage(err, "Notfallzugang konnte nicht geladen werden."),
      );
    } finally {
      if (!isOutdated()) setIsLoading(false);
    }
  }, [patientId]);

  // Runs a code change and reloads afterwards, also when the change failed
  const changeCode = async <T>(change: () => Promise<T>): Promise<T> => {
    pendingChangesRef.current += 1;
    try {
      return await change();
    } finally {
      pendingChangesRef.current -= 1;
      await fetchOverview();
    }
  };

  const giveConsent = async () => {
    if (!patientId) return;
    await emergencyService.setConsent(patientId, true);
    await fetchOverview();
  };

  // Creates a new code, the old one stops working immediately
  const regenerateCode = async (type: "Emergency" | "Treatment") => {
    if (!patientId) return;
    await changeCode(async () => {
      const generated = await emergencyService.regenerateCode(
        patientId,
        toPath(type),
      );
      await emergencyCodeStore.save(patientId, generated);
    });
  };

  const deactivateCode = async (type: EmergencyCodeType) => {
    if (!patientId) return;
    await changeCode(async () => {
      await emergencyService.deactivateCode(
        patientId,
        type === "OneTime" ? "onetime" : toPath(type),
      );
      await emergencyCodeStore.clear(patientId, type);
    });
  };

  const createOneTimeLink = async () => {
    if (!patientId) return null;
    return changeCode(async () => {
      const generated = await emergencyService.createOneTimeLink(patientId);
      await emergencyCodeStore.save(patientId, generated);
      return generated;
    });
  };

  const revokeAllSessions = async () => {
    if (!patientId) return 0;
    const result = await emergencyService.revokeAllSessions(patientId);
    await fetchOverview();
    return result.revoked;
  };

  return {
    overview,
    codes,
    isLoading,
    error,
    refresh: fetchOverview,
    giveConsent,
    regenerateCode,
    deactivateCode,
    createOneTimeLink,
    revokeAllSessions,
  };
};
