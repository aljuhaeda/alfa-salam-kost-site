import type { Metadata } from "next";
import { Figtree, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "./header";
import T, { DEFAULT_LANG } from "./i18n";

// Headings + the wordmark — warm geometric-humanist, close to the logo
// lettering. Same three faces as the dashboard, for family resemblance.
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alfa Salam Kost",
  description: "Kost & Rukost rooms in Cibinong, Bogor — availability and contact.",
};

// Runs synchronously while the browser parses <head>, so the stored theme
// is applied before first paint — no flash of the wrong theme. Resolves
// the system preference itself, which is why globals.css has no
// prefers-color-scheme block: one mechanism, so an explicit "light"
// choice still wins on a system set to dark.
const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);var l=localStorage.getItem("lang");if(l==="en"||l==="id")document.documentElement.lang=l}catch(e){}})()`;

// Adds `.anim` before first paint. Every hidden-initial motion state in
// globals.css is scoped under `.anim`, so if JS never runs (or fails),
// the page renders fully visible with no animation — content is never
// trapped behind a transform that never fires.
const ANIM_SCRIPT = `document.documentElement.classList.add("anim")`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={DEFAULT_LANG}
      suppressHydrationWarning
      className={`${figtree.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: ANIM_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-20 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-surface"
        >
          <T k="a11y.skip" />
        </a>
        <Header />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
