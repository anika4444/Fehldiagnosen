import type { EmergencySymptom } from "../types/emergency";
import { formatDateTime } from "../utils/format";

type SymptomListProps = {
  symptoms: EmergencySymptom[];
};

export function intensityClass(intensity: number): string {
  if (intensity >= 7) return "intensity intensity-high";
  if (intensity >= 5) return "intensity intensity-mid";
  return "intensity intensity-low";
}

export function SymptomList({ symptoms }: SymptomListProps) {
  if (symptoms.length === 0) {
    return <p className="list empty">Keine Symptome in den letzten 14 Tagen.</p>;
  }

  return (
    <ul className="list">
      {symptoms.map((symptom, index) => (
        <li key={`${symptom.name}-${symptom.occurredAt}-${index}`} className="row row-center" style={{ justifyContent: "flex-start", gap: 14 }}>
          <span className={intensityClass(symptom.intensity)} aria-label={`Stärke ${symptom.intensity} von 10`}>
            <b>{symptom.intensity}</b>
            <small>von 10</small>
          </span>
          <span className="stack" style={{ gap: 2 }}>
            <span style={{ fontWeight: 700 }}>{symptom.name}</span>
            <span className="meta">
              {[formatDateTime(symptom.occurredAt), symptom.duration].filter(Boolean).join(", ")}
            </span>
            {symptom.notes && <span className="meta">{symptom.notes}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
