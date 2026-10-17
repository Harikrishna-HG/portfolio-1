"use client";

import type { ReactNode } from "react";
import type { Bi } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";

export default function Section({
  id,
  label,
  wide = false,
  children,
}: {
  id: string;
  label?: Bi;
  wide?: boolean;
  children: ReactNode;
}) {
  const t = useT();
  return (
    <section id={id} className={`section${wide ? " section-wide" : ""}`}>
      {label ? <div className="section-label">{t(label)}</div> : null}
      {children}
    </section>
  );
}
