"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import NavLinks from "./nav-links";
import ThemeToggle from "./theme-toggle";
import Star from "./star";
import { LangToggle } from "./i18n";

/* Scroll-aware header. Bare (transparent, no border) sitting over the
   page at the top; becomes a frosted panel once you scroll past the
   sentinel. A 1px sentinel + IntersectionObserver — no scroll listener.
   The brand star turns slowly (`.star-spin`, ambient, gated). */
export default function Header() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="absolute top-0 h-px w-px" />
      <header
        data-scrolled={scrolled}
        className="site-header sticky top-0 z-10 border-b"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-3.5">
          <Link
            href="/"
            className="press flex items-center gap-2 font-display text-lg font-semibold tracking-tight hover:opacity-80"
          >
            <Star className="star-spin h-5 w-5 text-sage" />
            Alfa Salam Kost
          </Link>
          <NavLinks className="order-3 basis-full md:order-none md:basis-auto" />
          <div className="order-2 ml-auto flex items-center gap-2 md:order-none">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}
