import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { MAPS_URL, RUKOST_PROPERTY } from "./config";
import Hero from "./hero";
import Reveal from "./reveal";
import Star from "./star";
import T, { type Key } from "./i18n";

export const revalidate = 60;

type PublicRoom = {
  property_name: string;
  room_number: string;
  rent_price: number;
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
  // Front door: a Supabase blip should drop the availability numbers, not
  // take the whole homepage down. /rooms has the strict version.
  const { data } = await supabase.rpc("public_rooms");
  const kostRooms = ((data ?? []) as PublicRoom[]).filter(
    (r) => r.property_name !== RUKOST_PROPERTY
  );
  const available = kostRooms
    .filter((r) => r.availability === "available")
    .map((r) => r.room_number);
  const fromPrice = kostRooms.length
    ? Math.min(...kostRooms.map((r) => r.rent_price))
    : null;

  return (
    <>
      <Hero
        available={available}
        total={kostRooms.length}
        fromPrice={fromPrice}
      />

      {/* Available room numbers */}
      {available.length > 0 && (
        <Reveal
          as="section"
          id="availability"
          className="mx-auto w-full max-w-6xl px-6 pb-16"
        >
          <div className="flex flex-col gap-4 border-t border-line pt-8">
            <h2 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
              <T k="home.availTitle" />
            </h2>
            <div className="flex flex-wrap gap-2">
              {available.map((n, i) => (
                <span
                  key={n}
                  data-stagger
                  style={{ "--s": Math.min(i, 8) } as React.CSSProperties}
                  className="rounded-md border border-line px-2.5 py-1 font-mono text-sm"
                >
                  {n}
                </span>
              ))}
            </div>
            <Link
              href="/rooms"
              className="link-underline w-fit text-sm font-medium text-accent"
            >
              <T k="home.availCta" />
            </Link>
          </div>
        </Reveal>
      )}

      <Band titleKey="home.band1Title" bodyKey="home.band1Body" />

      {/* Facilities */}
      <Reveal
        as="section"
        id="facilities"
        className="mx-auto w-full max-w-2xl px-6 py-20"
      >
        <div className="rule-line mb-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-line" />
          <Star className="h-3.5 w-3.5 text-sage/60" />
          <span className="h-px flex-1 bg-line" />
        </div>
        <h2 className="font-display text-2xl font-semibold">
          <T k="home.facTitle" />
        </h2>
        <ul className="mt-5 grid grid-cols-1 items-start gap-x-6 gap-y-1.5 text-muted sm:grid-cols-2">
          {FACILITIES.map((k, i) => (
            <li
              key={k}
              data-stagger
              style={{ "--s": i } as React.CSSProperties}
              className="facility-bullet pl-4"
            >
              <T k={k} />
            </li>
          ))}
        </ul>
      </Reveal>

      <Band id="rules" titleKey="home.band2Title" bodyKey="home.band2Body" />

      {/* Neighbourhood */}
      <Reveal
        as="section"
        id="neighbourhood"
        className="mx-auto w-full max-w-2xl px-6 py-20"
      >
        <h2 className="font-display text-2xl font-semibold">
          <T k="home.hoodTitle" />
        </h2>
        <p className="mt-4 max-w-prose text-muted">
          <T k="home.hoodBody" />
        </p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline mt-4 inline-block text-sm font-medium text-accent"
        >
          <T k="maps" />
        </a>
      </Reveal>

      {/* Rukost teaser */}
      <Reveal as="section" className="mx-auto w-full max-w-2xl px-6 pb-20">
        <div className="rule-line mb-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-line" />
          <Star className="h-3.5 w-3.5 text-sage/60" />
          <span className="h-px flex-1 bg-line" />
        </div>
        <h2 className="font-display text-2xl font-semibold">
          <T k="home.rukostTitle" />
        </h2>
        <p className="mt-4 max-w-prose text-muted">
          <T k="home.rukostBody" />
        </p>
        <Link
          href="/rooms#rukost"
          className="link-underline mt-4 inline-block text-sm font-medium text-accent"
        >
          <T k="home.rukostLink" />
        </Link>
      </Reveal>

      {/* Closing CTA */}
      <Reveal as="section" className="bg-deep text-[#F7F4EF]">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-start gap-5 px-6 py-24">
          <Star className="h-6 w-6 text-sage" />
          <h2 className="font-display text-3xl font-semibold text-balance">
            <T k="home.closeTitle" />
          </h2>
          <p className="max-w-prose text-[#F7F4EF]/80">
            <T k="home.closeBody" />
          </p>
          <Link
            href="/contact"
            className="press btn-hover mt-2 inline-flex min-h-11 items-center rounded-full bg-[#F7F4EF] px-7 text-sm font-medium tracking-wide text-deep uppercase"
          >
            <T k="home.closeCta" />
          </Link>
        </div>
      </Reveal>
    </>
  );
}

function Band({
  id,
  titleKey,
  bodyKey,
}: {
  id?: string;
  titleKey: Key;
  bodyKey: Key;
}) {
  return (
    <Reveal as="section" id={id} className="bg-deep text-[#F7F4EF]">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-start gap-4 px-6 py-20">
        <Star className="h-4 w-4 text-sage" />
        <h2 className="font-display text-2xl font-semibold text-balance">
          <T k={titleKey} />
        </h2>
        <p className="max-w-prose text-[#F7F4EF]/80">
          <T k={bodyKey} />
        </p>
      </div>
    </Reveal>
  );
}
