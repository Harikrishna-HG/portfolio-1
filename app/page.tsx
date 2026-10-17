import Sidebar from "@/components/Sidebar";
import ScrollProgress from "@/components/ScrollProgress";
import Home from "@/components/Home";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Activities from "@/components/Activities";
import Certifications from "@/components/Certifications";
import Languages from "@/components/Languages";
import Contact from "@/components/Contact";
import { sectionAvailability } from "@/lib/data";

export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Sidebar />
      <main className="main-content" id="main" tabIndex={-1}>
        {sectionAvailability.home ? <Home /> : null}
        {sectionAvailability.projects ? <Projects /> : null}
        {sectionAvailability.skills ? <Skills /> : null}
        {sectionAvailability.education ? <Education /> : null}
        {sectionAvailability.activities ? <Activities /> : null}
        {sectionAvailability.certifications ? <Certifications /> : null}
        {sectionAvailability.languages ? <Languages /> : null}
        {sectionAvailability.contact ? <Contact /> : null}
      </main>
    </>
  );
}
