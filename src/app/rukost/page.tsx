import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

type PublicRoom = {
  property_name: string;
  room_number: string;
  room_type: string;
  rent_price: number;
  description: string | null;
  availability: "available" | "maintenance" | "occupied";
  gender_policy: "women_only" | "men_only" | "mixed";
};

export default async function RukostPage() {
  const { data, error } = await supabase.rpc("public_rooms");
  if (error) throw new Error(error.message);

  const rukost = ((data ?? []) as PublicRoom[]).filter(
    (r) => r.property_name === "Alfa Salam Rukost"
  );

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-12">
      <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
        Rent a House — Alfa Salam Rukost
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        A 2-bedroom house, rented as a whole unit — an option for families or
        anyone wanting a private house instead of a single room. Renting the
        whole house is open to anyone (mixed occupancy is fine); this is
        different from our women-only Kost rooms.
      </p>

      {rukost.length === 0 && (
        <p className="text-zinc-500">No listing available right now — check back soon.</p>
      )}

      <ul className="flex flex-col gap-3">
        {rukost.map((r) => (
          <li
            key={r.room_number}
            className="rounded border border-black/10 p-4 dark:border-white/10"
          >
            <div className="flex flex-col gap-1">
              <span className="font-medium text-black dark:text-zinc-50">
                {r.room_type.replace("_", " ")}
              </span>
              {r.description && (
                <span className="text-sm text-zinc-500">{r.description}</span>
              )}
              <span className="text-sm text-zinc-500">
                Rp{r.rent_price.toLocaleString("id-ID")}/month
              </span>
              <span
                className={`text-sm font-medium ${
                  r.availability === "available"
                    ? "text-green-600"
                    : r.availability === "maintenance"
                      ? "text-amber-600"
                      : "text-zinc-400"
                }`}
              >
                {r.availability === "available"
                  ? "Available"
                  : r.availability === "maintenance"
                    ? "Under maintenance"
                    : "Currently occupied"}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <Link href="/contact" className="underline">
        Contact us about renting the house
      </Link>
    </div>
  );
}
