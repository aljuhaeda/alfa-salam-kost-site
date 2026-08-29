# Implementation plan — site redesign "Rumah × Pelita"

Spec: `../specs/2026-08-29-site-redesign-design.md`. Branch: `site-redesign`.
Build after every phase (`npm run build` — modified Next 16, see `AGENTS.md`).

## Advisor fixes folded in (2026-08-29)
- **ArchFrame uses `mask-image`, not `clip-path`.** A `url(#id)` clip with
  default `userSpaceOnUse` does not scale to the box — broken at the 3
  sizes we use it. Instead: `mask-image: url("data:image/svg+xml,…arch…")`
  + `mask-size: 100% 100%` (+ `-webkit-mask-*`), and a separate
  `<svg viewBox="0 0 120 158">` outline on top. No unique id → ArchFrame
  stays a clean server component, no `id` prop.
- Placeholder gradient stops reference raw `var(--sage)` / `var(--deep)`
  (the `:root` tokens), not the `--color-*` `@theme` names — keeps it
  theme-aware.
- **Phases 1 + 2 run as one unit, build once** — deleting the old
  `@theme` tokens mid-way leaves utilities ungenerated and a misleading
  build.
- Availability denominator = `kostRooms.length`, never a hardcoded 23
  (placeholder seed count; real list still pending).
- Whole availability block behind one `kostRooms.length > 0 &&` guard.
- `/rukost` → `/rooms#rukost` (fragment in redirect destination).
- Delete the existing `src/app/favicon.ico` (it beats `icon.svg`); add
  branded `icon.svg`.
- Every `next/image` with `fill` gets a `sizes` prop (console-warn + our
  zero-console-error bar).
- Fonts mirror the dashboard exactly: `Figtree` weights `["500","600","700"]`,
  `IBM_Plex_Mono` `["400","500","600"]`, `Inter` variable.
- Close-out updates **both** `PROGRESS.md` (repo) and `C:\dev\PROGRESS.md`
  item 12.

## Phase 1 — Foundation
- [ ] `src/app/star.tsx` — port from dashboard `(protected)/star.tsx`
- [ ] `src/app/icon.svg` — port from dashboard `app/icon.svg`
- [ ] `src/app/config.ts` — `export const MAPS_URL = "https://maps.app.goo.gl/MQBGqnYfbb9m3Ei87"`
- [ ] `src/app/globals.css` — token rewrite (palette table in spec), drop
      `.bg-orbs`/`.bg-dots` + `bg-orb-drift-*` keyframes, `@theme inline`
      rename, `:focus-visible` → accent, `.facility-bullet` → accent,
      add `rise` keyframe + `.rise` + `prefers-reduced-motion` guard
- [ ] `src/app/layout.tsx` — `Figtree`/`Inter` replace `Fraunces`/`Work_Sans`
      (variable fonts, `variable: --font-figtree` / `--font-inter`); keep
      `IBM_Plex_Mono`; `THEME_SCRIPT` verbatim
- [ ] `src/app/arch.tsx` — `ArchFrame` (server component, `id` prop for
      stable clipPath id, `src: string | null`, `next/image` fill +
      placeholder gradient/star). Shared `ARCH_D` path constant.
- build

## Phase 2 — Shell
- [ ] `layout.tsx` header: `<Star>` + wordmark brand; skip-link + border
      colours → accent/line
- [ ] `nav-links.tsx` — `NAV` → Home / Rooms / Contact; active → accent
- [ ] `theme-toggle.tsx` — border/hover → line/accent
- [ ] `i18n.tsx` `LangToggle` — className only → line/accent
- [ ] `status-badge.tsx` — soft pills (positive/negative/fore-muted), no border
- build

## Phase 3 — Copy
- [ ] `i18n.tsx` dictionary: add new keys (hero, 2 colour bands, section
      headings, availability phrasings, closing CTA); keep facility/rules/
      location/rukost/gender/status/contact strings; remove dead
      page-scaffold keys. `id` source of truth, mirror `en`.

## Phase 4 — Home
- [ ] `src/app/page.tsx` — long-scroll: hero (ArchFrame) → availability
      snapshot (`public_rooms()`, graceful) → deep band (room contents) →
      facilities → deep band (women-only/rules) → neighbourhood (+MAPS_URL)
      → rukost teaser → closing CTA. `<StarDivider>` between cream sections.
- build

## Phase 5 — Rooms
- [ ] `src/app/rooms/page.tsx` — ArchFrame cards, `<StarDivider>` between
      property groups, Rukost section (`id="rukost"`, filtered to
      `Alfa Salam Rukost`, `rukost.intro` copy). Strict `if (error) throw`.
- build

## Phase 6 — Contact, redirects, deletions
- [ ] `src/app/contact/page.tsx` — restyle to new tokens, use `config.ts`
- [ ] `next.config.ts` — `redirects()`: `/about`→`/`, `/rukost`→`/rooms`
      (permanent)
- [ ] delete `src/app/key-tag.tsx`, `src/app/about/page.tsx`,
      `src/app/rukost/page.tsx`
- [ ] `grep` sweep: `teratai|marigold|clay|rattan|Fraunces|Work_Sans|bg-orbs|bg-dots|key-tag|string-divider` → nothing in `src/`
- build + `npm run lint` + `npx tsc --noEmit`

## Phase 7 — Close-out
- [ ] `code-reviewer` → `security-review` → `simplify` →
      `verification-before-completion`
- [ ] Drive in browser: 3 routes + 2 redirects, both themes, both langs,
      `/rooms` vs live Supabase, availability strip graceful, ArchFrame
      placeholder + one real image, 375px width
- [ ] commit; update `PROGRESS.md` via `progress-notes`
- [ ] merge to `master` + push ONLY on explicit `PUSH_OK=1`
