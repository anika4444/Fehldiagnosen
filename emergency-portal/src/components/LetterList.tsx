import type { EmergencyLetter } from "../types/emergency";
import { formatDate } from "../utils/format";

type LetterListProps = {
  letters: EmergencyLetter[];
};

type LetterFieldProps = {
  label: string;
  value?: string | null;
};

function LetterField({ label, value }: LetterFieldProps) {
  if (!value) return null;

  return (
    <div className="letter-field">
      <span className="letter-label">{label}</span>
      <span style={{ whiteSpace: "pre-line" }}>{value}</span>
    </div>
  );
}

export function LetterList({ letters }: LetterListProps) {
  if (letters.length === 0) {
    return <p className="list empty">Keine Arztbriefe hinterlegt.</p>;
  }

  return (
    <ul className="list">
      {letters.map((letter, index) => (
        <li key={`${letter.subject}-${index}`} className="stack">
          <div className="row row-center">
            <span className="stack" style={{ gap: 2 }}>
              <span style={{ fontWeight: 800 }}>{letter.subject}</span>
              <span className="meta">
                {formatDate(letter.date)}, {letter.status}
              </span>
            </span>
            {letter.icdCode && <span className="code">{letter.icdCode}</span>}
          </div>

          <LetterField label="Beschreibung" value={letter.text} />
          <LetterField label="Befunde" value={letter.findings} />
          <LetterField label="Therapie" value={letter.therapeuticMeasures} />
          <LetterField label="Medikamente laut Brief" value={letter.medicationText} />

          {letter.aiExplanation && (
            <div className="letter-ai">
              <span className="ai-tag">KI-ERKLÄRUNG</span>
              <span style={{ whiteSpace: "pre-line" }}>{letter.aiExplanation}</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
