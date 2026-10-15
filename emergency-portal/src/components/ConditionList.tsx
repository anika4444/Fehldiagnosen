import type { EmergencyCondition } from "../types/emergency";

type ConditionListProps = {
  conditions: EmergencyCondition[];
};

export function ConditionList({ conditions }: ConditionListProps) {
  if (conditions.length === 0) {
    return <p className="list empty">Keine chronischen oder aktiven Erkrankungen hinterlegt.</p>;
  }

  return (
    <ul className="list">
      {conditions.map((condition, index) => (
        <li key={`${condition.title}-${index}`} className="row row-center">
          <span className="stack" style={{ gap: 2 }}>
            <span style={{ fontWeight: 700 }}>{condition.title}</span>
            <span className="meta">
              {condition.status}
              {condition.year ? `, seit ${condition.year}` : ""}
            </span>
          </span>
          {condition.icdCode && <span className="code">{condition.icdCode}</span>}
        </li>
      ))}
    </ul>
  );
}
