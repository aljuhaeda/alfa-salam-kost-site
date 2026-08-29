import T from "./i18n";

/* Soft-pill status tag, matching the dashboard's badge.tsx. Colour never
   carries the meaning alone — the label does — so the tint can be subtle.
   available → positive, occupied/maintenance → negative (one warning
   accent, not a separate amber). */
const CLASS = {
  available: "bg-positive/10 text-positive",
  maintenance: "bg-negative/10 text-negative",
  occupied: "bg-negative/10 text-negative",
} as const;

export type Availability = keyof typeof CLASS;

export default function StatusBadge({ status }: { status: Availability }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${CLASS[status]}`}
    >
      <T k={`status.${status}`} />
    </span>
  );
}
