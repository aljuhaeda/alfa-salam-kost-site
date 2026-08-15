"use client";

import { useT } from "./i18n";

/* No React state on purpose: the inline script in layout.tsx already put
   the right class on <html> before first paint, and the two icons are
   shown/hidden by the `dark:` variant. Mirroring that class into state
   would only create a hydration mismatch to suppress. */
export default function ThemeToggle() {
  const t = useT();
  return (
    <button
      type="button"
      onClick={() => {
        const dark = document.documentElement.classList.toggle("dark");
        try {
          localStorage.setItem("theme", dark ? "dark" : "light");
        } catch {}
      }}
      aria-label={t("a11y.theme")}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-rattan hover:border-teratai hover:text-teratai"
    >
      {/* moon — shown in light mode (click to go dark) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
      {/* sun — shown in dark mode (click to go light) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="hidden h-4 w-4 dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
