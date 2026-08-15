import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import NavLinks from "./nav-links";
import ThemeToggle from "./theme-toggle";
import T, { DEFAULT_LANG, LangToggle } from "./i18n";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alfa Salam Kost",
  description: "Kost & Rukost rooms in Indonesia — availability and contact.",
};

// Runs synchronously while the browser parses <head>, so the stored theme
// is applied before first paint — no flash of the wrong theme. Resolves
// the system preference itself, which is why globals.css has no
// prefers-color-scheme block: one mechanism, so an explicit "light"
// choice still wins on a system set to dark.
const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);var l=localStorage.getItem("lang");if(l==="en"||l==="id")document.documentElement.lang=l}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={DEFAULT_LANG}
      suppressHydrationWarning
      className={`${fraunces.variable} ${workSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-20 focus:rounded-md focus:bg-teratai focus:px-3 focus:py-2 focus:text-background"
        >
          <T k="a11y.skip" />
        </a>
        <header className="sticky top-0 z-10 border-b border-rattan bg-background/90 backdrop-blur">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-3">
            <Link
              href="/"
              className="font-display text-lg font-medium tracking-tight"
            >
              Alfa Salam Kost
            </Link>
            <NavLinks className="order-3 basis-full md:order-none md:basis-auto" />
            <div className="order-2 ml-auto flex items-center gap-2 md:order-none">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
