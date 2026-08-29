# Public site redesign — "Rumah × Pelita"

Date: 2026-08-29
Status: approved, ready for implementation plan
Branch: `site-redesign` (new, off `master`)

## Goal

A full redesign of the public `alfa-salam-kost-site` — new visual
language, new information architecture, new copy — built on the brand the
dashboard already ships (`alfa-salam-kost-dashboard`, "clean & quiet"
redesign, 2026-08-29). The two properties should read as one identity
while the public site keeps its own warmer, renter-facing character.

Primary visitor job: **understand the place and decide.** A renter
browsing on their phone, in daylight, wants to know what living here is
like (women-only, gated, private bath, real landlady) and whether a room
is free. Then message on WhatsApp.

This is a rebuild of the presentation layer and page structure. It does
**not** change the Supabase backend, the `public_rooms()` RPC, or the
`room-photos` bucket contract.

## Non-goals

- No backend / schema / RPC changes. The site still owns no schema.
- No auth (the public site has none and gets none).
- No new runtime dependencies. `@supabase/supabase-js` stays the only one.
- No CMS. Copy lives in the i18n dictionary as it does today.
- Not touching the dashboard repo.
- Real room data (numbers, types, rent) and photos are still pending from
  the owner — the design ships with a branded placeholder system and
  drops real content in later with no layout change. Not a blocker.

## Sacred (must not change)

- `src/lib/supabase.ts` — the anon client.
- Every `supabase.rpc("public_rooms")` call, its `PublicRoom` shape, and
  the `export const revalidate = 60` on each data page.
- The i18n store in `src/app/i18n.tsx` — `useSyncExternalStore`,
  `subscribe` / `getSnapshot` / `getServerSnapshot`, `setLang`, `useLang`,
  `useT`, the default `<T>` export, `DEFAULT_LANG = "id"`, `LANG_KEY`.
  Only the `LangToggle` component's className string and the dictionary
  contents change.
- The `THEME_SCRIPT` in `src/app/layout.tsx` — verbatim. It resolves
  `prefers-color-scheme` and the stored choice before first paint; that
  is why `globals.css` has no `prefers-color-scheme` block.
- The site's theme mechanism: `@custom-variant dark (&:where(.dark, .dark
  *))` + a `.dark` class on `<html>`. Keep it. (The dashboard uses a
  `:root:not(.light)` + media-query form; the site's JS-resolved form is
  functionally equivalent and documented — not worth churning.)
- `next.config.ts` `images.remotePatterns` — the `room-photos` bucket
  allow-list stays.
- `data-*`, `aria-*`, `id`, `key`, `ref` attributes everywhere.
- `font-mono` on prices, room numbers, phone numbers.

## Brand foundation (from the dashboard)

Ported, not reinvented. Source: `alfa-salam-kost-dashboard`
`src/app/globals.css`, `src/app/(protected)/star.tsx`, `src/app/icon.svg`,
`public/brand/`, and `../alfa-salam-kost-dashboard/docs/superpowers/specs/
2026-08-29-dashboard-redesign-design.md`.

### Palette (`globals.css` tokens)

Light is the base. Retire `--teratai`, `--marigold`, `--clay`,
`--rattan`.

| Token | Light | Dark (`.dark`) | Role |
|---|---|---|---|
| `--background` | `#F7F4EF` | `#171A18` | page ground (warm cream) |
| `--surface` (new) | `#FFFFFF` | `#1E2220` | cards, panels |
| `--foreground` | `#1A1D1C` | `#E4E6E4` | primary text |
| `--muted` | `#5B5F5A` | `#A6ACA6` | secondary text — AA-checked on `--background` |
| `--line` | `#E4E0D8` | `#2C332F` | hairlines, borders, dividers |
| `--accent` | `#3E6B54` | `#A9C6B7` | links, primary buttons, nav-active, focus ring |
| `--sage` (new) | `#5F9179` | `#6FB58C` | the logo mark colour; motif fills, decorative |
| `--deep` (new) | `#2F4A3E` | `#0F1613` | full-width colour bands |
| `--positive` (new) | `#2E7D57` | `#57A97D` | "available" |
| `--negative` (new) | `#B23B30` | `#D8776B` | "occupied" / "maintenance" |

