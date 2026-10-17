"use client";

import Section from "@/components/Section";
import { ContactIcon } from "@/components/Icons";
import { contacts, navSections, ui } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";

export default function Contact() {
  const t = useT();
  const label = navSections.find((s) => s.id === "contact")?.label ?? ui.sections;

  return (
    <Section id="contact" label={label}>
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
    </Section>
  );
}
