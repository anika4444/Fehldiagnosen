import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Alert, AppState, Platform } from "react-native";

import { emergencyService } from "@/api/emergencyService";
import {
  CODE_TYPE_LABELS,
  EMERGENCY_POLL_INTERVAL_MS,
  METHOD_LABELS,
} from "@/constants/emergency";
import {
  EmergencyAccessLogResponse,
  PendingApprovalResponse,
} from "@/types/emergency-type";
import { emergencyCodeStore } from "@/utils/emergency-code-store";
import { formatTime, toLocalDate } from "@/utils/emergency-date";

interface Announcement {
  title: string;
  message: string;
}

const describeAccess = (log: EmergencyAccessLogResponse) => {
  const who =
    [log.accessorName, log.accessorInstitution].filter(Boolean).join(", ") ||
    "Keine Angabe zur Person";
  const how =
    log.codeType === "OneTime"
      ? "über den Einmal-Link"
      : `${CODE_TYPE_LABELS[log.codeType]} per ${METHOD_LABELS[log.method]}`;
  return [who, how, log.deviceType].filter(Boolean).join("\n");
};

const describeDuration = (minutes: number) => {
  if (minutes < 60) return `${minutes} Minuten`;
  const hours = Math.round(minutes / 60);
  return hours === 1 ? "1 Stunde" : `${hours} Stunden`;
};

// One message for everything new since the last check, treatment accesses are named clearly
function buildAnnouncement(
  granted: EmergencyAccessLogResponse[],
  failed: EmergencyAccessLogResponse[],
): Announcement | null {
  if (granted.length === 0 && failed.length === 0) return null;

  const latest = granted[granted.length - 1];
  const showsExtendedData = granted.some((log) => log.codeType !== "Emergency");
  const parts: string[] = [];

  if (latest) parts.push(describeAccess(latest));
  if (granted.length > 1)
    parts.push(
      `Insgesamt ${granted.length} neue Zugriffe, Details im Zugriffsprotokoll.`,
    );
  if (showsExtendedData)
    parts.push(
      "Dabei waren auch Ihre erweiterten Daten wie Arztbriefe und Verlauf sichtbar.",
    );
  if (failed.length > 0) {
    parts.push(
      `${failed.length === 1 ? "1 fehlgeschlagener PIN-Versuch" : `${failed.length} fehlgeschlagene PIN-Versuche`}. ` +
        "Wenn Sie das nicht veranlasst haben, erzeugen Sie den Code neu.",
    );
  }

  const title =
    granted.length === 0
      ? "Fehlgeschlagene Zugriffsversuche"
      : showsExtendedData
        ? "Zugriff auf Ihre Behandlungsdaten"
        : "Zugriff auf Ihre Notfalldaten";

  return { title, message: parts.join("\n\n") };
}

const isFailedAttempt = (log: EmergencyAccessLogResponse) =>
  log.outcome === "WrongPin" || log.outcome === "Locked";

