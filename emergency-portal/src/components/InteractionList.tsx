import type { InteractionPair } from "../types/emergency";

type InteractionListProps = {
  interactions?: InteractionPair[] | null;
  isLoading: boolean;
  // The check failed or could not be loaded. Then nothing may look like "no interactions".
  isUnavailable: boolean;
  uncheckedMedications: string[];
};

export function InteractionList({ interactions, isLoading, isUnavailable, uncheckedMedications }: InteractionListProps) {
  if (isLoading) {
    return (
      <section className="notice" aria-busy="true" aria-labelledby="interactions-title">
        <h2 id="interactions-title">Wechselwirkungen</h2>
        <div className="skeleton" />
      </section>
    );
  }

  const uncheckedHint = uncheckedMedications.length > 0 && (
    <p className="small">Nicht geprüft, weil kein Wirkstoffcode hinterlegt ist: {uncheckedMedications.join(", ")}.</p>
  );

  if (isUnavailable || !interactions) {
    return (
      <section className="notice" aria-labelledby="interactions-title">
        <h2 id="interactions-title">Wechselwirkungen</h2>
        <p style={{ fontSize: 14 }}>
          Die Wechselwirkungsprüfung ist gerade nicht verfügbar. Bitte die Medikamente oben selbst prüfen.
        </p>
      </section>
    );
  }

  if (interactions.length === 0) {
    return (
      <section className="card stack" aria-labelledby="interactions-title">
        <h2 id="interactions-title" className="section-label">
          Wechselwirkungen
        </h2>
        <p className="meta">Keine bekannten Wechselwirkungen zwischen den aktuellen Medikamenten.</p>
        {uncheckedHint}
      </section>
    );
  }

  return (
    <section className="notice" aria-labelledby="interactions-title">
      <h2 id="interactions-title">
        {interactions.length === 1 ? "Wechselwirkung" : `${interactions.length} Wechselwirkungen`}
      </h2>
      {interactions.map((interaction, index) => (
        <p key={`${interaction.medicationA}-${interaction.medicationB}-${index}`} style={{ fontSize: 14 }}>
          <strong>
            {interaction.medicationA} und {interaction.medicationB}:
          </strong>{" "}
          {interaction.description}
        </p>
      ))}
      {uncheckedHint}
      <span className="small" style={{ color: "var(--notice)" }}>
        Quelle: DrugBank-Abgleich
      </span>
    </section>
  );
}
