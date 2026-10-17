"use client";

import { useEffect, useState } from "react";
import { navSections, profile } from "@/lib/data";
import { MoonIcon, SunIcon } from "@/components/Icons";

export default function Sidebar() {
  const [active, setActive] = useState<string>(navSections[0]?.id ?? "home");

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
        <p className="sidebar-title">{profile.title}</p>
      </div>

      <nav className="sidebar-nav" aria-label="Sections">
        <div className="nav-section-label">Sections</div>
        {navSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`nav-link${active === section.id ? " active" : ""}`}
            aria-current={active === section.id ? "true" : undefined}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <div className="sidebar-controls">
        <button
          type="button"
          className="toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          <span className="theme-when-light">
            <MoonIcon />
            Dark mode
          </span>
          <span className="theme-when-dark">
            <SunIcon />
            Light mode
          </span>
        </button>
      </div>
    </aside>
  );
}
