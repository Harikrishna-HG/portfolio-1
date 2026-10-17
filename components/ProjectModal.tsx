"use client";

import { useEffect } from "react";
import type { Project, ProjectBodyBlock } from "@/lib/data";
import { ui } from "@/lib/data";
import { useLang, useT } from "@/components/LanguageProvider";

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

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const lang = useLang();
  const t = useT();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-panel"
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
            onClick={onClose}
            aria-label={t(ui.close)}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
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
