import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, title, children }: SectionProps) {
  const headingId = `${id ?? title.replace(/\s+/g, "-").toLowerCase()}-title`;

  return (
    <section id={id} className="stack" aria-labelledby={headingId} style={{ gap: 10 }}>
      <h2 id={headingId} className="section-label">
        {title}
      </h2>
      {children}
    </section>
  );
}
