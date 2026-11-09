import type { EmergencyRedFlag } from "../types/emergency";

type RedFlagListProps = {
  flags: EmergencyRedFlag[];
};

// Rule based warnings from medication, conditions and symptoms
export function RedFlagList({ flags }: RedFlagListProps) {
  if (flags.length === 0) return null;

  return (
    <section className="flags" aria-labelledby="flags-title">
      <h2 id="flags-title">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 9v4M12 17h.01" />
          <path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />
        </svg>
        Warnhinweise
      </h2>
      {flags.map((flag) => (
        <div className="flag" key={`${flag.source}-${flag.title}`}>
          <strong>{flag.title}</strong>
          <span>{flag.text}</span>
        </div>
      ))}
      <p className="small" style={{ color: "#7f1d1d" }}>
        Automatisch aus den hinterlegten Daten abgeleitet.
      </p>
    </section>
  );
}
