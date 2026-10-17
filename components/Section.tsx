import type { ReactNode } from "react";

export default function Section({
  id,
  label,
  wide = false,
  children,
}: {
  id: string;
  label?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`section${wide ? " section-wide" : ""}`}>
      {label ? <div className="section-label">{label}</div> : null}
      {children}
    </section>
  );
}
