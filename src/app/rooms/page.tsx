import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { RUKOST_PROPERTY, rupiah } from "../config";
import ArchFrame from "../arch";
import Reveal from "../reveal";
import Star from "../star";
import StatusBadge, { type Availability } from "../status-badge";
import T from "../i18n";

export const revalidate = 60;

type PublicRoom = {
  property_name: string;
  room_number: string;
  room_type: string;
  rent_price: number;
  photo_url: string | null;
  description: string | null;
  availability: Availability;
  gender_policy: "women_only" | "men_only" | "mixed";
};

function RoomCard({ r, i }: { r: PublicRoom; i: number }) {
  return (
    <li
      data-stagger
      style={{ "--s": Math.min(i, 8) } as React.CSSProperties}
      className="press card-hover flex gap-4 rounded-xl border border-line bg-surface p-4"
    >
      <ArchFrame
        src={r.photo_url}
        alt={`${r.room_type.replace("_", " ")} — ${r.room_number}`}
        sizes="96px"
        className="w-24 shrink-0 self-start"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="font-display font-semibold">
          <span className="capitalize">{r.room_type.replace("_", " ")}</span>
          {" — "}
          <T k="rooms.room" /> {r.room_number}
        </h3>
        <p className="font-mono text-sm">
          {rupiah(r.rent_price)}
          <T k="perMonth" />
        </p>
        {r.description && (
          <p className="text-sm text-muted">{r.description}</p>
        )}
        <p className="text-sm text-muted">
          <T k={`gender.${r.gender_policy}`} />
        </p>
        <div className="mt-1">
          <StatusBadge status={r.availability} />
        </div>
      </div>
    </li>
  );
}

function StringRule() {
  return (
    <div className="rule-line flex items-center gap-4">
      <span className="h-px flex-1 bg-line" />
      <Star className="h-3.5 w-3.5 text-sage/60" />
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

export default async function RoomsPage() {
  // Calls the SECURITY DEFINER function only -- rooms/tenants tables are
  // revoked from anon at the database level. See 0001_init.sql.
  const { data, error } = await supabase.rpc("public_rooms");
  if (error) throw new Error(error.message);

  const rooms = (data ?? []) as PublicRoom[];
  const kost = rooms.filter((r) => r.property_name !== RUKOST_PROPERTY);
  const rukost = rooms.filter((r) => r.property_name === RUKOST_PROPERTY);

  const byProperty = new Map<string, PublicRoom[]>();
  for (const r of kost) {
    const list = byProperty.get(r.property_name) ?? [];
    list.push(r);
    byProperty.set(r.property_name, list);
  }

  return (
    <div className="rise mx-auto flex w-full max-w-3xl flex-col gap-14 px-6 py-12 sm:py-16">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold tracking-[-0.02em]">
          <T k="rooms.title" />
        </h1>
        <p className="max-w-prose text-muted">
          <T k="rooms.intro" />
        </p>
      </div>

      {rooms.length === 0 && (
        <p className="text-muted">
          <T k="rooms.empty" />
        </p>
      )}

      {[...byProperty.entries()].map(([property, list], i) => (
        <Reveal
          as="section"
          key={property}
          className="flex flex-col gap-4"
        >
          {i > 0 && <StringRule />}
          <h2 className="font-display text-xl font-semibold">{property}</h2>
          <ul className="flex flex-col gap-3">
            {list.map((r, j) => (
              <RoomCard key={r.room_number} r={r} i={j} />
            ))}
          </ul>
        </Reveal>
      ))}

      {/* Rukost — whole-house rental, different business rule */}
      <Reveal as="section" id="rukost" className="flex flex-col gap-4">
        <StringRule />
        <h2 className="font-display text-xl font-semibold">
          <T k="rukost.title" />
        </h2>
        <p className="max-w-prose text-muted">
          <T k="rukost.intro" />
        </p>
        {rukost.length === 0 ? (
          <p className="text-muted">
            <T k="rukost.empty" />
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {rukost.map((r, j) => (
              <RoomCard key={r.room_number} r={r} i={j} />
            ))}
          </ul>
        )}
        <Link
          href="/contact"
          className="press btn-hover inline-flex min-h-11 w-fit items-center rounded-full bg-accent px-7 text-sm font-medium tracking-wide text-surface uppercase"
        >
          <T k="rukost.cta" />
        </Link>
      </Reveal>
    </div>
  );
}
