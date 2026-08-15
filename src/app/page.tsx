import Link from "next/link";
import { supabase } from "@/lib/supabase";
import T, { type Key } from "./i18n";

export const revalidate = 60;

type PublicRoom = {
  property_name: string;
  availability: "available" | "maintenance" | "occupied";
};

const FACILITIES: Key[] = [
  "about.fac.1",
  "about.fac.2",
  "about.fac.3",
  "about.fac.4",
  "about.fac.5",
  "about.fac.6",
  "about.fac.7",
  "about.fac.8",
];

export default async function Home() {
  // Front door: a Supabase blip should drop the availability strip, not
  // take the whole homepage down. See rooms/page.tsx for the strict version.
  const { data } = await supabase.rpc("public_rooms");
  const kostRooms = ((data ?? []) as PublicRoom[]).filter(
    (r) => r.property_name !== "Alfa Salam Rukost"
  );
  const availableCount = kostRooms.filter(
    (r) => r.availability === "available"
  ).length;

  return (
    <div className="bg-dots relative isolate overflow-hidden">
      <div className="bg-orbs pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="bg-orb-clay" />
      </div>
      <div className="relative mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 py-12 sm:py-16">
        <h1 className="font-display text-4xl leading-tight font-medium text-balance sm:text-5xl">
          <T k="home.title" />
        </h1>
        <p className="max-w-prose text-lg text-muted">
          <T k="home.sub" />
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/rooms"
            className="inline-flex min-h-11 items-center rounded-md bg-teratai px-5 font-medium text-background hover:opacity-90"
          >
            <T k="home.cta" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center rounded-md border border-rattan px-5 font-medium hover:border-teratai"
          >
            <T k="nav.contact" />
          </Link>
        </div>

        {kostRooms.length > 0 && (
          <p className="mt-8 flex items-center gap-3 rounded-lg border border-rattan px-4 py-3 font-mono text-sm">
            <span className="text-3xl font-medium text-teratai">
              {availableCount}
            </span>
            <T k="home.available" />
          </p>
        )}

        <section className="string-divider flex flex-col gap-3 pt-8">
          <h2 className="font-display text-xl font-medium">
            <T k="about.facilities" />
          </h2>
          <ul className="grid grid-cols-1 items-start gap-x-6 gap-y-1 text-muted sm:grid-cols-2">
            {FACILITIES.map((k) => (
              <li key={k} className="facility-bullet pl-4">
                <T k={k} />
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="w-fit text-teratai underline underline-offset-4 hover:no-underline"
          >
            <T k="home.moreAbout" />
          </Link>
        </section>
      </div>
    </div>
  );
}
