"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import ArchFrame from "./arch";
import CountUp from "./count-up";
import { rupiah } from "./config";
import { useT } from "./i18n";

/* The hero. Architecture: asymmetric split — a viewport-scale Figtree
   headline anchors the left, the mihrab arch stands as a quiet
   architectural element on the right. One signature move: the headline
   rises word-by-word out of a mask (`.hero-in` + `.word`). Everything
   else is the shared `.lift` staggered entry. */
export default function Hero({
  available,
  total,
  fromPrice,
}: {
  available: string[];
  total: number;
  fromPrice: number | null;
}) {
  const t = useT();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const words = t("home.title").split(" ");

  return (
    <section className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 pt-10 pb-16 sm:pt-16 lg:min-h-[86vh] lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-24">
      <div className={`flex flex-col gap-6 ${entered ? "hero-in" : ""}`}>
        <p
          className="lift font-mono text-xs tracking-[0.18em] text-sage uppercase"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          {t("home.eyebrow")}
        </p>

        <h1
          aria-label={t("home.title")}
          className="font-display font-bold tracking-[-0.035em] text-[clamp(2.75rem,8vw,6rem)] leading-[0.98] text-balance"
        >
          {words.map((w, i) => (
            <Fragment key={i}>
              <span className="word" aria-hidden="true">
                <span style={{ "--w": i } as React.CSSProperties}>{w}</span>
              </span>
              {i < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </h1>

        <p
          className="lift max-w-prose text-lg text-muted"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {t("home.sub")}
        </p>

        <div
          className="lift flex flex-wrap items-center gap-x-5 gap-y-3"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <Link
            href="/rooms"
            className="press btn-hover inline-flex min-h-11 items-center rounded-full bg-accent px-7 text-sm font-medium tracking-wide text-surface uppercase"
          >
            {t("home.cta")}
          </Link>
          <Link
            href="/contact"
            className="link-underline text-sm font-medium text-muted hover:text-foreground"
          >
            {t("home.cta2")}
          </Link>
        </div>

        {total > 0 && (
          <p
            className="lift mt-2 font-mono text-sm text-muted"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            {available.length > 0 ? (
              <>
                <span className="text-foreground">
                  <CountUp to={available.length} />
                </span>{" "}
                / {total} · {t("home.availableLabel")}
                {fromPrice !== null && (
                  <>
                    {" · "}
                    {t("home.fromPrice")} {rupiah(fromPrice)}
                  </>
                )}
              </>
            ) : (
              t("home.availableNone")
            )}
          </p>
        )}
      </div>

      <div
        className="lift relative isolate order-first w-full max-w-[16rem] justify-self-center lg:order-none lg:max-w-none lg:justify-self-end"
        style={{ "--i": 1 } as React.CSSProperties}
      >
        <span className="arch-glow" aria-hidden="true" />
        <ArchFrame
          src={null}
          alt={t("home.title")}
          sizes="(min-width: 1024px) 34vw, 16rem"
          priority
          spinStar
          className="w-full lg:w-[clamp(18rem,32vw,26rem)]"
        />
      </div>
    </section>
  );
}
