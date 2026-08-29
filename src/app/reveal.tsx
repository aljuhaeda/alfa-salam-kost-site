"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/* Scroll-reveal wrapper. Adds `.is-visible` the first time the element
   crosses ~15% into the viewport, then stops observing. The CSS in
   globals.css (`.reveal` / `.reveal.is-visible`) does the rest — a
   fade-up-deblur on the spring-snappy curve, matching the hero. If
   IntersectionObserver is unavailable or motion is reduced, the element
   is shown immediately. */
export default function Reveal({
  as,
  className = "",
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
