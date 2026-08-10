import Image from "next/image";
import { supabase } from "@/lib/supabase";

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
  available: "text-green-600",
  maintenance: "text-amber-600",
  occupied: "text-zinc-400",
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
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
        Room Availability
      </h1>

      {[...byProperty.entries()].map(([property, list]) => (
        <section key={property} className="flex flex-col gap-4">
          <h2 className="text-lg font-medium text-black dark:text-zinc-50">
            {property}
          </h2>
          <ul className="flex flex-col gap-3">
            {list.map((r) => (
              <li
                key={r.room_number}
                className="flex items-center gap-4 rounded border border-black/10 p-4 dark:border-white/10"
              >
                {r.photo_url && (
                  <Image
                    src={r.photo_url}
                    alt={`Room ${r.room_number}`}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col gap-1">
                  <span className="font-medium text-black dark:text-zinc-50">
                    {r.room_type} — Room {r.room_number}
                  </span>
                  {r.description && (
                    <span className="text-sm text-zinc-500">{r.description}</span>
                  )}
                  <span className="text-sm text-zinc-500">
                    Rp{r.rent_price.toLocaleString("id-ID")}/month
                  </span>
                  <span className="text-sm text-zinc-500">
                    {GENDER_LABEL[r.gender_policy]}
                  </span>
                </div>
                <span className={`text-sm font-medium ${STATUS_CLASS[r.availability]}`}>
                  {STATUS_LABEL[r.availability]}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
