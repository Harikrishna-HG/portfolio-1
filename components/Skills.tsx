"use client";

import { useRef, type CSSProperties } from "react";
import Section from "@/components/Section";
import { navSections, skillColors, skills, ui } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

export default function Skills() {
  const t = useT();
  const rootRef = useRef<HTMLDivElement>(null);
  const skillsLabel = navSections.find((s) => s.id === "skills")?.label ?? ui.sections;

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".skill-row", {
        autoAlpha: 0,
        y: 32,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
      gsap.from(".skill-keywords > *", {
        autoAlpha: 0,
        scale: 0.6,
        duration: 0.45,
        stagger: 0.025,
        delay: 0.35,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="skills" label={skillsLabel}>
      <div ref={rootRef}>
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
