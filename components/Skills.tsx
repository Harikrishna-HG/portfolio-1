"use client";

import type { CSSProperties } from "react";
import Section from "@/components/Section";
import { navSections, skillColors, skills, ui } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";

export default function Skills() {
  const t = useT();
  const skillsLabel = navSections.find((s) => s.id === "skills")?.label ?? ui.sections;

  return (
    <Section id="skills" label={skillsLabel}>
      <div>
        {skills.map((group) => (
          <div className="skill-row" key={group.category.en}>
            <div className="skill-category">{t(group.category)}</div>
            <div className="skill-keywords">
              {group.keywords.map((keyword) => {
                const color = skillColors[keyword];
                if (!color) {
                  return (
                    <span className="tag" key={keyword}>
                      {keyword}
                    </span>
                  );
                }
                return (
                  <span
                    className="chip"
                    key={keyword}
                    style={
                      {
                        "--chip-bg": color.bg,
                        "--chip-text": color.text,
                        "--chip-dark-bg": color.darkBg,
                        "--chip-dark-text": color.darkText,
                      } as CSSProperties
                    }
                  >
                    {keyword}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
