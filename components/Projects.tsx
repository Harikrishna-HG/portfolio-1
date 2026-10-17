"use client";

import { useState } from "react";
import Section from "@/components/Section";
import ProjectModal from "@/components/ProjectModal";
import { navSections, projects, type Project, ui } from "@/lib/data";
import { useLang, useT } from "@/components/LanguageProvider";

const INITIAL_COUNT = 4;

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [expanded, setExpanded] = useState(false);
  const lang = useLang();
  const t = useT();

  const visible = expanded ? projects : projects.slice(0, INITIAL_COUNT);
  const hasMore = projects.length > INITIAL_COUNT;

  const projectsLabel = navSections.find((s) => s.id === "projects")?.label ?? ui.sections;

  return (
    <Section id="projects" label={projectsLabel} wide>
      <div className="projects-grid">
        {visible.map((project) => (
          <article className="project-card" key={project.id}>
            <div className="project-thumb-placeholder">
              <span>{project.name}</span>
            </div>
            <div className="project-body">
              <div className="project-date-col">{project.date}</div>
              <div className="project-name">
                <button type="button" onClick={() => setSelected(project)}>
                  {project.name}
                </button>
              </div>
              <p className="project-desc">{project.description[lang]}</p>
              <div className="project-footer">
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {project.github ? (
                    <a
                      className="github-link"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} ${t(ui.source)}`}
                    >
                      GH
                    </a>
                  ) : null}
                  <button
                    type="button"
                    className="github-link"
                    onClick={() => setSelected(project)}
                  >
                    {t(ui.details)}
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {hasMore ? (
        <button
          type="button"
          className="show-more-btn"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded
            ? t(ui.showLess)
            : `${t(ui.showMore)} (${projects.length - INITIAL_COUNT})`}
        </button>
      ) : null}

      {selected ? (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      ) : null}
    </Section>
  );
}
