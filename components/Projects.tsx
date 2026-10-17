"use client";

import { useState } from "react";
import Section from "@/components/Section";
import ProjectModal from "@/components/ProjectModal";
import { projects, type Project } from "@/lib/data";

const INITIAL_COUNT = 4;

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? projects : projects.slice(0, INITIAL_COUNT);
  const hasMore = projects.length > INITIAL_COUNT;

  return (
    <Section id="projects" label="Projects" wide>
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
              <p className="project-desc">{project.description}</p>
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
                      aria-label={`${project.name} source on GitHub`}
                    >
                      GH
                    </a>
                  ) : null}
                  <button
                    type="button"
                    className="github-link"
                    onClick={() => setSelected(project)}
                  >
                    Details
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
          {expanded ? "Show less" : `Show more (${projects.length - INITIAL_COUNT})`}
        </button>
      ) : null}

      {selected ? (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      ) : null}
    </Section>
  );
}
