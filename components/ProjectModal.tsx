"use client";

import { useEffect, useRef } from "react";
import type {
  Bi,
  BiList,
  Lang,
  Project,
  ProjectBodyBlock,
  ResearchReference,
} from "@/lib/data";
import { researchStatusLabels, ui } from "@/lib/data";
import { useLang, useT } from "@/components/LanguageProvider";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

function renderBlock(block: ProjectBodyBlock, index: number, lang: Lang) {
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

/** A labelled case-study paragraph. Renders nothing when the field is empty. */
function Detail({ label, value, lang }: { label: Bi; value?: Bi; lang: Lang }) {
  const t = useT();
  const text = value?.[lang]?.trim();
  if (!text) return null;
  return (
    <div className="modal-detail">
      <h3 className="modal-h2">{t(label)}</h3>
      <p className="modal-p">{text}</p>
    </div>
  );
}

/** A labelled bullet list. Renders nothing when the list is empty. */
function DetailList({ label, items, lang }: { label: Bi; items?: BiList; lang: Lang }) {
  const t = useT();
  const list = items?.[lang]?.filter((item) => item.trim());
  if (!list || list.length === 0) return null;
  return (
    <div className="modal-detail">
      <h3 className="modal-h2">{t(label)}</h3>
      <ul className="modal-ul">
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/** A labelled list of citations. Renders nothing when empty. */
function References({
  label,
  items,
  lang,
}: {
  label: Bi;
  items?: ResearchReference[];
  lang: Lang;
}) {
  const t = useT();
  if (!items || items.length === 0) return null;
  return (
    <div className="modal-detail">
      <h3 className="modal-h2">{t(label)}</h3>
      <ul className="modal-ul">
        {items.map((ref, index) => (
          <li key={index}>
            {ref.href ? (
              <a href={ref.href} target="_blank" rel="noopener noreferrer">
                {ref.label[lang]}
              </a>
            ) : (
              ref.label[lang]
            )}
          </li>
        ))}
      </ul>
    </div>
  );
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
  const hasText = (...values: (Bi | undefined)[]) =>
    values.some((value) => value?.[lang]?.trim());
  const hasList = (...values: (BiList | undefined)[]) =>
    values.some((value) => value?.[lang]?.some((item) => item.trim()));
  const hasDetails =
    project.tags.length > 0 ||
    (project.references?.length ?? 0) > 0 ||
    hasText(
      project.problem,
      project.question,
      project.motivation,
      project.role,
      project.approach,
      project.datasets,
      project.evaluation,
      project.challenges,
      project.outcomes,
      project.ethics,
    ) ||
    hasList(project.methods, project.findings, project.limitations);
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
        .from(".modal-tech .tag", {
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
            <div className="modal-meta">
              <span className="modal-date">{project.date}</span>
              {project.status ? (
                <span className={`status-badge status-${project.status}`}>
                  {t(researchStatusLabels[project.status])}
                </span>
              ) : null}
            </div>
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
          <div className="modal-content">
            <p className="modal-tldr">{project.tldr[lang]}</p>

            {hasDetails ? (
              <div className="modal-details">
                <Detail label={ui.problem} value={project.problem} lang={lang} />
                <Detail
                  label={ui.researchQuestion}
                  value={project.question}
                  lang={lang}
                />
                <Detail
                  label={ui.motivation}
                  value={project.motivation}
                  lang={lang}
                />
                <Detail label={ui.myRole} value={project.role} lang={lang} />
                <Detail label={ui.approach} value={project.approach} lang={lang} />
                <DetailList label={ui.methods} items={project.methods} lang={lang} />
                {project.tags.length > 0 ? (
                  <div className="modal-detail">
                    <h3 className="modal-h2">{t(ui.technologies)}</h3>
                    <div className="modal-tech">
                      {project.tags.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
                <Detail label={ui.datasets} value={project.datasets} lang={lang} />
                <Detail
                  label={ui.evaluation}
                  value={project.evaluation}
                  lang={lang}
                />
                <Detail
                  label={ui.challenges}
                  value={project.challenges}
                  lang={lang}
                />
                <DetailList
                  label={ui.findings}
                  items={project.findings}
                  lang={lang}
                />
                <DetailList
                  label={ui.limitations}
                  items={project.limitations}
                  lang={lang}
                />
                <Detail label={ui.outcomes} value={project.outcomes} lang={lang} />
                <Detail
                  label={ui.responsiblePractice}
                  value={project.ethics}
                  lang={lang}
                />
                <References
                  label={ui.references}
                  items={project.references}
                  lang={lang}
                />
              </div>
            ) : null}

            {project.body.length > 0 ? <hr className="modal-hr" /> : null}
            {project.body.map((block, index) => renderBlock(block, index, lang))}

            {(project.link ||
              project.github ||
              (project.links?.length ?? 0) > 0) && (
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
                {project.links?.map((link) => (
                  <a
                    className="github-link"
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label[lang]}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