// Expo Go cannot receive remote push messages, so the app asks the backend itself while it is open:
// new accesses are announced and approval requests are answered here.
// Only one dialog is on screen at a time: approval prompts first, then error notices, then one
// summary of all new accesses. On Android a new alert closes the visible one, so a dialog that
// was closed without an answer is shown again later instead of being lost.
export const useEmergencyWatch = (patientId: number | null) => {
  useEffect(() => {
    if (!patientId) return;

    const approvals: PendingApprovalResponse[] = [];
    const notices: Announcement[] = [];
    // Requests that are queued, on screen or answered, so the next poll does not add them again
    const knownRequests = new Set<number>();
    // Log entries collected since the last summary, they add up until a dialog is free
    const queuedLogIds = new Set<number>();
    let unannouncedGranted: EmergencyAccessLogResponse[] = [];
    let unannouncedFailed: EmergencyAccessLogResponse[] = [];
    let isDialogOpen = false;
    let isChecking = false;
    let isStopped = false;
    let interval: ReturnType<typeof setInterval> | undefined;

    const showNext = () => {
      if (isDialogOpen || isStopped) return;

      // Requests whose answer window is over are dropped silently, the portal already gave up
      let next = approvals.shift();
      while (
        next &&
        next.approvalExpiresAt &&
        toLocalDate(next.approvalExpiresAt).getTime() < Date.now()
      ) {
        next = approvals.shift();
      }

      if (next) {
        askForApproval(next);
        return;
      }

      const notice = notices.shift();
      if (notice) {
        showNotice(notice);
        return;
      }

      const summary = buildAnnouncement(unannouncedGranted, unannouncedFailed);
      unannouncedGranted = [];
      unannouncedFailed = [];
      if (summary) showNotice(summary);
    };

    const showNotice = (notice: Announcement) => {
      isDialogOpen = true;

      if (Platform.OS === "web") {
        window.alert(`${notice.title}\n\n${notice.message}`);
        isDialogOpen = false;
        showNext();
        return;
      }

      Alert.alert(
        notice.title,
        notice.message,
        [
          {
            text: "OK",
            onPress: () => {
              isDialogOpen = false;
              showNext();
            },
          },
        ],
        {
          cancelable: false,
          // Android: closed by another alert before it was read, so it comes again on the next check
          onDismiss: () => {
            notices.unshift(notice);
            isDialogOpen = false;
          },
        },
      );
    };

    const decide = async (
      request: PendingApprovalResponse,
      approve: boolean,
    ) => {
      try {
        await emergencyService.decideApproval(
          patientId,
          request.sessionId,
          approve,
        );
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 409) {
          notices.push({
            title: "Anfrage abgelaufen",
            message:
              "Die Anfrage war nicht mehr offen. Die Person im Portal muss den Code erneut eingeben.",
          });
        } else {
          // Ask again on the next poll if the request is still open
          knownRequests.delete(request.sessionId);
          notices.push({
            title: "Antwort nicht gesendet",
            message:
              "Ihre Antwort konnte nicht gesendet werden. Bitte prüfen Sie die Internetverbindung.",
          });
        }
      } finally {
        isDialogOpen = false;
        showNext();
      }
    };

    const askForApproval = (request: PendingApprovalResponse) => {
      isDialogOpen = true;

      const who =
        [request.accessorName, request.accessorInstitution]
          .filter(Boolean)
          .join(", ") || "Keine Angabe zur Person";
      const answerUntil = request.approvalExpiresAt
        ? `\nAntwort bis ${formatTime(request.approvalExpiresAt)} Uhr möglich.`
        : "";
      const message =
        `${who}\n${request.deviceType ?? ""}\n\n` +
        `Zugriff für ${describeDuration(request.sessionMinutes)}. Name und Einrichtung sind nicht überprüft. ` +
        `Erlauben Sie nur, wenn Sie gerade in Behandlung sind.${answerUntil}`;

      if (Platform.OS === "web") {
        decide(
          request,
          window.confirm(`Zugriff auf Ihre Behandlungsdaten?\n\n${message}`),
        );
        return;
      }

      Alert.alert(
        "Zugriff auf Ihre Behandlungsdaten?",
        message,
        [
          {
            text: "Ablehnen",
            style: "destructive",
            onPress: () => decide(request, false),
          },
          { text: "Erlauben", onPress: () => decide(request, true) },
        ],
        {
          cancelable: false,
          // Android: another alert closed this one before an answer, so it is asked again
          onDismiss: () => {
            knownRequests.delete(request.sessionId);
            isDialogOpen = false;
          },
        },
      );
    };

    const check = async () => {
      if (isChecking || isStopped) return;
      isChecking = true;

      try {
        const pending = await emergencyService.getPendingApprovals(patientId);
        for (const request of pending) {
          if (knownRequests.has(request.sessionId)) continue;
          knownRequests.add(request.sessionId);
          approvals.push(request);
        }

        const logs = await emergencyService.getLogs(patientId);
        const newestId = logs.reduce((max, log) => Math.max(max, log.id), 0);
        const lastSeen = await emergencyCodeStore.getLastSeenLogId(patientId);

        if (lastSeen === null) {
          // First run on this device: remember the current state without a flood of old messages.
          // An empty log is stored as 0, so the very first access is announced.
          await emergencyCodeStore.setLastSeenLogId(patientId, newestId);
        } else {
          for (const log of logs) {
            if (log.id <= lastSeen || queuedLogIds.has(log.id)) continue;
            if (log.outcome === "Granted") unannouncedGranted.push(log);
            else if (isFailedAttempt(log)) unannouncedFailed.push(log);
            else continue;
            queuedLogIds.add(log.id);
          }
          unannouncedGranted.sort((a, b) => a.id - b.id);
          unannouncedFailed.sort((a, b) => a.id - b.id);

          if (newestId > lastSeen)
            await emergencyCodeStore.setLastSeenLogId(patientId, newestId);
        }

        showNext();
      } catch (error) {
        // Logged out or token expired: stop asking until the next login
        if (isAxiosError(error) && error.response?.status === 401) {
          isStopped = true;
          clearInterval(interval);
        }
      } finally {
        isChecking = false;
      }
    };

    check();
    interval = setInterval(check, EMERGENCY_POLL_INTERVAL_MS);

    // Pause while the app is in the background, check right away when it comes back
    const subscription = AppState.addEventListener("change", (state) => {
      clearInterval(interval);
      if (state === "active" && !isStopped) {
        check();
        interval = setInterval(check, EMERGENCY_POLL_INTERVAL_MS);
      }
    });

    return () => {
      isStopped = true;
      clearInterval(interval);
      subscription.remove();
    };
  }, [patientId]);
};
