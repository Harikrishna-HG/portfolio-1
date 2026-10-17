"use client";

import { useRef, type ReactNode } from "react";
import type { Bi } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

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
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const section = ref.current;
    if (!section || !label) return;
    const ctx = gsap.context(() => {
      gsap.from(".section-label", {
        autoAlpha: 0,
        y: 14,
        filter: "blur(6px)",
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%", once: true },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id={id} ref={ref} className={`section${wide ? " section-wide" : ""}`}>
      {label ? <h2 className="section-label">{t(label)}</h2> : null}
      {children}
    </section>
  );
}
