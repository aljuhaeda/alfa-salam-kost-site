import Image from "next/image";
import { supabase } from "@/lib/supabase";
import KeyTag from "../key-tag";

export const revalidate = 60;

type PublicRoom = {
  property_name: string;
  room_number: string;
  room_type: string;
  rent_price: number;
  photo_url: string | null;
  description: string | null;
  availability: "available" | "maintenance" | "occupied";
  gender_policy: "women_only" | "men_only" | "mixed";
};

const STATUS_LABEL: Record<PublicRoom["availability"], string> = {
  available: "Available",
  maintenance: "Under maintenance",
  occupied: "Occupied",
};

const STATUS_CLASS: Record<PublicRoom["availability"], string> = {
  available: "bg-teratai/10 text-teratai",
  maintenance: "bg-marigold/10 text-marigold",
  occupied: "bg-clay/10 text-clay",
};

const GENDER_LABEL: Record<PublicRoom["gender_policy"], string> = {
  women_only: "Women only",
  men_only: "Men only",
  mixed: "Mixed / family",
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
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-12">
      <h1 className="font-display text-3xl font-medium">Room Availability</h1>

      {rooms.length === 0 && (
        <p className="opacity-70">No rooms listed right now — check back soon.</p>
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
                className="flex flex-col gap-4 rounded-lg border border-rattan p-4 sm:flex-row sm:items-center"
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
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center self-start rounded bg-rattan/20 text-xs opacity-60">
                    No photo
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-1">
                  <span className="font-medium">
                    {r.room_type} — Room {r.room_number}
                  </span>
                  {r.description && (
                    <span className="text-sm opacity-70">{r.description}</span>
                  )}
                  <span className="font-mono text-sm opacity-70">
                    Rp{r.rent_price.toLocaleString("id-ID")}/month
                  </span>
                  <span className="text-sm opacity-70">
                    {GENDER_LABEL[r.gender_policy]}
                  </span>
                </div>
                <div className="flex items-center gap-2 self-start sm:flex-col sm:items-end sm:self-center">
                  <KeyTag label={r.room_number} />
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${STATUS_CLASS[r.availability]}`}
                  >
                    {STATUS_LABEL[r.availability]}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