- `--accent` vs `--positive`: told apart **by form**, matching the
  dashboard — accent appears as green text links and solid buttons;
  `--positive` appears only as a tinted pill (`bg-positive/10
  text-positive`). Same for `--negative`.
- `@theme inline`: map the new tokens (`--color-surface`, `--color-line`,
  `--color-accent`, `--color-sage`, `--color-deep`, `--color-positive`,
  `--color-negative`); drop `--color-teratai` / `-marigold` / `-clay` /
  `-rattan`. Font tokens: `--font-display` → Figtree var, `--font-sans` →
  Inter var, `--font-mono` → IBM Plex Mono var (unchanged name).
- `:focus-visible` outline → `var(--accent)`.
- Delete the `.bg-orbs` / `.bg-dots` blocks and the `bg-orb-drift-*`
  keyframes entirely.
- `.facility-bullet::before` background → `var(--accent)`.
- Add the dashboard's single `rise` fade-up keyframe + `.rise` class +
  the `prefers-reduced-motion: reduce` guard (copy from dashboard
  `globals.css` lines ~146-170). This is the **only** motion added.

### Type (`layout.tsx`)

- `Fraunces` → **Figtree** (display), var `--font-figtree`.
- `Work_Sans` → **Inter** (body), var `--font-inter`.
- `IBM_Plex_Mono` — unchanged (prices, room numbers, phone numbers).
- Update the `@theme inline` var names to match. Page-level `font-display`
  / `font-sans` utility classes need no edit (token names stable).

### Motif — the arch and the star

- **New** `src/app/star.tsx` — port verbatim from the dashboard
  (`(protected)/star.tsx`): the 8-point rub el hizb, two overlapped
  rounded `<rect>`s, `fill="currentColor"`, `aria-hidden`.
- **New** `src/app/arch.tsx` — see "The ArchFrame component" below.
- **New** `src/app/icon.svg` — port from the dashboard (`app/icon.svg`);
  gives the site a real favicon (it currently has none of its own).
- **Delete** `src/app/key-tag.tsx`. The key-tag motif is retired.

## Design

### The ArchFrame component — `src/app/arch.tsx`

The mihrab arch from the logo, used as a **picture frame**. This is the
signature element: every photo on the site sits clipped inside the arch
silhouette, and when there is no photo the same frame renders a branded
placeholder. The motif and the photography are the same object.

Server component. No `"use client"`.

