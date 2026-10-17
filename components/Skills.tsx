import Section from "@/components/Section";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <Section id="skills" label="Skills">
      <div>
        {skills.map((group) => (
          <div className="skill-row" key={group.category}>
            <div className="skill-category">{group.category}</div>
            <div className="skill-keywords">
              {group.keywords.map((keyword) => (
                <span className="chip" key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
