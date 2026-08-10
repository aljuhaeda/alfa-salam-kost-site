# Alfa Salam Kost Site — Progress

## Status
Prototype — `/rooms` and `/rukost` working end-to-end against the live
Supabase backend. Placeholder copy on `/about` and `/contact`.

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
- Not deployed anywhere yet (see dashboard repo's PROGRESS.md "Questions
  for the user" — same Vercel-account blocker applies here).
- Shares the Supabase project with the dashboard repo (`mmzurbsrpbmfkqufwejd`)
  per the plan's repo layout — this repo owns no schema, dashboard repo does.

## Next up
1. Real `/about` and `/contact` copy from the business owner.
2. Deploy to Vercel (same open question as the dashboard: who drives it).
3. Upload real room photos to the `room-photos` bucket via the dashboard
   once it's live, to exercise the `next/image` path for real.