```tsx
import Image from "next/image";
import Star from "./star";

// One shared arch path, viewBox 0 0 120 158. Pointed-mihrab silhouette.
const ARCH_D =
  "M6 158 V64 C6 30 30 4 60 4 C90 4 114 30 114 64 V158 Z";

export default function ArchFrame({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string | null;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  const clipId = `arch-${...}`; // stable id per instance — see impl note
  return (
    <div className={`relative aspect-[120/158] ${className}`}>
      <svg viewBox="0 0 120 158" className="absolute inset-0 h-full w-full">
        <defs>
          <clipPath id={clipId}>
            <path d={ARCH_D} />
          </clipPath>
        </defs>
        {src ? null : (
          <g clipPath={`url(#${clipId})`}>
            {/* placeholder: sage→deep gradient field + centred star */}
          </g>
        )}
        <path
          d={ARCH_D}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="1.5"
        />
      </svg>
      {src && (
        <div
          className="absolute inset-0"
          style={{ clipPath: `url(#${clipId})` }}
        >
          <Image src={src} alt={alt} fill priority={priority}
            className="object-cover" />
        </div>
      )}
    </div>
  );
}
```

Implementation notes for the plan:
- **Stable `clipId`**: SVG `clipPath` ids must be unique and stable
  across SSR/hydration. Use React's `useId()` — but that forces
  `"use client"`. Alternative: derive a deterministic id from a required
  `id` prop passed by the caller (room number, section name). Pick the
  prop approach to keep it a server component.
- The gradient uses `--color-sage` → `--color-deep` via an SVG
  `<linearGradient>` with `stop-color` referencing CSS vars (works in
  modern browsers; if it doesn't render in the target Next/React version,
  fall back to hardcoded stops matched to the light palette — the
  placeholder is decorative).
- Sizes are controlled by the caller via `className` (width) + the fixed
  `aspect-[120/158]`.
- `next/image` with `fill` needs a positioned parent — the wrapper `div`
  provides it. `remotePatterns` already allows the bucket.

### `<StarDivider>` — inline in `layout.tsx` or a tiny component

A centred `<Star>` glyph (`w-4 text-sage/60`) between major sections,
replacing the current dashed `.string-divider`. One line. Used on the
long-scroll home and between `/rooms` property groups.

### Information architecture

From 5 routes to **3**:

| Route | Was | Now |
|---|---|---|
| `/` | short landing | **long-scroll home** — the whole story (see below) |
| `/rooms` | Kost list | **full availability** — Kost list + Rukost section + per-room detail inline |
| `/rukost` | standalone page | **removed** — folded into `/` (teaser) and `/rooms` (its own section) |
| `/about` | standalone page | **removed** — content moves into `/` sections |
| `/contact` | standalone page | **kept**, redesigned |

`/about` and `/rukost` get permanent redirects to `/` and `/rooms`
respectively (Next `redirects()` in `next.config.ts`, or route-level) so
existing links and the portfolio case study don't 404.

Nav: `Home · Rooms · Contact`. On `/`, the nav's non-route items become
in-page anchor links (`#facilities`, `#neighbourhood`, etc.) — decide in
the plan whether to keep nav flat (3 links) or add a small anchor sub-nav
on `/` only. Default: flat 3 links, `/` sections are just scrolled to.

### The long-scroll home (`/`)

Sections, top to bottom. Alternating rhythm: **cream** photo/content
sections and full-width **`--deep`** colour bands. `<StarDivider>`
between cream sections; the colour bands are their own separator.

1. **Hero** (cream). `ArchFrame` (hero photo / placeholder) beside a
   Figtree headline + one-line sub + primary CTA "See rooms &
   availability" (→ `/rooms`) and a secondary "Message us" (→ `/contact`).
   Eyebrow: "Cibinong, Bogor".
2. **Availability snapshot** (cream, `id="availability"`). Pulls
   `public_rooms()` — "N of 23 rooms free this month", a row of the
   available room numbers as small mono chips linking to `/rooms`, and
   the "from Rp—/month" figure. Graceful: a Supabase blip drops this
   strip, doesn't fail the page (current homepage already does this
   pattern — keep it).
3. **Colour band — "Everything's already in the room"** (`--deep`).
   Star, Figtree sub-head, one paragraph: bed / AC / water heater /
   private indoor bathroom / move in with a suitcase.
4. **Facilities** (cream, `id="facilities"`). The existing `about.fac.*`
   strings, two-column `.facility-bullet` list. Optionally 1–2
   `ArchFrame` placeholders (shared kitchen, drying area) for later
   photos.
5. **Colour band — women-only & house rules** (`--deep`,
   `id="rules"`). The `about.rules.body` content, stated warmly and
   plainly. This is a selling point, not fine print.
6. **Neighbourhood** (cream, `id="neighbourhood"`). `about.location.body`
   + the Google Maps link (`MAPS_URL`, owner-supplied). Optionally a
   static map image placeholder in an `ArchFrame`.
7. **Rukost teaser** (cream). Short: "Want the whole house instead?"
   `rukost.intro` trimmed, link → `/rooms#rukost`.
8. **Closing CTA** (`--deep`). "Come see it." WhatsApp CTA → `/contact`.

`MAPS_URL` is currently duplicated in `about/page.tsx` and
`contact/page.tsx`. Lift it to one shared module (`src/app/config.ts` or
similar) as part of this work.

