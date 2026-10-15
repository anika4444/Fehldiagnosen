import { useCallback, useEffect, useState } from "react";

import { ApiError, emergencyApi, sessionStore } from "./api/emergencyApi";
import { ConsentPage } from "./pages/ConsentPage";
import { DataPage } from "./pages/DataPage";
import { EndedPage } from "./pages/EndedPage";
import { StartPage } from "./pages/StartPage";
import { WaitingPage } from "./pages/WaitingPage";
import type { AccessorInfo, Credentials, EmergencySession } from "./types/emergency";

// Simple state machine instead of a router: the portal has only a handful of screens
type Step =
  | { name: "loading" }
  | { name: "start"; notice?: string; publicId?: string }
  | { name: "consent"; credentials: Credentials }
  | { name: "waiting"; session: EmergencySession }
  | { name: "data" }
  | { name: "ended"; reason: string }
  | { name: "offline" };

type LinkResult = {
  token: string | null;
  isBroken: boolean;
};

const TOKEN_CHARS = /^[A-Za-z0-9_-]{20,}/;
const BROKEN_LINK_MESSAGE = "Der Link ist unvollständig. Bitte den QR-Code erneut scannen oder Notfall-ID und PIN eingeben.";

// QR links look like /a#token. The token is behind # so the browser never sends it to the web host.
// The address bar is cleaned right away, also for broken links, so the token does not stay visible.
// Characters after the token (e.g. a dot from a chat message) are ignored.
function takeTokenFromUrl(): LinkResult {
  if (!/^\/a(\/|$)/.test(window.location.pathname)) return { token: null, isBroken: false };

  const match = window.location.hash.replace(/^#/, "").match(TOKEN_CHARS);
  window.history.replaceState(null, "", "/");

  return match ? { token: match[0], isBroken: false } : { token: null, isBroken: true };
}

// Module level so it runs exactly once, also under React StrictMode
const initialLink = takeTokenFromUrl();

export default function App() {
  const [step, setStep] = useState<Step>({ name: "loading" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentError, setConsentError] = useState<string | null>(null);

  // Reload inside a running session. Only a clear "no" from the server ends it,
  // a network problem must not throw away a one time link that was already used.
  const restoreSession = useCallback(() => {
    setStep({ name: "loading" });

    emergencyApi
      .getSession()
      .then((session) => {
        if (session.approvalState === "Pending") setStep({ name: "waiting", session });
        else if (session.approvalState === "Denied") setStep({ name: "ended", reason: "Der Zugriff wurde abgelehnt." });
        else setStep({ name: "data" });
      })
      .catch((caught) => {
        if (caught instanceof ApiError && (caught.status === 401 || caught.status === 403)) {
          sessionStore.clear();
          setStep({ name: "start" });
        } else {
          setStep({ name: "offline" });
        }
      });
  }, []);

  useEffect(() => {
    if (initialLink.token) {
      // A new scan always starts a new session
      sessionStore.clear();
      setStep({ name: "consent", credentials: { kind: "token", token: initialLink.token } });
      return;
    }

    if (initialLink.isBroken) {
      setStep({ name: "start", notice: BROKEN_LINK_MESSAGE });
      return;
    }

    if (!sessionStore.get()) {
      setStep({ name: "start" });
      return;
    }

    restoreSession();
  }, [restoreSession]);

  const handleConfirm = async (credentials: Credentials, accessor: AccessorInfo) => {
    setIsSubmitting(true);
    setConsentError(null);

    try {
      const session = await emergencyApi.startSession(credentials, accessor);
      setStep(session.approvalState === "Pending" ? { name: "waiting", session } : { name: "data" });
    } catch (caught) {
      const message = caught instanceof ApiError ? caught.message : "Unbekannter Fehler.";

      // Wrong PIN or too many attempts: back to the form, the id stays, the PIN is not kept
      if (credentials.kind === "pin" && caught instanceof ApiError && [401, 429].includes(caught.status)) {
        setStep({ name: "start", notice: message, publicId: credentials.publicId });
      } else {
        setConsentError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnded = useCallback((reason: string) => {
    sessionStore.clear();
    setStep({ name: "ended", reason });
  }, []);

  const restart = () => {
    sessionStore.clear();
    setConsentError(null);
    setStep({ name: "start" });
  };

  const cancelWaiting = async () => {
    await emergencyApi.endSession().catch(() => undefined);
    restart();
  };

  switch (step.name) {
    case "loading":
      return null;

    case "start":
      return (
        <StartPage
          key={`${step.notice ?? ""}-${step.publicId ?? ""}`}
          notice={step.notice}
          initialPublicId={step.publicId}
          onContinue={(credentials) => {
            setConsentError(null);
            setStep({ name: "consent", credentials });
          }}
        />
      );

    case "consent":
      return (
        <ConsentPage
          viaQrCode={step.credentials.kind === "token"}
          isSubmitting={isSubmitting}
          error={consentError}
          onConfirm={(accessor) => handleConfirm(step.credentials, accessor)}
          onCancel={restart}
        />
      );

    case "waiting":
      return <WaitingPage session={step.session} onApproved={() => setStep({ name: "data" })} onEnded={handleEnded} onCancel={cancelWaiting} />;

    case "data":
      return <DataPage onEnded={handleEnded} />;

    case "ended":
      return <EndedPage reason={step.reason} onRestart={restart} />;

    case "offline":
      return (
        <EndedPage
          title="Keine Verbindung"
          reason="Der Server ist gerade nicht erreichbar. Die Sitzung bleibt gültig, bis sie abläuft."
          actionLabel="Neu beginnen"
          onRetry={restoreSession}
          onRestart={restart}
        />
      );
  }
}
