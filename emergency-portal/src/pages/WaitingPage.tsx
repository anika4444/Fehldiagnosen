import { useEffect, useRef, useState } from "react";

import { ApiError, emergencyApi } from "../api/emergencyApi";
import { CodeTypePill } from "../components/CodeTypePill";
import { TopBar } from "../components/TopBar";
import { useCountdown } from "../hooks/useCountdown";
import { useFocusOnMount } from "../hooks/useFocusOnMount";
import type { EmergencySession } from "../types/emergency";
import { formatCountdown } from "../utils/format";

type WaitingPageProps = {
  session: EmergencySession;
  onApproved: (session: EmergencySession) => void;
  onEnded: (reason: string) => void;
  onCancel: () => void;
};

const POLL_INTERVAL_MS = 3000;

// Treatment code with approval: wait until the patient allows the access in the app
export function WaitingPage({ session, onApproved, onEnded, onCancel }: WaitingPageProps) {
  const headingRef = useFocusOnMount<HTMLHeadingElement>();
  const [approvalSeconds, setApprovalSeconds] = useState(session.approvalSecondsRemaining ?? null);
  const [hasConnectionProblem, setHasConnectionProblem] = useState(false);
  const secondsLeft = useCountdown(approvalSeconds);

  const callbacks = useRef({ onApproved, onEnded });
  callbacks.current = { onApproved, onEnded };

  useEffect(() => {
    let active = true;

    const poll = async () => {
      try {
        const status = await emergencyApi.getSession();
        if (!active) return;
        setHasConnectionProblem(false);

        if (status.approvalState === "Approved" || status.approvalState === "NotRequired") {
          callbacks.current.onApproved(status);
        } else if (status.approvalState === "Denied") {
          callbacks.current.onEnded("Die Person hat den Zugriff abgelehnt.");
        } else if (status.approvalSecondsRemaining != null) {
          setApprovalSeconds(status.approvalSecondsRemaining);
        }
      } catch (error) {
        if (!active) return;
        if (error instanceof ApiError && error.status === 401) {
          callbacks.current.onEnded("Die Anfrage wurde nicht rechtzeitig bestätigt. Bitte den Code erneut eingeben.");
        } else {
          // Keep waiting, but tell the doctor that the connection is the problem
          setHasConnectionProblem(true);
        }
      }
    };

    const id = window.setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      active = false;
      window.clearInterval(id);
    };
  }, []);

  return (
    <>
      <TopBar right={<CodeTypePill codeType={session.codeType} />} />
      <main className="page">
        <div className="stack center" style={{ paddingTop: 20 }}>
          <span className="badge-icon" style={{ background: "var(--treatment-soft)", color: "var(--treatment)" }} aria-hidden="true">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="2" width="12" height="20" rx="2.5" />
              <path d="M10 18h4" />
              <path d="M9.5 10.5l2 2 3.5-4" />
            </svg>
          </span>
          <h1 className="title" ref={headingRef} tabIndex={-1}>
            Warte auf Freigabe
          </h1>
          <p className="lead" role="status">
            Die Person erlaubt den Zugriff gerade in ihrer ADAM App. Diese Seite lädt automatisch weiter.
          </p>
        </div>

        <div className="card stack">
          <div className="row">
            <span className="meta">Anfrage läuft ab in</span>
            <strong className="timer">{formatCountdown(secondsLeft ?? 0)}</strong>
          </div>
          <p className="small">Die ADAM App muss dafür auf dem Handy der Person geöffnet sein.</p>
          {hasConnectionProblem && (
            <p className="error" role="alert">
              Verbindung zum Server unterbrochen. Die Seite versucht es weiter.
            </p>
          )}
        </div>

        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Anfrage abbrechen
        </button>
      </main>
    </>
  );
}
