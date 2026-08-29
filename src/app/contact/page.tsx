import { MAPS_URL } from "../config";
import Reveal from "../reveal";
import Star from "../star";
import T from "../i18n";

const WHATSAPP_CONTACTS = [
  { name: "Bu Atin", number: "6281219533455" },
  { name: "Alfa Salam Kost", number: "6282210434840" },
];

export default function ContactPage() {
  return (
    <div className="rise mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-12 sm:py-16">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold tracking-[-0.02em]">
          <T k="contact.title" />
        </h1>
        <p className="max-w-prose text-muted">
          <T k="contact.intro" />
        </p>
      </div>

      <Reveal as="section" className="flex flex-col gap-3">
        <h2 className="font-display text-xl font-semibold">
          <T k="contact.whatsapp" />
        </h2>
        <ul className="flex flex-col gap-2">
          {WHATSAPP_CONTACTS.map((c, i) => (
            <li
              key={c.number}
              data-stagger
              style={{ "--s": i } as React.CSSProperties}
            >
              <a
                href={`https://wa.me/${c.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="press card-hover flex min-h-12 w-full items-center justify-between gap-4 rounded-lg border border-line bg-surface px-4 sm:w-fit"
              >
                <span className="font-medium">{c.name}</span>
                <span className="font-mono text-sm text-muted">
                  +{c.number}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal as="section" className="flex flex-col gap-2">
        <div className="rule-line mb-4 flex items-center gap-4">
          <span className="h-px flex-1 bg-line" />
          <Star className="h-3.5 w-3.5 text-sage/60" />
          <span className="h-px flex-1 bg-line" />
        </div>
        <h2 className="font-display text-xl font-semibold">
          <T k="contact.address" />
        </h2>
        <p className="max-w-prose text-muted">
          <T k="contact.address.body" />
        </p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline mt-1 w-fit text-sm font-medium text-accent"
        >
          <T k="maps" />
        </a>
      </Reveal>
    </div>
  );
}
