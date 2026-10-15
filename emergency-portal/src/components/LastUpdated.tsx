import { formatDateTime } from "../utils/format";

type LastUpdatedProps = {
  value?: string | null;
};

export function LastUpdated({ value }: LastUpdatedProps) {
  return (
    <div className="updated">
      <span className="label">Daten zuletzt aktualisiert</span>
      <span className="value">{value ? `am ${formatDateTime(value)}` : "unbekannt"}</span>
    </div>
  );
}
