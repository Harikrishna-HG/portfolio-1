"use client";

import { useRef } from "react";
import {
  gsap,
  prefersReducedMotion,
  useIsoLayoutEffect,
} from "@/lib/gsap";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !barRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return <div className="scroll-progress" ref={barRef} aria-hidden="true" />;
}
