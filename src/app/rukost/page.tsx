import Link from "next/link";
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
  description: string | null;
  availability: Availability;
  gender_policy: "women_only" | "men_only" | "mixed";
};

export default async function RukostPage() {
  const { data, error } = await supabase.rpc("public_rooms");
  if (error) throw new Error(error.message);

  const rukost = ((data ?? []) as PublicRoom[]).filter(
    (r) => r.property_name === "Alfa Salam Rukost"
  );

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 py-12 sm:py-16">
      <h1 className="font-display text-3xl font-medium text-balance sm:text-4xl">
        <T k="rukost.title" />
      </h1>
      <p className="max-w-prose text-muted">
        <T k="rukost.intro" />
      </p>

      {rukost.length === 0 && (
        <p className="text-muted">
          <T k="rukost.empty" />
        </p>
      )}

      <ul className="flex flex-col gap-3">
        {rukost.map((r) => (
          <li
            key={r.room_number}
            className="flex flex-col gap-4 rounded-lg border border-rattan p-4 transition-colors hover:border-teratai sm:flex-row sm:items-center"
          >
            <div className="self-start">
              <KeyTag label={r.room_number} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <h2 className="font-medium capitalize">
                {r.room_type.replace("_", " ")}
              </h2>
              <p className="font-mono text-sm">
                Rp{r.rent_price.toLocaleString("id-ID")}
                <T k="rooms.perMonth" />
              </p>
              {r.description && (
                <p className="text-sm text-muted">{r.description}</p>
              )}
            </div>
            <div className="self-start sm:self-center">
              <StatusBadge status={r.availability} />
            </div>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className="inline-flex min-h-11 w-fit items-center rounded-md bg-teratai px-5 font-medium text-background hover:opacity-90"
      >
        <T k="rukost.cta" />
      </Link>
    </div>
  );
}
