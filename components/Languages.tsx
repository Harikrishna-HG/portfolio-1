import Section from "@/components/Section";
import { languages } from "@/lib/data";

export default function Languages() {
  return (
    <Section id="languages" label="Languages">
      <div className="lang-list">
        {languages.map((language) => (
          <div className="lang-item" key={language.name}>
            <div className="lang-name">{language.name}</div>
            <div className="lang-level">{language.level}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
