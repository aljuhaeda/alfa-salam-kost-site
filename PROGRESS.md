# Alfa Salam Kost Site — Progress

## Status
Prototype — `/rooms` and `/rukost` working end-to-end against the live
Supabase backend. Placeholder copy on `/about` and `/contact`.
**Deployed to Vercel (2026-08-12)**: https://alfa-salam-kost-site.vercel.app,
browser-verified — `/rooms` renders live per-room availability matching
Supabase data. Team: `aljuhaeda`.

## Deferred — site visual redesign plan (not yet implemented)
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

## Next up
1. `/about` and `/contact` now have real page structure (location,
   facilities, house rules, WhatsApp link, address) with `[FILL IN]`
   markers instead of one placeholder blurb — still needs the actual
   business owner details dropped in.
2. Upload real room photos to the `room-photos` bucket via the dashboard
   once it's live, to exercise the `next/image` path for real.
