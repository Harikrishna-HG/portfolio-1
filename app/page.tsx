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

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Sidebar />
      <main className="main-content">
        <Home />
        <Projects />
        <Skills />
        <Education />
        <Activities />
        <Certifications />
        <Languages />
        <Contact />
      </main>
    </>
  );
}
