"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { Lang } from "@/lib/data";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Lang {
  try {
    return localStorage.getItem("lang") === "ne" ? "ne" : "en";
  } catch {
    return "en";
  }
}

function getServerSnapshot(): Lang {
  return "en";
}

export function setLang(lang: Lang) {
  try {
    localStorage.setItem("lang", lang);
  } catch {
    /* ignore */
  }
  document.documentElement.lang = lang;
  listeners.forEach((listener) => listener());
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useT(): (value: { en: string; ne: string }) => string {
  const lang = useLang();
  return (value) => value[lang] ?? value.en;
}

export function LanguageInit() {
  const lang = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.classList.remove("lang-pending");
  }, [lang]);
  return null;
}
