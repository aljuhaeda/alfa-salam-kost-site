import Link from "next/link";
import KeyTag from "./key-tag";
import T from "./i18n";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-start justify-center gap-6 px-6 py-20 sm:py-28">
      <KeyTag label="No. 1" size="lg" />
      <h1 className="font-display text-4xl leading-tight font-medium text-balance sm:text-5xl">
        <T k="home.title" />
      </h1>
      <p className="max-w-prose text-lg text-muted">
        <T k="home.sub" />
      </p>
      <Link
        href="/rooms"
        className="mt-2 inline-flex min-h-11 items-center rounded-md bg-teratai px-5 font-medium text-background hover:opacity-90"
      >
        <T k="home.cta" />
      </Link>
    </div>
  );
}
