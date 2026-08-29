# Alfa Salam Kost Site — Progress

## Status
Full redesign ("Rumah × Pelita") built on branch `site-redesign` —
brand shared with the dashboard, new IA (3 routes), new copy. Build /
lint / tsc clean, browser-verified both themes + both languages against
live Supabase. **Not yet merged or deployed** — waiting on `PUSH_OK=1`.
Deployed production is still the 2026-08-15 landing page at
https://alfa-salam-kost-site.vercel.app. Team: `aljuhaeda`.

## Done — Awwwards motion pass (2026-08-29, branch `site-redesign`)
User took full creative command ("do as you like") and asked for real
award-tier impact. Kept the brand (shared with the live dashboard) but
raised the execution:
- **Hero rebuilt** (`hero.tsx`, client) as an asymmetric split —
  viewport-scale Figtree headline (`clamp` to 6rem, tight tracking), the
  mihrab arch as a tall architectural element on the right. One signature
  move: the headline rises word-by-word out of a mask. Shorter hero copy
  ("Kamar tenang, dijaga baik." / "A quiet room, kept well.").
- **Motion system** in `globals.css` — personality PHYSICAL, exactly
  three curves (`--spring-snappy` / `--spring-smooth` / `--ease-snap`,
  verified by grep). Staggered page-load entry (`.lift`), scroll reveals
  on every below-fold block (`reveal.tsx`, IntersectionObserver),
  count-up on the availability figure (`count-up.tsx`), divider draw-in,
  card lift + universal press physics, animated link underlines, header
  drop-in. Warm radial wash + faint grain.
- **Dep-free** — CSS + IntersectionObserver + rAF, no framer-motion.
- **Robust**: every hidden-initial state scoped under `.anim` (added to
  `<html>` pre-paint by `ANIM_SCRIPT`), so with no JS the page renders
  fully visible — content is never trapped behind a transform. All
  motion gated on `prefers-reduced-motion`.
- Dark-mode `--deep` lightened to `#1F2E27` so the colour bands stay
  distinct panels (were near-invisible against the near-black ground).
- Build / lint / tsc clean. Resting states browser-verified light + dark.
  **Motion itself is NOT yet verified by the agent** — the automation
  Chrome tab runs as `visibilityState: hidden`, which freezes rAF and the
  animation timeline (transitions start then freeze mid-flight). Needs a
  real foreground browser to confirm the feel / 60fps / stagger timing.

## Done — full redesign "Rumah × Pelita" (2026-08-29, branch `site-redesign`)
Spec: `docs/superpowers/specs/2026-08-29-site-redesign-design.md`, plan:
`docs/superpowers/plans/2026-08-29-site-redesign-plan.md`.
- **Brand ported from the dashboard's "clean & quiet" redesign** so the
  two properties read as one identity: sage `#5F9179` / cream `#F7F4EF`
  / accent `#3E6B54` tokens, Figtree + Inter + IBM Plex Mono, `star.tsx`
  + `icon.svg` copied over (old `favicon.ico` removed). Retired
  `--teratai`/`--marigold`/`--clay`/`--rattan`, Fraunces/Work Sans, the
  animated `bg-orbs`/`bg-dots`. Site keeps its own `.dark`-class theme
  mechanism (JS-resolved, documented) and `THEME_SCRIPT` verbatim.
