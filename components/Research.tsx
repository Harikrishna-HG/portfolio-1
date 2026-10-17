"use client";

import { useRef } from "react";
import Section from "@/components/Section";
import { navSections, researchInterests, ui } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

export default function Research() {
  const t = useT();
  const rootRef = useRef<HTMLDivElement>(null);
  const label = navSections.find((s) => s.id === "research")?.label ?? ui.sections;

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".research-item", {
        autoAlpha: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  if (researchInterests.interests.length === 0) return null;

  return (
    <Section id="research" label={label}>
      <div ref={rootRef}>
        <p className="section-intro">{t(researchInterests.intro)}</p>
        <p className="section-note">{t(researchInterests.note)}</p>

        <ul className="research-list">
          {researchInterests.interests.map((interest) => (
            <li className="research-item" key={interest.title.en}>
              <h3 className="research-title">{t(interest.title)}</h3>
              <p className="research-desc">{t(interest.description)}</p>
              {interest.topics && interest.topics.length > 0 ? (
                <div className="research-topics">
                  {interest.topics.map((topic) => (
                    <span className="tag" key={topic}>
                      {topic}
                    </span>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
