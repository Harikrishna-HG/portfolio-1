"use client";

import { useRef } from "react";
import Section from "@/components/Section";
import { certifications, navSections, ui } from "@/lib/data";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

export default function Certifications() {
  const rootRef = useRef<HTMLDivElement>(null);
  const label = navSections.find((s) => s.id === "certifications")?.label ?? ui.sections;

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".award-item", {
        autoAlpha: 0,
        x: -24,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="certifications" label={label}>
      <div ref={rootRef}>
        {certifications.map((item) => (
          <div className="award-item" key={item.title}>
            <div className="award-year">{item.year}</div>
            <div>
              <div className="award-title">{item.title}</div>
              <div className="award-awarder">{item.awarder}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
