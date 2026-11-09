import { useCallback, useEffect, useState } from "react";

import { ApiError, emergencyApi } from "../api/emergencyApi";
import { AiSummaryBox } from "../components/AiSummaryBox";
import { CodeTypePill } from "../components/CodeTypePill";
import { ConditionList } from "../components/ConditionList";
import { InteractionList } from "../components/InteractionList";
import { LastUpdated } from "../components/LastUpdated";
import { LetterList } from "../components/LetterList";
import { MedicationList } from "../components/MedicationList";
import { RedFlagList } from "../components/RedFlagList";
import { Section } from "../components/Section";
import { SessionTimer } from "../components/SessionTimer";
import { SymptomList } from "../components/SymptomList";
import { SymptomTimeline } from "../components/SymptomTimeline";
import { TopBar } from "../components/TopBar";
import { useFocusOnMount } from "../hooks/useFocusOnMount";
import type { DataCategory, EmergencyData, EmergencyInsights, EmergencyRedFlag } from "../types/emergency";

type DataPageProps = {
  onEnded: (reason: string) => void;
};

const ENDED_MESSAGE = "Die Sitzung ist abgelaufen oder wurde beendet. Wer weiterlesen möchte, gibt den Code erneut ein.";

// Asks the server regularly whether the session is still valid, so "Alle Zugriffe beenden"
// in the app also closes a page that is already open
const SESSION_CHECK_MS = 30_000;

