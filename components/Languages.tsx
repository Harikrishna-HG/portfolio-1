"use client";

import { useRef } from "react";
import Section from "@/components/Section";
import { languages, navSections, ui } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

export default function Languages() {
  const t = useT();
  const rootRef = useRef<HTMLDivElement>(null);
  const label = navSections.find((s) => s.id === "languages")?.label ?? ui.sections;

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".lang-item", {
        autoAlpha: 0,
        y: 26,
        scale: 0.97,
        duration: 0.55,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  if (languages.length === 0) return null;

  return (
    <Section id="languages" label={label}>
      <div className="lang-list" ref={rootRef}>
        {languages.map((language) => (
          <div className="lang-item" key={language.name.en}>
            <div className="lang-name">{t(language.name)}</div>
            <div className="lang-level">{t(language.level)}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
