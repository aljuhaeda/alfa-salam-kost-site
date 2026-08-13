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
    <nav className="flex gap-4 overflow-x-auto text-sm">
      {NAV.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap pb-1 ${
              active
                ? "border-b-2 border-teratai font-medium"
                : "border-b-2 border-transparent opacity-70 hover:underline hover:opacity-100"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