export function DataPage({ onEnded }: DataPageProps) {
  const headingRef = useFocusOnMount<HTMLHeadingElement>();
  const [data, setData] = useState<EmergencyData | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [insights, setInsights] = useState<EmergencyInsights | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);
  const [insightsFailed, setInsightsFailed] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);

  // 401 and 403 mean the session is over. Everything else is a temporary problem.
  const endIfSessionIsOver = useCallback(
    (caught: unknown): boolean => {
      if (caught instanceof ApiError && (caught.status === 401 || caught.status === 403)) {
        onEnded(ENDED_MESSAGE);
        return true;
      }
      return false;
    },
    [onEnded],
  );

  // Core data first so the important part is on screen quickly, slower parts afterwards
  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const result = await emergencyApi.getData();
        if (!active) return;
        setData(result);
        setSecondsRemaining(result.sessionSecondsRemaining ?? null);
      } catch (caught) {
        if (!active || endIfSessionIsOver(caught)) return;
        setLoadError(caught instanceof Error ? caught.message : "Unbekannter Fehler.");
        return;
      }

      try {
        const extra = await emergencyApi.getInsights();
        if (active) setInsights(extra);
      } catch (caught) {
        if (active && !endIfSessionIsOver(caught)) setInsightsFailed(true);
      } finally {
        if (active) setIsLoadingInsights(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [loadAttempt, endIfSessionIsOver]);

  const hasData = data !== null;

  useEffect(() => {
    if (!hasData) return;
    let active = true;

    const check = async () => {
      try {
        const status = await emergencyApi.getSession();
        if (active) setSecondsRemaining(status.secondsRemaining);
      } catch (caught) {
        // Without connection the page stays until the timer ends
        if (active) endIfSessionIsOver(caught);
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") check();
    };

    const id = window.setInterval(check, SESSION_CHECK_MS);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      active = false;
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [hasData, endIfSessionIsOver]);

  const retry = () => {
    setLoadError(null);
    setInsightsFailed(false);
    setIsLoadingInsights(true);
    setLoadAttempt((attempt) => attempt + 1);
  };

  const handleExpired = useCallback(() => onEnded(ENDED_MESSAGE), [onEnded]);

  const handleEndSession = async () => {
    await emergencyApi.endSession().catch(() => undefined);
    onEnded("Sie haben die Sitzung beendet.");
  };

  const shows = (category: DataCategory) => data?.sharedCategories.includes(category) ?? false;
  const hasExtended = Boolean(data?.symptomHistory || data?.medicalLetters || data?.medicationHistory);
  const title = !data ? "Gesundheitsdaten" : data.codeType === "Emergency" ? "Notfalldaten" : "Behandlungsdaten";

  return (
    <>
      <TopBar
        title={data ? <CodeTypePill codeType={data.codeType} /> : undefined}
        right={data && <SessionTimer secondsRemaining={secondsRemaining} onExpired={handleExpired} />}
      >
        {hasExtended && (
          <nav className="tabs" aria-label="Abschnitte">
            <a href="#kerndaten">Kerndaten</a>
            {data?.symptomHistory && <a href="#verlauf">Verlauf</a>}
            {data?.medicalLetters && <a href="#briefe">Arztbriefe</a>}
            {data?.medicationHistory && <a href="#historie">Historie</a>}
          </nav>
        )}
      </TopBar>

      <main className="page">
        <h1 className="title" ref={headingRef} tabIndex={-1}>
          {title}
        </h1>

        {loadError && (
          <div className="card stack" role="alert">
            <p className="error">{loadError}</p>
            <button type="button" className="btn btn-primary" onClick={retry}>
              Erneut versuchen
            </button>
          </div>
        )}

        {!data && !loadError && (
          <div className="stack" aria-busy="true" aria-label="Daten werden geladen">
            <div className="skeleton" style={{ height: 64 }} />
            <div className="skeleton" style={{ height: 120 }} />
            <div className="skeleton" style={{ height: 180 }} />
          </div>
        )}

        {data && (
          <>
            <div id="kerndaten" className="stack-l">
              <LastUpdated value={data.lastUpdatedAt} />

              {data.redFlags && <RedFlagList flags={withInteractionFlag(data.redFlags, insights)} />}

              {data.chronicConditions && (
                <Section title="Chronische und aktive Erkrankungen">
                  <ConditionList conditions={data.chronicConditions} />
                </Section>
              )}

              {data.medications && (
                <Section title={`Aktuelle Medikamente (${data.medications.length})`}>
                  <MedicationList medications={data.medications} />
                </Section>
              )}

              {shows("Interactions") && (
                <InteractionList
                  interactions={insights?.interactions}
                  isLoading={isLoadingInsights}
                  isUnavailable={insightsFailed || (insights?.interactionsUnavailable ?? false)}
                  uncheckedMedications={insights?.uncheckedMedications ?? []}
                />
              )}

              {data.symptoms && (
                <Section title="Aktuelle Symptome, letzte 14 Tage">
                  <SymptomList symptoms={data.symptoms} />
                </Section>
              )}

              {shows("AiSummary") && (
                <AiSummaryBox
                  summary={insights?.aiSummary}
                  disclaimer={insights?.aiDisclaimer}
                  isLoading={isLoadingInsights}
                  isUnavailable={!isLoadingInsights && (insightsFailed || (insights?.aiUnavailable ?? true))}
                />
              )}
            </div>

            {data.symptomHistory && (
              <Section id="verlauf" title="Symptomverlauf">
                <SymptomTimeline symptoms={data.symptomHistory} />
              </Section>
            )}

            {data.medicalLetters && (
              <Section id="briefe" title="Arztbriefe">
                <LetterList letters={data.medicalLetters} />
              </Section>
            )}

            {data.medicationHistory && (
              <Section id="historie" title="Medikamentenhistorie">
                <MedicationList medications={data.medicationHistory} showPeriod />
              </Section>
            )}
          </>
        )}

        {(data || loadError) && (
          <footer className="footer">
            <p className="small">
              Ohne Name, Alter oder Foto. Nur lesend, dieser Zugriff wird protokolliert.
              {data?.codeType === "Emergency" && " Weitere Daten nur mit dem Behandlungscode."}
            </p>
            <button type="button" className="btn btn-secondary" onClick={handleEndSession}>
              Sitzung beenden
            </button>
          </footer>
        )}
      </main>
    </>
  );
}

// Interactions arrive later, so their warning is added to the rule based flags here
function withInteractionFlag(flags: EmergencyRedFlag[], insights: EmergencyInsights | null): EmergencyRedFlag[] {
  const count = insights?.interactions?.length ?? 0;
  if (count === 0) return flags;

  return [
    ...flags,
    {
      title: count === 1 ? "Wechselwirkung" : `${count} Wechselwirkungen`,
      text: "Zwischen den aktuellen Medikamenten, Details weiter unten.",
      source: "Interaction",
    },
  ];
}
