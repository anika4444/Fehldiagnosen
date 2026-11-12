type AiSummaryBoxProps = {
  summary?: string | null;
  disclaimer?: string | null;
  isLoading: boolean;
  isUnavailable: boolean;
};

// Always clearly marked as AI output, shown below the original data
export function AiSummaryBox({ summary, disclaimer, isLoading, isUnavailable }: AiSummaryBoxProps) {
  return (
    <section className="ai-box" aria-labelledby="ai-title" aria-busy={isLoading}>
      <div className="row row-center" style={{ justifyContent: "flex-start", gap: 8 }}>
        <span className="ai-tag">KI-GENERIERT</span>
        <h2 id="ai-title" style={{ fontSize: 15, fontWeight: 800 }}>
          Kurzzusammenfassung
        </h2>
      </div>

      {isLoading && (
        <div className="stack">
          <div className="skeleton" />
          <div className="skeleton" style={{ width: "85%" }} />
          <div className="skeleton" style={{ width: "60%" }} />
        </div>
      )}

      {!isLoading && isUnavailable && <p className="meta">Die Zusammenfassung ist gerade nicht verfügbar. Die Originaldaten oben sind vollständig.</p>}

      {!isLoading && !isUnavailable && summary && <p style={{ fontSize: 15 }}>{summary}</p>}

      <span className="small">{disclaimer ?? "Automatisch erstellt. Ersetzt nicht die Originaldaten auf dieser Seite."}</span>
    </section>
  );
}
