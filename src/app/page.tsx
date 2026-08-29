import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { MAPS_URL, RUKOST_PROPERTY, rupiah } from "./config";
import ArchFrame from "./arch";
import Star from "./star";
import StarDivider from "./star-divider";
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
  // Front door: a Supabase blip should drop the availability band, not
  // take the whole homepage down. See rooms/page.tsx for the strict version.
  const { data } = await supabase.rpc("public_rooms");
  const kostRooms = ((data ?? []) as PublicRoom[]).filter(
    (r) => r.property_name !== RUKOST_PROPERTY
  );
  const available = kostRooms.filter((r) => r.availability === "available");
  const fromPrice = kostRooms.length
    ? Math.min(...kostRooms.map((r) => r.rent_price))
    : null;

  return (
    <div className="rise">
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-3xl gap-8 px-6 py-12 sm:grid-cols-[1fr_auto] sm:items-center sm:py-16">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-xs tracking-[0.16em] text-sage uppercase">
            <T k="home.eyebrow" />
          </p>
          <h1 className="font-display text-3xl leading-tight font-bold text-balance sm:text-[2.6rem]">
            <T k="home.title" />
          </h1>
          <p className="max-w-prose text-lg text-muted">
            <T k="home.sub" />
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href="/rooms"
              className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 font-medium text-surface hover:opacity-90"
            >
              <T k="home.cta" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center rounded-md border border-line px-5 font-medium hover:border-accent"
            >
              <T k="home.cta2" />
            </Link>
          </div>
        </div>
        <ArchFrame
          src={null}
          alt="Alfa Salam Kost"
          sizes="(min-width: 640px) 160px, 55vw"
          priority
          className="w-40 justify-self-center"
        />
      </section>

      {/* Availability snapshot */}
      {kostRooms.length > 0 && (
        <section className="mx-auto w-full max-w-3xl px-6 pb-4">
          <div className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-5">
            <h2 className="font-display text-sm font-semibold text-foreground/80">
              <T k="home.availTitle" />
            </h2>
            {available.length > 0 ? (
              <>
                <p className="flex items-baseline gap-2 font-mono">
                  <span className="text-3xl font-medium text-accent">
                    {available.length}
                  </span>
                  <span className="text-muted">/ {kostRooms.length}</span>
                  <span className="text-sm">
                    <T k="home.availableLabel" />
                  </span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {available.map((r) => (
                    <span
                      key={r.room_number}
                      className="rounded-md border border-line px-2 py-0.5 font-mono text-sm"
                    >
                      {r.room_number}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted">
                <T k="home.availableNone" />
              </p>
            )}
            {fromPrice !== null && (
              <p className="font-mono text-sm text-muted">
                <T k="home.fromPrice" /> {rupiah(fromPrice)}
                <T k="perMonth" />
              </p>
            )}
            <Link
              href="/rooms"
              className="w-fit text-accent underline underline-offset-4 hover:no-underline"
            >
              <T k="home.availCta" />
            </Link>
          </div>
        </section>
      )}

      {/* Band — what's in the room */}
      <Band titleKey="home.band1Title" bodyKey="home.band1Body" />

      {/* Facilities */}
      <section id="facilities" className="mx-auto w-full max-w-2xl px-6 py-14">
        <StarDivider />
        <h2 className="mt-6 font-display text-xl font-semibold">
          <T k="home.facTitle" />
        </h2>
        <ul className="mt-4 grid grid-cols-1 items-start gap-x-6 gap-y-1 text-muted sm:grid-cols-2">
          {FACILITIES.map((k) => (
            <li key={k} className="facility-bullet pl-4">
              <T k={k} />
            </li>
          ))}
        </ul>
      </section>

      {/* Band — women-only + rules */}
      <Band id="rules" titleKey="home.band2Title" bodyKey="home.band2Body" />

      {/* Neighbourhood */}
      <section
        id="neighbourhood"
        className="mx-auto w-full max-w-2xl px-6 py-14"
      >
        <h2 className="font-display text-xl font-semibold">
          <T k="home.hoodTitle" />
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          <T k="home.hoodBody" />
        </p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-accent underline underline-offset-4 hover:no-underline"
        >
          <T k="maps" />
        </a>
      </section>

      {/* Rukost teaser */}
      <section className="mx-auto w-full max-w-2xl px-6 pb-14">
        <StarDivider />
        <h2 className="mt-6 font-display text-xl font-semibold">
          <T k="home.rukostTitle" />
        </h2>
        <p className="mt-3 max-w-prose text-muted">
          <T k="home.rukostBody" />
        </p>
        <Link
          href="/rooms#rukost"
          className="mt-3 inline-block text-accent underline underline-offset-4 hover:no-underline"
        >
          <T k="home.rukostLink" />
        </Link>
      </section>

      {/* Closing CTA */}
      <section className="bg-deep text-[#F7F4EF]">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-start gap-4 px-6 py-16">
          <Star className="h-5 w-5 text-sage" />
          <h2 className="font-display text-2xl font-semibold text-balance">
            <T k="home.closeTitle" />
          </h2>
          <p className="max-w-prose text-[#F7F4EF]/80">
            <T k="home.closeBody" />
          </p>
          <Link
            href="/contact"
            className="mt-2 inline-flex min-h-11 items-center rounded-md bg-[#F7F4EF] px-5 font-medium text-deep hover:opacity-90"
          >
            <T k="home.closeCta" />
          </Link>
        </div>
      </section>
    </div>
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
    <section id={id} className="bg-deep text-[#F7F4EF]">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-start gap-3 px-6 py-14">
        <Star className="h-4 w-4 text-sage" />
        <h2 className="font-display text-xl font-semibold text-balance">
          <T k={titleKey} />
        </h2>
        <p className="max-w-prose text-[#F7F4EF]/80">
          <T k={bodyKey} />
        </p>
      </div>
    </section>
  );
}
