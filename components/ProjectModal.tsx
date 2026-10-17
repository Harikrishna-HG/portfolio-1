"use client";

import { useEffect, useRef } from "react";
import type { Project, ProjectBodyBlock } from "@/lib/data";
import { ui } from "@/lib/data";
import { useLang, useT } from "@/components/LanguageProvider";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

function renderBlock(block: ProjectBodyBlock, index: number, lang: "en" | "ne") {
  switch (block.type) {
    case "h2":
      return (
        <h3 className="modal-h2" key={index}>
          {block.content[lang]}
        </h3>
      );
    case "p":
      return (
        <p
          className="modal-p"
          key={index}
          dangerouslySetInnerHTML={{ __html: block.content[lang] }}
        />
      );
    case "ul":
      return (
        <ul className="modal-ul" key={index}>
          {block.items[lang].map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="modal-ol" key={index}>
          {block.items[lang].map((item, itemIndex) => (
            <li key={itemIndex}>{item}</li>
          ))}
        </ol>
      );
    case "hr":
      return <hr className="modal-hr" key={index} />;
    default:
      return null;
  }
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const lang = useLang();
  const t = useT();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 })
        .fromTo(
          panel,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.55, ease: "power3.out" },
          0,
        )
        .from(
          [".modal-date", ".modal-title", ".modal-close"],
          { autoAlpha: 0, y: 14, duration: 0.4, stagger: 0.06 },
          0.2,
        )
        .from(".modal-tags .tag", {
          autoAlpha: 0,
          y: 10,
          duration: 0.35,
          stagger: 0.03,
        }, 0.3);
    });
    return () => ctx.revert();
  }, []);

  const handleClose = () => {
    if (closingRef.current) return;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (prefersReducedMotion() || !overlay || !panel) {
      onCloseRef.current();
      return;
    }
    closingRef.current = true;
    gsap
      .timeline({ onComplete: () => onCloseRef.current() })
      .to(panel, { xPercent: 100, duration: 0.4, ease: "power3.in" })
      .to(overlay, { autoAlpha: 0, duration: 0.25, ease: "power2.in" }, "-=0.12");
  };

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!panel.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, []);

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleClose}
      role="presentation"
    >
      <div
        className="modal-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <div className="modal-date">{project.date}</div>
            <h2 className="modal-title">{project.name}</h2>
          </div>
          <button
            type="button"
            className="modal-close"
            ref={closeBtnRef}
            onClick={handleClose}
            aria-label={t(ui.close)}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          {project.thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="modal-thumb"
              src={project.thumb}
              alt={`${project.name} preview`}
              decoding="async"
            />
          ) : null}
          <div className="modal-tags">
            {project.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className="modal-content">
            <p className="modal-tldr">{project.tldr[lang]}</p>
            <hr className="modal-hr" />
            {project.body.map((block, index) => renderBlock(block, index, lang))}

            {(project.link || project.github) && (
              <div className="modal-links">
                {project.link ? (
                  <a
                    className="github-link"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(ui.liveSite)}
                  </a>
                ) : null}
                {project.github ? (
                  <a
                    className="github-link"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(ui.source)}
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
