import Section from "@/components/Section";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <Section id="education" label="Education">
      <div>
        {education.map((item) => (
          <div className="edu-item" key={`${item.institution}-${item.degree}`}>
            <div className="edu-header">
              <div className="edu-institution">{item.institution}</div>
              <div className="edu-date">{item.date}</div>
            </div>
            <div className="edu-degree">{item.degree}</div>
            {item.location ? (
              <div className="edu-location">{item.location}</div>
            ) : null}
            {item.score ? <div className="edu-score">{item.score}</div> : null}

            {item.coursework && item.coursework.length > 0 ? (
              <div className="edu-coursework">
                <span className="edu-coursework-label">Relevant coursework</span>
                <div className="edu-coursework-tags">
                  {item.coursework.map((course) => (
                    <span className="tag" key={course}>
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {item.highlights && item.highlights.length > 0 ? (
              <ul className="edu-highlights">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