- **`ArchFrame` (`src/app/arch.tsx`)** — the signature element. Every
  photo sits clipped inside the mihrab-arch silhouette; a branded
  sage/star placeholder fills the same frame when there's no photo yet
  (all rooms, currently). Clip is `mask-image` (data-URI SVG, scales to
  the box) not an SVG `clipPath` (which wouldn't scale) — so it stays a
  server component with no id prop. Verified rendering at hero (160px)
  and room-card (96px) sizes; **not yet tested with a real photo** —
  bucket is still empty.
- **New IA: 5 routes → 3.** `/` is now a long-scroll home (hero →
  live availability snapshot → deep-green band "everything's in the
  room" → facilities → deep-green band women-only/rules → neighbourhood
  → Rukost teaser → closing CTA). `/rooms` gets ArchFrame cards and a
  dedicated Rukost section (`#rukost`). `/contact` restyled. `/about`
  and `/rukost` deleted, replaced with permanent redirects
  (`/about`→`/`, `/rukost`→`/rooms#rukost`) in `next.config.ts`.
- **Copy rewritten** for the new structure (`i18n.tsx` dictionary), ID
  source of truth mirrored to EN. Reused the real facility / house-rules
  / location / Rukost strings; added hero, colour-band, and section
  keys. Availability count derives its denominator from
  `kostRooms.length` (never a hardcoded 23).
- Shared `RUKOST_PROPERTY` + `rupiah()` + `MAPS_URL` in
  `src/app/config.ts` (were duplicated across pages).
- Only motion added: the dashboard's single `rise` fade-up, with the
  `prefers-reduced-motion` guard. No grain, orbs, or scroll reveals.
- Close-out run: `code-reviewer` (approve, minors fixed inline) →
  `security-review` (no findings — presentational only) → `simplify`
  (shared the two duplicated constants) →
  `verification-before-completion` (fresh build/lint/tsc, browser drive,
  grep sweep for retired tokens — all clean).

## Done — homepage rework, theme + language toggle (2026-08-15)
- Theme toggle (light/dark via a `.dark` class, no flash-of-wrong-theme
  — set before first paint by an inline script) and language toggle
  (Indonesian/English only, `src/app/i18n.tsx` — flat dictionaries, no
  library) added site-wide. Built by an Opus 5 subagent, browser-verified
  in both themes/languages, pushed.
- Homepage rewritten from a stub into a short landing page (routes out
  to `/rooms`, `/about`, `/contact` rather than absorbing their
  content): hero, live availability count pulled from `public_rooms()`,
  and a facilities teaser pulling from the same `about.fac.*` strings
  used on `/about`.
- Iterated on decoration (blurred animated background orbs, dot-grid
  texture) after user feedback across several rounds — removed an
  unsubstantiated "No. 1" ranking badge, fixed a hard seam where the
  background cut off partway down the page, fixed a real bug where
  `list-disc` markers misaligned across the two-column facilities grid,
  fixed a marigold glow sitting behind hero text (invalidated the
  documented `--muted` contrast ratio), added a bordered stat block and
  a third background glow. Design iteration was run past an Opus 5
  subagent for a second opinion before implementing. Build clean,
  browser-verified in both themes, pushed to `origin/master`
  (`f066cbe`).

## Done — real About/Contact copy + Google Maps link (2026-08-13)
Replaced all `[FILL IN]` markers with real business details from the
owner: address (Perumahan Andhika Residence, Jl. Nurul Yaqin No. B8,
Cibinong, Bogor), two WhatsApp contacts (Bu Atin + owner) as `wa.me`
links, a facilities list, house rules (women-only — no male guests past
the entrance), and an About blurb. Added a "View on Google Maps" link
(owner-supplied `maps.app.goo.gl` short link) to both About → Location
and Contact → Address. `npm run build`/`eslint` clean. Pushed and
**confirmed live** — Vercel auto-deploy is wired to this repo, verified
by browsing the redeployed `/rooms` page directly (see redesign entry
below).

## Done — 23 placeholder rooms, corrected numbering (2026-08-13)
Real Alfa Salam Kost room numbering is 1–22 but skips the unlucky 13,
using 12a/12b in its place instead (owner-supplied correction) — 23
physical rooms, not 22. First pass inserted 20 filler rooms as
103–122 (wrong scheme, matching the original 101/102 seed style);
corrected by deleting all Kost rooms (confirmed zero tenants attached
first) and reinserting 23 rows numbered 1–12, 12a, 12b, 14–22, all
`standard`/`available`/Rp800,000/`women_only`/placeholder description,
directly via the Supabase SQL editor. Confirmed live on `/rooms` (Room 1
renders with the placeholder description). Real room
numbers/types/rent still pending from the owner — `## Next up` item 2.

## Done — key-tag visual redesign (2026-08-13)
Implemented the spec below in full: tokens (`globals.css`), font swap
(`layout.tsx`, Fraunces/Work Sans/IBM Plex Mono via `next/font/google`),
`key-tag.tsx` (reusable badge — hero, `/rooms` cards, `/rukost` listing),
dashed `string-divider` between property sections on `/rooms` and between
`/about` sections. Kept the hero simple — a KeyTag badge next to the
headline, not a literal threaded-through-text illustration (higher CSS
cost, uncertain payoff for a first pass). `npm run build` and `eslint`
both clean; verified via local dev server + rendered HTML/CSS (no browser
extension available this session) that tokens/classes apply correctly and
no old black/zinc classes were left behind. Pushed to `origin/master`.
`/about` and `/contact` copy is still `[FILL IN]` — spec below is the
historical plan this implements, kept for reference.

## Deferred — site visual redesign plan (implemented above, 2026-08-13)
User asked for a distinguished visual identity for both the dashboard and
this site, deliberately different from each other. **The dashboard is
being redesigned first** (see its own PROGRESS.md for that in-progress
plan) — pick this up after that one's done. No code touched yet.

**Grounding**: renters browsing rooms on their phone, in daylight, looking
for a home they can trust. Signature element: the numbered key tag every
kost hands out at the front desk — a real, specific object from this
world, not a generic motif.

**Palette** (light-primary — deliberate asymmetry vs. the dashboard being
dark-primary; renters browse in daylight, not the dashboard's indoor-staff
use case). Chosen to avoid the AI-cliché cream+serif+terracotta recipe:
| Token | Hex | Role |
|---|---|---|
| Paper | `#F3EEE2` | background — warm unbleached cotton, not stark cream |
| Ink | `#2B2620` | primary text |
| Teratai Green | `#3F5D4E` | primary accent, named for lotus ponds in Indonesian courtyards |
| Marigold | `#D98E2F` | key-tag gold, secondary accent |
| Clay | `#B5573B` | "occupied" state, instead of generic amber |
| Rattan | `#C9BFA6` | borders/dividers |
Dark counterpart: Ink-night `#1C1A16`, Paper-night `#EDE6D6`, brightened
Teratai/Marigold/Clay for contrast.

**Type**: Fraunces (display, hero only — warm handcrafted serif, not the
generic high-contrast cliché) + Work Sans (body) + IBM Plex Mono (prices/
dates — gives room prices a "printed tag" feel, same utility face as the
dashboard for family resemblance without matching identities).

**Layout/signature**: hero built around a literal hanging key-tag graphic
threading the headline; room cards show the room number as a real key-tag
badge (replacing the current plain pill); section dividers use a dashed
"string" line instead of a hairline.

**Cost tiers**: palette + type = token-only (`globals.css` + `layout.tsx`
font swap, cheap). Key-tag badges on `/rooms` and the hero = component-
level (moderate). Postcard photo frames / dashed dividers = optional
polish, easy to defer or drop.

**Next step**: refine this written spec (same process as the dashboard —
discuss, adjust, then build a static Artifact mockup before touching real
files) once the dashboard redesign is done.

## Done — UI/UX pass (this session)
- Active nav-link highlighting (`NavLinks` client component, `usePathname`).
- `/rooms`: cards stack vertically below `sm` instead of cramping
  image+text+status into one row on a phone; status is now a colored badge
  matching the dashboard; a "No photo" placeholder keeps card height
  consistent since no room has a real photo yet; empty-state message added.
- `/rukost`: empty-state message added.
- Contact page: fixed a real bug caught in the code-review pass — the
  WhatsApp `[FILL IN]` placeholder was rendering as a live, clickable
  `wa.me` link with a nonsensical URL instead of plain placeholder text
  like the other unfilled sections.
- Done unattended per user request. Ran the full close-out sequence
  (code-reviewer → security-review → simplify → verification-before-
  completion) against the diff once advisor came back online. The
  simplify pass's findings applied to the dashboard repo didn't carry
  over here — this repo's own `STATUS_CLASS` map is a single definition,
  not duplicated within this repo. Browser-verified `/rooms` against live
  data (nav highlighting, badges, "No photo" placeholders all correct),
  and confirmed via the compiled CSS that `sm:flex-row` etc. are actually
  present in the `(min-width: 40rem)` media query.

## Done
- Next.js 16 app scaffolded (TypeScript, Tailwind, App Router, `src/`).
  `@supabase/supabase-js` only — no `@supabase/ssr`, since this site has no
  auth at all.
- `src/lib/supabase.ts` — anon-key client, used only to call `rpc/public_rooms`.
- `/rooms` — Server Component, `revalidate = 60` (ISR), calls
  `public_rooms()` and groups results by property, shows a gender-policy
  label per room ("Women only" / "Mixed / family"). **Browser-verified**
  (not just build): renders both properties correctly with the right
  per-room availability (available / maintenance / occupied), matching the
  seed data in the dashboard repo exactly.
- `/rukost` — dedicated landing page for renting the whole Rukost house
  (business rule: Kost rooms are women-only, but the Rukost is
  mixed-occupancy when rented as one unit). Filters `public_rooms()` to
  just that property. Added to nav as "Rent a House". Browser-verified.
- `next.config.ts` — `images.remotePatterns` allow-listed for the
  `room-photos` Supabase Storage bucket (needed for `next/image` to load
  remote photos once any are uploaded; none are yet).
- `/`, `/about`, `/contact` — minimal pages. `/about` and `/contact` are
  explicitly placeholder copy (no real address/phone fabricated) — need
  real content before launch.
- `npm run build` passes clean.

## Known issues / honest limitations
- No real photos in the `room-photos` bucket yet, so `photo_url` is always
  null for every seeded room — the `next/image` path is wired up but
  untested with an actual image.
- `/about` and `/contact` have placeholder copy only, deliberately not
  fabricated business details.
- Shares the Supabase project with the dashboard repo (`mmzurbsrpbmfkqufwejd`)
  per the plan's repo layout — this repo owns no schema, dashboard repo does.
- Real Alfa Salam Kost property has ~22 rooms (per user, 2026-08-13); seed
  data only has 2 Kost rooms + 1 Rukost unit. The `/rooms` page and the
  "key-tag" redesign mockup (see below) were both built/reviewed against
  that 3-row fixture — card-grid density and page length at ~22 rows
  hasn't been sanity-checked. Real room data (numbers, types, rent,
  gender policy) still needs entering via the dashboard once it's live,
  or an expanded seed if the user hands over a room list.

## Doc-only update (2026-08-25)
README's homepage screenshot was refreshed (`f26976d`, 2026-08-19) — no
app/feature change, noted here only to keep this file's last-touch after
that commit.

## Next up
1. **Merge `site-redesign` → `master` + deploy** (needs `PUSH_OK=1`).
   Deploy-linked repo — push ships live to Vercel. After deploy,
   browser-verify the live URL (both themes/langs, `/rooms` data,
   redirects) and refresh the README screenshot.
2. Upload real room photos to the `room-photos` bucket via the dashboard
   once it's live — owner confirmed photos are coming soon (2026-08-13).
   Once one is in, confirm `ArchFrame` clips a real photo to the arch
   with no layout shift (only tested with the placeholder so far).
3. Replace the 23 placeholder rooms (1–12, 12a, 12b, 14–22) with real
   room numbers/types/rent via the dashboard, once the owner has the
   list. The `/rooms` page is 23 near-identical placeholder cards until
   then — long, but that's the data, not the design.
4. Mobile (~375px) not visually confirmed this session — the redesign
   uses standard responsive patterns (`sm:` breakpoints, `flex-wrap`,
   `min-w-0`), but eyeball it on a real phone after deploy.
