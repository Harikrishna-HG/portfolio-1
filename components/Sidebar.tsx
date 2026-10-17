"use client";

import { useEffect, useState } from "react";
import { navSections, profile, ui } from "@/lib/data";
import { MoonIcon, SunIcon } from "@/components/Icons";
import { setLang, useLang, useT } from "@/components/LanguageProvider";

export default function Sidebar() {
  const [active, setActive] = useState<string>(navSections[0]?.id ?? "home");
  const lang = useLang();
  const t = useT();

  useEffect(() => {
    const sectionIds = navSections.map((s) => s.id);

    const updateActive = () => {
      const offset = 120;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActive(current);
    };

    const raf = requestAnimationFrame(updateActive);
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-header">
          <a className="sidebar-name" href="#home">
            {profile.name}
          </a>
        </div>
        <p className="sidebar-title">{t(profile.title)}</p>
      </div>

      <nav className="sidebar-nav" aria-label={t(ui.sections)}>
        <div className="nav-section-label">{t(ui.sections)}</div>
        {navSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`nav-link${active === section.id ? " active" : ""}`}
            aria-current={active === section.id ? "true" : undefined}
          >
            {t(section.label)}
          </a>
        ))}
      </nav>

      <div className="sidebar-controls">
        <div
          className="lang-toggle"
          role="group"
          aria-label="Language / भाषा"
        >
          <button
            type="button"
            className={`lang-toggle-btn${lang === "en" ? " active" : ""}`}
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
          >
            EN
          </button>
          <span className="lang-toggle-sep" aria-hidden />
          <button
            type="button"
            className={`lang-toggle-btn${lang === "ne" ? " active" : ""}`}
            onClick={() => setLang("ne")}
            aria-pressed={lang === "ne"}
          >
            NE
          </button>
        </div>
        <button
          type="button"
          className="toggle-btn"
          onClick={toggleTheme}
          aria-label={t(ui.toggleDark)}
        >
          <span className="theme-when-light">
            <MoonIcon />
            {t(ui.darkMode)}
          </span>
          <span className="theme-when-dark">
            <SunIcon />
            {t(ui.lightMode)}
          </span>
        </button>
      </div>
    </aside>
  );
}
