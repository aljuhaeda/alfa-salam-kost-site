import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-2xl flex-1 flex-col items-start justify-center gap-4 px-6 py-24">
      <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
        Alfa Salam Kost &amp; Rukost
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Comfortable boarding rooms and a rukost unit, available now.
      </p>
      <Link
        href="/rooms"
        className="rounded bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
      >
        See room availability
      </Link>
    </div>
  );
}
