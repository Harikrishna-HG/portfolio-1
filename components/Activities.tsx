"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Section from "@/components/Section";
import { activities, navSections, type ActivityPhoto, ui } from "@/lib/data";
import { useLang, useT } from "@/components/LanguageProvider";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

export default function Activities() {
  const [lightbox, setLightbox] = useState<ActivityPhoto | null>(null);
  const lang = useLang();
  const t = useT();
  const label = navSections.find((s) => s.id === "activities")?.label ?? ui.sections;
  const rootRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: rootRef.current,
        start: "top 85%",
        once: true,
      };
      gsap.from(".activity-item", {
        autoAlpha: 0,
        y: 36,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: trigger,
      });
      gsap.from(".activity-photos figure", {
        autoAlpha: 0,
        y: 20,
        scale: 0.96,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: trigger,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useIsoLayoutEffect(() => {
    if (!lightbox || prefersReducedMotion()) return;
    const overlay = overlayRef.current;
    const img = imgRef.current;
    const closeBtn = closeBtnRef.current;
    if (!overlay || !img || !closeBtn) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 })
        .fromTo(
          img,
          { autoAlpha: 0, scale: 0.88 },
          { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power3.out" },
          0.05,
        )
        .fromTo(
          closeBtn,
          { autoAlpha: 0, y: -8 },
          { autoAlpha: 1, y: 0, duration: 0.3 },
          0.2,
        );
    });
    return () => ctx.revert();
  }, [lightbox]);

  const closeLightbox = useCallback(() => {
    if (closingRef.current) return;
    const overlay = overlayRef.current;
    if (prefersReducedMotion() || !overlay) {
      setLightbox(null);
      return;
    }
    closingRef.current = true;
    gsap.to(overlay, {
      autoAlpha: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        closingRef.current = false;
        setLightbox(null);
      },
    });
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    closingRef.current = false;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightbox, closeLightbox]);

  if (activities.length === 0) return null;

  return (
    <Section id="activities" label={label}>
      <div ref={rootRef}>
        {activities.map((activity) => (
          <div className="activity-item" key={activity.name.en}>
            <div>
              <div className="activity-name">
                {t(activity.name)}
                {activity.link ? (
                  <a
                    className="activity-project-link"
                    href={activity.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(activity.link.label)}
                  </a>
                ) : null}
              </div>
              {activity.role ? (
                <div className="activity-role">{t(activity.role)}</div>
              ) : null}
              {activity.location ? (
                <div className="activity-location">{t(activity.location)}</div>
              ) : null}
            </div>

            <div className="activity-date">{t(activity.date)}</div>

            {activity.highlights && activity.highlights[lang].length > 0 ? (
              <ul className="activity-highlights">
                {activity.highlights[lang].map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            ) : null}

            {activity.photos && activity.photos.length > 0 ? (
              <div className="activity-photos">
                {activity.photos.map((photo) => (
                  <figure className="activity-photo-fig" key={photo.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="activity-photo"
                      src={photo.src}
                      alt={photo.caption[lang]}
                      onClick={() => setLightbox(photo)}
                    />
                    <figcaption className="activity-photo-caption">
                      {photo.caption[lang]}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {lightbox ? (
        <div
          className="lightbox-overlay"
          ref={overlayRef}
          onClick={closeLightbox}
          role="presentation"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lightbox-img"
            ref={imgRef}
            src={lightbox.src}
            alt={lightbox.caption[lang]}
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="lightbox-close"
            ref={closeBtnRef}
            onClick={closeLightbox}
            aria-label={t(ui.close)}
          >
            ✕
          </button>
        </div>
      ) : null}
    </Section>
  );
}
