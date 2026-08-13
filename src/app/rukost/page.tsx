import Link from "next/link";
import { supabase } from "@/lib/supabase";
import KeyTag from "../key-tag";

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
      <h1 className="font-display text-3xl font-medium">
        Rent a House — Alfa Salam Rukost
      </h1>
      <p className="opacity-80">
        A 2-bedroom house, rented as a whole unit — an option for families or
        anyone wanting a private house instead of a single room. Renting the
        whole house is open to anyone (mixed occupancy is fine); this is
        different from our women-only Kost rooms.
      </p>

      {rukost.length === 0 && (
        <p className="opacity-70">No listing available right now — check back soon.</p>
      )}

      <ul className="flex flex-col gap-3">
        {rukost.map((r) => (
          <li
            key={r.room_number}
            className="flex items-center gap-4 rounded-lg border border-rattan p-4"
          >
            <KeyTag label={r.room_number} />
            <div className="flex flex-col gap-1">
              <span className="font-medium">{r.room_type.replace("_", " ")}</span>
              {r.description && (
                <span className="text-sm opacity-70">{r.description}</span>
              )}
              <span className="font-mono text-sm opacity-70">
                Rp{r.rent_price.toLocaleString("id-ID")}/month
              </span>
              <span
                className={`text-sm font-medium ${
                  r.availability === "available"
                    ? "text-teratai"
                    : r.availability === "maintenance"
                      ? "text-marigold"
                      : "text-clay"
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

      <Link href="/contact" className="text-teratai underline">
        Contact us about renting the house
      </Link>
    </div>
  );
}
