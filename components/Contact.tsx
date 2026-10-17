"use client";

import { useRef } from "react";
import Section from "@/components/Section";
import { ContactIcon } from "@/components/Icons";
import { contacts, navSections, ui } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

export default function Contact() {
  const t = useT();
  const rootRef = useRef<HTMLDivElement>(null);
  const label = navSections.find((s) => s.id === "contact")?.label ?? ui.sections;

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".cv-btn", {
        autoAlpha: 0,
        scale: 0.88,
        duration: 0.55,
        ease: "back.out(1.8)",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
      gsap.from(".contact-icon-btn", {
        autoAlpha: 0,
        y: 22,
        duration: 0.5,
        stagger: 0.07,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <Section id="contact" label={label}>
      <div ref={rootRef}>
        <div className="section-top-row">
          <div className="cv-download-row">
            <a
              className="cv-btn"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ContactIcon name="resume" />
              {t(ui.downloadCv)}
            </a>
          </div>
        </div>

        <div className="contact-row">
          {contacts.map((contact) => {
            const external = contact.href.startsWith("http");
            return (
              <a
                key={contact.label.en}
                className="contact-icon-btn"
                href={contact.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                <ContactIcon name={contact.icon} />
                {t(contact.label)}
              </a>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
