"use client";

import Section from "@/components/Section";
import { languages, navSections, ui } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";

export default function Languages() {
  const t = useT();
  const label = navSections.find((s) => s.id === "languages")?.label ?? ui.sections;

  return (
    <Section id="languages" label={label}>
      <div className="lang-list">
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
