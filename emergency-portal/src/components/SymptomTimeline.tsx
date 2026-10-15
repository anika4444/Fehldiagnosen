import type { EmergencySymptom } from "../types/emergency";
import { formatDateTime } from "../utils/format";

type SymptomTimelineProps = {
  symptoms: EmergencySymptom[];
};

function dotColor(intensity: number): string {
  if (intensity >= 7) return "#b91c1c";
  if (intensity >= 5) return "#d97706";
  return "#9ab0a6";
}

export function SymptomTimeline({ symptoms }: SymptomTimelineProps) {
  if (symptoms.length === 0) {
    return <p className="list empty">Kein Symptomverlauf vorhanden.</p>;
  }

  return (
    <ol className="list timeline">
      {symptoms.map((symptom, index) => (
        <li key={`${symptom.name}-${symptom.occurredAt}-${index}`}>
          <span className="dot" style={{ background: dotColor(symptom.intensity) }} aria-hidden="true" />
          <span className="stack" style={{ gap: 2, flex: 1, minWidth: 0 }}>
            <span className="row">
              <span style={{ fontWeight: 700 }}>{symptom.name}</span>
              <span className="med-dose">{symptom.intensity}/10</span>
            </span>
            <span className="meta">
              {[formatDateTime(symptom.occurredAt), symptom.duration, symptom.possibleTrigger && `Auslöser: ${symptom.possibleTrigger}`]
                .filter(Boolean)
                .join(", ")}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}
