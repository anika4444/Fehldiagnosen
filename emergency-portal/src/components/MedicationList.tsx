import type { EmergencyMedication } from "../types/emergency";
import { formatDate } from "../utils/format";

type MedicationListProps = {
  medications: EmergencyMedication[];
  showPeriod?: boolean;
};

export function MedicationList({ medications, showPeriod = false }: MedicationListProps) {
  if (medications.length === 0) {
    return <p className="list empty">Keine Medikamente hinterlegt.</p>;
  }

  return (
    <ul className="list">
      {medications.map((medication, index) => (
        <li key={`${medication.name}-${index}`}>
          <div className="row">
            <span className="med-name">{medication.name}</span>
            {medication.dosage && <span className="med-dose">{medication.dosage}</span>}
          </div>
          <div className="row row-center">
            <span className="meta">{describe(medication, showPeriod)}</span>
            {showPeriod && (
              <span className={medication.isCurrent ? "pill pill-active" : "pill pill-neutral"}>
                {medication.isCurrent ? "aktuell" : "beendet"}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

function describe(medication: EmergencyMedication, showPeriod: boolean): string {
  const parts = [medication.intakeFrequency, medication.indication];

  if (showPeriod) {
    const from = formatDate(medication.startDate);
    const to = formatDate(medication.endDate);
    if (from && to) parts.push(`${from} bis ${to}`);
    else if (from) parts.push(`seit ${from}`);
    else if (to) parts.push(`bis ${to}`);
  }

  const text = parts.filter(Boolean).join(", ");
  return text || "Keine weiteren Angaben";
}
