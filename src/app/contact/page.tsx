import T from "../i18n";

const MAPS_URL = "https://maps.app.goo.gl/MQBGqnYfbb9m3Ei87";

const WHATSAPP_CONTACTS = [
  { name: "Bu Atin", number: "6281219533455" },
  { name: "Alfa Salam Kost", number: "6282210434840" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-12 sm:py-16">
      <h1 className="font-display text-3xl font-medium sm:text-4xl">
        <T k="contact.title" />
      </h1>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-xl font-medium">
          <T k="contact.whatsapp" />
        </h2>
        <ul className="flex flex-col gap-2">
          {WHATSAPP_CONTACTS.map((c) => (
            <li key={c.number}>
              <a
                href={`https://wa.me/${c.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 w-full items-center justify-between gap-4 rounded-lg border border-rattan px-4 transition-colors hover:border-teratai sm:w-fit"
              >
                <span className="font-medium">{c.name}</span>
                <span className="font-mono text-sm text-muted">
                  +{c.number}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="string-divider flex flex-col gap-2 pt-8">
        <h2 className="font-display text-xl font-medium">
          <T k="contact.address" />
        </h2>
        <p className="max-w-prose text-muted">
          <T k="contact.address.body" />
        </p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-teratai underline underline-offset-4 hover:no-underline"
        >
          <T k="about.maps" />
        </a>
      </section>
    </div>
  );
}