### `/rooms` — full availability

- `h1` + a one-line intro.
- **Kost section**: rooms grouped as today (`public_rooms()` →
  `byProperty`), but each room is a card with an `ArchFrame` photo
  (portrait, ~96px wide), room type + number in Figtree, price in mono,
  gender-policy line, and a status pill (`<StatusBadge>`, restyled). Cards
  stack on mobile, go 2-up at `sm`. `<StarDivider>` between property
  groups.
- **Rukost section** (`id="rukost"`): the `rukost.intro` copy + the
  whole-house listing card(s) filtered to `Alfa Salam Rukost`, same card
  shape. Keeps the business rule visible (women-only Kost vs
  mixed-occupancy whole-house).
- Strict error handling stays: `if (error) throw new Error(...)` —
  unlike the homepage strip, this page should fail loudly if the RPC is
  down.
- Empty states: keep the existing `rooms.empty` / `rukost.empty`
  messages.

### `/contact` — redesigned

Same content (two WhatsApp contacts, address, Maps link), restyled to the
new system: `--surface` cards, `--line` borders, `--accent` links,
`ArchFrame` optional for a building-front photo later. WhatsApp rows keep
`min-h-11`, `wa.me` links, `rel="noopener noreferrer"`.

### Components restyled (className-only)

| File | Change |
|---|---|
| `src/app/status-badge.tsx` | soft pills matching dashboard `badge.tsx`: `inline-block rounded-full px-2 py-0.5 text-xs font-medium` + `available`→`bg-positive/10 text-positive`, `occupied`→`bg-negative/10 text-negative`, `maintenance`→`bg-foreground/10 text-foreground/60`. Drop the border. Label still carries the meaning (keep `<T>`). |
| `src/app/nav-links.tsx` | active: `border-teratai text-teratai` → `border-accent text-accent`; hover `border-rattan` → `border-line`, `hover:text-foreground` stays. Reduce `NAV` to Home / Rooms / Contact. |
| `src/app/theme-toggle.tsx` | `border-rattan` → `border-line`, `hover:border-teratai hover:text-teratai` → `hover:border-accent hover:text-accent`. Icons + the no-state rationale unchanged. |
| `src/app/i18n.tsx` `LangToggle` | className only: `border-rattan` → `border-line`, `hover:border-teratai hover:text-teratai` → `hover:border-accent hover:text-accent`. Everything else in the file is sacred. |
| `src/app/layout.tsx` | fonts (above); header brand becomes `<Star className="h-5 w-5 text-sage" />` + wordmark; skip-link `bg-teratai` → `bg-accent`; `border-rattan` → `border-line`. |

### Copy

Rewrite the i18n dictionary for the new IA. Keep `id` as source of truth,
mirror to `en` (matches the file's current convention — note `id` is
currently the `as const` and `en` is typed from it).

- **Keep & reuse**: `about.fac.1-8`, `about.rules.body`,
  `about.location.body`, `about.blurb` (may trim), `rukost.intro`,
  `gender.*`, `status.*`, `contact.*`, `rooms.*`, `a11y.*`.
- **New keys** for: hero headline + sub + eyebrow, the two colour-band
  headings + bodies (room-contents, women-only), section headings
  (availability, facilities, neighbourhood, rukost teaser), closing CTA,
  the "N of 23 free" / "from Rp— /month" phrasings, nav changes.
- **Remove**: keys only used by the deleted `/about` and `/rukost` page
  shells that don't carry over (audit during implementation — most
  content strings are reused, only page-title/scaffolding keys go).
- Tone: warm, direct, specific. "A room that's ready, and a landlady who
  picks up." Not "Premium boarding solutions." No fabricated claims
  (the old "No. 1" badge is already gone — keep it gone).

### Motion / atmosphere

Per the dashboard's "clean & quiet":

- **No** grain overlay, **no** animated orbs, **no** dot-grid, **no**
  scroll reveals, **no** parallax.
