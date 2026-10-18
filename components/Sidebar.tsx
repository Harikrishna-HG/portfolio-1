"use client";

import { useEffect, useRef, useState } from "react";
import { navSections, profile, ui } from "@/lib/data";
import { MoonIcon, SunIcon, MenuIcon, CloseIcon } from "@/components/Icons";
import { setLang, useLang, useT } from "@/components/LanguageProvider";
import {
  gsap,
  MOBILE_TOPBAR_OFFSET,
  isMobile,
  prefersReducedMotion,
  useIsoLayoutEffect,
} from "@/lib/gsap";

export default function Sidebar() {
  const [active, setActive] = useState<string>(navSections[0]?.id ?? "home");
  const [menuOpen, setMenuOpen] = useState(false);
  const lang = useLang();
  const t = useT();
  const rootRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (!window.matchMedia("(max-width: 768px)").matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".sidebar-brand", { autoAlpha: 0, x: -18, duration: 0.55 })
        .from(
          ".nav-section-label",
          { autoAlpha: 0, x: -14, duration: 0.4 },
          "-=0.25",
        )
        .from(
          ".nav-link",
          { autoAlpha: 0, x: -14, duration: 0.4, stagger: 0.05 },
          "-=0.2",
        )
        .from(
          ".sidebar-controls",
          { autoAlpha: 0, y: 14, duration: 0.45 },
          "-=0.15",
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const btn = rootRef.current?.querySelector(
      `.lang-toggle-btn.${lang}`,
    );
    if (!btn) return;
    gsap.fromTo(
      btn,
      { scale: 0.8 },
      { scale: 1, duration: 0.4, ease: "back.out(2.5)" },
    );
  }, [lang]);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      /* ignore */
    }
    if (prefersReducedMotion()) return;
    const icon = toggleRef.current?.querySelector("svg");
    if (!icon) return;
    gsap.fromTo(
      icon,
      { rotate: 0 },
      { rotate: 180, duration: 0.4, ease: "power2.out" },
    );
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute("href");
    if (!href?.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    setMenuOpen(false);
    const offset = isMobile() ? MOBILE_TOPBAR_OFFSET : 0;
    gsap.to(window, {
      duration: prefersReducedMotion() ? 0 : 0.9,
      ease: "power3.inOut",
      scrollTo: { y: target as HTMLElement, offsetY: offset, autoKill: true },
    });
    if (history.replaceState) {
      history.replaceState(null, "", href);
    }
  };

  return (
    <aside className="sidebar" ref={rootRef}>
      <div className="sidebar-brand">
        <div className="sidebar-header">
          <a
            className="sidebar-name"
            href="#home"
            onClick={handleNavClick}
            aria-label={profile.name}
          >
            <span className="sidebar-name-full">{profile.name}</span>
            <span className="sidebar-name-short" aria-hidden="true">
              {profile.name
                .split(" ")
                .map((word) => word.charAt(0))
                .join("")}
            </span>
          </a>
        </div>
        <p className="sidebar-title">{t(profile.title)}</p>
      </div>

      <nav
        id="primary-nav"
        className={`sidebar-nav${menuOpen ? " open" : ""}`}
        aria-label={t(ui.sections)}
      >
        <div className="nav-section-label">{t(ui.sections)}</div>
        {navSections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`nav-link${active === section.id ? " active" : ""}`}
            aria-current={active === section.id ? "true" : undefined}
            onClick={handleNavClick}
          >
            {t(section.label)}
          </a>
        ))}
      </nav>

      <div className="sidebar-controls">
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={t(ui.menu)}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
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
          ref={toggleRef}
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
