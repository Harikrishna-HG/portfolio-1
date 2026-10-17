import Section from "@/components/Section";
import { certifications } from "@/lib/data";

export default function Certifications() {
  return (
    <Section id="certifications" label="Certifications">
      <div>
        {certifications.map((item) => (
          <div className="award-item" key={item.title}>
            <div className="award-year">{item.year}</div>
            <div>
              <div className="award-title">{item.title}</div>
              <div className="award-awarder">{item.awarder}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
