"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import T, { type Key } from "./i18n";

const NAV: { href: string; k: Key }[] = [
  { href: "/", k: "nav.home" },
  { href: "/about", k: "nav.about" },
  { href: "/rooms", k: "nav.rooms" },
  { href: "/rukost", k: "nav.rukost" },
  { href: "/contact", k: "nav.contact" },
];

export default function NavLinks({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className={`-mx-1 flex gap-1 overflow-x-auto text-sm ${className}`}
    >
      {NAV.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-9 items-center rounded-md border-b-2 px-2 whitespace-nowrap ${
              active
                ? "border-teratai font-medium text-teratai"
                : "border-transparent text-muted hover:border-rattan hover:text-foreground"
            }`}
          >
            <T k={item.k} />
          </Link>
        );
      })}
    </nav>
  );
}
