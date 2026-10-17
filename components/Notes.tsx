"use client";

import { useRef } from "react";
import Section from "@/components/Section";
import { navSections, readingNotes, ui } from "@/lib/data";
import { useT } from "@/components/LanguageProvider";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

export default function Notes() {
  const t = useT();
  const rootRef = useRef<HTMLDivElement>(null);
  const label = navSections.find((s) => s.id === "notes")?.label ?? ui.sections;

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".note-item", {
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

  if (readingNotes.items.length === 0) return null;

  return (
    <Section id="notes" label={label}>
      <div ref={rootRef}>
        <p className="section-intro">{t(readingNotes.intro)}</p>
        <p className="section-note">{t(readingNotes.note)}</p>

        <div className="notes-list">
          {readingNotes.items.map((note) => (
            <article className="note-item" key={`${note.title}-${note.date}`}>
              <div className="note-head">
                <span className="note-date">{note.date}</span>
                {note.topics && note.topics.length > 0 ? (
                  <div className="note-topics">
                    {note.topics.map((topic) => (
                      <span className="tag" key={topic}>
                        {topic}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <h3 className="note-title">{note.title}</h3>

              <span className="note-label">{t(ui.myNotes)}</span>
              <p className="note-summary">{t(note.summary)}</p>

              {note.source || note.href ? (
                <p className="note-source">
                  <span className="note-source-label">{t(ui.source)}</span>{" "}
                  {note.href ? (
                    <a href={note.href} target="_blank" rel="noopener noreferrer">
                      {note.source ? t(note.source) : t(ui.viewSource)}
                    </a>
                  ) : (
                    note.source && t(note.source)
                  )}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
