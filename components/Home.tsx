import Section from "@/components/Section";
import { ContactIcon } from "@/components/Icons";
import { bio, homeContact, profile } from "@/lib/data";

export default function Home() {
  return (
    <Section id="home">
      <div className="home-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="profile-img"
          src="/profile.svg"
          alt={profile.name}
          width={90}
          height={90}
        />
        <div>
          <h1 className="home-name">{profile.name}</h1>
          <p className="home-subtitle">{profile.subtitle}</p>
          <div className="home-contact-inline">
            {homeContact.map((contact) => {
              const external = contact.href.startsWith("http");
              return (
                <a
                  key={contact.label}
                  className="home-contact-link"
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
        </div>
      </div>

      <div className="bio-text">
        {bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
