"use client";

import Section from "@/components/Section";
import { education, navSections, ui } from "@/lib/data";
import { useLang, useT } from "@/components/LanguageProvider";

export default function Education() {
  const lang = useLang();
  const t = useT();
  const label = navSections.find((s) => s.id === "education")?.label ?? ui.sections;

  return (
    <Section id="education" label={label}>
      <div>
        {education.map((item) => (
          <div className="edu-item" key={`${item.institution.en}-${item.degree.en}`}>
            <div className="edu-header">
              <div className="edu-institution">{t(item.institution)}</div>
              <div className="edu-date">{t(item.date)}</div>
            </div>
            <div className="edu-degree">{t(item.degree)}</div>
            {item.location ? (
              <div className="edu-location">{t(item.location)}</div>
            ) : null}
            {item.score ? <div className="edu-score">{t(item.score)}</div> : null}

            {item.coursework && item.coursework.length > 0 ? (
              <div className="edu-coursework">
                <span className="edu-coursework-label">{t(ui.relevantCoursework)}</span>
                <div className="edu-coursework-tags">
                  {item.coursework.map((course) => (
                    <span className="tag" key={course}>
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {item.highlights && item.highlights[lang].length > 0 ? (
              <ul className="edu-highlights">
                {item.highlights[lang].map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
