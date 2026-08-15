import T, { type Key } from "../i18n";

const MAPS_URL = "https://maps.app.goo.gl/MQBGqnYfbb9m3Ei87";

const FACILITIES: Key[] = [
  "about.fac.1",
  "about.fac.2",
  "about.fac.3",
  "about.fac.4",
  "about.fac.5",
  "about.fac.6",
  "about.fac.7",
  "about.fac.8",
];

function MapsLink() {
  return (
    <a
      href={MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="w-fit text-teratai underline underline-offset-4 hover:no-underline"
    >
      <T k="about.maps" />
    </a>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-12 sm:py-16">
      <h1 className="font-display text-3xl font-medium sm:text-4xl">
        <T k="about.title" />
      </h1>

      <section className="string-divider flex flex-col gap-2 pt-8">
        <h2 className="font-display text-xl font-medium">
          <T k="about.location" />
        </h2>
        <p className="max-w-prose text-muted">
          <T k="about.location.body" />
        </p>
        <MapsLink />
      </section>

      <section className="string-divider flex flex-col gap-2 pt-8">
        <h2 className="font-display text-xl font-medium">
          <T k="about.facilities" />
        </h2>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-muted">
          {FACILITIES.map((k) => (
            <li key={k}>
              <T k={k} />
            </li>
          ))}
        </ul>
      </section>

      <section className="string-divider flex flex-col gap-2 pt-8">
        <h2 className="font-display text-xl font-medium">
          <T k="about.rules" />
        </h2>
        <p className="max-w-prose text-muted">
          <T k="about.rules.body" />
        </p>
      </section>

      <section className="string-divider flex flex-col gap-2 pt-8">
        <h2 className="font-display text-xl font-medium">
          <T k="about.blurbTitle" />
        </h2>
        <p className="max-w-prose text-muted">
          <T k="about.blurb" />
        </p>
      </section>
    </div>
  );
}
