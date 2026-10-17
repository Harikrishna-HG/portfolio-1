"use client";

import { useEffect, useState } from "react";
import Section from "@/components/Section";
import { activities, navSections, type ActivityPhoto, ui } from "@/lib/data";
import { useLang, useT } from "@/components/LanguageProvider";

export default function Activities() {
  const [lightbox, setLightbox] = useState<ActivityPhoto | null>(null);
  const lang = useLang();
  const t = useT();
  const label = navSections.find((s) => s.id === "activities")?.label ?? ui.sections;

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightbox]);

  return (
    <Section id="activities" label={label}>
      <div>
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
          onClick={() => setLightbox(null)}
          role="presentation"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lightbox-img"
            src={lightbox.src}
            alt={lightbox.caption[lang]}
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label={t(ui.close)}
          >
            ✕
          </button>
        </div>
      ) : null}
    </Section>
  );
}
