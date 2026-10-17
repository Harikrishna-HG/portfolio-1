import Section from "@/components/Section";
import { ContactIcon } from "@/components/Icons";
import { contacts } from "@/lib/data";

export default function Contact() {
  return (
    <Section id="contact">
      <div className="section-top-row">
        <div className="section-label">Contact</div>
        <div className="cv-download-row">
          <a
            className="cv-btn"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ContactIcon name="resume" />
            Download CV
          </a>
        </div>
      </div>

      <div className="contact-row">
        {contacts.map((contact) => {
          const external = contact.href.startsWith("http");
          return (
            <a
              key={contact.label}
              className="contact-icon-btn"
              href={contact.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              <ContactIcon name={contact.icon} />
              {contact.label}
            </a>
          );
        })}
      </div>
    </Section>
  );
}
