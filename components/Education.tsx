"use client";

import { useRef } from "react";
import Section from "@/components/Section";
import { education, navSections, ui } from "@/lib/data";
import { useLang, useT } from "@/components/LanguageProvider";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

export default function Education() {
  const lang = useLang();
  const t = useT();
  const rootRef = useRef<HTMLDivElement>(null);
  const label = navSections.find((s) => s.id === "education")?.label ?? ui.sections;

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: rootRef.current,
        start: "top 85%",
        once: true,
      };
      gsap.from(".edu-item", {
        autoAlpha: 0,
        y: 36,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: trigger,
      });
      gsap.from(".edu-coursework-tags .tag", {
        autoAlpha: 0,
        y: 8,
        duration: 0.4,
        stagger: 0.04,
        delay: 0.35,
        ease: "power2.out",
        scrollTrigger: trigger,
      });
      gsap.from(".edu-highlights li", {
        autoAlpha: 0,
        x: -16,
        duration: 0.45,
        stagger: 0.08,
        delay: 0.45,
        ease: "power2.out",
        scrollTrigger: trigger,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="education" label={label}>
      <div ref={rootRef}>
        {education.map((item) => (
          <div className="edu-item" key={`${item.institution.en}-${item.degree.en}`}>
            <div className="edu-header">
              <div className="edu-institution">{t(item.institution)}</div>
              <div className="edu-date">{t(item.date)}</div>
            </div>
            <div className="edu-degree">{t(item.degree)}</div>
            {item.location ? (
              <div className="edu-location">{t(item.location)}</div>
            ) : null}
            {item.score ? <div className="edu-score">{t(item.score)}</div> : null}

            {item.coursework && item.coursework.length > 0 ? (
              <div className="edu-coursework">
                <span className="edu-coursework-label">{t(ui.relevantCoursework)}</span>
                <div className="edu-coursework-tags">
                  {item.coursework.map((course) => (
                    <span className="tag" key={course}>
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {item.highlights && item.highlights[lang].length > 0 ? (
              <ul className="edu-highlights">
                {item.highlights[lang].map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
