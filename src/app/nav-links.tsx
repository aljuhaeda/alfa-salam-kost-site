"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/rooms", label: "Rooms" },
  { href: "/rukost", label: "Rent a House" },
  { href: "/contact", label: "Contact" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 overflow-x-auto text-sm text-zinc-600 dark:text-zinc-400">
      {NAV.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap pb-1 ${
              active
                ? "border-b-2 border-black font-medium text-black dark:border-white dark:text-zinc-50"
                : "border-b-2 border-transparent hover:underline"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