- **No** frosted nav beyond the existing `bg-background/90 backdrop-blur`.
- The **only** motion: the `rise` fade-up on the top of each page
  wrapper (ported from the dashboard), guarded by
  `prefers-reduced-motion: reduce`.
- Hover states: `transition-colors` on links / cards / buttons — the
  restrained kind already in the codebase. No lift-and-shadow.

## Files

### New
- `src/app/star.tsx` — ported 8-point star
- `src/app/arch.tsx` — `ArchFrame` + shared arch path
- `src/app/icon.svg` — ported favicon
- `src/app/config.ts` — shared `MAPS_URL` (and any other shared consts)
- possibly `src/app/star-divider.tsx` — if not inlined

### Edited
- `src/app/globals.css` — token rewrite, delete orbs/dots, add `rise`
- `src/app/layout.tsx` — fonts, header brand, nav, skip-link colour
- `src/app/page.tsx` — rebuilt as the long-scroll home
- `src/app/rooms/page.tsx` — rebuilt: ArchFrame cards, Rukost section
- `src/app/contact/page.tsx` — restyled
- `src/app/i18n.tsx` — `LangToggle` className + dictionary rewrite
- `src/app/nav-links.tsx` — 3 links, accent active state
- `src/app/status-badge.tsx` — soft pills
- `src/app/theme-toggle.tsx` — accent hover
- `next.config.ts` — add `redirects()` for `/about` → `/`, `/rukost` →
  `/rooms`

### Deleted
- `src/app/key-tag.tsx`
- `src/app/about/page.tsx`
- `src/app/rukost/page.tsx`
- `src/app/page.tsx`'s `bg-orbs` / `bg-dots` markup (with the CSS)

### Untouched
- `src/lib/supabase.ts`
- the i18n store internals in `src/app/i18n.tsx`
- `THEME_SCRIPT` in `layout.tsx`
- `public/readme/homepage.png` (README asset — refresh after, not part
  of this)

## Verification

Per `CLAUDE.md` close-out: `code-reviewer` → `security-review` →
`simplify` → `verification-before-completion`.

Concrete checks:
- This is a **modified Next.js** (16.2.12) — read the relevant guides in
  `node_modules/next/dist/docs/` before writing any framework-level code
  (`redirects()`, `next/font`, `next/image` with `fill`, metadata/icon
  conventions). Heed deprecation notices (`AGENTS.md`).
- `npm run build` and `npm run lint` clean.
- `tsc --noEmit` clean (no `tsc` script — run the binary directly).
- Drive the app (`run` skill / `npm run dev`), browser-verified:
  - `/`, `/rooms`, `/contact` all render; `/about` → `/` and `/rukost` →
    `/rooms` redirect.
  - Both themes (toggle flips, persists, no flash), both languages
    (toggle flips, all new strings translated, no raw keys).
  - `/rooms` against **live Supabase**: room groups, availability,
    gender labels match the seed/live data.
  - Homepage availability strip: shows real counts; still renders if the
    RPC errors (strip drops, page stays).
  - `ArchFrame`: placeholder renders now; drop one real image into the
    bucket and confirm it clips to the arch with no layout shift.
  - Narrow width (~375px): no horizontal overflow, colour bands full-
    bleed, cards stack, touch targets ≥ 44px.
- `grep -rn "teratai\|marigold\|clay\|rattan\|Fraunces\|Work_Sans\|
  bg-orbs\|bg-dots\|key-tag\|string-divider" src/` returns nothing.
- No fabricated business facts in the new copy.

## Deploy

Deploy-linked repo (push to `master` ships live to Vercel). Work on
`site-redesign`. Merge to `master` and push **only** on explicit
confirmation (`PUSH_OK=1`), per the `C:\dev` trust-boundary gate. Update
`PROGRESS.md` via `progress-notes` at close-out. Custom domains
(`alfasalamkost.aljuhaeda.com`, `alfa-salam-kost-site.vercel.app`) are
unaffected — no domain work in this task.
