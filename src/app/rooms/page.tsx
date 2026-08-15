import Image from "next/image";
import { supabase } from "@/lib/supabase";
import KeyTag from "../key-tag";
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

export default async function RoomsPage() {
  // Calls the SECURITY DEFINER function only -- rooms/tenants tables are
  // revoked from anon at the database level. See 0001_init.sql.
  const { data, error } = await supabase.rpc("public_rooms");
  if (error) throw new Error(error.message);

  const rooms = (data ?? []) as PublicRoom[];
  const byProperty = new Map<string, PublicRoom[]>();
  for (const r of rooms) {
    const list = byProperty.get(r.property_name) ?? [];
    list.push(r);
    byProperty.set(r.property_name, list);
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 py-12 sm:py-16">
      <h1 className="font-display text-3xl font-medium sm:text-4xl">
        <T k="rooms.title" />
      </h1>

      {rooms.length === 0 && (
        <p className="text-muted">
          <T k="rooms.empty" />
        </p>
      )}

      {[...byProperty.entries()].map(([property, list], i) => (
        <section
          key={property}
          className={`flex flex-col gap-4 ${i > 0 ? "string-divider pt-10" : ""}`}
        >
          <h2 className="font-display text-xl font-medium">{property}</h2>
          <ul className="flex flex-col gap-3">
            {list.map((r) => (
              <li
                key={r.room_number}
                className="flex flex-col gap-4 rounded-lg border border-rattan p-4 transition-colors hover:border-teratai sm:flex-row sm:items-center"
              >
                {r.photo_url ? (
                  <Image
                    src={r.photo_url}
                    alt={`Room ${r.room_number}`}
                    width={80}
                    height={80}
                    className="h-20 w-20 shrink-0 self-start rounded object-cover"
                  />
                ) : (
                  <div
                    className="flex h-20 w-20 shrink-0 items-center justify-center self-start rounded bg-rattan/25 text-xs text-muted"
                  >
                    <T k="rooms.noPhoto" />
                  </div>
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <h3 className="font-medium">
                    <span className="capitalize">
                      {r.room_type.replace("_", " ")}
                    </span>{" "}
                    — <T k="rooms.room" /> {r.room_number}
                  </h3>
                  <p className="font-mono text-sm">
                    Rp{r.rent_price.toLocaleString("id-ID")}
                    <T k="rooms.perMonth" />
                  </p>
                  {r.description && (
                    <p className="text-sm text-muted">{r.description}</p>
                  )}
                  <p className="text-sm text-muted">
                    <T k={`gender.${r.gender_policy}`} />
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:flex-col sm:items-end sm:self-center">
                  <KeyTag label={r.room_number} />
                  <StatusBadge status={r.availability} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
