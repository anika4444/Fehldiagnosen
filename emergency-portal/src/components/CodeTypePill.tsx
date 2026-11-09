import type { CodeType } from "../types/emergency";

type CodeTypePillProps = {
  codeType: CodeType;
};

const LABELS: Record<CodeType, string> = {
  Emergency: "Notfallcode",
  Treatment: "Behandlungscode",
  OneTime: "Einmal-Link",
};

export function CodeTypePill({ codeType }: CodeTypePillProps) {
  const className = codeType === "Emergency" ? "pill pill-emergency" : "pill pill-treatment";
  return <span className={className}>{LABELS[codeType]}</span>;
}
