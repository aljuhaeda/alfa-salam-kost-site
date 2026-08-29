import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ArchFrame from "../arch";
import StarDivider from "../star-divider";
import StatusBadge, { type Availability } from "../status-badge";
import T from "../i18n";

export const revalidate = 60;

const RUKOST = "Alfa Salam Rukost";

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

function RoomCard({ r }: { r: PublicRoom }) {
  return (
    <li className="flex gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent">
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
          Rp{r.rent_price.toLocaleString("id-ID")}
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

export default async function RoomsPage() {
  // Calls the SECURITY DEFINER function only -- rooms/tenants tables are
  // revoked from anon at the database level. See 0001_init.sql.
  const { data, error } = await supabase.rpc("public_rooms");
  if (error) throw new Error(error.message);

  const rooms = (data ?? []) as PublicRoom[];
  const kost = rooms.filter((r) => r.property_name !== RUKOST);
  const rukost = rooms.filter((r) => r.property_name === RUKOST);

  const byProperty = new Map<string, PublicRoom[]>();
  for (const r of kost) {
    const list = byProperty.get(r.property_name) ?? [];
    list.push(r);
    byProperty.set(r.property_name, list);
  }

  return (
    <div className="rise mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12 sm:py-16">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
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
        <section key={property} className="flex flex-col gap-4">
          {i > 0 && <StarDivider />}
          <h2 className="font-display text-xl font-semibold">{property}</h2>
          <ul className="flex flex-col gap-3">
            {list.map((r) => (
              <RoomCard key={r.room_number} r={r} />
            ))}
          </ul>
        </section>
      ))}

      {/* Rukost — whole-house rental, different business rule */}
      <section id="rukost" className="flex flex-col gap-4">
        <StarDivider />
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
            {rukost.map((r) => (
              <RoomCard key={r.room_number} r={r} />
            ))}
          </ul>
        )}
        <Link
          href="/contact"
          className="inline-flex min-h-11 w-fit items-center rounded-md bg-accent px-5 font-medium text-surface hover:opacity-90"
        >
          <T k="rukost.cta" />
        </Link>
      </section>
    </div>
  );
}
