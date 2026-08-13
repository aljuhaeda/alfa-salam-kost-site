import Link from "next/link";
import KeyTag from "./key-tag";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-2xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24">
      <KeyTag label="No. 1" size="lg" />
      <h1 className="font-display text-4xl font-medium">
        Alfa Salam Kost &amp; Rukost
      </h1>
      <p className="opacity-80">
        Comfortable boarding rooms and a rukost unit, available now.
      </p>
      <Link
        href="/rooms"
        className="rounded-md bg-teratai px-4 py-2 text-background"
      >
        See room availability
      </Link>
    </div>
  );
}
