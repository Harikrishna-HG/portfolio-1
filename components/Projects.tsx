"use client";

import { useRef, useState } from "react";
import Section from "@/components/Section";
import ProjectModal from "@/components/ProjectModal";
import { navSections, projects, type Project, ui } from "@/lib/data";
import { useLang, useT } from "@/components/LanguageProvider";
import { gsap, prefersReducedMotion, useIsoLayoutEffect } from "@/lib/gsap";

const INITIAL_COUNT = 4;

/**
 * Filter options, derived from the tags that actually appear on projects and
 * ordered by how often they are used (then alphabetically). Nothing is
 * hard-coded, so the filters always reflect the current project data.
 */
const FILTER_TAGS: string[] = (() => {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const tag of project.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
})();

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}) {
  const lang = useLang();
  const t = useT();
  const cardRef = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        autoAlpha: 0,
        y: 44,
        duration: 0.7,
        delay: (index % INITIAL_COUNT) * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 93%",
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <article className="project-card" ref={cardRef}>
      {project.thumb ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="project-thumb"
          src={project.thumb}
          alt={`${project.name} preview`}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="project-thumb-placeholder" aria-hidden="true">
          <span>{project.name}</span>
        </div>
      )}
      <div className="project-body">
        <div className="project-date-col">{project.date}</div>
        <div className="project-name">
          <button type="button" onClick={() => onSelect(project)}>
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
              onClick={() => onSelect(project)}
            >
              {t(ui.details)}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const t = useT();

  if (projects.length === 0) return null;

  const matches = activeTag
    ? projects.filter((project) => project.tags.includes(activeTag))
    : projects;
  const visible = activeTag || expanded ? matches : matches.slice(0, INITIAL_COUNT);
  const hasMore = !activeTag && projects.length > INITIAL_COUNT;
  const showFilters = FILTER_TAGS.length > 1;

  const projectsLabel = navSections.find((s) => s.id === "projects")?.label ?? ui.sections;

  return (
    <Section id="projects" label={projectsLabel} wide>
      {showFilters ? (
        <div
          className="project-filters"
          role="group"
          aria-label={t(ui.filterByTech)}
        >
          <button
            type="button"
            className="filter-chip"
            aria-pressed={activeTag === null}
            onClick={() => setActiveTag(null)}
          >
            {t(ui.allProjects)}
          </button>
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className="filter-chip"
              aria-pressed={activeTag === tag}
              onClick={() => setActiveTag((current) => (current === tag ? null : tag))}
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}

      <p className="project-count" aria-live="polite">
        {matches.length} {t(projectsLabel)}
      </p>

      {matches.length === 0 ? (
        <p className="projects-empty">{t(ui.noProjects)}</p>
      ) : (
        <div className="projects-grid">
          {visible.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={setSelected}
            />
          ))}
        </div>
      )}

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
