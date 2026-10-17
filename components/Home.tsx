"use client";

import { useRef } from "react";
import Section from "@/components/Section";
import { ContactIcon } from "@/components/Icons";
import { bio, homeContact, profile } from "@/lib/data";
import { useLang, useT } from "@/components/LanguageProvider";
import {
  gsap,
  SplitText,
  prefersReducedMotion,
  useIsoLayoutEffect,
} from "@/lib/gsap";

export default function Home() {
  const lang = useLang();
  const t = useT();
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !rootRef.current || !nameRef.current) return;
    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      split = SplitText.create(nameRef.current as HTMLHeadingElement, {
        type: "chars,words",
        mask: "words",
      });
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".profile-img", {
          autoAlpha: 0,
          scale: 0.6,
          rotation: -8,
          duration: 0.75,
          ease: "back.out(1.7)",
        })
        .from(
          split.chars,
          {
            yPercent: 120,
            autoAlpha: 0,
            duration: 0.55,
            stagger: 0.025,
          },
          0.15,
        )
        .from(".home-subtitle", { autoAlpha: 0, y: 16, duration: 0.5 }, "-=0.25")
        .from(
          ".home-contact-link",
          { autoAlpha: 0, y: 10, duration: 0.4, stagger: 0.06 },
          "-=0.25",
        );

      if (bioRef.current) {
        gsap.from(bioRef.current.children, {
          autoAlpha: 0,
          y: 24,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 88%",
            once: true,
          },
        });
      }
    }, rootRef);
    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <Section id="home">
      <div className="home-header" ref={rootRef}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="profile-img"
          src="/profile.svg"
          alt={profile.name}
          width={90}
          height={90}
        />
        <div>
          <h1 className="home-name" ref={nameRef}>
            {profile.name}
          </h1>
          <p className="home-subtitle">{t(profile.subtitle)}</p>
          <div className="home-contact-inline">
            {homeContact.map((contact) => {
              const external = contact.href.startsWith("http");
              return (
                <a
                  key={contact.label.en}
                  className="home-contact-link"
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
      </div>

      <div className="bio-text" ref={bioRef}>
        {bio[lang].map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
