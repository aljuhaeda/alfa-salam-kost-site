"use client";

import { useEffect, useRef, useState } from "react";

/* Counts from 0 to `to` once, when scrolled into view. Reduced-motion or
   no-IO: renders the final number immediately. Used for the availability
   figure on the homepage. */
export default function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const id = requestAnimationFrame(() => setN(to));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 700;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          // spring-ish ease-out
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(eased * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  );
}
